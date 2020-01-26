import RestAPI, { RestAPIResponseBase } from '..';
import path from 'path';
import Book from '.';

const name = 'save';

export default async function save(isbn: string) {
  const rawResponse = await fetch(RestAPI.host + path.join(Book.name, name), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isbn,
    }),
  });
  return await rawResponse.json() as RestAPIResponseBase;
}
