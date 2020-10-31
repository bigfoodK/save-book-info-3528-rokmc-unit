import RestAPI, { RestAPIResponseBase } from '..';
import path from 'path';
import Book from '.';

const name = 'show';

export default async function show(isbn: string) {
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
