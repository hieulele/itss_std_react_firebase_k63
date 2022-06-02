/* 
  【TodoItemコンポーネント】
 ・Todoアイテムを表示する
 ・チェックボックスにチェックが入っているか管理する
 ・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
import { useState } from 'react';

function TodoItem({index, handleChange, item}) {
  const [check, setCheck] = useState(false)

  return (
    <label className="panel-block">
      <input defaultChecked={item.done} onChange={() => handleChange(setCheck, check, index)} type="checkbox" />
      <span className={check ? 'has-text-grey-light' : ''}>{item.text}</span>
    </label>
  );
}

export default TodoItem;