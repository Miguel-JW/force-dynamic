// lib/artigos.ts
import slugify from 'slugify';

// ── Substitua SEU_TOKEN_AQUI pelo token gerado em https://crudcrud.com ──
const BASE_URL = 'https://crudcrud.com/api/SEU_TOKEN_AQUI/artigos';

export interface Artigo {
  _id?: string;
  id: number;
  titulo: string;
  autor: string;
  data: string;
  resumo: string;
  conteudo: string;
}

export interface ArtigoComSlug extends Artigo {
  slug: string;
}

export function gerarSlug(titulo: string): string {
  return slugify(titulo, { lower: true, strict: true, locale: 'pt' });
}

export async function buscarArtigos(): Promise<ArtigoComSlug[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`Erro ao buscar artigos: ${res.status}`);
  }

  const artigos: Artigo[] = await res.json();

  return artigos.map(artigo => ({
    ...artigo,
    slug: gerarSlug(artigo.titulo),
  }));
}

export async function buscarArtigoPorSlug(slug: string): Promise<ArtigoComSlug | null> {
  const artigos = await buscarArtigos();
  return artigos.find(a => a.slug === slug) ?? null;
}
