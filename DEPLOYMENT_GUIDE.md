# 🚀 배포 가이드 (Netlify)

## 📋 목차
1. [환경 변수 설정](#환경-변수-설정)
2. [Netlify 배포 방법](#netlify-배포-방법)
3. [문제 해결](#문제-해결)

---

## 🔐 환경 변수 설정

### 로컬 개발 환경

1. `.env.example` 파일을 복사하여 `.env` 파일 생성:
   ```bash
   cp .env.example .env
   ```

2. `.env` 파일을 열고 실제 API 키 입력:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Gemini API 키 발급:
   - [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
   - Google 계정으로 로그인
   - "Create API Key" 클릭
   - 생성된 키를 `.env` 파일에 입력

---

## 🌐 Netlify 배포 방법

### 1️⃣ GitHub에 코드 푸시

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 2️⃣ Netlify 사이트 연결

1. [Netlify Dashboard](https://app.netlify.com/) 접속
2. "Add new site" → "Import an existing project" 클릭
3. GitHub 선택 후 리포지토리 연결
4. Build settings 확인:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. "Deploy site" 클릭

### 3️⃣ ⚠️ 환경 변수 설정 (필수!)

**이 단계를 건너뛰면 API 에러가 발생합니다!**

1. Netlify Dashboard에서 배포한 사이트 선택
2. **Site settings** 클릭
3. 왼쪽 메뉴에서 **Environment variables** 클릭
4. **Add a variable** 버튼 클릭
5. 환경 변수 입력:
   ```
   Key:   VITE_GEMINI_API_KEY
   Value: [여기에_실제_Gemini_API_키_입력]
   ```
6. Scopes 선택:
   - ✅ **Production** (필수)
   - ✅ Deploy previews (선택사항)
   - ✅ Branch deploys (선택사항)
7. **Add variable** 클릭

### 4️⃣ 재배포 (필수!)

환경 변수를 추가한 후 **반드시 재배포**해야 적용됩니다:

1. 상단 메뉴에서 **Deploys** 클릭
2. **Trigger deploy** 버튼 클릭
3. **Clear cache and deploy site** 선택
4. 배포 완료 대기 (약 2-3분)

### 5️⃣ 테스트

배포된 사이트에 접속하여 질문을 입력해보세요!

---

## 🔧 문제 해결

### ❌ API key not valid 에러

**원인**: Netlify 환경 변수가 설정되지 않았거나 잘못됨

**해결 방법**:
1. Netlify Dashboard → Site settings → Environment variables 확인
2. 변수 이름이 정확한지 확인: `VITE_GEMINI_API_KEY`
3. API 키에 공백이나 줄바꿈이 없는지 확인
4. 환경 변수 수정 후 **반드시 재배포** (Clear cache and deploy site)

### ❌ 404 Not Found 에러 (페이지 새로고침 시)

**원인**: 클라이언트 사이드 라우팅 설정 누락

**해결 방법**: 이미 `netlify.toml`과 `_redirects` 파일이 설정되어 있으므로 문제없어야 합니다.

### ❌ 빌드 실패

**원인**: 의존성 설치 실패 또는 빌드 오류

**해결 방법**:
1. 로컬에서 빌드 테스트: `npm run build`
2. `package.json`의 dependencies 확인
3. Node.js 버전 확인 (Netlify는 Node 18+ 권장)

---

## 📝 보안 체크리스트

- ✅ `.env` 파일이 `.gitignore`에 포함되어 있음
- ✅ `.env` 파일이 Git에 커밋되지 않음
- ✅ Netlify 환경 변수가 설정됨
- ✅ API 키가 공개 저장소에 노출되지 않음
- ⚠️ API 키를 타인과 공유하지 마세요!

---

## 🔗 유용한 링크

- [Netlify 환경 변수 문서](https://docs.netlify.com/environment-variables/overview/)
- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Vite 환경 변수 문서](https://vitejs.dev/guide/env-and-mode.html)

---

## 🐶 도움이 필요하신가요?

문제가 해결되지 않으면 다음을 확인해주세요:
1. 환경 변수 이름 대소문자 확인
2. API 키 유효성 확인
3. Netlify 배포 로그 확인
4. 브라우저 콘솔 에러 메시지 확인

멍멍! 배포 성공을 기원한다개! 🐾✨

