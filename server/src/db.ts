import Db from 'level-ts';
import Path from 'path';

console.log(Path.join(__dirname, 'db'));

const db = new Db(Path.join(__dirname, 'db'));

export default db;
