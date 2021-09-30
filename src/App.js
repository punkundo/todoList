import { useEffect, useState } from 'react';
import './App.css';
import AddNewTodo from './components/AddNewTodo';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filterList, setFilterList] = useState(todos)

  useEffect(() => {
    setFilterList(todos)
  }, [todos])

  const level = [
    "Làm ngay",
    "Phải làm nhưng chưa cần làm ngay",
    "Làm bao giờ cũng được",
    "Không là chả sao"
  ]

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleChangeLevel = (todo) => {
    const index = todos.findIndex(item => item.id === todo.id)
    const indexLevel = level.findIndex(lev => lev === todo.level)
    todo.level = level[(indexLevel + 1) % level.length]
    const newTodo = [...todos]
    newTodo[index] = todo
    setTodos(newTodo)
  }
  
  return (
    <div className="app">
     <h3 className="app-title">TODOLIST</h3>
      <div className="app-content">
        <AddNewTodo level={level} setNewTodos = {setTodos} todos = {todos} setShowAdd={setShowAdd} setEditing={setEditing} editing={editing}/>
        <TodoList setFilterList={setFilterList} filterList={filterList} handleChangeLevel={handleChangeLevel} level={level} setNewTodos = {setTodos} todos = {todos} setShowAdd={setShowAdd} showAdd={showAdd} deleteTodo={deleteTodo} setEditing={setEditing}/>
      </div>
    </div>
  );
}

export default App;
