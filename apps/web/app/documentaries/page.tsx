import Link from 'next/link';
import { fetchCollection } from '../../lib/cms';

type Documentary = {
  title: string;
  slug: string;
  logline: string;
  status: string;
  releaseDate?: string;
};

export default async function DocumentariesPage() {
  const res = await fetchCollection<Documentary>('/api/documentaries?sort=releaseDate:desc');

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Documentaries</h1>
      <ul>
        {res.data.map((item) => (
          <li key={item.id} style={{ marginBottom: 16 }}>
            <div><strong>{item.attributes.title}</strong></div>
            <div>{item.attributes.logline}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{item.attributes.status}</div>
          </li>
        ))}
      </ul>
      <Link href="/">Back</Link>
    </main>
  );
}
