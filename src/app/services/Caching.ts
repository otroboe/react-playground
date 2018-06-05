export class Caching {

  private storage: Storage = window.localStorage;

  public hasItem(key: string): Boolean {
    return this.storage.getItem(key) !== null;
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}

export default Caching;
