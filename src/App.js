import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState, useEffect} from 'react';
import AddTask from './components/AddTask';


function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{

    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
    }
    getTasks();

  }, []);

  //fetch tasks
  const fetchTasks = async () =>{
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();

    return data;
  }

  //fetch task
  const fetchTask = async (id) =>{
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();

    return data;
  }

  //Add Task

  const addTask = async (task) =>{
    // without a server
    //const id = Math.floor(Math.random() * 1000) + 1;
    //const newTask = {id, ...task};
    //setTasks([...tasks, newTask]);
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    setTasks([...tasks, data]);
  }

    //delete task

  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    });

    setTasks(tasks.filter((task)=> task.id !== id))
  }

  //toggle Reminder

  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id);
    const updstedTask = {...taskToToggle,
      reminder: !taskToToggle.reminder};

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updstedTask)
    });
    
    const data =  await response.json();
    
    //replace data with !task if no server is connected

    console.log(tasks.map((task)=> task.reminder));
    setTasks(tasks.map((task)=> task.id === id?
    { ...task, reminder: data.reminder} : task))
  }

  return (
    <div className="App">
      <Header title="Task Tracker" onAdd={()=>
         setShowAddTask(!showAddTask) } showAdd={ showAddTask } />
      {showAddTask && <AddTask onAdd={ addTask } />}
      {tasks.length > 0? <Tasks tasks={tasks} 
        onDelete={deleteTask} onToggle={toggleReminder} />
         : 'empty'}
    </div>
  );
}



export default App;
