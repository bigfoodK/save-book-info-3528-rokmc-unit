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

async function show(isbn: string) {
  const response = await RestAPI.Book.show(isbn);
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
  
  return (response as any).data.result as {
    TITLE: string;
    VOL: string;
    SERIES_TITLE: string;
    SERIES_NO: string;
    AUTHOR: string;
    EA_ISBN: string;
    EA_ADD_CODE: string;
    SET_ISBN: string;
    SET_ADD_CODE: string;
    SET_EXPRESSION: string;
    PUBLISHER: string;
    EDITION_STMT: string;
    PRE_PRICE: string;
    KDC: string;
    DDC: string;
    PAGE: string;
    BOOK_SIZE: string;
    FORM: string;
    PUBLISH_PREDATE: string;
    SUBJECT: string;
    EBOOK_YN: string;
    CIP_YN: string;
    CONTROL_NO: string;
    TITLE_URL: string;
    BOOK_TB_CNT_URL: string;
    BOOK_INTRODUCTION_URL: string;
    BOOK_SUMMARY_URL: string;
    PUBLISHER_URL: string;
    INPUT_DATE: string;
    UPDATE_DATE: string;
  };
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
  title: string,
  author: string,
  publisher: string,
  subject: string,
  kdc: string,
};

class SaveBook extends Component<SaveBookProp, SaveBookState> {
  constructor(props: SaveBookProp) {
    super(props);
    this.state = {
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      subject: '',
      kdc: '',
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
    const isSaved = await show(isbn);
    if (isSaved) {
      this.setState({
        isbn: '',
        title: isSaved.TITLE,
        author: isSaved.AUTHOR,
        publisher: isSaved.PUBLISHER,
        subject: isSaved.SUBJECT,
        kdc: isSaved.KDC,
      });
    }
  }

  render() {
    return  (
      <Container style={{color: '#FFF'}}>
        <ISBNInput
          placeholder="ISBN13"
          type="number"
          value={ this.state.isbn }
          onChange={ this.handleChange }
          onKeyPress={ this.handleKeyPress }
        />
        <div>{`title: ${this.state.title}`}</div>
        <div>{`author: ${this.state.author}`}</div>
        <div>{`publisher: ${this.state.publisher}`}</div>
        <div>{`subject: ${this.state.subject}`}</div>
        <div>{`kdc: ${this.state.kdc}`}</div>
      </Container>
    );
  }
}

export default SaveBook;
