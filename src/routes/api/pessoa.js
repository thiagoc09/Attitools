"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA';
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
//
//**********************************************************************************
class PessoaApi {
	async listar(req, res) {
		// Lista todas as pessoas
		let pessoas = null;
		await app.sql.connect(async (sql) => {
			pessoas = await sql.query("SELECT id, nome, email FROM pessoa");
		});
		res.json(pessoas);
	}
	async obter(req, res) {
		// Retorna uma pessoa existente
		const id = parseInt(req.params["id"]);
		if (isNaN(id)) {
			res.status(400).json("Id inválido");
			return;
		}
		let pessoa = null;
		await app.sql.connect(async (sql) => {
			let pessoas = await sql.query("SELECT id, nome, email FROM pessoa WHERE id = ?", [id]);
			if (pessoas.length) {
				pessoa = pessoas[0];
			}
		});
		res.json(pessoa);
	}
	async excluir(req, res) {
		// Exclui uma pessoa existente
		const id = parseInt(req.params["id"]);
		if (isNaN(id)) {
			res.status(400).json("Id inválido");
			return;
		}
		let pessoaExcluida = false;
		await app.sql.connect(async (sql) => {
			await sql.query("DELETE FROM pessoa WHERE id = ?", [id]);
			if (sql.affectedRows > 0) {
				pessoaExcluida = true;
			}
		});
		if (!pessoaExcluida) {
			res.status(400).json("Pessoa não encontrada");
			return;
		}
		res.sendStatus(204);
	}
	async criar(req, res) {
		// Cria uma nova pessoa
		const pessoa = req.body;
		if (!pessoa) {
			res.status(400).json("Dados inválidos");
			return;
		}
		if (pessoa.nome) {
			pessoa.nome = pessoa.nome.trim();
		}
		if (pessoa.email) {
			pessoa.email = pessoa.email.trim();
		}
		if (!pessoa.nome || !pessoa.email) {
			res.status(400).json("Dados inválidos");
			return;
		}
		if (pessoa.nome.length > 50) {
			res.status(400).json("Nome muito longo");
			return;
		}
		if (pessoa.email.length > 50) {
			res.status(400).json("E-mail muito longo");
			return;
		}
		let erro = null;
		await app.sql.connect(async (sql) => {
			try {
				await sql.query("INSERT INTO pessoa (nome, email) VALUES (?, ?)", [pessoa.nome, pessoa.email]);
				pessoa.id = await sql.scalar("SELECT last_insert_id()");
			}
			catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					erro = `A pessoa "${pessoa.nome}" já existe`;
				else
					throw e;
			}
		});
		if (erro) {
			res.status(400).json(erro);
			return;
		}
		res.json(pessoa.id);
	}
	async alterar(req, res) {
		// Edita uma pessoa existente
		const pessoa = req.body;
		if (!pessoa) {
			res.status(400).json("Dados inválidos");
			return;
		}
		// Apesar de querermos um número, pode ser que o cliente tenha enviado uma string...
		pessoa.id = parseInt(pessoa.id);
		if (isNaN(pessoa.id)) {
			res.status(400).json("Id inválido");
			return;
		}
		if (pessoa.nome) {
			pessoa.nome = pessoa.nome.trim();
		}
		if (pessoa.email) {
			pessoa.email = pessoa.email.trim();
		}
		if (!pessoa.nome || !pessoa.email) {
			res.status(400).json("Dados inválidos");
			return;
		}
		if (pessoa.nome.length > 50) {
			res.status(400).json("Nome muito longo");
			return;
		}
		if (pessoa.email.length > 50) {
			res.status(400).json("E-mail muito longo");
			return;
		}
		let pessoaAlterada = false;
		let erro = null;
		await app.sql.connect(async (sql) => {
			try {
				await sql.query("UPDATE pessoa SET nome = ?, email = ? WHERE id = ?", [pessoa.nome, pessoa.email, pessoa.id]);
				if (sql.affectedRows > 0) {
					pessoaAlterada = true;
				}
			}
			catch (e) {
				if (e.code && e.code === "ER_DUP_ENTRY")
					erro = `A pessoa "${pessoa.nome}" já existe`;
				else
					throw e;
			}
		});
		if (erro) {
			res.status(400).json(erro);
			return;
		}
		if (!pessoaAlterada) {
			res.status(400).json("Pessoa não encontrada");
			return;
		}
		res.sendStatus(204);
	}
}
__decorate([
	app.route.methodName("obter/:id")
], PessoaApi.prototype, "obter", null);
__decorate([
	app.http.delete(),
	app.route.methodName("excluir/:id")
], PessoaApi.prototype, "excluir", null);
__decorate([
	app.http.post()
], PessoaApi.prototype, "criar", null);
__decorate([
	app.http.put()
], PessoaApi.prototype, "alterar", null);
module.exports = PessoaApi;
//# sourceMappingURL=pessoa.js.map