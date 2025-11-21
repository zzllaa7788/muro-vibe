/**
 * 환경 변수 설정
 */

export const ENV = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  GEMINI_API_URL:
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent',
};

/**
 * 환경 변수 유효성 검사
 */
export const validateEnv = () => {
  if (!ENV.GEMINI_API_KEY) {
    throw new Error(
      '❌ VITE_GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.',
    );
  }
  return true;
};
