import app = require("teem");

class Index {
	public async index(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/index.html");
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

	public async feed(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/feed.html");
	}

	public async photos(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/photos.html");
	}
	public async profile(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/profile.html");
	}

	public async groups(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/groups.html");
	}

	public async members(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/members.html");
	}

	public async descobrir(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/descobrir.html");
	}

	public async pontos(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/pontos.html");
	}

	public async sair(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/index.html");
	}
	public async documentacao(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/doc.html");
	}

	public async perfil73721(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/rafa.html");
	}

	public async perfil737212(req: app.Request, res: app.Response) {
		res.sendFile(app.dir.views + "/humberto.html");
	}
}

export = Index;
