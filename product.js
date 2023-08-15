const productDOM = document.querySelector(".product");
const url = "https://course-api.com/javascript-store-single-product";

// geting the data from the api
const fetchProduct = async () => {
  try {
    productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>';
    // console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); //keyname

    const resp = await fetch(`${url}?id=${id}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    productDOM.innerHTML =
      '<p class="error">There was a problem loading the product. Please try again later</p>';
  }
};

const displayProduct = (product) => {
  const { company, colors, description, price, name: title } = product.fields;
  const { url: img } = product.fields.image[0];
  document.title = title.toUpperCase();
  // company, colors, description, name tocalltitle, price, image

  // colors
  const colorsList = colors
    .map((c) => {
      return `<span class="product-color" style="background: ${c}"></span>`;
    })
    .join("");

  productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${img}" class="img" alt="${title}" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">${colorsList}</div>
          <p>${description}</p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
