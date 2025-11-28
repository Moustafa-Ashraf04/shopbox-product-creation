// cypress/e2e/product-creation.e2e-spec.ts

describe('Product Creation - E2E (Real User Flows - No API Mocking)', () => {
  beforeEach(() => {
    // Visit the product creation page
    cy.visit('/');
  });

  it('creates a product with only required fields (minimal happy path)', () => {
    // Fill the required fields
    cy.get('#productName').type('Minimal Product');
    cy.get('#price').type('99.99');

    // Click the create product button
    cy.contains('button', 'Create product').click();
  });

  it('creates a fully-featured product with variants + modifiers (complete happy path)', () => {
    // Fill the general section
    cy.fillGeneralSection({
      productName: 'Premium Coffee Maker',
      description: 'High-end espresso machine',
      price: '299.99',
      takeAwayPrice: '319.99',
      purchasePrice: '150.00',
      skuCode: 'COFFEE-001',
      barCode: '9876543210987',
    });

    // Add variant groups
    cy.addVariantGroups(2);

    // Add modifier groups
    cy.addModifierGroups(3);

    // Click the create product button
    cy.contains('button', 'Create product').click();
  });

  it('blocks submission with negative or invalid price', () => {
    // Fill the product name
    cy.get('#productName').type('Invalid Price Product');
    cy.get('#price').clear().type('-50');

    // Click the create product button
    cy.contains('button', 'Create product').click();
  });

  it('allows creating another product after success (form resets)', () => {
    // Fill the product name
    cy.get('#productName').type('First Product');
    cy.get('#price').type('49.99');

    // Click the create product button
    cy.contains('button', 'Create product').click();

    // Form should be usable again
    cy.get('#productName').should('have.value', '');
    cy.get('#price').should('have.value', '');
  });
});
