import React, { useState, useEffect } from "react";
import './List.css';

let nextId = 0;

const List = () => {

  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([]);

  const [logged, setLogged] = useState(false);

  const [userInput,setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [credentials, setCredentials] = useState({userInput: '', passwordInput: ''});

  useEffect(()=>{
      setCredentials({userInput, passwordInput});
  }, [userInput,passwordInput])

  const Click = () => {
      console.log(credentials);
  }

  const obtenerInfoServer = async () => {
    const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/prueba', {
      method: 'GET'
    });

    const data = await response.json();
    setTasks(data);
    console.log(data);
  };

  const update = async (lista) => {

    console.log(tasks,'Tareas');
    await fetch('https://playground.4geeks.com/apis/fake/todos/user/prueba', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lista),
    });
  
    await obtenerInfoServer();
  
  };

  const addTask = async () => {
    if (name.trim() === '') {
      return;
    }

    const newTask = { id: nextId++, label: name, done: false }; 
    console.log([...tasks, newTask], 'Nueva tarea');
    const probando = [...tasks, newTask]; 
    setTasks(probando);
    await update(probando);
    
    console.log(tasks);
    setName('');
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await update(updatedTasks);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    obtenerInfoServer();
  }, []);

  return (
    <>
      {!logged && (
        <div className="sign__container">
            
        <input type="text" placeholder="User" 
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}   
        />
   
        <input type="password" placeholder="Password" 
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}  
        />

        <button className="sign__button"  onClick={() => {
              Click();
              setLogged(!logged);}}>Sign in</button>
       
    </div>
      )}

      {logged && (
      <div className="todo__container">
        <div className="todo__title">
          <h1>To-Do List</h1>
        </div>
        <div className="todo__body">
          <div className="todo__dos">
            <input className="todo__input" value={name} onChange={e => setName(e.target.value)} />
            <button className="todo__button" onClick={addTask}>Add Task</button>
          </div>
          <ul className="todo__ul">
            {tasks.map(task => (
              <li key={task.id}>
                {task.label}
                <button className="todo__delete" onClick={() => deleteTask(task.id)}>Delete task</button>
              </li>
            ))}
          </ul>
        </div>
      </div>)}

    </>
  );
};

export default List;