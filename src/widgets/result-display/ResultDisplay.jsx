/**
 * 결과 표시 위젯
 */

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button, Loader } from '@ui';
import { copyToClipboard } from '@lib/clipboard';
import './ResultDisplay.css';

// 텍스트를 안전하게 정리하는 함수
const cleanText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/undefined/gi, '')
    .replace(/null/gi, '')
    .replace(/\[object Object\]/gi, '')
    .trim();
};

export const ResultDisplay = ({ result, isLoading, error, onRetry }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef(null);

  // 타이핑 효과
  useEffect(() => {
    if (!result || typeof result !== 'string') {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    // 문자열 정리
    const safeResult = cleanText(result);
    
    if (!safeResult) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    // 새로운 답변이 들어오면 타이핑 시작
    setIsTyping(true);
    setDisplayedText('');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < safeResult.length) {
        setDisplayedText((prev) => prev + safeResult[currentIndex]);
        currentIndex++;

        // 자동 스크롤
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 20); // 20ms마다 한 글자씩 (조절 가능)

    return () => {
      clearInterval(typingInterval);
    };
  }, [result]);

  // 즉시 전체 텍스트 보기 (스킵 기능)
  const handleSkipTyping = () => {
    if (isTyping && result) {
      setDisplayedText(cleanText(result));
      setIsTyping(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(cleanText(displayedText));
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="result-display result-display--loading">
        <Loader message="강아지가 생각하는 중... 🐶💭" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-display result-display--error">
        <div className="result-display__error-icon">🐕</div>
        <h3 className="result-display__error-title">멍! 문제가 생겼어요!</h3>
        <p className="result-display__error-message">{error}</p>
        <Button onClick={onRetry} variant="secondary">
          다시 시도하기 🐾
        </Button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-display result-display--empty">
        <div className="result-display__empty-icon">🐶</div>
        <p className="result-display__empty-message">
          멍! 궁금한 것을 물어보면 강아지가 답변해드려요! 🐾
        </p>
      </div>
    );
  }

  return (
    <div className="result-display result-display--success">
      <div className="result-display__header">
        <h3 className="result-display__title">강아지의 답변 🐕✨</h3>
        {isTyping && (
          <button
            onClick={handleSkipTyping}
            className="result-display__skip-button"
            title="타이핑 스킵"
          >
            ⏭️ 건너뛰기
          </button>
        )}
      </div>
      <div className="result-display__content" ref={contentRef}>
        <div className="result-display__markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {displayedText}
          </ReactMarkdown>
          {isTyping && <span className="result-display__cursor">|</span>}
        </div>
      </div>
      <div className="result-display__actions">
        <Button onClick={handleCopy} variant="outline" disabled={isTyping}>
          {copySuccess ? '복사 완료! ✓' : '복사하기 📋'}
        </Button>
        <Button onClick={onRetry} variant="secondary" disabled={isTyping}>
          다른 답변 보기 🐾
        </Button>
      </div>
    </div>
  );
};
