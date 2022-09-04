import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Book from "App/Models/Book";

export default class BooksController {
  public async index({ view }: HttpContextContract) {
    const books = await Book.all();
    return view.render("book/index", { books });
  }

  public async show({ view, params }: HttpContextContract) {
    const book = await Book.findOrFail(params.id);
    return view.render("book/show", { book });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("book/create");
  }

  public async store({ request, response, session }: HttpContextContract) {
    // Validation schema & dont forget to import import {schema ,rules} from  '@ioc:Adonis/Core/Validator'

    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      author: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      cover_image: schema.string(),
      isbn: schema.number(),
    });

    // const validatedData =
    await request.validate({
      schema: validationSchema,
      messages: {
        "title.required": "Enter task title",
        "title.maxLength": "Task title can not exceed 255 character",
        "title.minLength": "kather mel 7rouf chabeb !!!!",
        "author.required": "Enter task title",
        "author.maxLength": "Task title can not exceed 255 character",
        "author.minLength": "kather mel 7rouf chabeb !!!!",
        "cover_image.required": "Enter task title",
        "cover_image.maxLength": "Task title can not exceed 255 character",
        "cover_image.minLength": "kather mel 7rouf chabeb !!!!",
        "isbn.required": "Enter task title",
        "isbn.maxLength": "Task title can not exceed 255 character",
        "isbn.minLength": "kather mel 7rouf chabeb !!!!",
      },
    });

    // ** create post without Validation
    await Book.create({
      // ** title: validatedData.title
      title: request.input("title"),
      author: request.input("author"),
      cover_image: request.input("cover_image"),
      isbn: request.input("isbn"),
      // : we use this is we dont have "Const Validateddata ="
    });
    session.flash("notification", "Jawwek fess fess  !!");
    return response.redirect("/books");
  }

  public async delete({ params, session, response }: HttpContextContract) {
    const book = await Book.findOrFail(params.id);
    await book.delete();

    session.flash("notification", "rawwah");
    return response.redirect("/books");
  }

  public async update({response, request, params}:HttpContextContract){
    const book = await Book.findOrFail(params.id)
    book
      .merge({
        title: request.input("title"),
        author: request.input("title"),
        cover_image: request.input("cover_image"),
        isbn: request.input("isbn"),
      })
      .save();
    return response.redirect("/books");
  }
}
