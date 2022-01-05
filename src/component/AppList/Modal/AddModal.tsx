import { useState } from "react"
import ReactDOM from "react-dom"
import { saveUserAppList } from "@/utils/data"
import './public.css'

export const addApp = (appList: any, setData: any) => {

  let el = document.createElement('div')
  document.body.appendChild(el)

  const onOk = (newAppData : {}) => {
    let newAppList = [...appList, newAppData]
    saveUserAppList(newAppList)
    setData(newAppList)
    document.body.removeChild(el)
  }

  const onCancel = () => {
    document.body.removeChild(el)
  }

  let appId = 'userApp' + appList.length + 1
  ReactDOM.render(<AddModal appId={appId} onOK={ onOk } onCancel={ onCancel } />, el)
}

const AddModal = (props : any) => {
  
  const { appId, onOK, onCancel } = props
  
  const [newAppData, setNewAppData] = useState({
    id: appId,
    name: '',
    link: '',
    logo: '',
    type: 'inner',
    width: null,
    height: null,
    x: null,
    y: null
  })

  const onSubmit = () => {
    if (newAppData.name && newAppData.link && newAppData.logo) {
      onOK(newAppData)
    } else {
      alert('请输入应用名称、链接和图标链接')
    }
  }

  return (
    <div className="AppModal">
      <span className="AppModal_title rowcenter">添加应用</span>
      <div className="AppModal_row">
        <span>APP名称：</span>
        <input 
          onChange={ (e) => {
            setNewAppData({
              ...newAppData,
              name: e.target.value
            })
          }} 
          value={ newAppData.name } 
          placeholder="请输入名称"
          type="text"
          required
        ></input> 
      </div>
      <div className="AppModal_row">
        <span>APP URL：</span>
        <input 
          onChange={ (e) => {
          setNewAppData({
              ...newAppData,
              link: e.target.value,
              logo: e.target.value + '/favicon.ico'
          })
          }} 
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
          }} 
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
          <button className="active" onClick={ () => onSubmit() }>确认</button>
      </div>
    </div>
  )
}