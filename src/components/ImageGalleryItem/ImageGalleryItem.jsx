import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = () => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src="" alt="" className={css.ImageGalleryItem_image} />
    </li>
  );
};
