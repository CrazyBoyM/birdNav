import { useState } from 'react'
import ReactDOM from 'react-dom'
import { saveUserSearchUrlList } from '@/utils/data'
import './SearchUrlModal.css'

export const addUrl = (urlList : any) => {

  let el = document.createElement('div')
  document.body.appendChild(el)

  const onOK = (newUrlData : {}) => {
    let newUrlList = [...urlList, newUrlData]
    saveUserSearchUrlList(newUrlList) // save newUrlList to local
    document.body.removeChild(el)
  }
 
  const onCancle = () => {
    document.body.removeChild(el)
  }

  ReactDOM.render(
    <AddSearchUrlModal urlList={ urlList } onOK={ onOK } onCancle={ onCancle } />,
    el
  )
}

export const editUrl = (event : any, url : any, urlIndex : number, urlList : any ) => {
  event.preventDefault()
  let el = document.createElement('div')
  document.body.appendChild(el)

  const onOK = (newUrlData : {}) => {
    let newUrlList = urlList
    newUrlList[urlIndex] = newUrlData
    saveUserSearchUrlList(newUrlList) // save newUrlList to local
    document.body.removeChild(el)
  }

  const onCancle = () => {
    document.body.removeChild(el)
  }

  ReactDOM.render(
    <EditSearchUrlModal data={ url } onOK={ onOK } onCancle={ onCancle } />,
    el
  )
}

export const AddSearchUrlModal = (props : any) => {
    const { onOK, onCancle } = props
    
    const [newUrlData, setNewUrlData] = useState({
      title: '',
      describtion: '',
      url: ''
    })

    const onSubmit = () => {
      if (newUrlData.title && newUrlData.describtion && newUrlData.url) {
        onOK(newUrlData)
      } else {
        alert('请输入名称、描述和链接')
      }
    }

    return (
      <div className="SearchUrlModal">
        <span className="SearchUrlModal_title rowcenter">添加搜索源</span>
          <div className="SearchUrlModal_row">
            <span>标题名称：</span>
            <input 
              onChange={ (e) => {
                setNewUrlData({
                  ...newUrlData,
                  title: e.target.value
                })
              }} 
              value={ newUrlData.title } 
              placeholder="请输入标题"
              required
            ></input> 
          </div>
          <div className="SearchUrlModal_row">
            <span>描述文字：</span>
            <input 
              onChange={ (e) => {
                setNewUrlData({
                  ...newUrlData,
                  describtion: e.target.value
                })
              }} 
              value={ newUrlData.describtion } 
              placeholder="请输入描述文字"
              required
            ></input>
          </div>
          <div className="SearchUrlModal_row">
            <span>搜索地址：</span>
            <input 
              onChange={ (e) => {
                setNewUrlData({
                  ...newUrlData,
                  url: e.target.value
                })
              }} 
              value={ newUrlData.url } 
              placeholder="请输入搜索地址"
              required
            ></input>
            <p>请将搜索关键词用$keyword$代替<br />如：https://www.baidu.com/s?wd=$keyword$</p>
          </div>
        <div className="SearchUrlModal_btns">
          <button onClick={ onCancle }>取消</button>
          <button className="active" onClick={ () => onSubmit() }>确认</button>
        </div>
      </div>
    )
}

export const EditSearchUrlModal = (props : any) => {
  const { data, onOK, onCancle } = props

  const [newUrlData, setNewUrlData] = useState(data)

  const onSubmit = () => {
    if (newUrlData.title && newUrlData.describtion && newUrlData.url) {
      onOK(newUrlData)
    } else {
      alert('请输入名称、描述和链接')
    }
  }

  return (
    <div className="SearchUrlModal">
      <span className="SearchUrlModal_title rowcenter">修改搜索源</span>
      <div className="SearchUrlModal_row">
        <span>标题名称：</span>
        <input 
          onChange={ (e) => {
            setNewUrlData({
              ...newUrlData,
              title: e.target.value
            })
          }} 
          value={ newUrlData.title } 
          placeholder="请输入标题"
          required
        ></input>
      </div>
      <div className="SearchUrlModal_row">
        <span>描述文字：</span>
        <input 
          onChange={ (e) => {
            setNewUrlData({
              ...newUrlData,
              describtion: e.target.value
            })
          }} 
          value={ newUrlData.describtion } 
          placeholder="请输入描述文字"
          required
        ></input>
      </div>
      <div className="SearchUrlModal_row">
        <span>搜索地址：</span>
        <input 
          onChange={ (e) => {
            setNewUrlData({
              ...newUrlData,
              url: e.target.value
            })
          }} 
          value={ newUrlData.url } 
          placeholder="请输入搜索地址"
          // required
        ></input>
        <p>请将搜索关键词用$keyword$代替<br />如：https://www.baidu.com/s?wd=$keyword$</p>
      </div>
      <div className="SearchUrlModal_btns">
        <button onClick={ onCancle }>取消</button>
        <button className="active" onClick={ () => onSubmit() }>确认</button>
      </div>
    </div>
  )
}