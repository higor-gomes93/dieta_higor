// Aumentar a versão do cache força o navegador a atualizar
const CACHE_NAME = 'plano-alimentar-cache-v3';
// Usar caminhos absolutos para os ficheiros
const urlsToCache = [
  '/dieta/',
  '/dieta/index.html',
  '/dieta/manifest.json'
];

// Apaga caches antigos na ativação
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// Evento de Instalação: Salva os ficheiros em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Interceta os pedidos
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrar
        if (response) {
          return response;
        }
        // Senão, busca na rede
        return fetch(event.request);
      }
    )
  );
});
