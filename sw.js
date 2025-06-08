// Nome do cache que vamos usar
const CACHE_NAME = 'plano-alimentar-cache-v1';
// Arquivos que queremos salvar em cache para uso offline
const urlsToCache = [
  '/',
  'dieta.html'
  // Adicione aqui outros arquivos se tiver, como CSS ou imagens.
];

// Evento de Instalação: Salva os arquivos em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta os pedidos
// Se o recurso estiver em cache, retorna a versão do cache.
// Se não, tenta buscar na rede.
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
