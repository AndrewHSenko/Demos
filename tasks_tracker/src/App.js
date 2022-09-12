import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import Footer from './Components/Footer'
import About from './Components/About'
import TaskDetails from './Components/TaskDetails'

function App() {
  const name = 'Brad'
  const other_name = 'Tim'
  const x = true
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) // JS object -> JSON string
    })

    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task } 
    // setTasks([...tasks, newTask])
  }
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))

  }
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task))
  }
  return (
    <Router>
    <div className="container">
      <Header user={x ? other_name : name} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Routes>
        <Route path='/' element={
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks to Show')}
          </>
        }/>
        <Route path='/about' element={<About />} />
        <Route path='/task/:id' element={<TaskDetails />} />
      </Routes>
      {/* old ver. of react-router-dom 
      <Route path='/' exact render={(props) => (
        <>
           {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to Show'}
        </>
      )} />
      <Route path='/about' component={About} />
       */}
      <Footer />
    </div>
    </Router>
  );
}

export default App;

/**
  https://www.youtube.com/watch?v=w7ejDZ8SWv8
  Timestamps:
  0:00 - Intro & Slides
  12:37 - Create a React app
  14:52 - Files & folders
  18:54 - App component & JSX
  22:39 - Expressions in JSX
  23:49 - Creating a component
  27:18 - Component Props
  28:50 - PropTypes
  30:42 - Styling
  34:17 - Button Component
  37:46 - Events
  40:18 - Tasks Component
  41:03 - Create a list with .map()
  43:07 - State & useState Hook
  44:55 - Global state
  46:52 - Task Component
  49:30 - Icons with react-icons
  51:41 - Delete task & prop drilling
  55:50 - Optional message if no tasks
  56:58 - Toggle reminder & conditional styling
  1:03:13 - Add Task Form
  1:06:16 - Form input state (controlled components)
  1:09:18 - Add task submit
  1:14:36 - showAddTask state
  1:15:58 - Button toggle
  1:19:33 - Build for production
  1:21:51 - JSON Server
  1:25:53 - useEffect Hook & Fetch tasks from server
  1:30:13 - Delete task from server
  1:31:51 - Add task to server
  1:35:15 - Toggle reminder on server
  1:39:15 - Routing, footer & about
 */
