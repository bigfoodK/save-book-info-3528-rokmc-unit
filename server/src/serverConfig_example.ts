import { ServiceAccount } from 'google-spreadsheet';

type SercerConfig = {
	publicDirectory: string,
	http: {
		port: number,
	},
	corsAllows: string[],
	restAPI: {
		book: {
			apiKey: string,
			googleSpreadsheet: {
				sheetId: string,
				serviceAccount: ServiceAccount,
			},
		}
	},
};;

const config: SercerConfig = {
	publicDirectory: '../client/dist',
	http: {
		port: 8080,
	},
	corsAllows: [],
	restAPI: {
		book: {
			apiKey: 'your api key here',
			googleSpreadsheet: {
				sheetId: 'sheet id',
				serviceAccount: {
					"type": "service_account",
					"project_id": "something",
					"private_key_id": "something",
					"private_key": "-----BEGIN PRIVATE KEY-----\nlonglongstring\n-----END PRIVATE KEY-----\n",
					"client_email": "email",
					"client_id": "123123123123123",
					"auth_uri": "https://accounts.google.com/o/oauth2/auth",
					"token_uri": "https://oauth2.googleapis.com/token",
					"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
					"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/something.iam.gserviceaccount.com"
				}
			},
		}
	},
};

export default config;
