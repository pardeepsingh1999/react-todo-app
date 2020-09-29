import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App(props) {
  const [todos, setTodos] = useState([]);
  // const todoNameRef = useRef();
  const [userTodoData, setUserTodoData] = useState({name:''});
   

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(todoId) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === todoId);
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }

  function handleOnChangeTodo(e) {
    setUserTodoData({name: e.target.value})
  }

  function handleAddTodo(e) {
    // console.log(todoNameRef.current.value)

    if(e.keyCode === 13 && userTodoData.name.length !== 0) {

      const name = userTodoData.name;
      console.log(name)

      setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      })
  
      setUserTodoData({name: ''})

    }

  };

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleAllCompleteTodos(e) {
    
    const newTodos = [...todos];

    if(e.target.checked) {
        newTodos.map(todo => todo.complete = true);
    } else {
        newTodos.map(todo => todo.complete = false);
    }
    // console.log(newTodos)

    setTodos(newTodos)
  }

  return (
    <>
      <div className="container">
        
        <header>
          <h1 className="text-center mb-4">Todos</h1>
        </header>

        <hr />

        <div className="m-4">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input addon type="checkbox" onChange={handleAllCompleteTodos}/>
                {/* <Button outline color="warning" onClick={handleAllCompleteTodos}><i className="far fa-check-square"></i></Button> */}
              </InputGroupText>
            </InputGroupAddon>

            <Input type="text" value={userTodoData.name} placeholder="Take a note..."
                  onChange={handleOnChangeTodo} onKeyDown={handleAddTodo} />

          </InputGroup>

            <div className="pt-4">
              <p>{todos.filter(todo => !todo.complete).length} task left...</p>
            </div>

        </div>

        <hr />

        <div className="main__note__filter m-4">
            <Button color="primary" className="mr-2 active" >All</Button>
            <Button color="primary" className="mr-2" >Active</Button>
            <Button color="primary" >Completed</Button>
            
            <Button className="float-right" color="danger" onClick={handleClearTodos}>Clear Completed Todos</Button>

        </div>

        <hr />

        <TodoList todos={todos} toggleTodo={toggleTodo} />


      
      </div>
      
    </>
  )
}

export default App;
