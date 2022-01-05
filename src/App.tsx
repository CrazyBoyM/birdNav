import './App.css';
import { Search } from '@/component/Search'
import { initLocalData } from '@/utils/init'
import { AppList } from '@/component/AppList/index'
import '@icon-park/react/styles/index.css';
import { Background } from './component/Background';

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
    <>
      <div className="main noselect">
        <Search />
        <AppList />
        <Logo />
      </div>
      <Background />
    </>
  )
}

export default App;