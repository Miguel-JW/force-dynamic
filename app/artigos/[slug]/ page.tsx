// app/artigos/[slug]/page.tsx
import { buscarArtigos, buscarArtigoPorSlug } from '@/lib/artigos';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';

interface PageProps {
  params: { slug: string };
}

// Gera as rotas estáticas em build time (SSG)
export async function generateStaticParams() {
  const artigos = await buscarArtigos();
  return artigos.map(artigo => ({ slug: artigo.slug }));
}

// Metadados dinâmicos por artigo
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const artigo = await buscarArtigoPorSlug(params.slug);

  if (!artigo) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não foi encontrado.',
    };
  }

  return {
    title: `${artigo.titulo} | Blog`,
    description: artigo.resumo,
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      type: 'article',
      authors: [artigo.autor],
      publishedTime: artigo.data,
    },
  };
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArtigoPage({ params }: PageProps) {
  const artigo = await buscarArtigoPorSlug(params.slug);

  if (!artigo) notFound();

  return (
    <main className="pagina pagina--artigo">
      <Link href="/" className="voltar-link">&larr; Voltar para o blog</Link>

      <article>
        <header className="artigo__header">
          <h1>{artigo.titulo}</h1>
          <div className="artigo__meta">
            <span>{artigo.autor}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
          </div>
        </header>

        <div className="artigo__corpo">
          {artigo.conteudo.split('\n\n').map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
