import Book from './book';

export interface RestAPIResponseBase {
  isSucessful: boolean;
  message: string;
}

function setHost(hostURL: string) {
  RestAPI.host = hostURL;
}

const RestAPI = {
  host: '/restAPI/',
  setHost,
  Book,
};

export default RestAPI;
