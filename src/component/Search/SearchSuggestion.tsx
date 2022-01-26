import { useEffect, useState } from "react";
import { jsonp } from "vue-jsonp";
import "./SearchSuggestion.css";
import "@/styles/animation.css";

interface SearchSuggestProps {
  keyword: string;
  setKeyword: Function;
}
const SearchSuggestion: React.FC<SearchSuggestProps> = (props) => {
  const { keyword, setKeyword } = props;

  const [list, setList] = useState([]);

  useEffect(() => {
    jsonp(
      `https://suggestion.baidu.com/su?ie=utf-8&wd=${keyword}&p=3&cb=bdsug`,
      {
        callbackQuery: "cb",
      }
    ).then((res) => {
      console.log(res);
      setList(res.s);
    });
  }, [keyword]);

  return (
    <section className="SearchSuggestion fade-up">
      <ul>
        {list.map((suggestion, index) => {
          return (
            <li
              className="SearchSuggestion-item"
              onClick={() => setKeyword(suggestion)}
              key={index}
            >
              {index + 1}、{suggestion}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SearchSuggestion;
