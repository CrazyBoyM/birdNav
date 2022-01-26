// import fengLin from '@/assets/bg/fenglin.mp4'
import { useState, useLayoutEffect } from "react"
import ReactDOM from "react-dom"

export const Background = () => {
  const [style, setStyle] = useState({});
  useLayoutEffect(() => {
    setBackground();
    return () => {
      localStorage.removeItem('backgroundImage')
    }
  }, [])
  const setBackground = () => {
    const src = localStorage.getItem('backgroundImage')
    if (src) setStyle({ backgroundImage: `url('${src}')` })
  }
  const changepic = () => {
    const reads = new FileReader();
    const f = (document.getElementById('file') as any).files[0]
    if (f.size > 4000000) {
      alert('图片不能大于4m')
      return
    }
    reads.readAsDataURL(f);
    reads.onload = function (e: any) {
      localStorage.removeItem('backgroundImage')
      localStorage.setItem('backgroundImage', e.target.result)
      setBackground()
    };
  }
  const uploadImg = () => {
    (document.getElementById('file') as any).click();
  }
  const curDom = ReactDOM.createPortal(<div className="changeBg" onClick={uploadImg}>切换壁纸</div>, document.body)
  return (
    <section className="bg" style={style}>
      {curDom}
      <input type="file" id="file" accept="image/*" style={{ display: 'none' }} onChange={changepic} />
      {/* <canvas id="bg-canvas" className="bg"></canvas>
      <video
        id="bg-video"
        muted
        loop
        autoplay="autoplay"
        preload="auto"
        playsinline="true"
        webkit-playsinline="true"
        mtt-playsinline="true"
        x5-video-player-type="h5-page"
      >
          <source src="https://cdn.jsdelivr.net/gh/CrazyBoyM/birdNav/public/assets/bg/fenglin.mp4" type="video/mp4" />
      </video>
      <section id="bg-img" className="bg"></section> */}
    </section>
  );
};
