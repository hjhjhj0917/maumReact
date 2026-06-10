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
    refreshSubscribers.map((callback) => callback()); /* callback으로 포장된 요청을 뜯어서 다시 실행함 */
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

/* 서버에서 온 응답을 가로챔 */
apiClient.interceptors.response.use(
    (response) => { /* 정상적인 응답일 경우 CommonResponse 응답에 맞춰서 데이터 가공함 */
        if (response.data && typeof response.data === 'object' && 'httpStatus' in response.data) {
            return response.data.data;
        }
        return response.data;
    },
    async (error) => { /* 에러 발생시 */
        const originalRequest = error.config; /* 기존 요청 정보를 originalRequest 변수에 담음*/

        /*
        * 그 에러가 401인지 확인함
        * !originalRequest._retry이 조건은 토큰 재발급 실패시 무한히 재요청을 막는 조건
        */
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            const currentPath = window.location.pathname;
            const publicPaths = [
                '/',
                '/account/login',
                '/account/register',
                '/account/findId',
                '/account/findPw'
            ];

            /* 현재 경로와 예외 경로를 비교하여 토큰 재발급 여부를 확인함 */
            if (publicPaths.includes(currentPath)) {
                return Promise.reject(error);
            }

            /* 위 조건에서 재발급 시도를 한거라는 값을 추가함 */
            originalRequest._retry = true;

            if (!isTokenRefreshing) {
                isTokenRefreshing = true; /* 다른 요청이 못 들어오게 잠금 */

                try {
                    await axios.post('/api/v1/login/refresh', {}, {
                        withCredentials: true /* 이 옵션을 통해서 브라우저 쿠키에 저장된 값도 서버로 전달하여 나 재발급 요청하는거 맞아라는 설정 */
                    });

                    isTokenRefreshing = false; /* 여기서 잠금해제 */
                    onTokenRefreshed(); /* 막혀있던 요청들이 다시 들어옴 */

                    return apiClient(originalRequest);

                } catch (refreshError) {
                    isTokenRefreshing = false;
                    refreshSubscribers = [];

                    alert('보안을 위해 로그아웃 되었습니다. 다시 로그인해 주세요.');

                    window.dispatchEvent(new Event('auth_logout')); /* 로그아웃 이벤트 공표 */
                    window.location.href = '/';
                    return Promise.reject(refreshError); /* 요청한 쪽에도 에러 발생했음을 알림 */
                }
            }

            return new Promise((resolve) => { /* 실패한 요청들을 refreshSubscribers에 모아둠 */
                addRefreshSubscriber(() => {
                    resolve(apiClient(originalRequest)); /* 요청들을 resolve로 포장 */
                });
            });
        }

        return Promise.reject(error);
    }
);

export default apiClient;