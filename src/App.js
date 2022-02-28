import { useEffect, useState } from 'react';
import FormAdd from './components/FormAdd';
import TaskList from './components/TaskList';
import './scss/index.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasksFromLocalStorage());
  }, []);

  useEffect(() => {
    filterTasks(filterText);
  }, [tasks]);

  useEffect(()=>{
    filterTasks(filterText);
  }, [filterText]);

  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const delTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));

  };

  const clearAll = (e) => {
    e.preventDefault();
    if (tasks.length > 0) {
      if (window.confirm('ARE YOU SURE?')) {
        setTasks([]);
        localStorage.clear();
      }
    }
  };

  const getTasksFromLocalStorage = () => {
    let tasks = [];
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      tasks = JSON.parse(tasksString);
    }

    return tasks;
  };

  const changeFilter = (e)=>{
    setFilterText(e.target.value.toLowerCase());
  };

  const filterTasks = (text)=>{
    setFilteredTasks(tasks.filter(task=>{
      if(task.text.toLowerCase().indexOf(text)!==-1){
        return true;
      }else{
        return false;
      }
    }));
  };

  return (
    <div className="container text-center">
      <div className="card">
        <div className="card-content">
          <h2>Notepad</h2>
          <FormAdd addTask={addTask} />
          <div className="card-action">
            <h4 className="task-title">Tasks List</h4>
            <div className="input-field">
              <input
                onChange={changeFilter}
                type="text"
                className="filter"
                name="filter"
                placeholder="Search task"
              />
            </div>
            <TaskList tasks={filteredTasks} delTask={delTask} />
            <a href="#" className="tasks-clear btn-main" onClick={clearAll}>CLEAR ALL</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
