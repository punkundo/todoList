import React, { useEffect, useState } from 'react'
import './AddNewTodo.css'

let uuid = 1;

export default function AddNewTodo({
  setNewTodos, todos, setShowAdd, editing, setEditing, level
}) {
  const [newTodo, setNewTodo] = useState({
    id: 0,
    name: '',
    level: 'Làm ngay'
  })

  const [isEdit, setIsEdit] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    if (editing !== null) {
      setNewTodo(editing)
      setIsEdit(true)
    }
  }, [editing])

  const onChangeTodo = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    })
  }

  const addNewTodo = () => {
    if(newTodo.name.trim() === '') {
      setShowAlert(false)
      return 
    }
    newTodo.id = uuid
    setNewTodos([...todos, newTodo])
    uuid += 1;
    setNewTodo({
      id: 0,
      name: '',
      level: 'Làm ngay'
    })
    setShowAlert(true)
  }

  const handleEdit = () => {
    const index = todos.findIndex(todo => todo.id === newTodo.id)
    todos[index] = newTodo
    setNewTodo({
      id: 0,
      name: '',
      level: 'Làm ngay'
    })
    setIsEdit(false)
    setEditing(null)
    setNewTodos([...todos])
    setShowAlert(true)
  }

  return (
    <div className="add-new-todo">
      {/* <span onClick={() => setShowAdd(false)}>X</span> */}
      <h3>{isEdit ? 'Sửa công việc' : 'Thêm công việc mới:'}</h3>

      <label htmlFor="name">Tên công việc:</label>
      <input type="text" name="name" id="name" value={newTodo.name} onChange={onChangeTodo} />
      <h5 className="alert" hidden={showAlert}>Không được để trống tên công việc</h5>

      <label htmlFor="level">Mức độ công việc:</label>
      <select name="level" id="level" value={newTodo.level} onChange={onChangeTodo}>
        {
          level.map(level => (
            <option value={level}>{level}</option>       
          ))
        }
      </select>
      <div className="btn-wrap">
        <button onClick={isEdit ? handleEdit : addNewTodo}>{isEdit ? 'SỬA' : 'THÊM'}</button>
        <button onClick={() => setShowAdd(false)}>HUỶ BỎ</button>
      </div>
    </div>
  )
}
