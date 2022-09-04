import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UsersController {
  public async registershow({ view }: HttpContextContract) {
    return view.render("user/create");
  }

  public async register({
    request,
    response,
    auth,
    session,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      // username: schema.string({ trim: true }, [
      //     rules.maxLength(255),
      //     rules.minLength(5),
      //   ]),
      email: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      password: schema.string(),
    });

    // const validatedData =
    await request.validate({
      schema: validationSchema,
      messages: {
        "name.required": "Enter task title",
        "name.maxLength": "Task title can not exceed 255 character",
        "name.minLength": "kather mel 7rouf chabeb !!!!",
        "email.required": "Enter task title",
        "email.maxLength": "Task title can not exceed 255 character",
        "email.minLength": "kather mel 7rouf chabeb !!!!",
        "password.required": "Enter task title",
        
      },
    });

    // ** create post without Validation
    const user = await User.create({
      // ** title: validatedData.title
      name: request.input("name"),
      // username: request.input("username"),
      email: request.input("email"),
      password: request.input("password"),
      // : we use this is we dont have "Const Validateddata ="
    });
    await auth.login(user);
    session.flash("notification", "Jawwek fess fess  !!");
    return response.redirect("/books");
  }

  public async loginshow({ view }: HttpContextContract) {
    return view.render("session/create");
  }

  public async login({
    auth,
    request,
    response,
    session,
  }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    try {
      await auth.attempt(email, password);
    } catch (error) {
      session.flashExcept(["password"]);

      session.flash({
        error: "We cannot find any account with these credentials.",
      });

      return response.redirect("back");
    }
    session.flash({ notification: "Logged in successfully" });
    return response.redirect("/books");
  }

  async logout({ auth, response, session }) {
    await auth.logout();
    session.flash({ notification: "Logged out successfully" });

    return response.redirect("/login");
  }
}
