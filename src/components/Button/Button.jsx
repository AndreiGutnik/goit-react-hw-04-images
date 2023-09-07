import React from 'react';
import { ButtonStyled } from './Button.styled';

export function ButtonLoadMore({ onClick }) {
  return <ButtonStyled onClick={onClick}>Load more</ButtonStyled>;
}
