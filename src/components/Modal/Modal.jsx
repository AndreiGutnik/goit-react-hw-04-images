import React, { Component } from 'react';
import { IconClose, ModalStyled, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  onModalClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { currentImageURL, tags } = this.props;
    return (
      <Overlay onClick={this.onModalClose}>
        <ModalStyled>
          <img src={currentImageURL} alt={tags} />
        </ModalStyled>
        <IconClose onClick={this.onModalClose} />
      </Overlay>
    );
  }
}
