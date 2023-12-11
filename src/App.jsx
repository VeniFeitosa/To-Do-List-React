import { useState } from 'react'
import { v4 } from 'uuid'
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'

function App() {
  const [toDos, setToDos] = useState([
    {
      id:"0d1a4c8a-2a24-4c62-a8f2-93c65e9b7ae3",
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id:"4e81f3a3-72e0-4fb7-9f18-5e1a31e04c2d",
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id:"8f5a1d13-6c55-4b10-a49f-84d3d41f1a99",
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }
  ])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")

  const addTodo = (text, category) => {
    const newTodos = [...toDos, {
      id: v4(),
      text: text,
      category: category,
      isCompleted: false,
    }]

    setToDos(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = [...toDos]

    setToDos(newTodos.filter((todo)=> todo.id != id))
  }

  const completeTodo = (id) => {
    const newTodos = [...toDos]

    newTodos.map((todo) => todo.id == id ? todo.isCompleted = !todo.isCompleted: todo)
    setToDos(newTodos)
  }

  // const filterTodo = (filter) => {
  //   const newTodos = [...toDos]

  //   if(filter == "All"){
  //     setToDos(newTodos)
  //   }else if (filter == "Completed"){
  //     setToDos(newTodos.filter((todo)=> todo.isCompleted == true))
  //   }else{
  //     setToDos(newTodos.filter((todo)=> todo.isCompleted == false))
  //   }

  // }

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter 
      filter={filter}
      setFilter={setFilter}
      setSort={setSort}
      />
      <div className='todo-list'>
        {toDos.filter((todo) => {
          if(filter == "All"){
            return true
          }else if (filter == "Completed"){
            return todo.isCompleted
          }else{
            return !todo.isCompleted
          }
        }).filter((todo) => {
          return todo.text.toLowerCase().includes(search.toLowerCase())
        }).sort((a, b) => {
        return sort == "Asc"
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text)})
        .map((todo) => {
          return (
            <Todo 
            key={todo.id}
            todo={todo}
            removeTodo = {removeTodo}
            completeTodo = {completeTodo}
            />
          )
        })}
      </div>
      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default App
