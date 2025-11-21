/**
 * 클립보드 관련 유틸리티
 */

/**
 * 텍스트를 클립보드에 복사합니다
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<boolean>} 복사 성공 여부
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
};
