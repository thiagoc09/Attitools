import app = require("teem");

class ContatoApi {
	@app.http.post()
	public async faleConosco(req: app.Request, res: app.Response) {
		res.send("ok");
	}
}

export = ContatoApi;
