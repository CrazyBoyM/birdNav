import { saveUserAppList } from "@/utils/data"
import { useState } from "react"
import ReactDOM from "react-dom"
import './public.css'

export const editApp = (appData: {}, appIndex: number, appList: any, setData: any) => {
  let el = document.createElement('div')
  document.body.appendChild(el)

  const onOk = (newAppData : {}) => {
    let newAppList = [...appList]
    newAppList[appIndex] = newAppData
    saveUserAppList(newAppList)
    setData(newAppList)
    document.body.removeChild(el)
  }

  const onDelete = () => {
    let newAppList = [...appList]
    newAppList.splice(appIndex, 1)
    saveUserAppList(newAppList)
    setData(newAppList)
    document.body.removeChild(el)
  }

  const onCancel = () => {
    document.body.removeChild(el)
  }

  ReactDOM.render(<EditModal appData={appData} onOK={onOk} onCancel={onCancel} onDelete={onDelete} />, el)
}

const EditModal = (props : any) => {
  
  const { appData, onOK, onCancel, onDelete } = props
  
  const [newAppData, setNewAppData] = useState(appData)

  const onSubmit = () => {
    if (newAppData.name && newAppData.link && newAppData.logo) {
      onOK(newAppData)
    } else {
      alert('请输入应用名称、链接和图标链接')
    }
  }

  return (
    <div className="AppModal">
      <span className="AppModal_title rowcenter">修改应用</span>
      <div className="AppModal_row">
        <span>APP名称：</span>
        <input 
          onChange={ 
            (e) => {
              setNewAppData({
                ...newAppData,
                name: e.target.value
              })
            }
          } 
          value={ newAppData.name } 
          placeholder="请输入名称"
          type="text"
          required
        ></input> 
      </div>
      <div className="AppModal_row">
        <span>APP URL：</span>
        <input 
          onChange={  (e) => {
              setNewAppData({
                  ...newAppData,
                  link: e.target.value
              })
            }
          } 
          value={ newAppData.link } 
          placeholder="请输入APP的链接"
          type="text"
          required
        ></input>
      </div>
      <div className="AppModal_row">
        <span>图标 URL：</span>
        <input 
          onChange={ (e) => {
              setNewAppData({
                  ...newAppData,
                  logo: e.target.value
              })
            }
          } 
          value={ newAppData.logo } 
          placeholder="请输入APP Logo的链接"
          type="text"
          required
        ></input>
      </div>
      <div className="AppModal_row">
        <span>打开方式：</span>
        <label>
          <input 
            className="radio_type"
            type="radio" 
            value={ newAppData.type } 
            checked={ newAppData.type === "inner" }
            onChange={ () =>
              setNewAppData({
                ...newAppData,
                type: 'inner'
              })
            } />窗内打开
        </label>
        <label>
          <input
            className="radio_type"
            type="radio"
            value={ newAppData.type } 
            checked={ newAppData.type === "outter" }
            onChange={ () =>
              setNewAppData({
                ...newAppData,
                type: 'outter'
              })
            } />直接跳转
        </label>
      </div>
      <div className="AppModal_btns">
          <button onClick={ onCancel }>取消</button>
          <button onClick={ onDelete }>删除</button>
          <button className="active" onClick={ () => onSubmit() }>确认</button>
      </div>
    </div>
  )
}