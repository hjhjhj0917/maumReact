# MAUM (마음) — Frontend

사용자의 일기 텍스트를 기반으로 감정과 우울증 수치를 분석하고, RAG(검색 증강 생성) 기술을 활용해 개인화된 챗봇 상담을 제공하는 웹 서비스 "MAUM"의 프론트엔드 저장소입니다.

MAUM은 3개 저장소로 구성됩니다.

| 저장소 | 역할 |
|---|---|
| [maumProject](https://github.com/hjhjhj0917/example) | Spring Boot 백엔드 — 인증, 일기/채팅 API |
| [maumPy](https://github.com/hjhjhj0917/maumPy) | FastAPI AI 서버 — 감정/우울증 분석, RAG 챗봇, STT/TTS, 음악 추천 |
| **maumReact (현재 저장소)** | React 프론트엔드 |

모든 API 요청은 `/api` 경로로 Spring 백엔드(`maumProject`)에 프록시됩니다.

* **개발 기간**: 2026.03 ~ 2026.10
* **개발 인원**: 1인 (개인 프로젝트)

---

## Tech Stack

### Core & Build
- **Language & Library**: JavaScript, React 19
- **Build Tool**: Vite

### State & Network
- **Authentication**: Context API (`AuthContext`) + JWT
- **Asynchronous Communication**: Axios 기반 비동기 API 통신, 401 응답 시 자동 토큰 재발급(interceptor)

### Styling
- **CSS-in-JS**: styled-components 기반 컴포넌트 스타일링 및 반응형 디자인

### Third-Party API
- **Map**: `react-kakao-maps-sdk` (Kakao Map)
- **Markdown**: `react-markdown` (챗봇 답변 렌더링)

---

## Key Features

### 1. Context API 기반 유저 인증 시스템
- `AuthContext`와 `ProtectedRoute`/`PublicRoute`로 JWT 기반 인증 상태를 전역 관리하고, 비인증 유저의 접근을 제한합니다.
- 로그인, 회원가입, 아이디/비밀번호 찾기, 프로필 관리 폼을 Custom Hook(`useLoginForm`, `useRegisterForm` 등)으로 분리해 로직 재사용성을 높였습니다.

### 2. 일기 작성 · 이미지 · 음악 추천
- 일기 작성/수정/삭제, 월별·검색·감정 필터·즐겨찾기 조회 등 CRUD 전반을 지원합니다.
- 작성 중에는 AI 분석 없이 **임시저장** 버튼으로 내용만 저장하고, "작성 완료" 시점에만 AI 분석이 실행됩니다.
- 일기당 최대 3장까지 이미지를 첨부(`DiaryImageUploader`)할 수 있고, 썸네일 클릭 시 라이트박스로 확대/슬라이드 볼 수 있습니다.
- 감정 분석 결과 기반으로 추천된 곡을 `DiaryMusicList`에서 Spotify 임베드 플레이어로 미리듣기하거나 바로 이동해 들을 수 있습니다.
- 서버가 분석한 감정 통계를 `EmotionGraph` 컴포넌트로 시각화합니다.

### 3. 실시간 AI 상담 챗봇 UI
- Gemini 기반 RAG 서버로부터 전달받는 답변을 실시간 스트리밍으로 보여주는 대화형 인터페이스(`ChatBot`)를 구축했습니다.
- 마이크 버튼으로 음성 녹음 → STT 변환 결과가 입력창에 채워지고(`useSpeechToText`, `VoiceWave`), 녹음 중에는 실시간 파형이 표시됩니다.
- 챗봇 답변은 자동재생 대신 스피커 버튼으로 원할 때만 TTS 음성으로 들을 수 있고, 마이크 사용 시 재생 중인 음성은 즉시 정지(바지-인)됩니다.

### 4. 위치 기반 심리상담기관 지도 연동
- Kakao Map API와 연동해 사용자 주변의 심리상담기관 정보를 지도(`Map`)에 시각화합니다.

---

## Project Structure

```text
src/
 ├── api/              # apiClient(axios 인스턴스+인터셉터), authApi, chatApi, diaryApi, mapApi
 ├── components/       # CustomModal, EmotionGraph, Header, Sidebar 등 공통 UI
 │    ├── chatbot/     # VoiceWave(음성 파형) 등 챗봇 전용 컴포넌트
 │    └── diary/       # DiaryImageUploader, DiaryMusicList 등 일기 전용 컴포넌트
 ├── context/          # 전역 인증 상태(AuthContext)
 ├── hooks/            # 도메인별(Account, ChatBot, Diary, Map) 비즈니스 로직 Custom Hooks
 ├── pages/            # 서비스 주요 화면 (Account, ChatBot, Diary, Map, NotFound)
 ├── routes/           # 도메인별 라우트 그룹 (AccountRoutes 등)
 ├── style/            # 전역 스타일(GlobalStyle) 및 페이지/컴포넌트별 styled-components
 └── utils/            # 공용 유틸리티
```

---

## Getting Started

### 요구 사항
- Node.js 20+
- 함께 실행되는 [maumProject](https://github.com/hjhjhj0917/example) 백엔드 (`localhost:8080` 기준)

### 설치 및 실행
```bash
npm install
npm run dev
```
개발 서버는 `vite.config.js`의 프록시 설정에 따라 `/api` 요청을 `http://localhost:8080`(Spring 백엔드)으로 전달하므로, 백엔드가 먼저 떠 있어야 정상 동작합니다.

### 빌드
```bash
npm run build
```
