import Koa from 'koa';
import searchBookByISBN, { SearchBookByISBNJsonResult } from './searchBookByISBN';
import config from '../../serverConfig';
import { SearchBookByISBNJsonError } from './searchBookByISBN';

export type ShowRequest = {
	isbn: string;
};

export default async function show(ctx: Koa.Context, next: () => Promise<any>) {
	const request = <ShowRequest> ctx.request.body;
	const isbn = request.isbn;
	if (!isbn) {
		ctx.body = JSON.stringify({
			isSucessful: false,
			message: 'ISBN not served',
		});
		return;
	}

	const searchResponse = await searchBookByISBN({
		cert_key: config.restAPI.book.apiKey,
		page_no: '1',
		page_size: '30',
		result_style: 'json',
		isbn,
	});

	const searchResponseAsError = searchResponse as SearchBookByISBNJsonError;
	if(searchResponseAsError.ERR_CODE) {
		ctx.body = JSON.stringify({
			isSucessful: false,
			message: "NLOK API error",
			errorCode: parseInt(searchResponseAsError.ERR_CODE, 10),
			errorMessage: searchResponseAsError.ERR_MESSAGE,
		});
		return;
	}

	const searchResponseAsResult = searchResponse as SearchBookByISBNJsonResult;
	if(searchResponseAsResult.docs.length < 1) {
		ctx.body = JSON.stringify({
			isSucessful: false,
			message: 'No such book exist',
		});
		return;
	}

	ctx.body = JSON.stringify({
		isSucessful: true,
		message: 'Saved book to google spreadsheed sucessfully',
		data: {
			result: searchResponseAsResult.docs[0],
		}
	});
}
