import { useState } from 'react'
import ReactDOM from 'react-dom'
import { saveUserAppList } from '@/utils/data'
import './index.css'

import closeAppWindow from './icon/closeAppWindow.svg'
import foldAppWindow from './icon/foldAppWindow.svg'
import fullScreen from './icon/fullScreen.svg'

interface app {
  appId: string
  name: string
  link: string
  logo: string
  type: string
  width: number
  height: number
  x: number
  y: number
}

export const openWindow = (appData: app, appIndex: number, appList: any, setList: Function) => {
  let app = document.getElementById(appData.appId)
  if (app) {
    app.style.display = 'block'
    return false
  }

  let el = document.createElement('div')
  el.setAttribute('id', appData.appId)
  document.body.appendChild(el)

  const onClose = (x: number, y: number, width: number, height: number, isHide: false) => {
    let newAppList: app[] = [...appList]
    newAppList[appIndex] = {...appData, x: x, y: y, width: width, height: height}
    saveUserAppList(newAppList)
    setList(newAppList)
    document.body.removeChild(el)
  }

  const onHide = (x: number, y: number, width: number, height: number) => {
    let newAppList: app[] = [...appList]
    newAppList[appIndex] = {...appData, x: x, y: y, width: width, height: height}
    saveUserAppList(newAppList)
    setList(newAppList)
    sessionStorage.setItem(appData.name, newAppList)
    document.body.removeChild(el)
  }

  ReactDOM.render(
    <Window appData={appData} onClose={onClose} />,
    el
  )
}

