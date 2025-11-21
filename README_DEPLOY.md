# 🚀 Netlify 배포 가이드 - 멍멍! 물어봐이브

## 📋 배포 준비 완료 항목

### ✅ 설정 파일
- ✅ `netlify.toml` - Netlify 빌드 및 리다이렉트 설정
- ✅ `public/_redirects` - SPA 라우팅을 위한 리다이렉트 규칙
- ✅ `public/404.html` - 정적 404 페이지
- ✅ `.gitignore` - `.netlify` 폴더 추가

### ✅ 404 페이지
- ✅ `NotFoundPage` 컴포넌트 생성 (React)
- ✅ React Router 라우팅 설정
- ✅ 강아지 테마 디자인 적용
- ✅ 홈으로 자동 리다이렉트 기능

### ✅ SEO 설정
- ✅ `public/robots.txt`
- ✅ `public/sitemap.xml`
- ✅ `public/manifest.json`
- ✅ `index.html` - 메타 태그, Open Graph, JSON-LD

---

## 🎯 Netlify 배포 방법

### 방법 1: Netlify CLI를 이용한 배포 (권장)

#### 1. Netlify CLI 설치
```bash
npm install -g netlify-cli
```

#### 2. Netlify 로그인
```bash
netlify login
```

#### 3. 프로젝트 초기화
```bash
netlify init
```

다음 질문에 답하세요:
- **Create & configure a new site**: 새 사이트 생성 선택
- **Team**: 본인의 팀 선택
- **Site name**: `muro-vibe` (또는 원하는 이름)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

#### 4. 환경 변수 설정
```bash
# Gemini API Key 설정
netlify env:set VITE_GEMINI_API_KEY "여기에_API_키_입력"
```

또는 Netlify 대시보드에서:
- Site settings → Environment variables → Add a variable
- Key: `VITE_GEMINI_API_KEY`
- Value: 여러분의 Gemini API 키

#### 5. 배포
```bash
# 빌드 및 배포
netlify deploy --prod

# 또는 자동 배포 설정
git push origin main  # Git 연동 시 자동 배포
```

---

### 방법 2: Netlify 웹 UI를 이용한 배포

#### 1. GitHub에 코드 푸시
```bash
git add .
git commit -m "🚀 Netlify 배포 준비 완료"
git push origin main
```

#### 2. Netlify 대시보드
1. [Netlify](https://app.netlify.com/) 로그인
2. **"Add new site"** → **"Import an existing project"** 클릭
3. **GitHub** 선택 및 저장소 연결
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (비워두기)

#### 3. 환경 변수 설정
- **Site settings** → **Environment variables** → **Add a variable**
- Key: `VITE_GEMINI_API_KEY`
- Value: 여러분의 Gemini API 키

#### 4. 배포
- **Deploy site** 클릭
- 배포 완료까지 2-3분 소요

---

## 🔧 배포 후 확인 사항

### ✅ 체크리스트
- [ ] 홈페이지가 정상적으로 로드되는가?
- [ ] 강아지 애니메이션이 작동하는가?
- [ ] Gemini API 연동이 정상 작동하는가?
- [ ] 질문 입력 및 답변 생성이 정상적인가?
- [ ] 404 페이지가 정상적으로 표시되는가? (예: `/test-404`)
- [ ] 모바일에서도 정상적으로 작동하는가?
- [ ] Three.js 배경 애니메이션이 표시되는가?

### 🐛 문제 해결

#### 1. API 키 오류
```
Error: VITE_GEMINI_API_KEY is not defined
```
**해결**: Netlify 환경 변수에 API 키가 제대로 설정되었는지 확인

#### 2. 404 페이지가 표시되지 않음
**해결**: `public/_redirects` 파일이 `dist` 폴더에 복사되었는지 확인

#### 3. 빌드 실패
**해결**: 
```bash
# 로컬에서 빌드 테스트
npm run build
npm run preview
```

#### 4. Three.js 애니메이션이 표시되지 않음
**해결**: 
- `/paw-print.png` 파일이 `public` 폴더에 있는지 확인
- 또는 Three.js 설정에서 텍스처 경로 수정

---

## 🌐 커스텀 도메인 설정 (선택사항)

### 1. 도메인 추가
- **Site settings** → **Domain management** → **Add custom domain**
- 도메인 입력 (예: `muro-vibe.com`)

### 2. DNS 설정
- 도메인 등록 업체에서 DNS 설정:
  - **Type**: `CNAME` 또는 `A`
  - **Name**: `@` 또는 `www`
  - **Value**: Netlify에서 제공하는 주소

### 3. HTTPS 활성화
- Netlify가 자동으로 Let's Encrypt SSL 인증서 발급
- 약 1-2분 소요

---

## 📊 성능 최적화

### 이미 적용된 최적화
- ✅ Vite 번들링 최적화
- ✅ 정적 자산 캐싱 (1년)
- ✅ Gzip/Brotli 압축
- ✅ Tree-shaking
- ✅ Code splitting
- ✅ 이미지 최적화

### 추가 최적화 가능 사항
- [ ] PWA 아이콘 생성 (`dog-icon-192.png`, `dog-icon-512.png`)
- [ ] Service Worker 추가
- [ ] Lighthouse 점수 개선
- [ ] Analytics 연동 (Google Analytics, Netlify Analytics)

---

## 📱 모니터링

### Netlify Analytics (유료)
- 방문자 통계
- 페이지 뷰
- 트래픽 분석

### Google Search Console (무료)
1. [Search Console](https://search.google.com/search-console) 접속
2. 사이트 추가 및 소유권 인증
3. `sitemap.xml` 제출: `https://your-domain.com/sitemap.xml`

---

## 🎉 완료!

배포가 완료되면:
- **메인 URL**: `https://muro-vibe.netlify.app` (또는 커스텀 도메인)
- **404 테스트**: `https://muro-vibe.netlify.app/test-404`

멍멍! 배포 완료다개! 🐶🎉

---

## 📞 지원

문제가 발생하면:
- [Netlify 문서](https://docs.netlify.com/)
- [Netlify 커뮤니티](https://answers.netlify.com/)
- [GitHub Issues](https://github.com/your-repo/issues)

---

**Made with 🐾 by 물어봐이브**

