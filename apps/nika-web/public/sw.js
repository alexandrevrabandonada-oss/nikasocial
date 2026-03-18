/**
 * Service Worker – Nika PWA
 *
 * [STUB] Este arquivo é um placeholder para o service worker.
 * Implementação real será feita com Workbox no Tijolo 06.
 *
 * Por ora: apenas garante que o SW pode ser registrado sem erros.
 * Headers corretos já estão configurados em next.config.ts.
 *
 * Funcionalidades planejadas:
 * - Cache de assets estáticos (precaching via Workbox)
 * - Offline fallback page
 * - Background sync para posts offline
 * - Push notifications (via Web Push API)
 */

const CACHE_VERSION = 'v1'
const CACHE_NAME = `nika-${CACHE_VERSION}`

self.addEventListener('install', (event) => {
  console.warn('[nika/sw] Service Worker instalado – stub v1')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Limpa caches antigas ao ativar nova versão
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // [STUB] Comportamento padrão – passa tudo para a rede
  // Substituir por estratégia Workbox no Tijolo 06
})
