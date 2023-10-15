describe("string", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  afterEach(() => {
    cy.get(string.Inp);
  });
  it("works", () => {});
});
