import { getLocal, setLocal } from '@/utils/local'
import { useEffect, useState } from 'react'

const useLocalStorageState = <T>(keyName: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
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

  return [state, setState] as const
}

export { useLocalStorageState }