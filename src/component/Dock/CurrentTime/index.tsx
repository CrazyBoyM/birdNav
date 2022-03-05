import { useEffect, useState } from "react"

const CurrentTime = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const refresh = () => {
    let now: Date = new Date()
    let year: number = now.getFullYear()
    let month: number = now.getMonth() + 1
    let day: number = now.getDate()
    let hour: number = now.getHours()
    let minute: number = now.getMinutes()
    let second: number = now.getSeconds()

    setDate(`${year}-${month}-${day}`)
    setTime(`${hour}:${minute}:${second}`)
  }

  useEffect(() => {
    let interval = setInterval(() => {
      refresh()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{ textAlign: 'right' }}>
      { time }
      <br />
      { date }
    </div>
  )
}

export default CurrentTime