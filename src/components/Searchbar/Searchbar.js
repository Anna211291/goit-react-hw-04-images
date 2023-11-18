import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSearchAlt2 } from 'react-icons/bi';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchbarStyle,
} from './Searchbar.styled';

export const Searhbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchQuery = evt => {
    setQuery(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      toast.success('Please fill out the search field');
      return;
    }
    
    onSubmit(query);
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchQuery}
          value={query}
        />
        <SearchFormBtn type="submit">
          <BiSearchAlt2 size={32} />
        </SearchFormBtn>
      </SearchForm>
    </SearchbarStyle>
  );
};
