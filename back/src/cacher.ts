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
      expiratesAt: new Date().getTime() + timeMs,
    };

    this.#cache.set(key, cacheItem);
  }

  get(key: string): string | null {
    const cachedItem = this.#cache.get(key);
    if (!cachedItem) {
      return null;
    }

    if (Cacher.isExpired(cachedItem)) {
      this.#cache.delete(key);
      return null;
    }

    return cachedItem.value;
  }

  static isExpired(cacheItem: CacheItem) {
    return new Date().getTime() > cacheItem.expiratesAt;
  }
}

export const cacher = new Cacher();
