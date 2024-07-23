export function tempoDesdeCriacao(created_at: string): string {
  const agora = new Date();
  const criadoEm = new Date(created_at);
  const diferencaMilissegundos = Math.abs(agora.getTime() - criadoEm.getTime());

  const minutos = Math.floor(diferencaMilissegundos / (1000 * 60));
  const horas = Math.floor(diferencaMilissegundos / (1000 * 60 * 60));
  const dias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);

  if (anos > 0) return `Há ${anos} ano${anos > 1 ? 's' : ''}`;
  if (meses > 0) return `Há ${meses} mes${meses > 1 ? 'es' : ''}`;
  if (dias > 0) return `Há ${dias} dia${dias > 1 ? 's' : ''}`;
  if (horas > 0) return `Há ${horas} hora${horas > 1 ? 's' : ''}`;
  return `Há ${minutos} minuto${minutos > 1 ? 's' : ''}`;
}
