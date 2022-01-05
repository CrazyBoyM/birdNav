import { useState, useEffect } from 'react'
import { readPreSearchUrlList, readUserSearchUrlList } from '@/utils/data'
import './SearchUrlList.css'
import { addUrl, editUrl } from './SearchUrlModal'

export const SearchUrlList = (props : any) => {
    const { setShow, setSearchUrl } = props
    const [preSearchUrlList, setPreSearchUrlList] = useState([])
    const [userSearchUrlList, setUserSearchUrlList] = useState([])

    useEffect(() => {
      readPreSearchUrlList((data : any) => setPreSearchUrlList(data))
      readUserSearchUrlList((data : any) => setUserSearchUrlList(data))
    }, [])

    const onOK = (newSearchUrl : any) => {
      setSearchUrl(newSearchUrl)
      setShow(false)
    }

    interface category {
      name: string
      urls: []
    }

    interface url {
      title: string
      description: string
      url: string
    }

    return (
      <div className="SearchUrlList" onMouseLeave={ () => setShow(false) }>
        <div className="SearchUrlList-about rowcenter">
          声明：全部搜索源均来自第三方站点，如有侵权请联系删除
        </div>
        { 
          preSearchUrlList && 
          preSearchUrlList.map((category : category, categoryIndex) => 
            <div className="SearchUrlList-row" key={'category_' + categoryIndex}>
              <span>{ category.name }</span>
              <ul>
                { 
                  category.urls.map((url : url, index : number) =>  
                      <li key={ 'url_' + index } onClick={() => onOK(url)}>{ url.title }</li>
                  ) 
                }
              </ul>
            </div>
          )
        }
        <div className="SearchUrlList-row">
          <span>自定义</span>
          <ul>
            { 
              userSearchUrlList &&
              userSearchUrlList.map((url : url, index) => 
                <li
                  key={'url_' + index} 
                  onClick={() => onOK(url)} 
                  onContextMenu={(event) => editUrl(event, url, index, userSearchUrlList) }>
                  { url.title }
                </li>
              )
            }
            <li onClick={()=>addUrl(userSearchUrlList)}>+</li>
          </ul>
        </div>
      </div>
    )
}