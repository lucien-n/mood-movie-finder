interface CacheItem {
  value: string;
  expiratesAt: number;
}

export class Cacher {
  #cache: Map<string, CacheItem> = new Map();

  constructor() {}

  set(key: string, value: string, timeMs: number): void {
    const cacheItem: CacheItem = {
      value,
      expiratesAt: Date.now() + timeMs,
    };

    this.#cache.set(key, cacheItem);
  }

  get(key: string): string | null {
    const cachedItem = this.#cache.get(key);
    if (!cachedItem) {
      return null;
    }

    if (Cacher.isExpired(cachedItem)) {
      this.delete(key);
      return null;
    }

    return cachedItem.value;
  }

  delete(key: string): void {
    this.#cache.delete(key);
  }

  static isExpired(cacheItem: CacheItem) {
    return Date.now() > cacheItem.expiratesAt;
  }
}

export const cacher = new Cacher();
