import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import styles from "./SearchBar.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "./useClickOutside";

interface autoDatas {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}
function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [keyItems, setKeyItems] = useState<autoDatas[]>([]);
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const fetchData = () => {
    return fetch(
      `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`
    )
      .then((res) => res.json())
      .then((data) => data.slice(0, 100));
  };
  interface Tag {
    includes(data: string): boolean;
    city?: any;
  }
  const updateData = async () => {
    const res = await fetchData();
    let b = res
      .filter(
        (list: Tag) =>
          list.city.toLowerCase().includes(keyword.toLowerCase()) === true
      )
      .slice(0, 10);
    setKeyItems(b);
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]); //키워드가 변경되면 api를 호출

  const searchbarRef = useRef<HTMLDivElement | null>(null);

  const [searchbarVisible, setSearchbarVisible] = useState<boolean>(false);

  useClickOutside(searchbarRef, () => {
    setSearchbarVisible(false);
  });

  useEffect(() => {
    if (keyword) {
      setSearchbarVisible(true);
      updateData();
    } else {
      setSearchbarVisible(false);
    }
  }, [keyword]);

  return (
    <>
      <>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search text"
          value={keyword}
          onChange={onChangeData}
          onClick={() => setSearchbarVisible(true)}
        />
        <FontAwesomeIcon
          className={styles.searchIcon}
          icon={faMagnifyingGlass}
        />
      </>

      {searchbarVisible && keyItems.length > 0 && keyword && (
        <div className={styles.autoSearchContainer} ref={searchbarRef}>
          <ul>
            {keyItems.map((search, idx) => (
              <li
                className={styles.autoSearchData}
                key={search.city}
                onClick={() => {
                  setKeyword(search.city);
                }}
              >
                <a href="#">{search.city}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
export default SearchBar;
