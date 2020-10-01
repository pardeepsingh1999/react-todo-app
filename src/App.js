import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App(props) {
  const [todos, setTodos] = useState([]);

  const [filterTodoList, setFilterTodoList] = useState([]);

  // const todoNameRef = useRef();
  const [userTodoData, setUserTodoData] = useState({name:''});

  const [isAllTodoMark, setIsAllTodoMark] = useState(false);

  const [filterTodo, setFilterTodo] = useState({all:true,active:false,completed:false})
   
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      for(let i=0; i<storedTodos.length; i++) {
        if(storedTodos[i].complete === false) break;
        if(i === storedTodos.length-1) setIsAllTodoMark(true);
      }
      setTodos(storedTodos)
      setFilterTodoList(storedTodos)

    } 
  }, [])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  async function toggleTodo(todoId) {
    
    const newTodos = [...todos];
    // console.log(newTodos, todoId)
    const todo = await newTodos.find(todo => todo.id === todoId);
    todo.complete = !todo.complete;

    allTodoMarkOrNot(newTodos);

    setTodos(newTodos)

    await setFilterTodoList(newTodos)

    if(filterTodo.active) {
        handleShowActiveTodo()
    } else if (filterTodo.completed) {
        handleShowCompletedTodo()
    }

  }

  function allTodoMarkOrNot(newTodos) {

    for(let i=0; i<newTodos.length; i++) {
      if(newTodos[i].complete === false) {
        setIsAllTodoMark(false)
        break;
      } 
      if(i === newTodos.length-1) setIsAllTodoMark(true);
    }
  }

  function handleShowAllTodo(e) {  
    setFilterTodo({all:true,active:false,completed:false})

    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      for(let i=0; i<storedTodos.length; i++) {
        if(storedTodos[i].complete === false) break;
        if(i === storedTodos.length-1) setIsAllTodoMark(true);
      }
      setFilterTodoList(storedTodos)
    }
  }

  function handleShowActiveTodo(e) {  
    setFilterTodo({all:false,active:true,completed:false})

    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      const newTodos = storedTodos.filter(todo => !todo.complete)
      setFilterTodoList(newTodos)

    }
    
  }

  function handleShowCompletedTodo(e) {  
    setFilterTodo({all:false,active:false,completed:true})

    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      const newTodos = storedTodos.filter(todo => todo.complete)
      setFilterTodoList(newTodos)

    }
  };

  function handleOnChangeTodo(e) {
    setUserTodoData({name: e.target.value})
  };

  function handleAddTodo(e) {
    // console.log(todoNameRef.current.value)

    const name = userTodoData.name ? userTodoData.name.trim() : '';

    if(e.keyCode === 13 && name.length !== 0) {
      
      console.log(name)

      let todo_uuid = uuidv4();

      setTodos(prevTodos => {

        allTodoMarkOrNot([...prevTodos, { id: todo_uuid, name: name, complete: false}]);

        return [...prevTodos, { id: todo_uuid, name: name, complete: false}]
      })

      if(filterTodo.all || filterTodo.active) {
        setFilterTodoList(prevTodos => {
          return [...prevTodos, { id: todo_uuid, name: name, complete: false}]
        })
      } 

      setUserTodoData({name: ''})
    }
  };

  async function updateTodo(todoId, editName) {
    const newTodos = [...todos];
    const todo = await newTodos.find(todo => todo.id === todoId);
    if(!todo || !todo.name) return;
    
    todo['name'] = editName;

    allTodoMarkOrNot(newTodos);

    setTodos(newTodos)
    setFilterTodoList(newTodos)

  };


  async function handleClearTodos() {
    
    const newTodos = await todos.filter(todo => !todo.complete)
    setIsAllTodoMark(!isAllTodoMark)

    setTodos(newTodos)
    await setFilterTodoList(newTodos)

    if(filterTodo.active) {
        handleShowActiveTodo()
    } else if (filterTodo.completed) {
        handleShowCompletedTodo()
    }

    allTodoMarkOrNot(newTodos);
  }

  async function handleAllCompleteTodos(e) {
    
    setIsAllTodoMark(!isAllTodoMark)

    const newTodos = [...todos];

    if(e.target.checked) {
        await newTodos.map(todo => todo.complete = true);
    } else {
        await newTodos.map(todo => todo.complete = false);
    }
    // console.log(newTodos)

    setTodos(newTodos)
    setFilterTodoList(newTodos)

  };

  async function deleteOneTodo(todoId) {
    
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(todo => todo.id === todoId);
    newTodos.splice(todoIndex,1);
    setTodos(newTodos);
  
    await setFilterTodoList(newTodos)

    if(filterTodo.active) {
        handleShowActiveTodo()
    } else if (filterTodo.completed) {
        handleShowCompletedTodo()
    }

    allTodoMarkOrNot(newTodos);

  };

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
              <InputGroupText className="mark__all__button">
                <Input id="allCheckedInput" data-toggle="tooltip" 
                       title="Mark All Todo!" addon type="checkbox" 
                       checked={isAllTodoMark}
                       onChange={handleAllCompleteTodos}/>
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
            <Button id="allTodoShow" color="primary" 
            className={`mr-2 ${filterTodo.all ? 'active': ''}`} 
            onClick={handleShowAllTodo} >All</Button>
            <Button id="activeTodoShow" color="primary" 
            className={`mr-2 ${filterTodo.active ? 'active': ''}`}  
            onClick={handleShowActiveTodo} >Active</Button>
            <Button id="completeTodoShow" color="primary" 
            className={filterTodo.completed ? 'active': ''}
            onClick={handleShowCompletedTodo} >Completed</Button>
            
            <Button className="float-right" color="danger" onClick={handleClearTodos}>Clear Completed Todos</Button>

        </div>

        <hr />

        <TodoList todos={todos} filterTodoList={filterTodoList} 
        updateTodo={updateTodo}
        toggleTodo={toggleTodo} deleteOneTodo={deleteOneTodo} />


      
      </div>
      
    </>
  )
}

export default App;
