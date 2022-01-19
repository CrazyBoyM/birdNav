import { useEffect, useState } from 'react'

const useLocalStorageState = (keyName : string, defaultValue : unknown) => {
  const [state, setState] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(keyName)
      
      if (localValue) {
        return JSON.parse(localValue)
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })
  
  useEffect(() => {
    window.localStorage.setItem(keyName, JSON.stringify(state))
  }, [state])

  return [state, setState]
}

export { useLocalStorageState }