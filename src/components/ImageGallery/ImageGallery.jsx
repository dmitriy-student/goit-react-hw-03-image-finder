import React, { Component } from 'react';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import Message from '../Message/Message';

export default class ImageGallery extends Component {
  state = {
    images: [],
    showModal: false,
    total: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.request !== this.props.request ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ images: [], total: null });
      this.props.HandleStatusChange('pending');
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.request}&page=1&key=36188192-df3cf63ec6f6149d9f5656270&image_type=photo&orientation=horizontal&per_page=${this.props.page}`
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(new Error('Ooops...'));
          })
          .then(images =>
            this.setState({ images: images.hits, total: images.total })
          )
          .catch(error => this.setState({ error }))
          .finally(this.props.HandleStatusChange('resolve'));
      }, 1000);
    }
  }

  onOpenModal = largeImageURL => {
    window.addEventListener('keydown', this.closeModalonESC);

    this.setState({ showModal: true, largeImageURL });
  };

  closeModalonESC = evt => {
    if (evt.code === 'Escape') {
      this.setState({ showModal: false });
      window.removeEventListener('keydown', this.closeModalonESC);
    }
  };

  closeModalonOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      this.setState({ showModal: false });
      window.removeEventListener('keydown', this.closeModalonESC);
    }
  };

  render() {
    return (
      <>
        {this.state.total === 0 && <Message request={this.props.request} />}
        <ul className={css.ImageGallery}>
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageUrl={image.webformatURL}
              tags={image.tags}
              largeImageURL={image.largeImageURL}
              modalOpen={this.onOpenModal}
            />
          ))}
        </ul>
        {this.state.showModal && (
          <Modal
            closeModal={this.closeModalonOverlay}
            largeImageURL={this.state.largeImageURL}
          />
        )}
      </>
    );
  }
}
