import './App.css'
const API = import.meta.env.VITE_API_URL;
import { useEffect, useState } from 'react'
function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const fetchTodos = async() =>{
    try{
      const response = await fetch(`${API}/api/todos`)
      const data = await response.json()
      setTodos(data)
    }catch(error){
      console.error("Error fetching todos:", error)
    }
  }

  useEffect(()=>{
    fetchTodos()
  },[])
 
  const addTodo = async() =>{
    if(!title) return;
    await fetch(`${API}/api/todos`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title})
    })
    setTitle("")
    fetchTodos()
  }
  return (
    <div style={{padding:"40px"}}>
      <h1>Todo App (Devops Learning - Complete)</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)} 
        placeholder="Enter todo title" 
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo)=>(
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
