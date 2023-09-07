import React from 'react';
import { ScrollUpIcon, ScrollUpStyled } from './ScrollUp.styled';

export function ScrollUp({ onClick }) {
  return (
    <ScrollUpStyled onClick={onClick}>
      <ScrollUpIcon />
    </ScrollUpStyled>
  );
}
