/**
 * 질문 입력 기능
 */

import { TextArea } from '@ui';
import './QuestionInput.css';

export const QuestionInput = ({ value, onChange, disabled }) => {
  return (
    <div className="question-input">
      <label className="question-input__label">나에게 뭐든 물어보개! 🐶</label>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 오늘 간식으로 뭐 먹을까? 산책 갈 시간은 언제가 좋을까?"
        disabled={disabled}
        rows={5}
      />
      <p className="question-input__hint">
        🐾 강아지가 여러분의 모든 질문에 답해드려요! 무엇이든 물어보세요!
      </p>
    </div>
  );
};
