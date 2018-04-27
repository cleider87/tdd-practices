var config = {
	port: process.env.PORT || 2000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/tdd",
	test_port: 3000,
	test_db: "mongodb://localhost/tdd_test"
}
module.exports = config;