const Window = (props: any) => {
  const { appData, onClose } = props
  //获取浏览器窗口的宽、高
  const WindowWidth = document.body.clientWidth 
  const WindowHeight = document.body.clientHeight
  //初始APP 宽、高
  const DefAppWidth = appData.width || WindowWidth/1.5
  const DefAppHeight = appData.height || WindowHeight/1.5
  //初始APP 坐标
  const DefAppLeft = appData.x || WindowWidth/2-DefAppWidth/2
  const DefAppTop = appData.y || WindowHeight/2-DefAppHeight/2
  //窗口移动状态、差量
  let moving = false, diffX = 0, diffY = 0
  
  const [state,setState] = useState({
    AppWidth: DefAppWidth,
    AppHeight: DefAppHeight,
    AppLeft: DefAppLeft,
    AppTop: DefAppTop,
    display: 'true',
    oldState: {}
  })
  const [isMoving, setIsMoving] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [zindex,setZindex] = useState(1000)

  const { AppWidth, AppHeight, AppLeft, AppTop, display, oldState }=state
  
  const stateUpdate = (newState: {}) => setState({...state, ...newState})

  const clearMoveListener = () => {
    setTimeout(() => {
      window.onmousemove = () => false
      window.onmouseup = () => false
    }, 0)
    setIsMoving(false)
  }


  const stop = () => clearMoveListener()
  
  const moveWindow =  (e: any) => {
    //移动窗口的函数
    let x = e.pageX
    let y = e.pageY
    //鼠标初始点击处的坐标
    const move = (e: any) => {
        e.preventDefault()
        setIsMoving(true)
        let newAppLeft = AppLeft + (e.clientX - x)
        let newAppTop = AppTop + (e.clientY - y)
        //e.clientX - x e.clientY - y 由坐标差计算出此时鼠标的位移
        if (newAppLeft < 0) newAppLeft = 0
        if (newAppTop < 0) newAppTop = 0
        let maxLeft = window.innerWidth - AppWidth
        let maxTop = window.innerHeight - AppHeight
        if (newAppLeft > maxLeft) newAppLeft = maxLeft
        if (newAppTop > maxTop) newAppTop = maxTop

        stateUpdate({AppLeft: newAppLeft, AppTop: newAppTop})
        //更新窗体坐标状态
      }

    window.onmousemove = move
    //停下
    window.onmouseup = stop
    window.onblur = stop
    window.onmouseleave = stop
  }

  const resizeWindowL = (e: any) => {
    //右下角缩放窗口的函数
    let x = e.pageX
    //鼠标初始点击处的坐标
    const move = (e: any) => {
      e.preventDefault()
      setIsMoving(true)
      let newAppLeft = AppLeft + (e.clientX - x)
      if (newAppLeft < 0) newAppLeft = 0
      let maxLeft = window.innerWidth - AppWidth
      if (newAppLeft > maxLeft) newAppLeft = maxLeft

      let newAppWidth = AppWidth - (e.clientX - x)
      //e.clientX - x e.clientY - y 由坐标差计算出此时鼠标的位移
      stateUpdate({AppLeft: newAppLeft, AppWidth: newAppWidth})
      //更新窗体宽高、坐标状态
    }

    window.onmousemove = move
    //停下
    window.onmouseup = stop
  }

  const resizeWindowR = (e: any) => {
    //右下角缩放窗口的函数
    let x = e.pageX
    //鼠标初始点击处的坐标
    const move = (e: any) => {
        e.preventDefault()
        setIsMoving(true)
        let newAppWidth = AppWidth + (e.clientX - x)
        //e.clientX - x e.clientY - y 由坐标差计算出此时鼠标的位移
        stateUpdate({AppWidth: newAppWidth})
        //更新窗体宽状态
    }

    window.onmousemove = move
    //停下
    window.onmouseup = stop
  }

  const resizeWindowB = (e: any) => {
    //右下角缩放窗口的函数
    let y = e.pageY
    //鼠标初始点击处的坐标
    const move = (e: any) => {
        e.preventDefault()
        setIsMoving(true)
        let newAppHeight = AppHeight + (e.clientY - y)
        //e.clientX - x e.clientY - y 由坐标差计算出此时鼠标的位移
        stateUpdate({AppHeight: newAppHeight})
        //更新窗体高状态
    }

    window.onmousemove = move
    //停下
    window.onmouseup = stop
  }

  const resizeWindowRB = (e: any) => {
    //右下角缩放窗口的函数
    let x = e.pageX
    let y = e.pageY
    //鼠标初始点击处的坐标
    const move = (e: any) => {
        e.preventDefault()
        setIsMoving(true)
        let newAppWidth = AppWidth + (e.clientX - x)
        let newAppHeight = AppHeight + (e.clientY - y)
        //e.clientX - x e.clientY - y 由坐标差计算出此时鼠标的位移
        stateUpdate({AppWidth: newAppWidth, AppHeight: newAppHeight})
        //更新窗体宽高状态
    }

    window.onmousemove = move
    //停下
    window.onmouseup = stop
  }

  const resizeWindowLB = (e: any) => {
    //左下角缩放窗口的函数
    let x = e.pageX
    let y = e.pageY
    //鼠标初始点击处的坐标
    const move = (e: any) => {
        e.preventDefault()
        setIsMoving(true)
        let newAppLeft = AppLeft + (e.clientX - x)
        let newAppTop = AppTop + (e.clientY - y)
        if (newAppLeft < 0) newAppLeft = 0
        if (newAppTop < 0) newAppTop = 0
        let maxLeft = window.innerWidth - AppWidth
        let maxTop = window.innerHeight - AppHeight
        if (newAppLeft > maxLeft) newAppLeft = maxLeft
        if (newAppTop > maxTop) newAppTop = maxTop

        let newAppWidth = AppWidth - (e.clientX - x)
        let newAppHeight = AppHeight + (e.clientY - y)
        //e.clientX - x e.clientY - y 由坐标差计算出此时鼠标的位移
        stateUpdate({AppLeft: newAppLeft, AppTop: newAppTop, AppWidth: newAppWidth, AppHeight: newAppHeight})
        //更新窗体宽高、坐标状态
    }

    window.onmousemove = move
    //停下
    window.onmouseup = stop
  }

  const fullWindow = () => {
    if((AppWidth!==WindowWidth)||(AppHeight!==WindowHeight)) {
      setIsMaximized(true)
      stateUpdate({oldState:state, AppLeft:0, AppTop:0, AppWidth:WindowWidth, AppHeight:WindowHeight})
    }
    else {
      setIsMaximized(false)
      stateUpdate({...oldState})
    }
  }
  const foldWindow = () => {
    let app = document.getElementById(appData.appId)
    if (app) {
      app.style.display = 'none'
    }
  }
  const closeWindow = () => {
    const { AppLeft: x, AppTop: y, AppWidth: width, AppHeight: height } = state
    onClose(x,y,width,height)
    // TODO: 1. 最大化记录。  2.最小化恢复
  }

  return (
    <div 
      className="AppWindow"
      style={{width:AppWidth,height:AppHeight,left:AppLeft,top:AppTop,display:display,zIndex:zindex}}
    >
        <div className="AppWindowHeader noselect" id="demo" onClick={() => setZindex(zindex + 1)} onMouseDown={moveWindow}>
            <div className="Title">{ appData.name }</div>
            <div className="Menu">
                <a onClick={foldWindow}><img src={foldAppWindow} /></a>
                <a onClick={fullWindow}><img src={fullScreen} /></a>
                <a onClick={closeWindow}><img src={closeAppWindow} /></a>
            </div>
        </div>
        <div className="AppWindowContent" style={{height:AppHeight-39}}>
          { isMoving && <div className="mask"></div> }
          <iframe src={appData.link} name={appData.name} frameborder={0} allowtransparency={true} allowfullScreen={true} webkitallowfullscreen={true} mozallowfullscreen={true}></iframe>
        </div>
        { !isMaximized && 
          <div className="resizebar">
            <div className="resize-left" onMouseDown={resizeWindowL} />
            <div className="resize-right" onMouseDown={resizeWindowR} />
            <div className="resize-bottom" onMouseDown={resizeWindowB} />
            <div className="resize-left-bottom" onMouseDown={resizeWindowLB} />
            <div className="resize-right-bottom" onMouseDown={resizeWindowRB} />
          </div>        
        }
    </div>
  )
}
