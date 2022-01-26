import { useState } from 'react'
import ReactDOM from 'react-dom'
import './SearchUrlModal.css'
import '@/styles/ModalPublic.css'
import { defaultSearchList } from '@/store/search'
import { getLocal, setLocal } from '@/utils/local'

export const addUrl = (categoryIndex : number, setSearchUrlList : Function) => {

  let el = document.createElement('div')
  document.body.appendChild(el)

  const onOK = (newUrlData : {}) => {
    try {
      let searchList = getLocal('searchList')
      
      if(!searchList) {
        searchList = defaultSearchList
      }
      console.log(searchList)
      searchList[categoryIndex]['urls'].push(newUrlData)

      setLocal('searchList', searchList)
      setSearchUrlList(searchList)
    } catch (err) {
      console.log(err)
    }
    document.body.removeChild(el)
  }
 
  const onCancle = () => {
    document.body.removeChild(el)
  }

  ReactDOM.render(
    <AddSearchUrlModal onOK={ onOK } onCancle={ onCancle } />,
    el
  )
}

export const editUrl = (urlData : {}, categoryIndex : number, searchIndex : number, setSearchUrlList : Function) => {
  let el = document.createElement('div')
  document.body.appendChild(el)

  const onOK = (newUrlData : {}) => {
    try {
      let searchList = getLocal('searchList')
      
      if (!searchList) {
        searchList = defaultSearchList
      }
      searchList[categoryIndex]['urls'][searchIndex] = newUrlData

      setLocal('searchList', searchList)
      setSearchUrlList(searchList)
    } catch (err) {
      console.log(err)
    }

    document.body.removeChild(el)
  }

  const onDelete = (newUrlData : any) => {
    try {
      let searchList = getLocal('searchList')
      
      if (!searchList) {
        searchList = defaultSearchList
      }
      searchList[categoryIndex]['urls'] = searchList[categoryIndex]['urls'].filter(
        (item : any) => item.url !== newUrlData.url 
      )
      console.log(searchList)

      setLocal('searchList', searchList)
      setSearchUrlList(searchList)
    } catch (err) {
      console.log(err)
    }

    document.body.removeChild(el)
  }

  const onCancle = () => {
    document.body.removeChild(el)
  }

  ReactDOM.render(
    <EditSearchUrlModal data={ urlData } onOK={ onOK } onDelete={ onDelete } onCancle={ onCancle } />,
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
          <button className="btn-primary"onClick={ onCancle }>取消</button>
          <button className="btn-confirm" onClick={ () => onSubmit() }>确认</button>
        </div>
      </div>
    )
}

export const EditSearchUrlModal = (props : any) => {
  const { data, onOK, onDelete, onCancle } = props

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
        <button className="btn-primary" onClick={ onCancle }>取消</button>
        <button className="btn-delete" onClick={ () => onDelete(newUrlData) }>删除</button>
        <button className="btn-confirm" onClick={ () => onSubmit() }>确认</button>
      </div>
    </div>
  )
}