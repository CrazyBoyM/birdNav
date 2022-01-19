import LongTimeTodo from "./LongTimeTodo"
import ShortTimeTodo from "./ShortTimeTodo"
import './index.css'

const TodoList = () => {
  return (
    <div className="todo-container rowcenter">
      <ShortTimeTodo></ShortTimeTodo>
      <LongTimeTodo></LongTimeTodo>
    </div>
  )
}

export default TodoList