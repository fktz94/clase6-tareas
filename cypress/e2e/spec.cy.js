// const LINK = "http://127.0.0.1:8080/";

describe("Validar-form Test", () => {
  it("Visitar la pagina", () => {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.url().should("include", "/commands/actions");

    cy.get(".action-email").type("fake@email.com");

    cy.get(".action-email").should("have.value", "fake@email.com");
  });
});
