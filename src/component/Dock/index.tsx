import AppList from "./AppList/index"
import CurrentTime from "./CurrentTime"
import { uploadImg } from '@/component/Background/index'
import './index.css'

const Dock = () => {
  return (
    <div className="Dock">
      <div 
        onClick={uploadImg}
        style={{ 
          cursor: 'pointer',
          // paddingLeft: 20
        }}
      >切换壁纸</div>
      <AppList />
      <CurrentTime />
    </div>
  )
}

export default Dock