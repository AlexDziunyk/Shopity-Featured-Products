class FeaturedProductsSection extends HTMLElement {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  connectedCallback() {
    this.addEventListener("click", this.addToCart);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.addToCart);
  }

  async addToCart(event) {
    try {
      const button = event.target.closest(".featured-products__card-button");
      if (!button) return;

      const productId = button.dataset.productId;

      const productData = {
        items: [
          {
            id: parseInt(productId),
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

      await this.rerenderFeaturedProductsSection();
    } catch (error) {
      console.error(error);
    }
  }

  async rerenderFeaturedProductsSection() {
    const response = await fetch(
      window.Shopify.routes.root +
        "?section_id=template--18418472353959__featured_products_XEiJJy"
    );
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const productsGrid = doc.querySelector(".featured-products__grid");
    const currentGrid = this.querySelector(".featured-products__grid");

    if (productsGrid && currentGrid) {
      currentGrid.innerHTML = productsGrid.innerHTML;
    }
  }
}

customElements.define("featured-products-section", FeaturedProductsSection);
