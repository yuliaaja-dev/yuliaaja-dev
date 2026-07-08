/*
=========================================
Pong PWA
Service Worker
=========================================
*/

const CACHE_NAME = "pong-pwa-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./offline.html",

    "./images/icons/icon-192.png",
    "./images/icons/icon-512.png"
];

/* ===========================
   Install
=========================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(FILES_TO_CACHE))

        .then(() => self.skipWaiting())

    );

});

/* ===========================
   Activate
=========================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(keys => Promise.all(

            keys.map(key => {

                if(key !== CACHE_NAME){

                    return caches.delete(key);

                }

            })

        ))

        .then(() => self.clients.claim())

    );

});

/* ===========================
   Fetch
=========================== */

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            if(response){

                return response;

            }

            return fetch(event.request)

            .then(networkResponse => {

                const clone = networkResponse.clone();

                caches.open(CACHE_NAME)

                .then(cache => {

                    cache.put(event.request, clone);

                });

                return networkResponse;

            })

            .catch(() => {

                if(event.request.mode === "navigate"){

                    return caches.match("./offline.html");

                }

            });

        })

    );

});