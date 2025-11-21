/**
 * 텍스트 입력 영역 컴포넌트
 */

import './TextArea.css';

export const TextArea = ({
  value,
  onChange,
  placeholder,
  disabled,
  rows = 4,
}) => {
  return (
    <textarea
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
    />
  );
};
