import { useState } from 'react';
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';
// import useStorage from '../hooks/storage';
import useFbStorage from '../hooks/fbStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

function Todo() {
  const [items, addItem, updateItem, clearItems] = useFbStorage();

  const [tab, setTab] = useState('すべて')

  const handleAdd = (text) => {
    addItem({ text, done: false })
  }

  const handleChange = (item) => {
    updateItem(item)
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
        <span className="icon-text">
          <FontAwesomeIcon icon={faCalendarCheck} />
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input handleAdd={handleAdd} />
      <Filter handleFilterChange={handleFilterChange} />
      {displayItems().map(item => (
        <TodoItem handleChange={handleChange} item={item} key={item.id} />
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