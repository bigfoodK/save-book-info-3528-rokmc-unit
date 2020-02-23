import React, { Component } from 'react';
import styled from 'styled-components';
import RestAPI from '../../restAPI';

const Container = styled.div`
  display: inline-block;
  max-width: 80%;
`;

const ISBNInput = styled.input`
  width: 100%;
  background-color: #CCC;
  border: solid 0.25em #444;
  font-size: 5vmin;
  text-align: center;
  transition: all .3s;

  :focus {
    border: solid 0.25em #555;
    background-color: #EEE;
  }
`;

async function save(isbn: string) {
  const response = await RestAPI.Book.save(isbn);
  if (!response.isSucessful) {
    switch (response.message) {
      case 'NLOK API error':
      case 'ISBN not served':
      case 'Saving book to google spreadsheed failed': {
        alert(response.message + '\nTry again!');
        break;
      }
  
      case 'No such book exist': {
        alert(response.message);
        break;
      }
    }
    return false;
  }
  alert('Book sucessfully added!');
  return true;
}

function isNumberString(string: string) {
  for (let i = 0; i < string.length; i += 1) {
    const charCode = string.charCodeAt(i);
    if (charCode < 48 || 57 < charCode) {
      return false;
    }
  }
  return true;
}

type SaveBookProp = {
};

type SaveBookState = {
  isbn: string,
};

class SaveBook extends Component<SaveBookProp, SaveBookState> {
  constructor(props: SaveBookProp) {
    super(props);
    this.state = {
      isbn: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  async handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      isbn: event.target.value,
    });
  }

  async handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') {
      return;
    }
    const isbn = this.state.isbn;
    if (!isbn) {
      alert('ISBN input is empty');
      return;
    }
    if (!isNumberString(isbn) || isbn.length !== 13) {
      alert('Wrong ISBN');
      return;
    }
    const isSaved = await save(isbn);
    if (isSaved) {
      this.setState({
        isbn: '',
      });
    }
  }

  render() {
    return  (
      <Container>
        <ISBNInput
          placeholder="ISBN13"
          type="number"
          value={ this.state.isbn }
          onChange={ this.handleChange }
          onKeyPress={ this.handleKeyPress }
        />
      </Container>
    );
  }
}

export default SaveBook;
