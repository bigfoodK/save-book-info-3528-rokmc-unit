declare module 'google-spreadsheet' {
	export type ServiceAccount = {
		type: string;
		project_id: string;
		private_key_id: string;
		private_key: string;
		client_email: string;
		client_id: string;
		auth_uri: string;
		token_uri: string;
		auth_provider_x509_cert_url: string;
		client_x509_cert_url: string;
	};

	export type SpreadsheetRow = { [key: string]: any } & {
		save(callback?: Function): void;
		del(callback?: Function): void;
	}

	export type SpreadsheetWorksheetGetRowsOptions = {
		offset?: number;
    limit?: number;
    orderby?: string;
	};

	export type SpreadsheetWorksheetGetCellsOptions = {
		'min-row'?: number;
		'max-row'?: number;
		'return-empty'?: boolean;
	};

	export type SpreadsheetWorksheetResizeOptions = {
		rowCount: number;
		colCount: number;
	};

	export class SpreadsheetWorksheet {
		public url: string;
		public id: string;
		public title: string;
		public rowCount: number;
		public colCount: number;

		public getRows(options: SpreadsheetWorksheetGetRowsOptions, callback?: (err: Error, rows: SpreadsheetRow[]) => void): void;
		public getCells(options: SpreadsheetWorksheetGetCellsOptions, callback?: Function): void;
		public addRow(newRow: {[key: string]: any}, callback?: Function): void;
		public setHeaderRow(values: string[], callback?: Function): void;
		public resize(options: SpreadsheetWorksheetResizeOptions, callback?: Function): void;
	}

	export type SpreadsheetInfo = {
		id: string;
		title: string;
		updated: number;
		author: {
			name: string;
			email: string;
		};
		worksheets: SpreadsheetWorksheet[];
	};

	export default class GoogleSpreadsheet {
		public constructor(sheet_id: string);

		public useServiceAccountAuth(account_info: ServiceAccount, callback?: Function): void;

		public getInfo(callback?: (err: Error, info: SpreadsheetInfo) => void): void;
	}
}
