import { getItem, setItem } from "localforage"

/**
 * get preSearchUrlList from local
 * @param setData
 */
 export const readPreSearchUrlList = (setData : Function) => {
  getItem('preSearchUrlList').then(val => {
    setData(val)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * get userSearchUrlList from local
 * @param setData
 */
export const readUserSearchUrlList = (setData : Function) => {
  getItem('userSearchUrlList').then(val => {
    setData(val)
    console.log(val)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * save userSearchUrlList to local
 * @param newData 
 */
export const saveUserSearchUrlList = (newData : Object) => {
  setItem('userSearchUrlList', newData).then((data) => {
    console.info('saved userSearchUrls data')
  }).catch((err) => {
    console.error('error saving userSearchUrls')
    console.error(err)
  })
}

/**
 * get current searchUrl from local
 * @param setData 
 */
export const readCurrentSearchUrl = (setData : Function) => {
  getItem('currentSearchUrl').then(val => {
    setData(val)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * save current searchUrl to local
 * @param newData 
 */
export const saveCurrentSearchUrl = (newData : Object) => {
  setItem('currentSearchUrl', newData).then((data) => {
    console.info('success saved currentSearchUrl')
  }).catch((err) => {
    console.error('error saving currentSearchUrl')
    console.log(err)
  })
}

export const readPreAppList = (setData : Function) => {
  getItem('preAppList').then((data) => {
    setData(data)
  }).catch((err) => {
    console.log(err)
  })
}

export const readUserAppList = (setData : Function) => {
  getItem('userAppList').then((data) => {
    setData(data)
  }).catch((err) => {
    console.log(err)
  })
}

export const saveUserAppList = (newData: Object, callback?: any) => {
  setItem('userAppList', newData).then((data) => {
    console.log('success saved userAppList')
    if (callback) {
      callback(data)
    }
  }).catch((err) => {
    console.log(err)
  })
}