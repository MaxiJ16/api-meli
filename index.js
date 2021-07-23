function eliminarResultados(){
  const buttonEl = document.querySelector(".search-button");
  const resultsEl = document.querySelector(".articles");
  buttonEl.addEventListener("click", () => resultsEl.innerHTML = "");
}

function mostrarResultados(results) {
  // console.log(results)
  const contenedor = document.querySelector(".articles");
  const template = document.querySelector("#result-item-template");

  //resultados
  const resultEl = document.querySelector(".results-count");
  resultEl.textContent = results.paging.total;

  for (const r of results.results) {
    //link del producto
    const linkEl = template.content.querySelector(".article-link");
    linkEl.href = r.permalink;
    //imágen del producto
    const imgEl = template.content.querySelector(".article-img");
    imgEl.src = r.thumbnail;
    //título del producto
    const titleEl = template.content.querySelector(".article-title");
    titleEl.textContent = r.title;
    //condición del producto
    const conditionEl = template.content.querySelector(".article-condition");
    conditionEl.textContent = r.condition;
    //vendidos
    const sellEl = template.content.querySelector(".sell-number");
    sellEl.textContent = r.sold_quantity;
    //precio del producto
    const priceEl = template.content.querySelector(".article-price");
    priceEl.textContent = "$" + r.price;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");

  formEl.addEventListener("submit", (evento) => {
    evento.preventDefault();
    eliminarResultados();
    const form = evento.target;
    const palabraABuscar = form.busqueda.value;

    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${palabraABuscar}`)
      .then((res) => res.json())
      .then((json) => mostrarResultados(json));
  });
}

main();
