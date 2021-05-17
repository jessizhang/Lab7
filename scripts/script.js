// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let count = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        count+=1;
        newPost.id = count;
        newPost.addEventListener('click', ()=>{
          setState({name:'entry', id:newPost.id}, false);
        });
        document.querySelector('main').appendChild(newPost);
      });

    });
});

window.addEventListener('popstate', (e)=>{
  setState(e.state, true);
});

setState({name:'main'}, false);
let settings = document.querySelector('header img');
settings.addEventListener('click', ()=>{
  setState({name:'settings'}, false);
});

let home = document.querySelector('h1');
home.addEventListener('click', ()=>{
  setState({name: 'main'}, false);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}