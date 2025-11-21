/**
 * Gemini API 연동
 */

import { ENV } from '@config/env';

/**
 * 텍스트를 안전하게 정리하는 함수
 */
const cleanText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/undefined/gi, '')
    .replace(/null/gi, '')
    .replace(/\[object Object\]/gi, '')
    .trim();
};

/**
 * 답변을 강아지 말투로 변환하는 함수
 */
const convertToDogSpeak = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  // 문장을 줄바꿈으로 분리
  const lines = text.split('\n');
  
  const convertedLines = lines.map(line => {
    // 마크다운 코드 블록이나 특수 구문은 건드리지 않음
    if (line.startsWith('```') || line.startsWith('#') || line.startsWith('-') || 
        line.startsWith('*') || line.startsWith('>') || line.trim() === '') {
      return line;
    }
    
    // 문장 끝 변환 (마침표나 느낌표로 끝나는 경우)
    let converted = line;
    
    // 일반적인 종결어미 변환 (긴 패턴부터 먼저 처리)
    converted = converted
      // ~합니다 계열
      .replace(/합니다\.?$/g, '한다개!')
      .replace(/습니다\.?$/g, '는다개!')
      .replace(/ㅂ니다\.?$/g, '는다개!')
      
      // ~입니다 계열
      .replace(/입니다\.?$/g, '이다개!')
      
      // 있다/없다
      .replace(/있습니다\.?$/g, '있다개!')
      .replace(/없습니다\.?$/g, '없다개!')
      .replace(/있어요\.?$/g, '있다개!')
      .replace(/없어요\.?$/g, '없다개!')
      
      // ~됩니다
      .replace(/됩니다\.?$/g, '된다개!')
      .replace(/돼요\.?$/g, '된다개!')
      
      // ~해요/~해
      .replace(/해주세요\.?$/g, '해달라개!')
      .replace(/해요\.?$/g, '한다개!')
      .replace(/해\.?$/g, '한다개!')
      
      // ~세요
      .replace(/하세요\.?$/g, '하라개!')
      .replace(/세요\.?$/g, '달라개!')
      
      // ~이에요/예요
      .replace(/이에요\.?$/g, '이라개!')
      .replace(/예요\.?$/g, '라개!')
      
      // ~같아요
      .replace(/같아요\.?$/g, '같다개!')
      .replace(/같네요\.?$/g, '같네개!')
      
      // ~거예요/거에요
      .replace(/거예요\.?$/g, '거라개!')
      .replace(/거에요\.?$/g, '거라개!')
      
      // ~어요/아요
      .replace(/([가-힣])어요\.?$/g, '$1다개!')
      .replace(/([가-힣])아요\.?$/g, '$1다개!')
      
      // ~네요/나요
      .replace(/네요\.?$/g, '네개!')
      .replace(/나요\.?$/g, '나개!')
      
      // ~거든요
      .replace(/거든요\.?$/g, '거든개!')
      
      // ~죠
      .replace(/시죠\.?$/g, '시죠개!')
      .replace(/죠\.?$/g, '죠개!')
      
      // ~요
      .replace(/요\.$/g, '다개!')
      
      // 의문형
      .replace(/까요\?$/g, '까개?')
      .replace(/나요\?$/g, '나개?')
      .replace(/가요\?$/g, '가개?');
    
    return converted;
  });
  
  return convertedLines.join('\n');
};

/**
 * Gemini API를 호출하여 AI 답변을 생성합니다
 * @param {string} prompt - 사용자 질문
 * @returns {Promise<string>} AI 생성 답변
 */
export const generateAnswer = async (prompt) => {
  if (!prompt || prompt.trim() === '') {
    throw new Error('멍! 질문을 입력해달라개! 🐶');
  }

  try {
    const response = await fetch(
      `${ENV.GEMINI_API_URL}?key=${ENV.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `당신은 귀여운 강아지 친구입니다! 🐕 사용자의 질문에 대해 친근하고 유쾌하게 답변해주세요. 강아지답게 밝고 긍정적인 에너지로 답변하되, 전문적인 정보도 제공해주세요. 이모지를 적절히 활용하여 감정을 표현하고, 친근한 말투를 사용해주세요.\n\n질문: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
     
      throw new Error(
        errorData.error?.message || '멍! 답변 생성 중 오류가 발생했다개! 😢',
      );
    }

    const data = await response.json();

    // Gemini API 응답 구조에서 텍스트 추출
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      '답변을 생성할 수 없다개! 다시 시도해달라개! 🐶';

    // 문자열로 변환하고 정리한 후 강아지 말투로 변환
    const cleanedText = cleanText(String(generatedText));
    return convertToDogSpeak(cleanedText);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(
      error.message || '멍! 네트워크 오류가 발생했다개! 다시 시도해달라개! 🔄',
    );
  }
};
