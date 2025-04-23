export const enableMocking = async () => {
  if (import.meta.env.MODE !== 'development') return

  const { worker } = await import('./browser')
  return worker.start()
}