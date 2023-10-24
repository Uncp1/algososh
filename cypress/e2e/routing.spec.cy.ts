import * as routes from "../../src/constants/routes";

describe("main page links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.get(routes.LINK_HOME_PAGE).click();
  });

  it("route /recursion", () => {
    cy.get(routes.LINK_STRING_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_STRING_TEST_ID);
  });

  it("route /fibonacci", () => {
    cy.get(routes.LINK_FIBONACCI_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_FIBONACCI_TEST_ID);
  });

  it("route /sorting", () => {
    cy.get(routes.LINK_ARRAY_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_ARRAY_TEST_ID);
  });

  it("route /stack", () => {
    cy.get(routes.LINK_STACK_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_STACK_TEST_ID);
  });

  it("route /queue", () => {
    cy.get(routes.LINK_QUEUE_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_QUEUE_TEST_ID);
  });

  it("route /list", () => {
    cy.get(routes.LINK_LIST_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_LINKED_LIST_TEST_ID);
  });
});
