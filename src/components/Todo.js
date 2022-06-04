import { useState } from 'react';
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';
import useStorage from '../hooks/storage';
import { getKey } from "../lib/util";

function Todo() {
  const [items, putItems, clearItems] = useStorage();

  const [tab, setTab] = useState('すべて')

  const handleAdd = (text) => {
    const newsItems = [...items, { key: getKey(), text: text, done: false }]
    putItems(newsItems)
  }

  const handleChange = (item) => {
    const newsItems = items.map(value => {
      if (value.text === item.text) {
        value.done = !value.done;
      }
      return value;
    })

    putItems(newsItems)
  }

  const handleFilterChange = (text) => {
    setTab(text)
  }

  const displayItems = () => {
    let newItems;
    if (tab === 'すべて') {
      newItems = items.filter(item => {
        return true;
      });
    }

    if (tab === '未完了') {
      newItems = items.filter(item => {
        return !item.done;
      });
    }

    if (tab === '完了済み') {
      newItems = items.filter(item => {
        return item.done;
      });
    }

    return newItems;
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input handleAdd={handleAdd} />
      <Filter handleFilterChange={handleFilterChange} />
      {displayItems().map(item => (
        <TodoItem handleChange={handleChange} item={item} key={item.key} />
      ))}
      <div className="panel-block">
        {displayItems().length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全部のToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;