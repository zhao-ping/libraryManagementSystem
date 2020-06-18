package routers

import (
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/auth"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/book"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/borrow"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/login"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/student"
	"github.com/astaxie/beego"
)

func init() {
	// 路由
	// 错误处理
	// beego.ErrorController(&controllers.ErrorController{})
	// 登录
	beego.Router("/login", &controllers.MainController{}, "get:Login")
	// 数据
	beego.Router("/book/list", &controllers.MainController{}, "get:Books")
	beego.Router("/book/new", &controllers.MainController{}, "get:NewBooks")
	beego.Router("/book/type", &controllers.MainController{}, "get:BooksType")
	beego.Router("/", &controllers.MainController{}, "get:Books")
	// 借阅
	beego.Router("/borrow/list", &controllers.MainController{}, "get:Borrows")
	beego.Router("/borrow/list/timeout", &controllers.MainController{}, "get:TimeoutList")
	// 学生
	beego.Router("/student/list", &controllers.MainController{}, "get:Students")
	beego.Router("/student/new", &controllers.MainController{}, "get:NewStudent")

	// API
	ns := beego.NewNamespace("/api",
		beego.NSRouter("/login", &login.LoginController{}, "post:Login"),
		beego.NSNamespace("/student",
			beego.NSRouter("/list", &student.StudentController{}, "get:StudentList"),
			beego.NSRouter("/new", &student.StudentController{}, "post:NewStudent"),
		),
		beego.NSNamespace("/book",
			beego.NSRouter("/list", &book.BookController{}, "get:BookList"),
			beego.NSRouter("/new", &book.BookController{}, "post:NewBook"),
			beego.NSRouter("/delete", &book.BookController{}, "delete:DeletBook"),
			beego.NSRouter("/type/list", &book.BookController{}, "get:BookTypeList"),
		),
		beego.NSNamespace("/borrow",
			beego.NSRouter("/", &borrow.BorrowController{}, "post:Borrow"),
			beego.NSRouter("/list", &borrow.BorrowController{}, "get:BorrowList"),
			beego.NSRouter("/back", &borrow.BorrowController{}, "put:Back"),
			beego.NSRouter("/list/timeout", &borrow.BorrowController{}, "get:TimeoutList"),
		),
	)
	beego.AddNamespace(ns)
	beego.InsertFilter("/api/*", beego.BeforeExec, auth.ApiAuth)
	beego.Run()
}
