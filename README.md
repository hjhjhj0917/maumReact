# MAUM (마음) - Frontend

사용자의 일기 텍스트를 기반으로 감정과 우울증 수치를 분석하고, RAG(검색 증강 생성) 기술을 활용해 개인화된 챗봇 상담을 제공하는 웹 서비스 "MAUM"의 프론트엔드 저장소입니다.

* **개발 기간**: 2026.03 ~ 2026.06
* **개발 인원**: 1인 (개인 프로젝트)

## Tech Stack

### Core & Build
- **Language & Library**: JavaScript, React (Single Page Application)
- **Build Tool**: Vite

### State & Network
- **Authentication**: Context API (AuthContext)
- **Asynchronous Communication**: Axios 기반 비동기 API 통신

### Styling
- **CSS-in-JS**: Styled-components 기반 컴포넌트 스타일링 및 반응형 디자인 구축

### Third-Party API
- **Map**: Kakao Map API

---

## Key Features (Frontend)

### 1. Context API 기반 유저 인증 시스템
- `AuthContext`와 `ProtectedRoute`/`PublicRoute`를 활용하여 JWT 기반 인증 상태를 전역으로 관리하고 비인증 유저의 접근을 제한하는 라우팅 시스템을 구현했습니다.
- 로그인, 회원가입, 아이디/비밀번호 찾기, 프로필 관리 폼을 Custom Hooks(`useLoginForm`, `useRegisterForm` 등)로 분리하여 비즈니스 로직의 재사용성을 높였습니다.

### 2. 일기 작성 및 시각화 데이터 피드백
- 사용자가 작성한 일기를 바탕으로 서버에서 분석된 감정 통계를 `EmotionGraph` 컴포넌트를 통해 직관적인 시각적 그래프로 제공합니다.
- 일기 목록 조회, 상세 보기, 생성 폼을 모듈화된 UI 구조로 깔끔하게 설계했습니다.

### 3. 실시간 AI 상담 챗봇 UI
- HyperCLOVA X와 RAG 연동 서버로부터 전달받는 AI 요약 데이터 및 답변을 유연하게 보여주는 실시간 스트리밍 대화형 인터페이스(`ChatBot`)를 구축했습니다.

### 4. 위치 기반 심리상담기관 지도 연동
- Kakao Map API를 커스텀 기능과 연동하여 사용자의 현재 위치 또는 특정 영역 주변의 전문 심리상담기관 정보를 지도 화면(`Map`)에 시각화합니다.

---

## Project Structure

```text
src/
 ├── api/             # authApi, chatApi, diaryApi, mapApi 등 백엔드 비동기 통신 로직
 ├── components/      # CustomModal, EmotionGraph, Header, Sidebar 등 공통/독립 UI 컴포넌트
 ├── context/         # 전역 인증 상태 및 로그인 유지를 위한 AuthContext
 ├── hooks/           # 도메인별(Account, ChatBot, Diary, Map) 비즈니스 로직을 분리한 Custom Hooks
 ├── pages/           # 서비스 주요 화면 구성 (Account, ChatBot, Diary, Map, NotFound)
 └── style/           # 전역 스타일(GlobalStyle) 및 컴포넌트별 고유 스타일(.styles.js)
