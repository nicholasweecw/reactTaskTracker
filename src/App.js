// Use Hook: useState
import { useState, useEffect } from "react";
// Use HashRouter to ensure button and tasks appear on start screen
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
// Connect to Header.js
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";


function App() {
  // Hook/State for showing/not showing AddTask element
  const [showAddTask, setShowAddTask] = useState(false);

  // State for already created tasks
  // Put them in here to make them global
  const [tasks, setTasks] = useState([]);

  // For production build, ie linking to actual back-end/database (allowing tasks to persist when reloading page)
  // E.g. JSON Server
  useEffect(() => {
    // API: getting tasks from back-end
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
    // []: Dependency Array
  }, []);

  // API: fetching multiple tasks in back-end (used in Get Tasks)
  // async: Because need call fetch() which returns a promise
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // API: fetching a single task in back-end (used in Toggle reminder function)
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // API: adding tasks in back-end
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      // Convert JS object to string
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    
    // const id = Math.floor(Math.random() * 10000) + 1;
    // ...task: Copy all the attributes of a task in
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task function
  // Filter out task to be deleted using its id
  const deleteTask = async (id) => {
    // API: deleting tasks in back-end
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder function
  const toggleReminder = async (id) => {
    // API: updating reminders in back-end
    // Get the task to toggle
    const taskToToggle = await fetchTask(id)
    // Update that task
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    // Wrap entire output with <Router></Router> to use routes
    // JSX: JavaScript Extension - JS and HTML
    // <Header /> - Connect to Header.js
    // showAddTask && ...: Ternary operator without the else part (if showAddTask is true, display the AddTask element)
    // Routes: For switching between pages (main and about pages in this case)
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route path='/' element={
            <div>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              ) : (
                "No Tasks To Show"
              )}
            </div>
          } />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
