import livro from "../models/Livros.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }      
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById({});
            res.status(200).json(livroEncontrado);
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }      
    };

    static async cadastrarLivros (req, res) {
        const novoLivro = req.body;

        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({mensage: "Criado com sucesso!", livro: novoLivro});
        } catch (erro){
            res.status(500).json({mensage: `${erro.mensage} - Falha ao cadastrar livro`});
        }
    }

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({mensage: "livro atualizado!"});
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }      
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({mensage: "livro excluído com sucesso!"});
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }      
    };

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }
};

export default LivroController;