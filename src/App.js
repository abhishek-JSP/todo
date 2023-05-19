
import React, { useState } from "react";
import './todo.css'

function App() {
  const [item, setItem] = useState([])
  const [todo, setTodo] = useState("")
  const [date, setDate] = useState("")
  const [err, setErr] = useState("")
  const [cmplt, setCmplt] = useState(true)
  const [cmpltdID, setCmpltdID] = useState([])
  const [isEdit, setIsEdit] = useState(true)
  const [editedVal, setEditedVal] = useState("")

  const submitTodo = (e) => {
    e.preventDefault();
    console.log("submit", date)
    if (todo === "" && date === "") {
      setErr("both must not be blank")
      return;
    }
    if (todo === "") {
      setErr("Input must not be blank")
      return;
    }
    if (date === "") {
      setErr("date must not be blank")
      return
    }

    if (todo !== "" && date !== "") {
      setItem([...item, { id: Math.random(), todo, date: date, completed: false, isEdited: false }])
      setErr("")
    }
  }

  const saveEditedTodo = (id) => {
    const res = item && item.map((todo) => (todo.id === id ? { ...todo, todo: editedVal, isEdited: isEdit } : todo))
    console.log(res, id)
    setItem(res)
    setIsEdit(false)
  }

  const deleteTodo = (id) => {
    const filterList = item.filter((item) => (item.id !== id))
    setItem(filterList)
  }

  const editTodo = (id) => {
    const res = item && item.map((todo) => (todo.id === id ? { ...todo, isEdited: isEdit } : todo))
    setItem(res)
  }
  const completedTodo = (id) => {
    const res = item && item.map((todo) => (todo.id === id ? { ...todo, completed: cmplt } : todo))
    console.log(res, id)
    setItem(res)
  }
  console.log(cmpltdID)


  return (
    <div className="main_div">
     
        <form onSubmit={submitTodo} >
          <input onChange={e => setTodo(e.target.value)} type="text" placeholder="Add ToDo" />
          <input onChange={e => setDate(e.target.value)} type="date" placeholder="list" />
          <button className="sub_btn">Submit</button>

        </form>
     
      {err && <p>{err}</p>}
      <div className="second_div">
        <ul>
          {item && item.map(({ id, todo, date, completed, isEdited }) => {
            return (
              <div key={id} style={{ display: "flex" }} className="input_content">
                {completed ? <strike><li >{todo} <u>{date}</u></li></strike> : isEdited ? <input type="text" value={editedVal} onChange={(e) => setEditedVal(e.target.value)} /> : <li >{todo} <u>{date}</u></li>}
                {!isEdited && <button className="del_btn" onClick={() => deleteTodo(id)}>delete</button>}
                {!isEdited && <button className="edit_btn" onClick={() => {
                  editTodo(id)
                  setIsEdit(prev => !prev)
                }}>edit</button>}
                {isEdited && <button className="save_btn" onClick={() => saveEditedTodo(id)}>save</button>}
                {!isEdited && <button className="com_btn" onClick={() => {
                  setCmplt(prev => !prev)
                  completedTodo(id)
                }}>{completed ? "completed" : "complete"}</button>}
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

