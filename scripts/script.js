// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}



document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, index) => {
        let newPost = document.createElement('journal-entry');
        entry.number = index + 1;
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.onclick = () => {
          router.setState('entry', entry, true);
        }
      });
    });
});

history.pushState({state: 'home'}, document.title, window.location.origin);

window.onpopstate = (event) => {
  console.log(event);
  router.setState(event.state.state, event.state.entry, false);
}

document.getElementsByTagName('img')[0].onclick = () => {
  router.setState('settings', null, true);
}

document.querySelector('header h1').onclick = () => {
  router.setState('home', null, true);
}
