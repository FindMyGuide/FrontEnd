import React, { useState } from 'react';
import { ReactComponent as Search } from 'asset/icons/search.svg';
import { ReactComponent as X } from 'asset/icons/x.svg';
import styles from './SearchBar.module.css';

function SearchBar({ searchBar }) {
  const [input, setInput] = useState('');

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(input);
    // 검색 axios
    searchBar(input);
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className={styles.bar}>
          <Search type="submit" className={styles.search} />
          <input
            value={input}
            type="text"
            onChange={handleInput}
            className={styles.input}
            placeholder="가고 싶은 투어 상품의 제목을 검색해주세요"
          />
          {input ? <X onClick={() => setInput('')} className={styles.search} /> : null}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
