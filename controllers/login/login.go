package login

import (
	"encoding/base64"
	"encoding/json"
	"fmt"

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

	var resData models.ResData
	if dbErr != nil {
		fmt.Println(dbErr)
		resData.Code = 1
		resData.Msg = "您的用户名或者密码错误！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}

	c.SetSession("admin", administrator)
	resData.Code = 0
	resData.Msg = "登录成功"

	admin_json, _ := json.Marshal(&administrator)

	token := base64.StdEncoding.EncodeToString(admin_json)

	resData.Data = token
	c.Data["json"] = resData
	c.ServeJSON()
}

func (c *LoginController) Logout() {
	c.DelSession("admin")
	c.Redirect("/login", 302)
}
