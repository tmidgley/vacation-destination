(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new URL(`/vacation-destination/assets/destinations-iGz3b1as.json`,``+import.meta.url),t={family:new Set,retired:new Set,budget:new Set,solo:new Set,couples:new Set,surprise:new Set},n={family:null,retired:null,budget:null,solo:null,couples:null,surprise:null};async function r(){let t=await fetch(e);if(!t.ok)throw Error(`Unable to load destination data.`);return t.json()}function i(e,t){return t===`surprise`?e:e.filter(e=>e.travelType===t)}function a(e,r){if(e.length===0)return null;let i=t[r],a=n[r],o=e.filter(e=>!i.has(e.id));o.length===0&&(i.clear(),o=e.filter(e=>e.id!==a));let s=Math.floor(Math.random()*o.length),c=o[s];return i.add(c.id),n[r]=c.id,c}async function o(e){return a(i(await r(),e),e)}var s=`Cr0-Dcq3Ha49rBcDtUQLjORnNWTxdDgmRhlimmtDXGM`;async function c(e){let t=`https://api.unsplash.com/search/photos?query=${encodeURIComponent(e)}&per_page=20&orientation=landscape`,n=await fetch(t,{headers:{Authorization:`Client-ID ${s}`}});if(!n.ok)throw Error(`Unable to load destination photos.`);return(await n.json()).results}function l(e,t){return{id:e.id,imageUrl:e.urls.regular,alt:e.alt_description||`${t.name}, ${t.state}`,photographer:e.user.name,photographerUrl:e.user.links.html,photoUrl:e.links.html}}async function ee(e){return(await c(`${e.name} ${e.state}`)).map(t=>l(t,e))}var u=document.querySelector(`#photo-display`),d=document.querySelector(`#photo-indicators`),f=document.querySelector(`#previous-photo`),p=document.querySelector(`#next-photo`),m=document.querySelector(`#previous-photo-image`),h=document.querySelector(`#next-photo-image`),g=[],_=0,v;function y(){let e=g[_];e&&(u.innerHTML=`
        <figure class="photo-card">
            <img
                src="${e.imageUrl}"
                alt="${e.alt}"
            >

            <figcaption>
                Photo by
                <a
                    href="${e.photographerUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${e.photographer}
                </a>
                on
                <a
                    href="${e.photoUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Unsplash
                </a>
            </figcaption>
        </figure>
    `,b(),x())}function b(){let e=_-1,t=_+1;e<0&&(e=g.length-1),t>=g.length&&(t=0);let n=g[e],r=g[t];m.src=n.imageUrl,m.alt=`Previous: ${n.alt}`,h.src=r.imageUrl,h.alt=`Next: ${r.alt}`}function x(){d.textContent=`${_+1} / ${g.length}`}function S(){_++,_>=g.length&&(_=0),y()}function C(){_--,_<0&&(_=g.length-1),y()}function w(){clearInterval(v),v=setInterval(()=>{S()},5e3)}function T(e){if(g=e,_=0,g.length===0){u.innerHTML=`<p>No destination photos are available.</p>`,f.hidden=!0,p.hidden=!0,d.textContent=``;return}f.hidden=!1,p.hidden=!1,y(),w()}p.addEventListener(`click`,()=>{S(),w()}),f.addEventListener(`click`,()=>{C(),w()});var E=`daaeb038693b4d05acb623a22611d8cc`;function D(e){return{id:e.properties.place_id,name:e.properties.name,address:e.properties.formatted,website:e.properties.website,latitude:e.properties.lat,longitude:e.properties.lon}}async function O(e){let t=`https://api.geoapify.com/v2/places?categories=national_park,entertainment.zoo,entertainment.aquarium,entertainment.museum,entertainment.theme_park,beach,building.tourism,sport.stadium&filter=circle:${e.longitude},${e.latitude},32000&limit=20&apiKey=${E}`,n=await fetch(t);if(!n.ok)throw Error(`Unable to load nearby places.`);return(await n.json()).features.map(D).filter(e=>e.name).filter((e,t,n)=>t===n.findIndex(t=>t.name===e.name))}var k=`daaeb038693b4d05acb623a22611d8cc`,A;function j(e,t){let n=document.querySelector(`#nearby-map`);A&&A.remove(),A=new maplibregl.Map({container:n,style:`https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${k}`,center:[e.longitude,e.latitude],zoom:10}),new maplibregl.Marker({color:`#f4b942`}).setLngLat([e.longitude,e.latitude]).setPopup(new maplibregl.Popup().setHTML(`<strong>${e.name}, ${e.state}</strong>`)).addTo(A),t.forEach(e=>{new maplibregl.Marker({color:`#0b3954`}).setLngLat([e.longitude,e.latitude]).setPopup(new maplibregl.Popup().setHTML(`
                    <strong>${e.name}</strong>
                    <p>${e.address||`Address unavailable`}</p>
                    ${e.website?`<a href="${e.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>`:``}
                `)).addTo(A)})}var M=document.querySelector(`#main-view`),N=document.querySelector(`#selector-view`),P=document.querySelector(`#saved-view`),F=document.querySelector(`#selected-travel-type`),I=document.querySelector(`#destination-name`),L=document.querySelector(`#destination-description`),R=document.querySelector(`#cost-level`);function z(e){M.hidden=e!==`main`,N.hidden=e!==`selector`,P.hidden=e!==`saved`}function B(e){return{family:`Family Friendly`,retired:`Retired Traveler`,budget:`Low Budget`,solo:`Solo Traveler`,couples:`Couples`,surprise:`Surprise Me!`}[e]||``}function V(e){return{$:`Up to $1,000`,$$:`Up to $2,500`,$$$:`Up to $5,000`,$$$$:`$10,000+`}[e]||`Cost unavailable`}function H(e,t){F.textContent=B(t),I.textContent=`${e.name}, ${e.state}`,L.textContent=e.description,R.innerHTML=`
    <span class="cost-scale">
        ${e.costLevel}
    </span>

    <span class="cost-range">
        ${V(e.costLevel)}
    </span>

    <span class="cost-note">
        *Estimated cost based on a 7-day trip for two.
    </span>
`,z(`selector`)}async function U(e){let t=`https://api.open-meteo.com/v1/forecast?latitude=${e.latitude}&longitude=${e.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`,n=await fetch(t);if(!n.ok)throw Error(`Unable to load weather.`);return(await n.json()).current}function W(e){return e===0?`Clear`:e<=3?`Partly Cloudy`:e<=48?`Foggy`:e<=67?`Rain`:e<=77?`Snow`:e<=82?`Rain Showers`:e<=86?`Snow Showers`:`Thunderstorms`}function G(e){return e===0?`☀️`:e<=3?`⛅`:e<=48?`🌫️`:e<=67?`🌧️`:e<=77?`❄️`:e<=82?`🌦️`:e<=86?`🌨️`:`⛈️`}function K(e){let t=document.querySelector(`#weather-display`),n=W(e.weather_code);t.innerHTML=`
        <div class="weather-icon">
            ${G(e.weather_code)}
        </div>

        <div class="weather-details">
            <p class="weather-temperature">
                ${Math.round(e.temperature_2m)}°F
            </p>

            <p class="weather-description">
                ${n}
            </p>

            <p>
                Feels like ${Math.round(e.apparent_temperature)}°F
            </p>

            <p>
                Wind: ${Math.round(e.wind_speed_10m)} mph
            </p>
        </div>
    `}var q=document.querySelectorAll(`[data-travel-type]`),J=document.querySelector(`#choose-another`),Y=document.querySelector(`#start-over`),X=document.querySelector(`#home-link`),Z=document.querySelector(`#saved-nav`),Q=null;async function $(e){try{let t=await o(e);H(t,e),K(await U(t)),j(t,await O(t)),T(await ee(t))}catch(e){console.error(`Error loading destination:`,e)}}q.forEach(e=>{e.addEventListener(`click`,()=>{Q=e.dataset.travelType,$(Q)})}),J.addEventListener(`click`,()=>{$(Q)}),Y.addEventListener(`click`,()=>{Q=null,z(`main`)}),X.addEventListener(`click`,e=>{e.preventDefault(),Q=null,z(`main`)}),Z.addEventListener(`click`,()=>{z(`saved`)}),document.querySelector(`#current-year`).textContent=new Date().getFullYear();