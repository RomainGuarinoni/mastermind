export default class LocalStorageMock {
  private store: {
    [key: string]: string;
  };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(index: number) {
    const keys = Object.keys(this.store);
    if (index >= keys.length) {
      return null;
    }

    return keys[index];
  }
}
