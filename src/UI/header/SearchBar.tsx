import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./SearchBar.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "./useClickOutside";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
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

  const toggleSearchbar = async () => {
    setSearchbarVisible(!searchbarVisible);
  };

  useClickOutside(searchbarRef, () => {
    setSearchbarVisible(false);
  });

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    navigate(`/search/group_id/${groupPk}/keyword/${keyword}`);
    e.preventDefault();
    setSearchbarVisible(false);
  };

  return (
    <>
      <form className={styles.searchWrapper} onSubmit={onSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search title"
          value={keyword}
          onChange={onChangeData}
          onClick={toggleSearchbar}
        />

        <div
          className={styles.searchDiv}
          onClick={() => {
            navigate(`/search/group_id/${groupPk}/keyword/${keyword}`);
            setSearchbarVisible(false);
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.searchIcon}
          />
        </div>

        {searchbarVisible &&
          searchResults &&
          searchResults.result.some((result) => result.title !== "") && (
            <div className={styles.autoSearchContainer} ref={searchbarRef}>
              <ul>
                {searchResults.result.map((result: Type) => (
                  <li
                    className={styles.autoSearchData}
                    key={result.id}
                    onClick={() => {
                      setKeyword(result.title);
                      setSearchbarVisible(false);
                    }}
                  >
                    <Link
                      to={`/search/group_id/${groupPk}/keyword/${result.title}`}
                    >
                      <span>{result.title}</span>
                    </Link>
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
