import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/SearchBar';

export const App = () => {
  return (
    <div className={css.App}>
      <Searchbar />
      <ImageGallery />
      <Loader />
      <Button />
    </div>
  );
};
