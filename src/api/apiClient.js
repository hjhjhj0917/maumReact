import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
    refreshSubscribers.map((callback) => callback());
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

apiClient.interceptors.response.use(
    (response) => { /* CommonResponse 포맷({httpStatus, data, ...})이면 data만 꺼내서 반환함 */
        if (response.data && typeof response.data === 'object' && 'httpStatus' in response.data) {
            return response.data.data;
        }
        return response.data;
    },
    // ★ 즐겨찾기 이후 추가/수정
    async (error) => {
        const originalRequest = error.config;

        /* !originalRequest._retry: 재발급 후 재요청도 401이 나는 경우 무한 루프에 빠지지 않도록 한 번만 시도하게 막는 가드 */
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            const currentPath = window.location.pathname;
            const publicPaths = [
                '/',
                '/account/login',
                '/account/register',
                '/account/findId',
                '/account/findPw'
            ];

            /* 비로그인 상태에서도 접근 가능한 경로라면 재발급을 시도할 필요가 없음 */
            if (publicPaths.includes(currentPath)) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!isTokenRefreshing) {
                isTokenRefreshing = true; /* 재발급 요청이 여러 번 동시에 나가지 않도록 잠금 */

                try {
                    await axios.post('/api/v1/login/refresh', {}, {
                        withCredentials: true /* 리프레시 토큰이 담긴 쿠키를 서버로 함께 보내야 재발급이 가능함 */
                    });

                    isTokenRefreshing = false;
                    onTokenRefreshed(); /* 잠긴 동안 대기열에 쌓인 요청들을 재실행함 */

                    return apiClient(originalRequest);

                } catch (refreshError) {
                    isTokenRefreshing = false;
                    refreshSubscribers = [];

                    alert('보안을 위해 로그아웃 되었습니다. 다시 로그인해 주세요.');

                    window.dispatchEvent(new Event('auth_logout'));
                    window.location.href = '/';
                    return Promise.reject(refreshError);
                }
            }

            /* 이미 재발급이 진행 중이면 새 요청을 바로 보내지 않고 재발급 완료 후 재실행되도록 대기열에 담아둠 */
            return new Promise((resolve) => {
                addRefreshSubscriber(() => {
                    resolve(apiClient(originalRequest));
                });
            });
        }

        /* GlobalExceptionHandler가 비즈니스 예외에도 실제 상태 코드(400/409 등)로 응답하므로,
           호출부가 항상 error.message로 서버 메시지를 꺼내 쓸 수 있도록 보정함
           (CommonResponse는 message에 상태 라벨을, data에 실제 안내 문구를 담는 컨벤션이라 data를 우선 사용하고,
            data가 MsgDTO({result, msg}) 형태인 경우까지 함께 처리함) */
        const body = error.response?.data;
        if (body) {
            if (typeof body.data === 'string' && body.data) {
                error.message = body.data;
            } else if (body.data && typeof body.data.msg === 'string' && body.data.msg) {
                error.message = body.data.msg;
            } else {
                error.message = body.message || error.message;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;