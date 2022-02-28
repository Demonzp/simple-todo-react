import { useState } from 'react';
import { createId } from '../../utils/global';

const FormAdd = ({addTask}) => {
  const maxCharsNumber = 50;
  const [numChars, setNumChars] = useState(maxCharsNumber);
  const [spanClass, setSpanClass] = useState('chars-ui-counter-green');
  const [pointerEvents, setPointerEvents] = useState('auto');
  const [disabled, setDisabled] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  const changeHandle = (e)=>{
    const input = e.target;
    if(input.value.length>maxCharsNumber){
      setSpanClass('chars-ui-counter-red');
      setPointerEvents('none');
      setDisabled(true);
      setNumChars('CHARS OVERLOAD :)');
    }else{
      setPointerEvents('auto');
      setSpanClass('chars-ui-counter-green');
      setDisabled(false);
      setNumChars(maxCharsNumber-input.value.length);
    }
    setTaskInput(input.value);
  };

  const createTask = (text)=>{
    return{
      text,
      id: createId(8)
    }
  }

  const submitHandle = (e)=>{
    e.preventDefault();
    if(taskInput.length<=0){
      alert('CANNOT BE EMPTY!');
    }else if (taskInput.length <= maxCharsNumber) {
      storeTaskInLocalStorage(taskInput);
      setTaskInput('');
      setNumChars(maxCharsNumber);
    } else {
      alert('TOO MUCH CHARS!');
    }
  };

  const storeTaskInLocalStorage = (task)=>{
    try {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      };
      const taskObj = createTask(task);
      tasks.push(taskObj);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      addTask(taskObj);
    } catch (err) {
      console.error(`storeTaskInLocalStorage(): ${err}`);
    }
  };

  return (
    <form id="task-form">
      <div className="input-field">
        <p className="chars-ui">Remaining characters: <span className={spanClass}>{numChars}</span></p>
        <input 
          value={taskInput}
          onChange={changeHandle}
          type="text" 
          className="task-input" 
          name="task-input" 
          placeholder="New task" 
          required 
        />
      </div>

      <div className="button-submit text-left">
        <input
          onClick={submitHandle}
          type="submit" 
          value="ADD TASK" 
          className="btn-main" 
          style={{pointerEvents}}
          disabled={disabled}/>
      </div>
    </form>
  );
};

export default FormAdd;