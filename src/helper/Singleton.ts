class Singleton {
  static instance: any;
  loading: boolean | undefined;
  constructor() {
    if (Singleton.instance) {
      this.loading = false;
      Singleton.instance = this;
    }

    return Singleton.instance;
  }

  getLoading() {
    return this.loading;
  }

  setLoading(flag: boolean) {
    this.loading = flag;
  }
}

// Ensure only one instance exists by freezing the prototype
const instance = new Singleton();
Object.freeze(instance);

export default instance;
