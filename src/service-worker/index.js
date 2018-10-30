import idb from 'idb';

const data = 'https://raw.githubusercontent.com/LightDiscord/NixInfos/gh-pages';

const split = separator => string => string.split(separator);

const filter = (...args) => list => list.filter(...args);
const map = (...args) => list => list.map(...args);

console.log(':wave: from service-worker')
console.log('test')

self.addEventListener('install', (event) => {
  console.log('event install fired')

  event.waitUntil(Promise.resolve())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(createPackagesDB())
})

const createPackagesDB = () => {
  idb.open('packages', 1, (db) => {
    return fetch(`${data}/packages/entries`)
      .then(response => response.text())
      .then(split('\n'))
      .then(filter(channel => !!channel))
      .then(map(db.createObjectStore))
      .then(Promise.all.bind.Promise)
  })
}

self.addEventListener('fetch', (event) => {
  const { origin, pathname } = new URL(event.request.url);

  if (origin === self.origin && pathname.startsWith('/api/')) {
    console.log('api request')

    const resources = [
      {
        test: pathname => pathname === '/api/packages/channels',
        resource: (pathname) => {
          console.log('mdr trop drole')

          return Promise.resolve('lol')
        }
      },
      {
        test: pathname => pathname === '/api/packages/nixos-unstable',
        resource: (pathname) => {
          console.log('mdr trop drole')

          return fetch(`${data}/packages/nixos-unstable.gz`)
            .then(response => response.json())
            .then(console.log)
        }
      },
      {
        test: () => true,
        resource: () => {
          return Promise.reject('Not found')
        }
      }
    ]

    const { resource } = resources.find(resource => resource.test(pathname));

    event.respondWith(resource(pathname))
  } else {
    console.log('normal request')

    event.respondWith(fetch(event.request))
  }
})
