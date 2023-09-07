import React, { Component } from 'react';
import { toast } from 'react-toastify';

import {
  SearchForm,
  SearchbarStyled,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handlerSearch = e => {
    this.setState({ searchQuery: e.target.value.trim().toLowerCase() });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery === '') {
      toast.warning('Enter a value in the search bar');
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handlerSubmit}>
          <SearchFormButton type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handlerSearch}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}
