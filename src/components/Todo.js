import { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, setItems] = useState([
      /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);

  const [job, setJob] = useState('');

  const handleInput = (e) => {
    setJob((prevState) => {
      prevState = e.target.value;
      return prevState;
    })
  }

  const hanleKeyDown = (e) => {
    if (e.key === 'Enter'){
      setItems((prevState) => {
        prevState = [...prevState, { key: getKey(), text: job, done: false }];
        return prevState;
      })

      setJob((prevState) => {
        prevState = '';
        return prevState;
      })
    }
  }

  const handleClick = (e) => {
    e.target.classList.toggle('has-text-grey-light')
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <input value={job} type="text" onKeyDown={e => hanleKeyDown(e)} onInput={e => handleInput(e)} />
      {items.map(item => (
        <TodoItem handleClick={e => handleClick(e)} item={item} key={item.key}/>
      ))}
      <div className="panel-block">
        {items.length} items
      </div>
    </div>
  );
}

export default Todo;