import { Component } from 'react';
import toast from 'react-hot-toast';
import { BiSearchAlt2 } from 'react-icons/bi';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchbarStyle,
} from './Searchbar.styled';

export class Searhbar extends Component {
  state = {
    page: 1,
    query: '',
  };

  handleSearchQuery = evt => {
    this.setState({ query: evt.target.value.toLowerCase().trim() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.query.trim() === '') {
      toast.success('Please fill out the search field');
      return;
    }

    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormInput
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchQuery}
            value={this.state.query}
          />
          <SearchFormBtn type="submit">
            <BiSearchAlt2 size={32} />
          </SearchFormBtn>
        </SearchForm>
      </SearchbarStyle>
    );
  }
}
