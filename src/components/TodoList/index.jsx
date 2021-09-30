import React, { useEffect, useState  } from 'react'
import './TodoList.css'
const TodoList = ({ todos, setShowAdd, showAdd, deleteTodo, setEditing, handleChangeLevel, setNewTodos, level, filterList, setFilterList }) => {
  const [sortType, setSortType] = useState(false)
  // const selectOption = [
  //   'STT',
  //   'Tên công việc',
  //   'Mức độ'
  // ]

  useEffect(() => {
    // eslint-disable-next-line 
    sorting()
  }, [todos.length])

  const getColor = (level) => {
    if (level === "Làm ngay") return "danger"
    else if (level === "Phải làm nhưng chưa cần làm ngay") return "warning"
    else if (level === "Làm bao giờ cũng được") return "success"
    else if (level === "Không là chả sao") return "primary"
  }

  const sorting = () => {
    const newTodo = [...todos]
    if(sortType === "STT") {
      newTodo.sort((a,b) => {
        return a.id > b.id ? 1 : -1
      })
    }
    else if(sortType === "Tên công việc") {
      newTodo.sort((a,b) => {
        return a.name > b.name ? 1 : -1
      })
    }
    else{
      newTodo.sort((a,b) => {
        const indexA = level.findIndex(item => item === a.level)
        const indexB = level.findIndex(item => item === b.level)
        return indexA > indexB ? 1 : -1
      })
    }
    setNewTodos(newTodo)
  }

  const onChangeSort = (e) => {
    setSortType(e.target.value)
  }

  const filterLevel = (level) => {
    if(level === 'Tất cả') setFilterList(todos) 
    else {
      const newTodos = todos.filter(item => item.level === level)
      setFilterList(newTodos)
    }
  }

  return (
    <div className="to-do-list">
      <div className="to-do-list--top">
        <h3>Danh sách công việc:</h3>
        <div className="wrapper-bottom">        
          <button onClick={() => sorting()} className="btn-add">SẮP XẾP</button>
          <select className="select_sort" name="level" id="level" value={sortType} onChange={onChangeSort}>
            
              {/* selectOption.map(select => (
                 <option value={select}>{select}</option>
               )) */}
              <option value="STT">Sắp xếp theo ID</option>
              <option value="Tên công việc">Sắp xếp theo tên công việc</option>
              <option value="Mức độ">Sắp xếp theo mức độ</option>
            
          </select>
        </div>
      </div>
      {
        // todos.length === 0 ? <p>Chưa có công việc nào</p> :
          <table>
            <thead>
              <tr>
                <th width="70">STT</th>
                <th width="300">Tên công việc</th>
                <th width="300">Mức độ</th>
                <th width="200">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                filterList.map((value, index) => (
                  <tr key={`${value.id}`}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>
                      <span
                        onClick={() => handleChangeLevel(value)}
                        className={getColor(value.level)}
                      >{value.level}</span>
                    </td>
                    <td>
                      <div className="btn-wrap">
                        <button onClick={() => setEditing(value)}>SỬA</button>
                        <button onClick={() => deleteTodo(value.id)}>XOÁ</button>
                      </div>
                    </td>
                  </tr>
                )
                )
              }
            </tbody>
          </table>
      }
      <div className="wrapper-filter">
        <span className="filter">Tag:</span>
        <span className="filter" onClick={() => filterLevel('Tất cả')}>#Tất cả</span>
        <span className="filter" onClick={() => filterLevel('Làm ngay')}>#Làm ngay</span>
        <span className="filter" onClick={() => filterLevel('Phải làm nhưng chưa cần làm ngay')}>#Phải làm nhưng chưa cần làm ngay</span>
        <span className="filter" onClick={() => filterLevel('Làm bao giờ cũng được')}>#Làm bao giờ cũng được</span>
        <span className="filter" onClick={() => filterLevel('Không là chả sao')}>#Không là chả sao</span>
      </div>
    </div>
  )
}

export default TodoList;
