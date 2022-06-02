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
import useStorage , {storageJobs} from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, setItems] = useState(storageJobs ?? [
      /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);

  const [tabs, setTabs] = useState([
    {text : 'すべて', active : true}, 
    {text : '未完了', active : false}, 
    {text : '完了済み', active : false},
  ])

  const [tab, setTab] = useState(0)

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

        const jsonJobs = JSON.stringify(prevState);

        localStorage.setItem('items',jsonJobs);
        return prevState;
      })

      setJob((prevState) => {
        prevState = '';
        return prevState;
      })
    }
  }

  const handleChange = (setCheck, check, index) => {
    setCheck(!check)

    setItems((prevState) => {
      prevState = prevState.filter((value,i) => {
        if(i === index && !check) {
          value.done = true;
        }else if (i === index && check){
          value.done = false;
        }

        return value;
      })

      const jsonJobs = JSON.stringify(prevState);

      localStorage.setItem('items',jsonJobs);

      return prevState;
    })
  }

  const handleSetTabs = (index) => {
    setTab(index)

    setTabs((prevState) => {
      return prevState.filter((value,i) => {
        if(i === index) {
          value.active = true;
        }else{
          value.active = false;
        }

        return value;
      })
    })
  }

  const rederTodo = (item, index) => {
    if(tab === 0 ){
      return <TodoItem index={index} handleChange={handleChange} item={item} key={item.key}/>
    }

    if(tab === 1 && !item.done){
      return <TodoItem index={index} handleChange={handleChange} item={item} key={item.key}/>
    }

    if(tab === 2 && item.done){
      return <TodoItem index={index} handleChange={handleChange} item={item} key={item.key}/>
    }
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <input value={job} type="text" onKeyDown={e => hanleKeyDown(e)} onInput={e => handleInput(e)} />
      <ul>
        {tabs.map((tab, i) => (
          <li onClick={() => handleSetTabs(i)} key={i} className={tab.active ? 'is-active' : ''}>{tab.text}</li>
        ))}
      </ul>
      {items.map((item, index) => (
        rederTodo(item, index)
      ))}
      <div className="panel-block">
        {items.length} items
      </div>
    </div>
  );
}

export default Todo;