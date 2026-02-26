import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Kagwiria Reader</h1>
      <ul>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/vlogs">Vlogs</Link></li>
        <li><Link href="/documentaries">Documentaries</Link></li>
      </ul>
    </main>
  );
}
