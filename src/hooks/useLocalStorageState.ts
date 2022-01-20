import { getLocal, setLocal } from '@/utils/local'
import { useEffect, useState } from 'react'

const useLocalStorageState = (keyName : string, defaultValue : unknown) => {
  const [state, setState] = useState(() => {
    try {
      const localValue = getLocal(keyName)
      
      if (localValue) {
        return localValue
      } else {
        setLocal(keyName, defaultValue)
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })
  
  useEffect(() => {
    setLocal(keyName, state)
  }, [state])

  return [state, setState]
}

export { useLocalStorageState }