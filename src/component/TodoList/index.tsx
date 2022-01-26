import LongTimeTodo from "./LongTimeTodo";
import ShortTimeTodo from "./ShortTimeTodo";
import "./index.css";

const TodoList = () => {
  return (
    <div className="todo-container rowcenter">
      <LongTimeTodo></LongTimeTodo>
      <ShortTimeTodo></ShortTimeTodo>
    </div>
  );
};

export default TodoList;
