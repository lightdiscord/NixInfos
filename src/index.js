import { Elm } from './Main.elm';

Elm.Main.init({
  node: document.querySelector('main'),
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
      .then(registration => console.log('Service worker registred', registration))
      .catch(error => console.error('Error during registration', error))
  })
}
