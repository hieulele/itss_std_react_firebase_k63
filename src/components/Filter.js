import { useState } from 'react';

function Filter({ handleFilterChange}) {
  const [tabs, setTabs] = useState([
    {text : 'すべて', active : true}, 
    {text : '未完了', active : false}, 
    {text : '完了済み', active : false},
  ])

  const handleSetTabs = (text) => {
    handleFilterChange(text)

    setTabs((prevState) => {
      return prevState.map(value => {
        if(value.text === text) {
          value.active = true;
        }else{
          value.active = false;
        }

        return value;
      })
    })
  }

  return (
    <div className="panel-tabs">
      <ul>
        {tabs.map((tab, index) => (
          <li 
            onClick={() => handleSetTabs(tab.text)} 
            key={index} 
            className={tab.active ? 'is-active' : ''}
          >
            {tab.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter