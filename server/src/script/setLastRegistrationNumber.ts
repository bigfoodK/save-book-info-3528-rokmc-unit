import db from '../db';

async function setLastRegistrationNumber(number: number) {
  await db.put('LastRegistrationNumber', number);
  console.log(`Last registration number is ${number}`);
}

setLastRegistrationNumber(parseInt(process.argv[2], 10));
