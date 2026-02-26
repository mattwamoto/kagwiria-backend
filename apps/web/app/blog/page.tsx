import Link from 'next/link';
import { fetchCollection } from '../../lib/cms';

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  publishedOn?: string;
};

export default async function BlogPage() {
  const res = await fetchCollection<BlogPost>('/api/blog-posts?sort=publishedOn:desc');

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Blog</h1>
      <ul>
        {res.data.map((item) => (
          <li key={item.id} style={{ marginBottom: 16 }}>
            <div><strong>{item.attributes.title}</strong></div>
            <div>{item.attributes.excerpt}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{item.attributes.publishedOn}</div>
          </li>
        ))}
      </ul>
      <Link href="/">Back</Link>
    </main>
  );
}
