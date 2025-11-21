/**
 * 메인 페이지 - 모든 기능을 통합
 */

import { useState } from 'react';
import { QuestionInput } from '@features/question-input';
import { ResultDisplay } from '@widgets/result-display';
import { Button, ThreeBackground } from '@ui';
import { generateAnswer } from '@api/gemini';
import './MainPage.css';

export const MainPage = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError('멍! 질문을 입력해주세요! 🐶');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const answer = await generateAnswer(prompt);
      setResult(answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (prompt.trim()) {
      handleSubmit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const handleReset = () => {
    setPrompt('');
    setResult('');
    setError(null);
  };

  return (
    <div className="main-page">
      <ThreeBackground />
      <div className="main-page__container">
        {/* 헤더 */}
        <header className="main-page__header">
          <h1 className="main-page__title">
            <span className="main-page__title-emoji">🐕</span>
            멍멍! 물어봐이브
          </h1>
          <p className="main-page__subtitle">
            귀여운 강아지가 여러분의 질문에 답해드려요! 무엇이든 물어보세요 🐾
          </p>
        </header>

        {/* 질문 입력 영역 */}
        <section className="main-page__input-section">
          <div onKeyDown={handleKeyPress}>
            <QuestionInput
              value={prompt}
              onChange={setPrompt}
              disabled={isLoading}
            />
          </div>
          <div className="main-page__button-group">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              variant="primary"
            >
              {isLoading ? '생각중이개... 🐶' : '물어보개! 🦴'}
            </Button>
            <Button
              onClick={handleReset}
              disabled={isLoading}
              variant="outline"
            >
              새로운 질문 🐾
            </Button>
          </div>
        </section>

        {/* 결과 표시 영역 */}
        <section className="main-page__result-section">
          <ResultDisplay
            result={result}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </section>

        {/* 푸터 */}
        <footer className="main-page__footer">
          <p className="main-page__footer-text">
            🐾 팁: Ctrl + Enter로 빠르게 질문하세요!
          </p>
          <p className="main-page__footer-credit">
            귀여운 강아지 친구와 함께 • Powered by Google Gemini AI
          </p>
        </footer>
      </div>
    </div>
  );
};
