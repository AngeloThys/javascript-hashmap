class HashMap {

  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.increment = capacity;
    this.loadFactor = loadFactor;
    this.load = 0;
    this.buckets = Array(capacity).fill(undefined);
  }

  grow() {
    let OldBuckets = this.buckets;
    let key = null;
    let value = null;
    this.capacity += this.increment;
    this.buckets = Array(this.capacity).fill(undefined);
    this.load = 0;
    for (let i = 0; i < OldBuckets.length; ++i) {
      if (OldBuckets[i] !== undefined) {
        key = Object.keys(OldBuckets[i])[0];
        value = Object.values(OldBuckets[i])[0];
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

  isOverLoad() {
    let maxLoad = this.loadFactor * this.capacity;

    return this.load >= maxLoad
  }

  set(key, value) {
    let index = this.hash(key);

    if (this.isOverLoad()) {
      this.grow();
    }

    this.buckets[index] = { [key]: value };
    this.load += 1;
  }

  get(key) {
    let index = this.hash(key);
    let obj = this.buckets[index];

    if (obj) {
      return Object.values(obj)[0];
    }

    return null
  }

  has(key) {
    let index = this.hash(key);

    return !!this.buckets[index]
  }

  remove(key) {
    let index = this.hash(key);

    if (this.buckets[index]) {
      this.buckets[index] = undefined;
      this.load -= 1;
      return true
    }

    return false;
  }

  length() {
    return this.load;
  }

  clear() {
    this.buckets = Array(this.capacity).fill(undefined);
    this.load = 0;
  }

  keys() {
    return this.buckets.reduce((keyList, entry) => {
      if (entry !== undefined) {
        keyList.push(Object.keys(entry)[0]);
      }
      return keyList;
    }, []);
  }

  values() {
    return this.buckets.reduce((valueList, entry) => {
      if (entry !== undefined) {
        valueList.push(Object.values(entry)[0]);
      }
      return valueList;
    }, []);
  }

  entries() {
    return this.buckets.reduce((entryList, entry) => {
      if (entry !== undefined) {
        entryList.push(Object.entries(entry)[0]);
      }
      return entryList;
    }, []);
  }
}

