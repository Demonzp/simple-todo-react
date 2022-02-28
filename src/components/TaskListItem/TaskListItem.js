const TaskListItem = ({task, delTask}) => {
  
  return (
    <li className="tasks-list-item">
      <i className="fas fa-times" onClick={()=>delTask(task.id)}></i>
      {task.text}
    </li>
  );
};

export default TaskListItem;