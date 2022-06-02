function TodoItem({handleChange, item}) {
  return (
    <label className="panel-block">
      <input defaultChecked={item.done} onChange={() => handleChange(item)} type="checkbox" />
      <span className={item.done ? 'has-text-grey-light' : ''}>{item.text}</span>
    </label>
  );
}

export default TodoItem;