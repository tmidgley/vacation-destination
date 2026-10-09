(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new URL(`/vacation-destination/assets/destinations-iGz3b1as.json`,``+import.meta.url),t={family:new Set,retired:new Set,budget:new Set,solo:new Set,couples:new Set,surprise:new Set},n={family:null,retired:null,budget:null,solo:null,couples:null,surprise:null};async function r(){let t=await fetch(e);if(!t.ok)throw Error(`Unable to load destination data.`);return t.json()}function i(e,t){return t===`surprise`?e:e.filter(e=>e.travelType===t)}function a(e,r){if(e.length===0)return null;let i=t[r],a=n[r],o=e.filter(e=>!i.has(e.id));o.length===0&&(i.clear(),o=e.filter(e=>e.id!==a));let s=Math.floor(Math.random()*o.length),c=o[s];return i.add(c.id),n[r]=c.id,c}async function o(e){return a(i(await r(),e),e)}var s=`savedDestinations`;function c(){let e=localStorage.getItem(s);return e?JSON.parse(e):[]}function ee(e){let t=c();t.some(t=>t.id===e.id)||(t.push(e),localStorage.setItem(s,JSON.stringify(t)))}function te(e){let t=c().filter(t=>t.id!==e);localStorage.setItem(s,JSON.stringify(t))}var l=`Cr0-Dcq3Ha49rBcDtUQLjORnNWTxdDgmRhlimmtDXGM`;async function u(e){let t=`https://api.unsplash.com/search/photos?query=${encodeURIComponent(e)}&per_page=20&orientation=landscape`,n=await fetch(t,{headers:{Authorization:`Client-ID ${l}`}});if(!n.ok)throw Error(`Unable to load destination photos.`);return(await n.json()).results}function d(e,t){return{id:e.id,imageUrl:e.urls.regular,alt:e.alt_description||`${t.name}, ${t.state}`,photographer:e.user.name,photographerUrl:e.user.links.html,photoUrl:e.links.html}}async function ne(e){return(await u(`${e.name} ${e.state}`)).map(t=>d(t,e))}var f=document.querySelector(`#photo-display`),p=document.querySelector(`#photo-indicators`),m=document.querySelector(`#previous-photo`),h=document.querySelector(`#next-photo`),g=document.querySelector(`#previous-photo-image`),_=document.querySelector(`#next-photo-image`),v=[],y=0,b;function x(){let e=v[y];e&&(f.innerHTML=`
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
    `,re(),S())}function re(){let e=y-1,t=y+1;e<0&&(e=v.length-1),t>=v.length&&(t=0);let n=v[e],r=v[t];g.src=n.imageUrl,g.alt=`Previous: ${n.alt}`,_.src=r.imageUrl,_.alt=`Next: ${r.alt}`}function S(){p.textContent=`${y+1} / ${v.length}`}function C(){y++,y>=v.length&&(y=0),x()}function ie(){y--,y<0&&(y=v.length-1),x()}function w(){clearInterval(b),b=setInterval(()=>{C()},5e3)}function T(e){clearInterval(b),v=e,y=0;let t=document.querySelector(`.photo-carousel`);if(v.length===0){t.classList.add(`carousel-empty`),f.textContent=`Destination photos are currently unavailable.`,m.hidden=!0,h.hidden=!0,p.textContent=``;return}t.classList.remove(`carousel-empty`),m.hidden=!1,h.hidden=!1,x(),w()}m.addEventListener(`click`,()=>{ie(),w()}),h.addEventListener(`click`,()=>{C(),w()});var ae=`daaeb038693b4d05acb623a22611d8cc`;function oe(e){return{id:e.properties.place_id,name:e.properties.name,address:e.properties.formatted,website:e.properties.website,latitude:e.properties.lat,longitude:e.properties.lon}}async function se(e){let t=`https://api.geoapify.com/v2/places?categories=national_park,entertainment.zoo,entertainment.aquarium,entertainment.museum,entertainment.theme_park,beach,building.tourism,sport.stadium&filter=circle:${e.longitude},${e.latitude},32000&limit=20&apiKey=${ae}`,n=await fetch(t);if(!n.ok)throw Error(`Unable to load nearby places.`);return(await n.json()).features.map(oe).filter(e=>e.name).filter((e,t,n)=>t===n.findIndex(t=>t.name===e.name))}function ce(e,t){let n=document.querySelector(`#nearby-map`);if(E(),t.length===0){n.textContent=`No nearby attractions were found.`;return}let r=document.createElement(`ul`);r.classList.add(`attractions-list`),t.forEach(t=>{let n=document.createElement(`li`),i=document.createElement(`a`),a=`${t.name}, ${e.name}, ${e.state}`;i.href=t.website||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`,i.textContent=t.name,i.target=`_blank`,i.rel=`noopener noreferrer`,n.appendChild(i),r.appendChild(n)}),n.appendChild(r)}function E(){document.querySelector(`#nearby-map`).replaceChildren()}var D=document.querySelector(`#main-view`),O=document.querySelector(`#selector-view`),k=document.querySelector(`#saved-view`),A=document.querySelector(`#selected-travel-type`),j=document.querySelector(`#destination-name`),M=document.querySelector(`#destination-description`),N=document.querySelector(`#cost-level`);function P(e){D.hidden=e!==`main`,O.hidden=e!==`selector`,k.hidden=e!==`saved`}function F(e){return{family:`Family Friendly`,retired:`Retired Traveler`,budget:`Low Budget`,solo:`Solo Traveler`,couples:`Couples`,surprise:`Surprise Me!`}[e]||``}function I(e){return{$:`Up to $1,000`,$$:`Up to $2,500`,$$$:`Up to $5,000`,$$$$:`$10,000+`}[e]||`Cost unavailable`}function L(e,t){A.textContent=F(t),j.textContent=`${e.name}, ${e.state}`,M.textContent=e.description,N.innerHTML=`
    <span class="cost-scale">
        ${e.costLevel}
    </span>

    <span class="cost-range">
        ${I(e.costLevel)}
    </span>

    <span class="cost-note">
        *Estimated cost based on a 7-day trip for two.
    </span>
`,P(`selector`)}async function R(e){let t=`https://api.open-meteo.com/v1/forecast?latitude=${e.latitude}&longitude=${e.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`,n=await fetch(t);if(!n.ok)throw Error(`Unable to load weather.`);return(await n.json()).current}function z(e){return e===0?`Clear`:e<=3?`Partly Cloudy`:e<=48?`Foggy`:e<=67?`Rain`:e<=77?`Snow`:e<=82?`Rain Showers`:e<=86?`Snow Showers`:`Thunderstorms`}function B(e){return e===0?`☀️`:e<=3?`⛅`:e<=48?`🌫️`:e<=67?`🌧️`:e<=77?`❄️`:e<=82?`🌦️`:e<=86?`🌨️`:`⛈️`}function V(e){let t=document.querySelector(`#weather-display`),n=z(e.weather_code);t.innerHTML=`
        <div class="weather-icon">
            ${B(e.weather_code)}
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
    `}var H=document.querySelectorAll(`[data-travel-type]`),U=document.querySelector(`#choose-another`),W=document.querySelector(`#start-over`),le=document.querySelector(`#home-link`),ue=document.querySelector(`#saved-nav`),G=document.querySelector(`#save-destination`),K=document.querySelector(`#saved-destinations`),q=document.querySelector(`#saved-empty-message`),J=null,Y=null;function X(){Y&&(c().some(e=>e.id===Y.id)?(G.textContent=`Saved!`,G.disabled=!0):(G.textContent=`Save Destination`,G.disabled=!1))}async function Z(e,t){Y=e,J=t,X(),L(e,t),E(),document.querySelector(`#weather-display`).textContent=`Loading weather...`,document.querySelector(`#nearby-map`).textContent=`Loading nearby attractions...`,T([]),document.querySelector(`#photo-display`).textContent=`Loading destination photos...`;try{V(await R(e))}catch(e){console.error(`Weather error:`,e),document.querySelector(`#weather-display`).textContent=`Weather is currently unavailable.`}try{let t=await se(e);document.querySelector(`#nearby-map`).textContent=``,ce(e,t)}catch(e){console.error(`Nearby attractions error:`,e),E(),document.querySelector(`#nearby-map`).textContent=`Nearby attractions are currently unavailable.`}try{T(await ne(e))}catch(e){console.error(`Photo error:`,e),T([])}}async function Q(e){try{let t=await o(e);t&&await Z(t,e)}catch(e){console.error(`Error selecting destination:`,e)}}function $(){let e=c();if(K.innerHTML=``,e.length===0){q.hidden=!1;return}q.hidden=!0,e.forEach(e=>{let t=document.createElement(`p`);t.classList.add(`saved-item`);let n=document.createElement(`a`);n.href=`#`,n.textContent=`${e.name}, ${e.state}`,n.addEventListener(`click`,t=>{t.preventDefault(),de(e)});let r=document.createElement(`button`);r.textContent=`Remove`,r.addEventListener(`click`,()=>{te(e.id),$()}),t.appendChild(n),t.appendChild(r),K.appendChild(t)})}async function de(e){await Z(e,e.travelType)}H.forEach(e=>{e.addEventListener(`click`,()=>{J=e.dataset.travelType,Q(J)})}),U.addEventListener(`click`,()=>{J&&Q(J)}),W.addEventListener(`click`,()=>{J=null,Y=null,P(`main`)}),le.addEventListener(`click`,e=>{e.preventDefault(),J=null,Y=null,P(`main`)}),ue.addEventListener(`click`,()=>{$(),P(`saved`)}),G.addEventListener(`click`,()=>{Y&&(ee(Y),X())}),document.querySelector(`#current-year`).textContent=new Date().getFullYear();