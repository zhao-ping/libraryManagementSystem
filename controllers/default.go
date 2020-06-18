package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

// 登录
func (c *MainController) Login() {
	c.TplName = "login.html"
}

// 书籍
func (c *MainController) Books() {
	c.TplName = "book/books.html"
}
func (c *MainController) NewBooks() {
	c.TplName = "book/newBooks.html"
}
func (c *MainController) BooksType() {
	c.TplName = "book/booksType.html"
}

// 学生
func (c *MainController) Students() {
	c.TplName = "student/students.html"
}
func (c *MainController) NewStudent() {
	c.TplName = "student/newStudent.html"
}

// 借阅
func (c *MainController) Borrows() {
	c.TplName = "borrow/borrows.html"
}
func (c *MainController) TimeoutList() {
	c.TplName = "borrow/timeoutList.html"
}
