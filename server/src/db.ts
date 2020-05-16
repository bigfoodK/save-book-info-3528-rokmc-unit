import Db from 'level-ts';
import Path from 'path';

const db = new Db(Path.join(__dirname, '../db'));

export default db;
