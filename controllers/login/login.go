package login

import (
	"fmt"

	"github.com/astaxie/beego"
)

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Login() {
	name := c.GetString("name")
	password := c.GetString("password")
	fmt.Printf(name, password)
	c.Data["a"] = "a"
	c.ServeJSON()
}
