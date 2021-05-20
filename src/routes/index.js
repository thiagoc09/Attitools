"use strict";
const app = require("teem");
class Index {
	async index(req, res) {
		res.sendFile(app.dir.views + "/index.html");
	}
	async cadastro(req, res) {
		res.sendFile(app.dir.views + "/cadastro.html");
	}
}
module.exports = Index;
//# sourceMappingURL=index.js.map