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

    const response = await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const json = await response.json();
    console.log("Item added!");
  } catch (error) {
    console.error(error);
  }
};
