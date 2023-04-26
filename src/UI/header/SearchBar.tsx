import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./SearchBar.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "./useClickOutside";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getSearchData } from "api/axios/axiosSetting";

interface SearchResult {
  result: Type[];
}

interface Type {
  id: number;
  title: string;
}

function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchbarVisible, setSearchbarVisible] = useState<boolean>(true);
  const searchbarRef = useRef<HTMLDivElement | null>(null);
  const groupId = 1;

  const { data: searchResults, refetch } = useQuery<SearchResult>(
    ["search", keyword],
    () => getSearchData(groupId, keyword),
    {
      enabled: false,
    }
  );
  console.log(searchResults);
  //const { result } = searchResults;

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) refetch();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword, refetch]);

  const toggleSearchbar = async () => {
    setSearchbarVisible(!searchbarVisible);
  };

  useClickOutside(searchbarRef, () => {
    setSearchbarVisible(false);
  });

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <>
      <>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search title"
          value={keyword}
          onChange={onChangeData}
          onClick={toggleSearchbar}
        />
        <FontAwesomeIcon
          className={styles.searchIcon}
          icon={faMagnifyingGlass}
        />
      </>

      {searchbarVisible && searchResults && (
        <div className={styles.autoSearchContainer} ref={searchbarRef}>
          <ul>
            {searchResults.result.map((result: Type) => (
              <li
                className={styles.autoSearchData}
                key={result.id}
                onClick={() => {
                  setKeyword(result.title);
                }}
              >
                <Link
                  to={`/search?group_id=${groupId}&keyword=${result.title}`}
                >
                  <span>{result.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchBar;
