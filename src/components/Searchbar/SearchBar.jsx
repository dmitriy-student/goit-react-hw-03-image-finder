import { AiOutlineSearch } from 'react-icons/ai';
import css from './SearchBar.module.css';

export const Searchbar = () => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchForm_button}>
          <AiOutlineSearch size={20} />
        </button>

        <input
          className={css.SearchForm_input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
