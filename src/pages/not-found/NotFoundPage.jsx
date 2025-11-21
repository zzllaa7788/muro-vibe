/**
 * 404 Not Found 페이지
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@ui';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-page">
      <div className="not-found-page__container">
        {/* 강아지 이모지 애니메이션 */}
        <div className="not-found-page__icon">🐕</div>
        
        {/* 404 타이틀 */}
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">멍! 페이지를 찾을 수 없다개!</h2>
        
        {/* 설명 */}
        <p className="not-found-page__description">
          이 페이지는 존재하지 않거나 삭제되었다개! 🐾<br />
          강아지가 다른 곳으로 안내해줄게요!
        </p>
        
        {/* 홈으로 가기 버튼 */}
        <div className="not-found-page__actions">
          <Button onClick={handleGoHome} variant="primary">
            홈으로 가개! 🏠
          </Button>
        </div>
        
        {/* 추가 정보 */}
        <div className="not-found-page__help">
          <p>도움이 필요하다개? 🐶</p>
          <ul>
            <li>URL을 다시 확인해보라개</li>
            <li>홈 페이지에서 다시 시작해보라개</li>
            <li>강아지에게 질문을 물어보라개!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

