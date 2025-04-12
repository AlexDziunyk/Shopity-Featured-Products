const addToCart = async (productId) => {
  try {
    const productData = {
      items: [
        {
          id: productId,
          quantity: 1,
        },
      ],
    };

    await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    rerenderFeaturedProductsSection();
  } catch (error) {
    console.error(error);
  }
};

const rerenderFeaturedProductsSection = async () => {
  const response = await fetch(
    window.Shopify.routes.root +
      "?section_id=template--18418685313191__featured_products_Pd8eC9"
  );
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const productsGrid = doc.querySelector(".featured-products__grid");
  const currentGrid = document.querySelector(".featured-products__grid");

  if (productsGrid && currentGrid) {
    currentGrid.innerHTML = productsGrid.innerHTML;
  }
};
