export type CmsItem<T> = { id: number; attributes: T };
export type CmsResponse<T> = { data: CmsItem<T>[] };

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';

export async function fetchCollection<T>(path: string) {
  const res = await fetch(`${CMS_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status}`);
  }
  return (await res.json()) as CmsResponse<T>;
}
