import app = require("teem");

class Index {
	public async index(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/index.html");
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/cadastro.html");
	}

	public async empresas(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/empresas.html");
	}

	public async faq(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/faq.html");
	}

	public async signup(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/signup.html");
	}

	public async login(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/login.html");
	}
}

export = Index;
