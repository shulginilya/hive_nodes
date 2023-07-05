describe("Hive nodes e2e", () => {
	it("404 page should be shown", () => {
		cy.visit("/not_found");
	});
});
