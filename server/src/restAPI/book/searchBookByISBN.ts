import fetch from 'node-fetch';

export type SearchBookByISBNOption = {
  cert_key: string;
  result_style: string;
  page_no: string;
  page_size: string;
  isbn?: string;
  set_isbn?: string;
  ebook_yn?: string;
  title?: string;
  start_publish_date?: string;
  end_publish_date?: string;
  cip_yn?: string;
  series_title?: string;
  publisher?: string;
  author?: string;
  sort?: 'PUBLISH_PREDATE' | 'INPUT_DATE' | 'INDEX_TITLE' | 'INDEX_PUBLISHER';
  order_by?: 'ASC' | 'DES';
};

export type SearchBookByISBNJsonResultDocEntry = {
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
}

export type SearchBookByISBNJsonResult = {
  PAGE_NO: string;
  TOTAL_COUNT: string;
  docs: SearchBookByISBNJsonResultDocEntry[];
};

export type SearchBookByISBNJsonError = {
  ERR_MESSAGE: string;
  ERR_CODE: '000' | '010' | '011' | '012';
  RESULT: 'ERROR';
};

export default async function searchBookByISBN(option: SearchBookByISBNOption): Promise<SearchBookByISBNJsonResult | SearchBookByISBNJsonError> {
  const requestParamsArray: string[] = [];
  Object.entries(option).forEach(([key, value]) => {
    requestParamsArray.push(`${key}=${value}`);
  });;
  const requestParams = requestParamsArray.join('&');

  const response = await fetch(`http://seoji.nl.go.kr/landingPage/SearchApi.do?${requestParams}`);
  return <SearchBookByISBNJsonResult | SearchBookByISBNJsonError> await response.json();
}
