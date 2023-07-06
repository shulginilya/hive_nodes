describe("Hive nodes e2e", () => {

	context('404 page and empty cluster ', () => {
		it("home page route should pick available cluster", () => {
			cy.visit("/");
		});

        it("404 page should be shown", () => {
			cy.visit("/not_found");
		});
	
		it("cluster with no nodes should show warning message", () => {
			cy.visit("/cluster_2");
			cy.get('[data-test="empty_cluster_msg"]').should('be.visible');
		});
    });

	context('Filled up cluster', () => {
		beforeEach(() => {
			cy.visit("/cluster_1");
		});
        it("cluster with nodes should nodes", () => {
			cy.get('[data-test="cluster"]').should('be.visible');
		});
    });
});
