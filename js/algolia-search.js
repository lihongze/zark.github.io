document.addEventListener("DOMContentLoaded",()=>{const e=CONFIG.algolia,{indexName:t,appID:a,apiKey:s}=e;let i=instantsearch({indexName:t,searchClient:algoliasearch(a,s),searchFunction:e=>{document.querySelector(".search-input").value&&e.search()}});window.pjax&&i.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))}),i.addWidgets([instantsearch.widgets.configure({hitsPerPage:e.hits.per_page||10}),instantsearch.widgets.searchBox({container:".search-input-container",placeholder:e.labels.input_placeholder,showReset:!1,showSubmit:!1,showLoadingIndicator:!1,cssClasses:{input:"search-input"}}),instantsearch.widgets.stats({container:"#algolia-stats",templates:{text:t=>{return`${e.labels.hits_stats.replace(/\$\{hits}/,t.nbHits).replace(/\$\{time}/,t.processingTimeMS)}\n            <span class="algolia-powered">\n              <img src="${CONFIG.root}images/algolia_logo.svg" alt="Algolia">\n            </span>\n            <hr>`}}}),instantsearch.widgets.hits({container:"#algolia-hits",templates:{item:e=>{return`<a href="${e.permalink?e.permalink:CONFIG.root+e.path}" class="algolia-hit-item-link">${e._highlightResult.title.value}</a>`},empty:t=>`<div id="algolia-hits-empty">\n              ${e.labels.hits_empty.replace(/\$\{query}/,t.query)}\n            </div>`},cssClasses:{item:"algolia-hit-item"}}),instantsearch.widgets.pagination({container:"#algolia-pagination",scrollTo:!1,showFirst:!1,showLast:!1,templates:{first:'<i class="fa fa-angle-double-left"></i>',last:'<i class="fa fa-angle-double-right"></i>',previous:'<i class="fa fa-angle-left"></i>',next:'<i class="fa fa-angle-right"></i>'},cssClasses:{root:"pagination",item:"pagination-item",link:"page-number",selectedItem:"current",disabledItem:"disabled-item"}})]),i.start(),document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.style.overflow="hidden",document.querySelector(".search-pop-overlay").classList.add("search-active"),document.querySelector(".search-input").focus()})});const n=()=>{document.body.style.overflow="",document.querySelector(".search-pop-overlay").classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&n()}),document.querySelector(".popup-btn-close").addEventListener("click",n),window.addEventListener("pjax:success",n),window.addEventListener("keyup",e=>{"Escape"===e.key&&n()})});