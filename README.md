# MAUM (마음) — Frontend

일기 텍스트 기반 감정·우울증 분석과 RAG 챗봇 상담을 제공하는 웹 서비스 **MAUM**의 React 프론트엔드입니다. 인증 상태 관리, API 통신, 음성(STT/TTS) 처리 같은 공통 로직은 Custom Hook과 axios 인터셉터로 분리하고, 화면(페이지) 컴포넌트는 그 결과만 받아 그리는 구조를 기본 원칙으로 합니다.

- **버전**: `0.0.0` (package.json 기준, 비공개 프로젝트)
- **대상 환경**: Spring Boot 백엔드(`maumProject`) + FastAPI AI 서버(`maumPy`)와 함께 동작하는 웹 클라이언트
- **실행 환경**: Node.js 20+, Vite 개발 서버

MAUM은 3개 저장소로 구성됩니다.

| 저장소 | 역할 |
|---|---|
| [maumProject](https://github.com/hjhjhj0917/example) | Spring Boot 백엔드 — 인증, 일기/채팅 API |
| [maumPy](https://github.com/hjhjhj0917/maumPy) | FastAPI AI 서버 — 감정/우울증 분석, RAG 챗봇(Gemini), STT/TTS, 음악 추천 |
| **maumReact (현재 저장소)** | React 프론트엔드 |

모든 API 요청은 `/api` 경로로 Spring 백엔드에 프록시되며, AI 기능(챗봇, 분석 등)은 Spring을 거쳐 FastAPI 서버로 전달됩니다.

---

## 목차

- [주요 기능](#주요-기능)
- [핵심 설계](#핵심-설계)
- [시작하기](#시작하기)
- [백엔드 연동 준비 사항](#백엔드-연동-준비-사항)
- [프로젝트 구조](#프로젝트-구조)
- [기술 스택](#기술-스택)
- [버전 기록](#버전-기록-주요-변경-이력)

---

## 주요 기능

### 랜딩 / 인증 (`Index`, `pages/Account`)
- 랜딩 페이지(`Index`)에서 로그인/회원가입 모달(`LoginSlider`)을 슬라이드 전환으로 띄웁니다.
- 로그인, 회원가입, 아이디/비밀번호 찾기 폼을 각각 `useLoginForm`, `useRegisterForm`, `useFindIdForm`, `useFindPwForm` 훅으로 분리해 유효성 검사·제출 로직을 재사용합니다.
- `AuthContext` + `ProtectedRoute`/`PublicRoute`로 로그인 여부에 따라 접근 가능한 라우트를 전역적으로 제한합니다.
- `/account/profile`에서 회원정보 수정 및 프로필 모달을 제공합니다.

### 일기 작성 / 목록 / 상세 (`pages/Diary`)
- 작성(`DiaryWrite`): 작성 중에는 AI 분석 없이 **임시저장**으로 내용만 저장하고, "작성 완료" 시점에만 서버의 AI 분석(감정/우울지수/음악 추천)이 실행됩니다. 일기당 최대 3장까지 이미지를 첨부(`DiaryImageUploader`)할 수 있습니다.
- 목록(`DiaryList`): 월별 조회, 검색, 감정 필터, 즐겨찾기 필터로 일기를 조회합니다.
- 상세(`DiaryDetail`): 분석된 감정 통계를 `EmotionGraph`(recharts 레이더 차트)로 시각화하고, 첨부 이미지를 썸네일 클릭 시 라이트박스로 확대/슬라이드하며, 추천곡은 `DiaryMusicList`에서 Spotify 임베드로 미리듣기(재생 버튼을 눌렀을 때만 로드)합니다. 즐겨찾기 등록/해제도 이 화면에서 처리합니다.

### 실시간 AI 상담 챗봇 (`pages/ChatBot`)
- Gemini 기반 RAG 서버의 답변을 SSE(Server-Sent Events) 스트림으로 받아 실시간으로 그려주는 대화형 UI입니다.
- 채팅방 목록 사이드바에서 방 생성/고정/이름변경/삭제가 가능하고, `?room=` 쿼리로 특정 방에 바로 진입할 수 있습니다.
- 마이크 버튼으로 음성 녹음 → STT 변환 결과가 입력창에 채워지고(`useSpeechToText`), 녹음 중에는 실시간 파형(`VoiceWave`)이 표시됩니다.
- 답변은 자동재생되지 않고 스피커 버튼을 눌렀을 때만 TTS 음성으로 재생되며, 과거 대화 내역을 다시 열었을 때도 음성을 재생할 수 있습니다(저장된 오디오가 없으면 텍스트로 TTS를 재합성). 마이크 사용 시 재생 중인 음성은 즉시 정지(바지-인)됩니다.
- 답변에 정책/상담기관 추천이 포함되면 별도의 카드 UI로 함께 표시됩니다.

### 마이페이지 통계 & 주간 리포트 (`useMyPageStats`, `components/*`)
- 총 작성 수, 연속 작성일(최장 기록 포함), 최근 6개월 월별 우울 지수 추이(`DepressionTrendChart`), 가장 많이 추천된 음악 Top 5(`TopMusicList`), 즐겨찾기 일기 미리보기(`FavoriteDiaryPreview`)를 위젯(`DiaryStatsCard` 등)으로 보여줍니다.
- 최근 일주일 일기를 바탕으로 AI가 생성한 격려 코멘트를 `WeeklyReportCard`로 제공합니다.
- 헤더 프로필 드롭다운에서 연속 작성일 배지를 확인하고 "오늘 일기 쓰기"로 바로 이동할 수 있습니다.

### 위치 기반 심리상담기관 지도 (`pages/Map`)
- Kakao Map API(`react-kakao-maps-sdk`)와 연동해 사용자 주변의 심리상담기관 정보를 지도에 표시합니다.

---

## 핵심 설계

- **axios 인터셉터 기반 공통 처리** (`api/apiClient.js`): 응답이 백엔드의 `CommonResponse` 포맷(`httpStatus`/`data`)이면 `data`만 꺼내 반환해 호출부가 매번 언래핑할 필요가 없게 합니다. 401 응답은 재발급 요청(`/login/refresh`)을 큐 기반으로 한 번만 시도(`isTokenRefreshing`/`refreshSubscribers`)하고, 대기 중 들어온 요청은 재발급 완료 후 한꺼번에 재실행합니다. 비즈니스 예외(400/409 등)의 서버 안내 문구는 `error.message`로 일관되게 꺼내 쓸 수 있도록 응답 바디를 정규화합니다.
- **SSE 스트리밍 + 멀티 채널 파싱** (`api/chatApi.js`): `fetch` + `ReadableStream`으로 `text/event-stream` 응답을 직접 읽어 줄 단위로 버퍼링합니다. 서버가 하나의 스트림 안에 텍스트/오디오(base64)/추천 카드(JSON)/완료 마커를 전용 접두어(`[[AUDIO]]`, `[[CARD]]`, `[[TEXT_DONE]]`)로 감싸 보내므로, `dispatchLine`에서 마커를 구분해 각각 다른 콜백(`onChunk`/`onAudio`/`onCards`/`onTextDone`)으로 전달합니다.
- **TTS 오디오 큐 재생** (`hooks/chatbot/useChatBot.js`): 스트림으로 들어오는 문장 단위 오디오 조각을 바로 재생하지 않고 메시지별로 쌓아두었다가, 사용자가 스피커 버튼을 누르면 큐(`audioQueueRef`)에서 순서대로 재생합니다. 마이크 입력이나 정지 버튼으로 즉시 바지-인(중단)할 수 있도록 현재 재생 중인 오디오를 별도 ref로 추적합니다.
- **도메인별 Custom Hook 분리**: 화면(Account/ChatBot/Diary/Map)별로 상태와 비즈니스 로직을 훅으로 분리하고, 페이지 컴포넌트는 훅이 반환하는 값을 받아 렌더링만 담당합니다.
- **스타일 분리**: 컴포넌트 JSX와 `styled-components` 정의를 `style/pages`, `style/components` 디렉토리로 분리해 로직과 스타일을 섞지 않습니다.
- **라우트 보호**: `ProtectedRoute`/`PublicRoute`로 인증 여부에 따른 접근 제어를 라우트 레벨에서 선언적으로 처리합니다.

---

## 시작하기

### 요구 사항
- Node.js 20+
- 함께 실행되는 [maumProject](https://github.com/hjhjhj0917/example) 백엔드 (`localhost:8080` 기준)

### 설치 및 실행
```bash
npm install
npm run dev
```
개발 서버는 `vite.config.js`의 프록시 설정에 따라 `/api` 요청을 `http://localhost:8080`(Spring 백엔드)으로 전달하므로, 백엔드가 먼저 떠 있어야 정상 동작합니다.

### 빌드 / 기타
```bash
npm run build     # 프로덕션 빌드
npm run preview    # 빌드 결과 미리보기
npm run lint       # ESLint 검사
```

---

## 백엔드 연동 준비 사항

이 프론트엔드는 단독으로 동작하지 않으며, 다음 두 서버가 함께 실행되어야 합니다.

- **Spring Boot API 서버** (`maumProject`): 인증(로그인/회원가입/토큰 재발급), 일기·채팅 CRUD 등 모든 `/api` 요청을 처리합니다. JWT 기반 인증이며, 로그인 성공 시 발급되는 토큰(쿠키)이 이후 요청에 필요합니다.
- **Python AI 서버** (`maumPy`): Spring을 거쳐 감정/우울증 분석, RAG 챗봇 응답, STT/TTS, 음악 추천 등을 처리합니다.

각 서버의 실행 방법과 필요한 환경 변수/키는 해당 저장소의 문서를 참고하세요(이 저장소에는 별도의 민감 설정이 없습니다).

---

## 프로젝트 구조

```text
src/
 ├── api/                  # apiClient(axios 인스턴스+인터셉터), authApi, chatApi, diaryApi, mapApi
 ├── assets/               # 이미지 등 정적 리소스
 ├── components/           # 공통 UI 컴포넌트
 │    ├── chatbot/         # VoiceWave(음성 파형) 등 챗봇 전용 컴포넌트
 │    ├── diary/           # DiaryImageUploader, DiaryMusicList 등 일기 전용 컴포넌트
 │    ├── CustomModal.jsx, EmotionGraph.jsx, Header.jsx, HeaderLayout.jsx,
 │    ├── InputField.jsx, Layout.jsx, LoginSlider.jsx,
 │    ├── ProtectedRoute.jsx, PublicRoute.jsx, Sidebar.jsx
 │    └── DiaryStatsCard.jsx, DepressionTrendChart.jsx, TopMusicList.jsx,
 │         FavoriteDiaryPreview.jsx, WeeklyReportCard.jsx   # 마이페이지 통계 위젯
 ├── context/              # 전역 인증 상태(AuthContext)
 ├── hooks/                # 도메인별 비즈니스 로직 Custom Hooks
 │    ├── account/         # useLoginForm, useRegisterForm, useFindIdForm, useFindPwForm, useProfileForm
 │    ├── chatbot/         # useChatBot, useSpeechToText
 │    ├── diary/           # useDiaryList, useDiaryDetail, useDiaryWriteForm, useMyPageStats
 │    ├── map/             # useMap
 │    ├── useHeader.js, useSidebar.js, useIndex.js
 ├── pages/                # 서비스 주요 화면
 │    ├── Account/         # Login, Register, FindId, FindPw, Profile
 │    ├── ChatBot/         # ChatBot
 │    ├── Diary/           # DiaryWrite, DiaryList, DiaryDetail
 │    ├── Map/              # Map
 │    ├── Index.jsx
 │    └── NotFound.jsx
 ├── routes/               # 도메인별 라우트 그룹 (AccountRoutes)
 ├── style/                # 전역 스타일 및 페이지/컴포넌트별 styled-components
 │    ├── components/
 │    └── pages/
 ├── App.jsx
 └── main.jsx
```

---

## 기술 스택

| 구분 | 내용 |
|---|---|
| Core & Build | React 19, Vite 8, JavaScript |
| Routing | React Router 7 |
| State | Context API (`AuthContext`) + JWT |
| Network | Axios 1.x — 인터셉터로 응답 언래핑/401 자동 토큰 재발급 처리, 챗봇 스트리밍은 `fetch` + `ReadableStream`(SSE) |
| Styling | styled-components 6 |
| Map | react-kakao-maps-sdk (Kakao Map) |
| Markdown | react-markdown (챗봇 답변 렌더링) |
| Data Viz | recharts (마이페이지 감정/우울지수 통계 차트) |
| Lint | ESLint 9 (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |

---

## 버전 기록 (주요 변경 이력)

- **인증/라우팅 기반 구축**: Context API 기반 로그인 상태 관리, `ProtectedRoute`/`PublicRoute` 접근 제어, 로그인/회원가입/아이디·비밀번호 찾기 폼 분리
- **일기 CRUD 및 즐겨찾기**: 작성/수정/삭제, 월별·검색·감정 필터 조회, 일기 목록/상세 즐겨찾기 기능 및 필터 추가
- **일기 이미지 업로드/뷰어**: 이미지 업로드 UI 및 확대/슬라이드 라이트박스 뷰어 추가
- **감정 기반 음악 추천**: 일기 상세에 추천 음악 플레이리스트(Spotify 임베드) UI 추가
- **챗봇 고도화**: 채팅방 사이드바(고정/이름변경/삭제), 음성 입력(STT) 및 TTS 수동 재생, 정책/기관 추천 카드 UI, 과거 대화 내역의 TTS 음성 재생 기능 순차 추가
- **마이페이지 통계 위젯**: 작성 통계, 연속 작성일, 우울 지수 추이(레이더 차트 전환), 인기 음악 Top 5, 주간 리포트 카드, 헤더 빠른 실행 메뉴 추가
- **Gemini 전환**: HyperCLOVA X 기반 문구/로직을 Gemini 기반으로 전환 완료
- **안정화**: CommonResponse 언래핑 로직 정리, 백엔드 상태 코드 정상화에 따른 에러 메시지 추출 로직 보정, 라우트 직접 진입 시 발생하던 모달 크래시 수정 등
