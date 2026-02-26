import Link from 'next/link';
import { fetchCollection } from '../../lib/cms';

type Vlog = {
  title: string;
  slug: string;
  summary: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
};

export default async function VlogsPage() {
  const res = await fetchCollection<Vlog>('/api/vlogs?sort=publishedOn:desc');

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Vlogs</h1>
      <ul>
        {res.data.map((item) => (
          <li key={item.id} style={{ marginBottom: 16 }}>
            <div><strong>{item.attributes.title}</strong></div>
            <div>{item.attributes.summary}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{item.attributes.youtubeUrl}</div>
          </li>
        ))}
      </ul>
      <Link href="/">Back</Link>
    </main>
  );
}
