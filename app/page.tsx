// app/page.tsx
import { buscarArtigos } from '@/lib/artigos';
import ArtigoCard from '@/components/ArtigoCard';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog | Artigos sobre desenvolvimento web',
  description: 'Artigos sobre Next.js, React, SEO e boas práticas de desenvolvimento front-end.',
};

export default async function HomePage() {
  const artigos = await buscarArtigos();

  return (
    <main className="pagina">
      <header className="pagina__header">
        <h1>Blog</h1>
        <p>Artigos sobre desenvolvimento web, React e Next.js.</p>
      </header>

      <section className="lista-artigos">
        {artigos.map(artigo => (
          <ArtigoCard key={artigo.id} artigo={artigo} />
        ))}
      </section>
    </main>
  );
}
