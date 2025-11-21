/**
 * 재사용 가능한 버튼 컴포넌트
 */

import './Button.css';

export const Button = ({
  children,
  onClick,
  disabled,
  variant = 'primary',
}) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
