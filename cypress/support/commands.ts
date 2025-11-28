// ***********************************************
// Custom Cypress Commands for Product Creation
// ***********************************************

declare namespace Cypress {
  interface Chainable {
    /**
     * Fills the general section of the product creation form
     * @param data - Object containing form field values
     * @example
     * cy.fillGeneralSection({
     *   productName: 'Test Product',
     *   description: 'Test description',
     *   price: '99.99',
     *   takeAwayPrice: '110.00',
     *   purchasePrice: '50.00',
     *   skuCode: 'SKU-123',
     *   barCode: '1234567890123'
     * })
     */
    fillGeneralSection(data: {
      productName?: string;
      description?: string;
      price?: string;
      takeAwayPrice?: string;
      purchasePrice?: string;
      skuCode?: string;
      barCode?: string;
    }): Chainable<void>;

    /**
     * Adds variant groups to the product form
     * @param count - Number of variant groups to add (default: 1)
     * @example
     * cy.addVariantGroups(2)
     */
    addVariantGroups(count?: number): Chainable<void>;

    /**
     * Adds modifier groups to the product form
     * @param count - Number of modifier groups to add (default: 1, max: 3)
     * @example
     * cy.addModifierGroups(3)
     */
    addModifierGroups(count?: number): Chainable<void>;

    /**
     * Submits the product creation form
     * @example
     * cy.submitProductForm()
     */
    submitProductForm(): Chainable<void>;
  }
}

Cypress.Commands.add(
  'fillGeneralSection',
  (data: {
    productName?: string;
    description?: string;
    price?: string;
    takeAwayPrice?: string;
    purchasePrice?: string;
    skuCode?: string;
    barCode?: string;
  }) => {
    if (data.productName) {
      cy.get('input[id="productName"]').clear().type(data.productName);
    }
    if (data.description) {
      cy.get('textarea[id="productDescription"]')
        .clear()
        .type(data.description);
    }
    if (data.price) {
      cy.get('input[id="price"]').clear().type(data.price);
    }
    if (data.takeAwayPrice) {
      cy.get('input[id="takeAwayPrice"]').clear().type(data.takeAwayPrice);
    }
    if (data.purchasePrice) {
      cy.get('input[id="purchasePrice"]').clear().type(data.purchasePrice);
    }
    if (data.skuCode) {
      cy.get('input[id="skuCode"]').clear().type(data.skuCode);
    }
    if (data.barCode) {
      cy.get('input[id="barCode"]').clear().type(data.barCode);
    }
  },
);

Cypress.Commands.add('addVariantGroups', (count: number = 1) => {
  cy.get('app-variant-groups').within(() => {
    for (let i = 0; i < count; i++) {
      cy.contains('button', 'Add variant group').click();
    }
  });
});

Cypress.Commands.add('addModifierGroups', (count: number = 1) => {
  cy.get('app-modifiers').within(() => {
    // First click uses "Add modifier group" (empty state)
    cy.contains('button', 'Add modifier group').click();
    // Subsequent clicks use "Add modifiers" (after modifiers exist)
    for (let i = 1; i < count; i++) {
      cy.contains('button', 'Add modifiers').click();
    }
  });
});

Cypress.Commands.add('submitProductForm', () => {
  cy.contains('button', 'Create product').click();
});
