import fengLin from '@/assets/bg/fenglin.mp4'

export const Background = () => {
  return (
    <>
      <canvas id="bg-canvas" className="bg"></canvas>
      <video
        id="bg-video"
        className="bg"
        muted
        loop
        autoplay="autoplay"
        preload="auto"
        playsinline="true"
        webkit-playsinline="true"
        mtt-playsinline="true"
        x5-video-player-type="h5-page"
      >
          <source src={fengLin} type="video/mp4" />
      </video>
      <section id="bg-img" className="bg"></section>
    </>
  )
}