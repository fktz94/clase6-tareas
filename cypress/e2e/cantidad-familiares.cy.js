/// <reference types="Cypress" />

const LINK = "http://127.0.0.1:8080/";

describe("Chekear input 'Cantidad-familiares'", () => {
  beforeEach(() => {
    cy.visit(LINK);
  });

  it("no permitir a los usuarios ingresar un texto", () => {
    cy.getByData("cantidad-familiares").type("hello");
    cy.getByData("agregar-familiares").click();
    cy.getByData("mensaje-error").should("exist");
    cy.getByData("cantidad-familiares").should("have.class", "error");
    for (let i = 1; i <= 3; i++) {
      cy.get(`#div-familiar-${i}`).should("not.exist");
      cy.get(`#div-familiar-${i}>label`).should("not.exist");
      cy.get(`#edad-familiar-${i}`).should("not.exist");
    }
  });

  it("no permitir a los usuarios ingresar un texto vacio", () => {
    cy.getByData("cantidad-familiares");
    cy.getByData("agregar-familiares").click();
    cy.getByData("mensaje-error").should("exist");
    cy.getByData("cantidad-familiares").should("have.class", "error");
    for (let i = 1; i <= 3; i++) {
      cy.get(`#div-familiar-${i}`).should("not.exist");
      cy.get(`#div-familiar-${i}>label`).should("not.exist");
      cy.get(`#edad-familiar-${i}`).should("not.exist");
    }
  });

  it("no permitir a los usuarios ingresar un numero negativo", () => {
    cy.getByData("cantidad-familiares").type(-5);
    cy.getByData("agregar-familiares").click();
    cy.getByData("mensaje-error").should("exist");
    cy.getByData("cantidad-familiares").should("have.class", "error");
    for (let i = 1; i <= 3; i++) {
      cy.get(`#div-familiar-${i}`).should("not.exist");
      cy.get(`#div-familiar-${i}>label`).should("not.exist");
      cy.get(`#edad-familiar-${i}`).should("not.exist");
    }
  });

  it("permitir a los usuarios ingresar un numero valido", () => {
    cy.getByData("cantidad-familiares").type(3);
    cy.getByData("agregar-familiares").click();
    cy.getByData("cantidad-familiares").should("not.have.class", "error");
    for (let i = 1; i <= 3; i++) {
      cy.get(`#div-familiar-${i}`)
        .should("exist")
        .children("label")
        .should("exist");
      cy.get(`#edad-familiar-${i}`).should("exist");
    }
  });

  it("NO permitir a los usuarios ingresar un texto incorrecto en cada familiar", () => {
    cy.getByData("cantidad-familiares").type(3);
    cy.getByData("agregar-familiares").click();
    for (let i = 1; i <= 3; i++) {
      cy.get(`#div-familiar-${i}`)
        .should("exist")
        .children("label")
        .should("exist");
      cy.get(`#edad-familiar-${i}`).type("hola");
    }
    cy.getByData("calcular-edad").click();
    cy.getByData("resultado-edades")
      .children()
      .eq(0)
      .contains("No ingresaste ninguna edad");
  });

  it("permitir a los usuarios ingresar una edad correcta en cada familiar", () => {
    cy.getByData("cantidad-familiares").type(3);
    cy.getByData("agregar-familiares").click();
    for (let i = 1; i <= 3; i++) {
      cy.get(`#div-familiar-${i}`)
        .should("exist")
        .children("label")
        .should("exist");
      cy.get(`#edad-familiar-${i}`).type(15);
    }
    cy.getByData("calcular-edad").click();
    cy.getByData("resultado-edades")
      .children()
      .eq(0)
      .contains("La edad mayor es 15");
  });
});
