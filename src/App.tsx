import "./App.css";
import { Search } from "@/component/Search";
import "@icon-park/react/styles/index.css";
import { Background } from "./component/Background";
import Store from "./store";
import TodoList from "./component/TodoList";
import Dock from "./component/Dock";

const App = () => {
  return (
    <Store>
      <div className="main noselect">
        <Search />
        <TodoList />
        <Dock />
      </div>
      <Background />
    </Store>
  );
};

export default App;
