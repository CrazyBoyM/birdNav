import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { defaultCurrentSearch } from '@/store/search'
import { Down, More, MoreApp, MoreOne, MoreThree, MoreTwo, Right } from '@icon-park/react'
import { useState, useEffect } from 'react'
import './index.css'
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
    const callback = () => setShowSearchUrlList(false)
    document.addEventListener('click', callback, false)
    return () => {
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
    <div className="Search">
      {searchUrl &&
        <div className="SearchBar">
          <div className="SearchUrl rowcenter urlTag" onClick={(e) => {
            e.stopPropagation()
            setShowSearchUrlList(!showSearchUrlList);
          }}>
            <span className="rowcenter">
              {searchUrl.title}
              {
                showSearchUrlList ?
                  <Down theme="outline" size="19" fill="#eee" /> :
                  <Right theme="outline" size="19" fill="#eee" />
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
              onFocus={() => setKeywordVisible(!!keyword)}
              onBlur={() => setKeywordVisible(false)}
            ></input>
          </form>
          <div className="SearchButton center" >
            <span onClick={() => setKeyword('')}> X</span>
            <svg onClick={handleSearchGo} width="19" height="19" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" fill="white" fill-opacity="0.01" /><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" /><path d="M26.6568 14.3431C25.2091 12.8954 23.2091 12 21 12C18.7909 12 16.7909 12.8954 15.3431 14.3431" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M33.2218 33.2218L41.7071 41.7071" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
        </div>
      }
    </div >
  )
}

export { Search }