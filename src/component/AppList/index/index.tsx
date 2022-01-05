import { useState, useEffect } from "react"
import { readPreAppList, readUserAppList } from "@/utils/data"
import { AddOne, Plus, SettingOne, SettingTwo } from "@icon-park/react"
import { addApp } from "../Modal/AddModal"
import { editApp } from "../Modal/EditModal"
import './index.css'
import errorImg from "./icon/error.png"
import { openWindow } from "../Window"

export const AppList = () => { 
    const [preAppList, setPreAppList] = useState([])
    const [userAppList, setUserAppList] = useState([])
    
    useEffect(() => {
      readPreAppList(setPreAppList)
      readUserAppList(setUserAppList)
    }, [])
    
    interface app {
      name: string
      link: string
      logo: string
      type: string
    }
    
    const onError = (e: any) => {;
      e.target.src = errorImg
    }
  
    const runApp = (appData: any) => {
      if (appData.type === "inner") {
        // TODO: window
      } else {
        window.open(appData.link)
      }
    }

    return (
        <section className="AppList-bottom">
          <div className="AppList-app center" onClick={ () => {} }>
            <SettingOne theme="outline" size="30" fill="slateblue" strokeWidth={3}/>
          </div>
          {
            preAppList &&
              preAppList.map((appData: app, appIndex) => (
                <div 
                  className="AppList-app center" 
                  key={ appIndex } 
                  onClick={ () => openWindow(appData, appIndex, userAppList, setUserAppList) } 
                >
                  <img className="AppList-app-logo" src={ appData.logo } alt={ appData.name } onError={ onError }></img>
                </div>
              ))
          }
          {
            userAppList &&
              userAppList.map((appData: app, appIndex) => (
                <div 
                  className="AppList-app center" 
                  key={ appIndex }
                  onClick={ () => openWindow(appData, appIndex, userAppList, setUserAppList) } 
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
    )
} 