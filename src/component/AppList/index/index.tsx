import { AddOne, SettingOne } from "@icon-park/react"
import { addApp } from "../Modal/AddModal"
import { editApp } from "../Modal/EditModal"
import './index.css'
import errorImg from "/assets/icon/error.png"
import { openWindow } from "../Window"
import { useLocalStorageState } from "@/hooks/useLocalStorageState"
import { defaultUserAppList } from "@/store/app"

export const AppList = () => { 
    // const [preAppList, setPreAppList] = useState([])
    const [userAppList, setUserAppList] = useLocalStorageState('userAppList', defaultUserAppList)
    
    const onError = (e: any) => {;
      e.target.src = errorImg
    }
  
    const runApp = (appData: any, appIndex: number) => {
      if (appData.type === "inner") {
        openWindow(appData, appIndex, userAppList, setUserAppList)
      } else {
        window.open(appData.link)
      }
    }

    return (
      <>
        <div id="App-window"></div>
        <section className="AppList-bottom">
          <div className="AppList-app center" onClick={ () => {} }>
            <SettingOne theme="outline" size="30" fill="slateblue" strokeWidth={3}/>
          </div>
          {
            userAppList &&
              userAppList.map((appData : any, appIndex : number) => (
                <div 
                  className="AppList-app center" 
                  key={ appIndex }
                  onClick={ () => runApp(appData, appIndex) } 
                  onContextMenu={ e => {
                    e.preventDefault()
                    editApp(appData, appIndex, userAppList, setUserAppList)
                  } }>
                  <img className="AppList-app-logo" src={ appData.logo } alt={ appData.name } onError={ onError }></img>
                </div>
              ))
          }
          <div className="AppList-app center" onClick={ () => addApp(userAppList, setUserAppList) }>
            <AddOne theme="outline" size="30" fill="slateblue" strokeWidth={3}/>
          </div>
        </section> 
      </>
    )
} 