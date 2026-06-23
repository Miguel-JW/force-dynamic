// components/ArtigoCard.tsx
import Link from 'next/link';
import type { ArtigoComSlug } from '@/lib/artigos';

function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArtigoCard({ artigo }: { artigo: ArtigoComSlug }) {
  return (
    <article className="artigo-card">
      <Link href={`/artigos/${artigo.slug}`} className="artigo-card__link">
        <h2 className="artigo-card__titulo">{artigo.titulo}</h2>
        <p className="artigo-card__resumo">{artigo.resumo}</p>
        <div className="artigo-card__meta">
          <span>{artigo.autor}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
        </div>
      </Link>
    </article>
  );
}
