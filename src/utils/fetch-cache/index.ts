const cache = new Map<string, unknown>();

export async function fetchWithCache(url: string, init: RequestInit) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const res = await fetch(url, init).then(res => res.json());
  cache.set(url, res);
  return res;
}