/**
 * 로딩 스피너 컴포넌트
 */

import Lottie from 'lottie-react';
import animationData from '@assets/Cute Doggie.json';
import './Loader.css';

export const Loader = ({ message = '강아지가 생각하는 중...' }) => {
  return (
    <div className="loader">
      <div className="loader__animation">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="loader__message">{message}</p>
    </div>
  );
};
