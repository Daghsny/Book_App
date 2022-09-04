
import Route from '@ioc:Adonis/Core/Route'

Route.on("/").render("welcome")
Route.get("/books", "BooksController.index")
Route.get("/books/create", "BooksController.create")
Route.post("/books", "BooksController.store")
Route.get('/books/show/:id','BooksController.show').as('book.show')
Route.post('/books/show/:id','BooksController.update').as('book.update')
Route.post("/books/delete/:id", "BooksController.delete")

// Register Users
Route.get("/register", "UsersController.registershow");
Route.post("/register", "UsersController.register");

// Login
Route.get("/login", "UsersController.loginshow");
Route.post("/login", "UsersController.login");
Route.get("/logout", "UsersController.logout");


Route.get('/login/profil' ,'UsersController.show' )