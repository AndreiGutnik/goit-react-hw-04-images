import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  SearchForm,
  SearchbarStyled,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlerSearch = e => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handlerSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      toast.warning('Enter a value in the search bar');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handlerSubmit}>
        <SearchFormButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handlerSearch}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};
