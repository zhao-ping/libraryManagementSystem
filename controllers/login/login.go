package login

import (
	"encoding/base64"
	"encoding/json"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/auth"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	"git.zituo.net/zhaoping/LibraryManagementSystem/models"

	"github.com/astaxie/beego"
)

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Login() {
	admin_name := c.GetString("admin_name")
	password := c.GetString("password")
	admin := models.Administrator{
		AdminName: admin_name,
		Password:  password,
	}

	var administrator models.Administrator
	db := conn.GetORM()
	dbErr := db.Where(&admin).First(&administrator).Error

	if dbErr != nil {
		auth.OutputErr(c.Ctx, 1, "您的用户名或者密码错误！")
		return
	}

	admin_json, _ := json.Marshal(&administrator)

	token := base64.StdEncoding.EncodeToString(admin_json)

	auth.OutputSuccess(c.Ctx, token)
}

func (c *LoginController) Logout() {
	c.DelSession("admin")
	c.Redirect("/login", 302)
}
