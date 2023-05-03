import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./SearchBar.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "./useClickOutside";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getSearchData } from "api/axios/axiosSetting";
import useUser from "components/form/User/Hook/useUser";

interface SearchResult {
  result: Type[];
}

interface Type {
  id: number;
  title: string;
}

function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchbarVisible, setSearchbarVisible] = useState<boolean>(false);
  const searchbarRef = useRef<HTMLDivElement | null>(null);
  const { LoginUserData } = useUser();

  const groupPk = LoginUserData?.group?.pk;
  const navigate = useNavigate();
  const location = useLocation();

  const { data: searchResults, refetch } = useQuery<SearchResult>(
    ["search", keyword],
    () => getSearchData(groupPk, keyword),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) refetch();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword, refetch]);

  useEffect(() => {
    if (!location.pathname.includes("search/group_id")) {
      setKeyword("");
    }
  }, [location.pathname]);

  const toggleSearchbar = async () => {
    setSearchbarVisible(!searchbarVisible);
  };

  useClickOutside(searchbarRef, () => {
    setSearchbarVisible(false);
  });

  const handleKeywordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleResultClick = (result: Type) => {
    setKeyword(result.title);
    setSearchbarVisible(false);
    navigate(`search/group_id/${groupPk}/keyword/${result.title}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작 방지
    navigateToSearchResult();
  };

  const navigateToSearchResult = () => {
    if (keyword) {
      navigate(`search/group_id/${groupPk}/keyword/${keyword}`);
      setSearchbarVisible(false);
    }
  };

  const handleClickSearchDiv = () => {
    navigateToSearchResult();
  };

  return (
    <>
      <form className={styles.searchWrapper} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search title"
          value={keyword}
          onChange={handleKeywordChange}
          onClick={toggleSearchbar}
        />

        <div className={styles.searchDiv} onClick={handleClickSearchDiv}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.searchIcon}
          />
        </div>

        {searchbarVisible &&
          searchResults &&
          searchResults.result.length > 0 && (
            <div className={styles.autoSearchContainer} ref={searchbarRef}>
              <ul>
                {searchResults.result.map((result: Type) => (
                  <li
                    className={styles.autoSearchData}
                    key={result.id}
                    onClick={() => {
                      handleResultClick(result);
                    }}
                  >
                    <span>{result.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </form>
    </>
  );
}

export default SearchBar;
