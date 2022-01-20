import './App.css';
import { Search } from '@/component/Search'
import { AppList } from '@/component/AppList/index'
import '@icon-park/react/styles/index.css';
import { Background } from './component/Background';
import Store from './store';
import TodoList from './component/TodoList';

const Logo = () => {
  return (
    <div className="logo" onClick={ initLocalData }>
      <div className="pie">
        <span>ip3x</span>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Store>
      <div className="main noselect">
        <Search />
        <TodoList />
        <AppList />
        {/* <Logo /> */}
      </div>
      <Background />
    </Store>
  )
}

export default App;