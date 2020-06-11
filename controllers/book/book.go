package book

import (
	"github.com/astaxie/beego"
)

type BookController struct {
	beego.Controller
}

func (c *BookController) BookList() {
}
func (c *BookController) NewBook() {
}
func (c *BookController) BookTypeList() {
}
func (c *BookController) NewBookType() {
}
