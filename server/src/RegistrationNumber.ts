import db from './db';

class RegistrationNumberManager{
  private lastRegistrationNumber = 0;

  public getlast() {
    return this.lastRegistrationNumber;
  }

  public async setLast(number: number) {
    await db.put('LastRegistrationNumber', number);
    return;
  }

  public async next() {
    const next = this.lastRegistrationNumber += 1;
    await this.setLast(next);
    return next;
  }

  public async initialize() {
    const lastRegistrationNumber = await db.get('LastRegistrationNumber').catch(async () => {
      await db.put('LastRegistrationNumber', 0);
      return 0;
    });
    console.log(`Last registration number is ${lastRegistrationNumber}`);
    this.lastRegistrationNumber = lastRegistrationNumber;
  }
}

export default new RegistrationNumberManager();
