import app = require("teem");

class Index {
	public async index(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/index.html");
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/cadastro.html");
	}
}

export = Index;
