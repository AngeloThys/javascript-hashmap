class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.load = 0;
    this.buckets = Array(capacity).fill(undefined);
  }

  grow() {
    let OldBuckets = this.buckets;
    let key = null;
    let value = null;
    this.capacity += 16;
    this.buckets = Array(this.capacity).fill(undefined);
    for (let i = 0; i < OldBuckets.length; ++i) {
      if (OldBuckets[i] !== undefined) {
        key = Object.keys(OldBuckets[0])[0];
        value = Object.values(OldBuckets[0])[0];
        this.set(key, value);
      }
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; ++i) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  load() {
    let maxLoad = this.loadFactor * this.capacity;

    return this.load >= maxLoad
  }

  set(key, value) {
    let index = this.hash(key);

    if (this.load()) this.grow();

    this.buckets[index] = { [key]: value };
    this.load += 1;
  }

  get(key) {
    let index = this.hash(key);

    return this.buckets[index] ?? null;
  }

  has(key) {
    let index = this.hash(key);

    return !!this.buckets[index]
  }

  remove(key) {
    let index = this.hash(key);

    if (this.buckets[index]) {
      this.buckets[index] = undefined;
      return true
    }

    return false;
  }
}
