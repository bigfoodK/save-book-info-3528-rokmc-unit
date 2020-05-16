import Config from '../../serverConfig';
import GoogleSpreadsheet, { SpreadsheetWorksheet } from 'google-spreadsheet';
import { SearchBookByISBNJsonResultDocEntry } from './searchBookByISBN';
import RegistrationNumber from '../../RegistrationNumber';

const sheetHeader = ['REG_NUM', 'COUNT','TITLE', 'AUTHOR', 'PUBLISHER', 'SUBJECT', 'KDC', 'EA_ISBN', 'SERIES_TITLE', 'SERIES_NO'];
let isAPIReady = false;
let sheet: SpreadsheetWorksheet | null = null;

function initSheet(sheet: SpreadsheetWorksheet) {
  sheet.resize({
    colCount: sheetHeader.length,
    rowCount: 1,
  });
  sheet.setHeaderRow(sheetHeader, (err: any) => {
    if (err) {
      throw err;
    }
  });
}

const googleSpreadsheet = new GoogleSpreadsheet(Config.restAPI.book.googleSpreadsheet.sheetId);
googleSpreadsheet.useServiceAccountAuth(Config.restAPI.book.googleSpreadsheet.serviceAccount, () => {
  googleSpreadsheet.getInfo((err, info) => {
    if (err) {
      throw err;
    }
    sheet = info.worksheets[0];
    sheet.getRows({
      limit: 1,
      offset: 0,
    }, (err, rows) => {
      if (err) {
        throw err;
      }
      if (!rows[0] && sheet) {
        initSheet(sheet);
      }
    });
    isAPIReady = true;
  });
});

export default async function saveBookToGoogleSpreadsheet(book: SearchBookByISBNJsonResultDocEntry): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if(!isAPIReady || !sheet) {
      return resolve(false);
    }
    const regNum = await RegistrationNumber.next();
    const newRow: { [key: string]: any } = {};
    Object.keys(book).forEach(key => {
      newRow[key] = (book as any)[key];
    });
    newRow['REG_NUM'] = regNum;
    newRow['COUNT'] = '=COUNTIF(OFFSET($H$2, 0, 0, ROW()-1, 1), OFFSET($H$1, ROW()-1, 0, 1, 1))';
    sheet.addRow(newRow, () => {
      resolve(true);
    });
  });
}
