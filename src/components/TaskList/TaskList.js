import TaskListItem from '../TaskListItem';

const TaskList = ({ tasks, delTask }) => {

  return (
    <ul className="tasks-list">
      {tasks.map(task => {
        return <TaskListItem key={task.id} task={task} delTask={delTask} />
      })}
    </ul>
  );
};

export default TaskList;