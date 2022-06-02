import { useState, useEffect } from 'react';
import { getKey } from "../lib/util";

const STORAGE_KEY = 'itss-todo';

function useStorage() {
  const [items, setItems] = useState([
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
  ]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      setItems(JSON.parse(data));
    }
  }, []);

  const putItems = items => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setItems  (items);
  };

  const clearItems = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setItems([]);
  };

  return [items, putItems, clearItems];
}

export default useStorage;