import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    console.log('App useEffect')
    const getTasks = async () => {
      const serverTasks = await fetchTasks()
      setTasks(serverTasks)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8090/tasks')
    const data = await res.json()

    console.log('fetchTasks data', data)

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8090/tasks/${id}`)
    const data = await res.json()

    console.log('fetchTask data', data)

    return data
  }

  const addTask = async (task) => {
    console.log('add task', task)

    const res = await fetch('http://localhost:8090/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    console.log('delete task', id)

    await fetch(`http://localhost:8090/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    console.log('toggle reminder', id)

    const task = await fetchTask(id)
    const updatedTask = {
      ...task,
      reminder: !task.reminder
    }

    const res = await fetch(`http://localhost:8090/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTask)
    })
    console.log(res)
    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Routes>
          <Route path="/about" element={<About />} />
          <Route 
            path="/"
            exact
            element={
              <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {
                tasks.length > 0 ? 
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) :
                'No tasks to show'
              }
              </>
            }/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
