// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="pagina pagina--404">
      <h1>404</h1>
      <p>Artigo não encontrado.</p>
      <Link href="/" className="voltar-link">&larr; Voltar para o blog</Link>
    </main>
  );
}
