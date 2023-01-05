const LINK = "http://127.0.0.1:8080/";

describe("Test para --Validar-form--", () => {
  beforeEach(() => {
    cy.visit(LINK);
  });

  it("Chekear h1", () => {
    cy.getByData("hero-heading").contains("hello man");
  });

  it("ver si toda la pagina esta ok", () => {
    cy.get("dt").eq(0).contains("4 Courses");
    cy.get("dt").eq(1).contains("4 Cous");
    cy.get("dt").eq(2).contains("4 yi");
  });
});
