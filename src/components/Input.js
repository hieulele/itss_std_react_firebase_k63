import { useState } from 'react';

function Input({ handleAdd }) {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      handleAdd(text)

      setText('')
    }
  }

  return (
    <div className="panel-block">
      <input
        className="input"
        type="text"
        placeholder="Enter to add"
        value={text}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Input;
