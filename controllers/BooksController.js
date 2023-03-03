const { Book } = require("../models");

const BooksController = {
  index: async (req, res) => {
    try {
      const books = await Book.findAll();

      if (!books) {
        return res.status(404).json({ message: "Não há livros" });
      }

      return res.status(200).json({ data: books });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          message: "Sistema indisponível, tente novamente mais tarde!",
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(error.parent.sqlMessage);
      }

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: true,
          message: `${error.errors[0].type} at ${error.errors[0].path}`,
        });
      }

      return res.status(400).json({
        error: true,
        message: "Falha na requisição, tente novamente!",
      });
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      return res.status(200).json({ data: book });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          message: "Sistema indisponível, tente novamente mais tarde!",
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(error.parent.sqlMessage);
      }

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: true,
          message: `${error.errors[0].type} at ${error.errors[0].path}`,
        });
      }

      return res.status(400).json({
        error: true,
        message: "Falha na requisição, tente novamente!",
      });
    }
  },
  store: async (req, res) => {
    try {
      const { title, total_pages, author, release_year, stock } = req.body;

      if (
        title == "" ||
        total_pages == "" ||
        author == "" ||
        release_year == "" ||
        stock == ""
      ) {
        return res
          .status(404)
          .json({ message: "Verifique. Há campo(s) vazio(s)." });
      }

      const book = await Book.create({
        title,
        total_pages,
        author,
        release_year,
        stock,
      });

      return res
        .status(201)
        .json({ message: "Livro criado com sucesso", data: book });

    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          message: "Sistema indisponível, tente novamente mais tarde!",
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(error.parent.sqlMessage);
      }

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: true,
          message: `${error.errors[0].type} at ${error.errors[0].path}`,
        });
      }

      return res.status(400).json({
        error: true,
        message: "Falha na requisição, tente novamente!",
      });
    }
  },
  edit: async (req, res) => {
    try {
      const {id} = req.params;

      const { title, total_pages, author, release_year, stock } = req.body;

      if ( title == "" || total_pages == "" || author == "" || release_year == "" || stock == "" ) {
        return res
          .status(404)
          .json({ message: "Verifique. Há campo(s) vazio(s)." });
      }

      const existsBook = await Book.findByPk(id);

      if (!existsBook) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      await Book.update({
        title,
        total_pages: Number(total_pages),
        author,
        release_year,
        stock: Number(stock)
      },{
        where:{
            id
        }
      });

      const book = await Book.findByPk(id);

      return res
        .status(201)
        .json({ message: "Livro atualizado com sucesso", data:book});
        
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          message: "Sistema indisponível, tente novamente mais tarde!",
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(error.parent.sqlMessage);
      }

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: true,
          message: `${error.errors[0].type} at ${error.errors[0].path}`,
        });
      }

      return res.status(400).json({
        error: true,
        message: "Falha na requisição, tente novamente!",
      });
    }
  },
  destroy: async (req, res) => {
    try {
      const {id} = req.params;

      const existsBook = await Book.findByPk(id);

      if (!existsBook) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      await Book.destroy({
        where: {
          id
        },
      })

      return res
        .status(204)
        .json({ message: "Livro excluído com sucesso"});
        
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          message: "Sistema indisponível, tente novamente mais tarde!",
        });
      }

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(error.parent.sqlMessage);
      }

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: true,
          message: `${error.errors[0].type} at ${error.errors[0].path}`,
        });
      }

      return res.status(400).json({
        error: true,
        message: "Falha na requisição, tente novamente!",
      });
    }
  },
};

module.exports = BooksController;
