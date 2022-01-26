import "./App.css";
import { Search } from "@/component/Search";
import { AppList } from "@/component/AppList/index";
import "@icon-park/react/styles/index.css";
import { Background } from "./component/Background";
import Store from "./store";
import TodoList from "./component/TodoList";

const App = () => {
  return (
    <Store>
      <div className="main noselect">
        <Search />
        <TodoList />
        <AppList />
      </div>
      <Background />
    </Store>
  );
};

export default App;
