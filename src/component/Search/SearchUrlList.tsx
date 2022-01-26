import { useState, useEffect } from "react";
import "./SearchUrlList.css";
import { addUrl, editUrl } from "./SearchUrlModal";
import { AddOne } from "@icon-park/react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { defaultSearchList } from "@/store/search";

export const SearchUrlList = (props: any) => {
  const { setShow, setSearchUrl } = props;
  const [searchUrlList, setSearchUrlList] = useLocalStorageState(
    "searchList",
    defaultSearchList
  );

  const onOK = (newSearchUrl: any) => {
    setSearchUrl(newSearchUrl);
    setShow(false);
  };

  interface category {
    name: string;
    urls: [];
  }

  interface url {
    title: string;
    description: string;
    url: string;
  }

  return (
    <div className="SearchUrlList">
      <div className="SearchUrlList-about rowcenter">
        声明：全部搜索源均来自第三方站点，如有侵权请联系删除
      </div>
      {searchUrlList &&
        searchUrlList.map((category: category, categoryIndex: number) => (
          <div className="SearchUrlList-row" key={"category_" + categoryIndex}>
            <span>{category.name}</span>
            <ul>
              {category.urls.map((url: url, index: number) => (
                <li
                  key={"url_" + index}
                  onClick={() => onOK(url)}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    editUrl(url, categoryIndex, index, setSearchUrlList);
                  }}
                >
                  {url.title}
                </li>
              ))}
              {category.urls.length < 6 && (
                <li onClick={() => addUrl(categoryIndex, setSearchUrlList)}>
                  <AddOne theme="outline" size="21" fill="#eee" />
                </li>
              )}
            </ul>
          </div>
        ))}
    </div>
  );
};
