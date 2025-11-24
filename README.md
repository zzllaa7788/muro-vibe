# 🐕 멍멍! 물어봐이브 (Mureo-Vibe)

> 🚀 **Live Demo**: [GitHub Repository](https://github.com/zzllaa7788/muro-vibe)

귀여운 강아지 AI가 여러분의 모든 질문에 답해드려요! 🐾  
일상의 사소한 고민부터 창의적인 아이디어까지, 무엇이든 물어보면 강아지 친구가 "~한다개!" 하며 재치있게 답해주는 인터랙티브 웹 앱

## ✨ 주요 기능

- **🐶 강아지 말투**: 모든 답변이 귀여운 강아지 말투("~한다개", "~이라개")로 변환!
- **💬 질문 입력**: 사용자가 자신의 고민이나 질문을 자유롭게 입력
- **🤖 AI 답변 생성**: Gemini API를 통한 창의적이고 재치있는 답변 생성
- **🎬 귀여운 애니메이션**: Lottie 강아지 걷기 애니메이션으로 로딩 표시
- **⚡ 실시간 응답**: 강아지가 생각하는 중... 💭
- **📋 복사 기능**: 생성된 답변을 클립보드에 복사
- **🔄 재생성**: 다른 답변을 원할 때 즉시 재생성 가능
- **🎨 모노톤 UI**: 깔끔한 흑백/회색 톤의 모던한 디자인
- **🎭 풍부한 모션**: 버튼, 입력창, 결과 등 모든 요소에 부드러운 애니메이션 적용

## 🛠️ 기술 스택

- **Frontend**: React 18 + Vite
- **Language**: JavaScript (ES6+)
- **AI API**: Google Gemini API
- **Architecture**: Feature-Sliced Design (FSD)
- **Styling**: CSS3 (Vanilla CSS) + 부드러운 애니메이션
- **Animation**: Lottie React (귀여운 강아지 애니메이션)
- **Markdown**: React Markdown + Syntax Highlighting
- **Code Formatter**: Prettier
- **SEO**: Meta Tags, Open Graph, Twitter Cards, Structured Data

## 📁 프로젝트 구조 (FSD)

```
src/
├── app/                    # 앱 전체 설정
├── pages/
│   └── main-page/         # 메인 페이지
├── widgets/
│   └── result-display/    # 결과 표시 위젯
├── features/
│   └── question-input/    # 질문 입력 기능
└── shared/
    ├── ui/                # 공통 UI 컴포넌트
    ├── api/               # Gemini API 연동
    ├── lib/               # 유틸리티 함수
    └── config/            # 환경 설정
```

## 🚀 시작하기

### 1. 환경 요구사항

- Node.js v24.11.1 이상
- npm 또는 yarn

### 2. 설치

```bash
# 의존성 설치
npm install
```

### 3. 환경 변수 설정 ⚠️

**로컬 개발을 위한 환경 변수 설정:**

1. `.env.example` 파일을 복사하여 `.env` 파일 생성:
   ```bash
   cp .env.example .env
   ```

2. `.env` 파일을 열고 Gemini API 키를 입력하세요:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

> 💡 **Gemini API 키 발급 방법**:
> 1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속
> 2. Google 계정으로 로그인
> 3. "Create API Key" 클릭
> 4. 생성된 키를 `.env` 파일에 입력

> 🔐 **보안 주의사항**:
> - `.env` 파일은 절대 Git에 커밋하지 마세요! (`.gitignore`에 포함됨)
> - API 키를 타인과 공유하지 마세요!
> - **배포 시에는 별도로 환경 변수를 설정해야 합니다!** (아래 배포 가이드 참조)

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요!

### 5. 빌드

```bash
npm run build
```

## 🚀 배포하기

### Netlify 배포 (권장)

**중요: 배포 시 환경 변수를 반드시 설정해야 합니다!**

자세한 배포 가이드는 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** 파일을 참고하세요.

**간단 요약:**
1. GitHub에 코드 푸시
2. Netlify에서 리포지토리 연결
3. ⚠️ **Netlify 환경 변수 설정** (필수!):
   - Site settings → Environment variables
   - `VITE_GEMINI_API_KEY` 추가
4. 재배포 (Clear cache and deploy site)

> 💡 환경 변수를 설정하지 않으면 "API key not valid" 에러가 발생합니다!

더 자세한 내용은 [배포 가이드](./DEPLOYMENT_GUIDE.md)를 확인하세요.

## 🎯 사용 방법

1. 텍스트 입력창에 궁금한 점을 입력하세요
   - 예: "오늘 간식으로 뭐 먹을까? 산책 갈 시간은 언제가 좋을까?"
2. **물어보기! 🦴** 버튼을 클릭하거나 `Ctrl + Enter`를 누르세요
3. 귀여운 강아지가 걸어다니며 생각하는 중... 🐶💭
4. 강아지가 "~한다개!" 말투로 답변해줘요!
5. **복사하기** 버튼으로 답변을 복사하거나, **다른 답변 보기 🐾**로 새로운 답변을 받을 수 있습니다

## 🎨 주요 기능 상세

### 질문 입력
- 텍스트 영역에 자유롭게 질문 작성
- 키보드 단축키 지원 (Ctrl/Cmd + Enter)
- 로딩 중 입력 비활성화
- 호버/포커스 시 부드러운 애니메이션 효과

### AI 답변 생성
- Google Gemini Pro 모델 사용
- 강아지 컨셉: 모든 답변을 귀여운 강아지 말투로 자동 변환!
  - "합니다" → "한다개!"
  - "예요" → "라개!"
  - "같아요" → "같다개!"
  - 30개 이상의 종결어미 패턴 지원
- 이모지를 활용한 감정 표현
- 친근하고 긍정적인 답변 스타일

### 결과 표시
- Lottie 강아지 걷기 애니메이션 (로딩 시)
- 타이핑 효과로 답변 표시
- 마크다운 렌더링 및 코드 하이라이팅
- 에러 처리 및 재시도 기능
- 답변 복사 및 재생성 기능
- 강아지 이모지 꼬리 흔들기 애니메이션 🐶

### 애니메이션 효과
- 타이틀 이모지 좌우 흔들기 (wiggle)
- 버튼 호버 시 확대 + 물결 효과
- 카드 호버 시 떠오르는 효과
- 입력창 포커스 시 그림자 효과
- 결과 표시 슬라이드 업 애니메이션
- 빈 상태 강아지 꼬리 흔들기 애니메이션

## 🧩 컴포넌트 구조

### Shared Layer
- **Button**: 재사용 가능한 버튼 컴포넌트 (물결 효과, 호버 애니메이션)
- **Loader**: Lottie 강아지 애니메이션 로더 🐕
- **TextArea**: 텍스트 입력 영역 (부드러운 트랜지션)

### Features Layer
- **QuestionInput**: 질문 입력 폼 (강아지 컨셉)

### Widgets Layer
- **ResultDisplay**: 결과 표시 위젯 (로딩, 에러, 성공 상태 관리, 타이핑 효과)

### Pages Layer
- **MainPage**: 모든 기능을 통합한 메인 페이지 (강아지 테마)

### API Layer
- **gemini.js**: Gemini API 연동 + 강아지 말투 변환 시스템

## 📱 반응형 디자인

- 데스크톱, 태블릿, 모바일 모두 지원
- 터치 친화적인 UI
- 다양한 화면 크기에 최적화

## 🔒 보안

- API 키는 환경 변수로 관리
- `.env` 파일은 `.gitignore`에 포함
- 배포 시 Netlify/Vercel 환경 변수 사용 권장

## 📝 코드 포맷팅

```bash
# 코드 포맷팅 (자동)
npm run format
```

Prettier 설정이 적용되어 일관된 코드 스타일 유지

## 🚀 배포

### Netlify 배포

1. Netlify에 프로젝트 연결
2. 환경 변수 설정: `VITE_GEMINI_API_KEY`
3. 빌드 명령: `npm run build`
4. 배포 디렉토리: `dist`

## 🤝 기여하기

이 프로젝트는 학습 및 개인 프로젝트 목적으로 제작되었습니다.
이슈나 개선 사항이 있다면 자유롭게 Issue를 등록해주세요!

## 📄 라이센스

MIT License

## 🐾 강아지 말투 변환 시스템

물어봐이브의 핵심 기능! 모든 AI 답변을 자동으로 귀여운 강아지 말투로 변환합니다.

### 변환 예시
- "좋은 선택입니다!" → "좋은 선택이다개!"
- "추천해요" → "추천한다개!"
- "맛있어요" → "맛있다개!"
- "어떨까요?" → "어떨까개?"

### 지원하는 종결어미
- ~합니다, ~입니다, ~됩니다
- ~해요, ~예요, ~아요, ~어요
- ~같아요, ~네요, ~거든요, ~죠
- ~까요?, ~나요?, ~가요? (의문형)
- 30개 이상의 패턴!

## 🎨 디자인 컨셉

- **모노톤 테마**: 깔끔한 흑백/회색 톤 (#2c3e50, #6c757d, #f5f5f5)
- **부드러운 모션**: cubic-bezier를 활용한 자연스러운 애니메이션
- **강아지 이모지**: 🐕, 🐶, 🐾, 🦴 등으로 귀여움 극대화
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원

## 🔍 SEO 최적화

- ✅ Meta Tags (title, description, keywords)
- ✅ Open Graph Tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD)
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ PWA Manifest
- ✅ 강아지 이모지 파비콘 🐕

## 💡 개발 팁

- API 키 관리에 주의하세요
- Gemini API의 무료 할당량을 고려하세요
- 프롬프트 엔지니어링으로 더 나은 답변을 얻을 수 있습니다
- 강아지 말투 변환이 마크다운 코드 블록은 건드리지 않습니다
- Lottie 애니메이션으로 사용자 경험 향상!

---

Made with 🐾 using React + Vite + Gemini AI + Lottie  
멍! 귀여운 강아지가 만든 프로젝트라개! 🐕✨
