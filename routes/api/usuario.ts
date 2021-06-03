import app = require("teem");
import GeradorHash = require("../../utils/geradorHash");
import Usuario = require("../../models/usuario");

class UsuarioApi {
	@app.http.post()
	public async criar(req: app.Request, res: app.Response) {
		// Cria um novo usuário

		const usuario: Usuario = req.body;

		if (!usuario) {
			res.status(400).json("Dados inválidos");
			return;
		}

		if (usuario.nome) {
			usuario.nome = usuario.nome.trim();
		}

		if (usuario.email) {
			usuario.email = usuario.email.trim();
		}

		if (usuario.login) {
			usuario.login = usuario.login.trim();
		}

		if (!usuario.nome || !usuario.email || !usuario.login || !usuario.senha) {
			res.status(400).json("Dados inválidos");
			return;
		}

		if (usuario.nome.length > 50) {
			res.status(400).json("Nome muito longo");
			return;
		}

		if (usuario.email.length > 100) {
			res.status(400).json("E-mail muito longo");
			return;
		}

		if (usuario.login.length > 50) {
			res.status(400).json("Login muito longo");
			return;
		}

		let erro: string = null;

		await app.sql.connect(async (sql) => {

			try {
				// NUNCA GRAVAR A SENHA DIRETO NO BANCO!
				const hash = await GeradorHash.criarHash(usuario.senha);

				await sql.query("INSERT INTO usuario (nome, email, login, senha) VALUES (?, ?, ?, ?)", [usuario.nome, usuario.email, usuario.login, hash]);

				usuario.id = await sql.scalar("SELECT last_insert_id()");
			} catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					erro = `A usuario "${usuario.login}" já existe`;
				else
					throw e;
			}

		});

		if (erro) {
			res.status(400).json(erro);
			return;
		}

		res.json(usuario.id);
	}
}

export = UsuarioApi;
