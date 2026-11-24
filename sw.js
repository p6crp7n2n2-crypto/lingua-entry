const cacheName='lingua-entry-4a882d97841c766a';
const root=new URL('./',self.location.href);
const shell=new URL('index.html',root).href;
const bundle=new URL('course-4a882d97841c766a.bin',root).href;
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(cacheName);await c.addAll([shell,bundle]);await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const name of await caches.keys()){if(name.startsWith('lingua-entry-')&&name!==cacheName)await caches.delete(name)}await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 if(e.request.method!=='GET'||url.origin!==root.origin||!url.pathname.startsWith(root.pathname))return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(async r=>{
   if(!r.ok)throw Error('offline');return r
 }).catch(()=>caches.match(shell)));return}
 if(url.href===bundle)e.respondWith(caches.match(bundle).then(r=>r||fetch(e.request)));
});
