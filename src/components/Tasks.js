import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    // map(): Creates an array (list) that calls a function on every element of the array
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
