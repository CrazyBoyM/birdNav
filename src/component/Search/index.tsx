import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { defaultCurrentSearch } from '@/store/search'
import { CloseSmall, Down, Search as SearchIcon, Right, Close, CloseOne } from '@icon-park/react'
import { useState, useEffect } from 'react'
import './index.css'
import '@/styles/animation.css'
import SearchSuggestion from './SearchSuggestion'
import { SearchUrlList } from './SearchUrlList'

const Search = () => {
  const [searchUrl, setSearchUrl] = useLocalStorageState('currentSearch', defaultCurrentSearch)
  const [keyword, setKeyword] = useState('')
  const [showSearchUrlList, setShowSearchUrlList] = useState(false)
  const [keywordVisible, setKeywordVisible] = useState(false)
  useEffect(() => {
    setKeywordVisible(!!keyword)
    return () => setKeywordVisible(false)
  }, [keyword])
  useEffect(() => {
    const callback = () => {
      console.log('here')
      setShowSearchUrlList(false)
      setKeywordVisible(false)
    }
    document.addEventListener('click', callback, false)
    return () => {
      console.log('distory')
      document.removeEventListener('click', callback, false)
    }
  }, [])
  // go to search page
  const handleSearchGo = (e: any) => {
    e.preventDefault()
    const actionUrl = searchUrl.url.replace('$keyword$', keyword)
    window.open(actionUrl)
  }

  return (
    <div className="Search fade-down">
      {searchUrl &&
        <div className="SearchBar">
          <div className="SearchUrl rowcenter">
            <span className="urlTag rowcenter" onClick={(e) => {
              e.stopPropagation()
              setShowSearchUrlList(!showSearchUrlList);
              setKeywordVisible(false)
            }}>
              {searchUrl.title}
              {
                showSearchUrlList ?
                <Right theme="outline" size="19" fill="#eee" />
                :
                <Down theme="outline" size="19" fill="#eee" /> 
              }
            </span>
            {showSearchUrlList && <SearchUrlList setShow={setShowSearchUrlList} setSearchUrl={setSearchUrl} />}
            {keywordVisible && <SearchSuggestion keyword={keyword} setKeyword={setKeyword} />}
          </div>
          <form className="center" onSubmit={handleSearchGo}>
            <input
              type="text"
              value={keyword}
              placeholder={searchUrl.describtion}
              onChange={e => setKeyword(e.target.value)}
              onClick={e => e.stopPropagation()}
              onFocus={e => {
                setShowSearchUrlList(false)
                setKeywordVisible(!!keyword)
              }}
            ></input>
          </form>
          {
            keyword.length > 0 &&
            <CloseSmall onClick={() => setKeyword('')} theme="outline" size="19" fill="#ddd"/>
          }
          <div className="SearchButton rowcenter" >
            <SearchIcon onClick={handleSearchGo} theme="outline" size="19" fill="#fff"/>
          </div>
        </div>
      }
    </div >
  )
}

export { Search }