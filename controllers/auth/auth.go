package auth

import (
	"encoding/base64"
	"encoding/json"
	"fmt"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"

	"git.zituo.net/zhaoping/LibraryManagementSystem/models"

	"github.com/astaxie/beego/context"
)

func AdminAuth(c *context.Context) {
	url := c.Request.RequestURI
	if url == "/login" || url == "/logout" || url == "/api/login" {
		return
	}
	token := c.Request.Header.Get("token")

	if token == "" {
		fmt.Println("用户未登录")
		OutputErr(c, 2, "用户未登录")
		return
	}

	admin := GetAdminFromToken(c)

	var db_admin models.Administrator

	db := conn.GetORM()
	dbErr := db.Where(&admin).First(&db_admin).Error

	if dbErr != nil {
		fmt.Println("数据查无此管理员，验证未通过")
		OutputErr(c, 2, "数据查无此管理员，验证未通过")
		return
	}
	if db_admin.AdminId > 0 {
		fmt.Println("验证通过")
		c.Input.SetData("admin", db_admin)
	}
	return
}
func OutputErr(c *context.Context, code int, msg string) {
	// code 0:成功 1:错误并提示信息 2:用户未登录
	resData := models.ResData{
		Code: code,
		Msg:  msg,
	}
	c.Output.JSON(resData, false, false)
}
func OutputSuccess(c *context.Context, data interface{}) {
	// code 0:成功 1:错误并提示信息 2:用户未登录
	resData := models.ResData{
		Code: 0,
		Msg:  "success",
		Data: data,
	}
	fmt.Println("resData------")
	fmt.Println(resData)
	c.Output.JSON(resData, false, false)
}
func GetAdminFromToken(c *context.Context) models.Administrator {

	token := c.Request.Header.Get("token")

	encode_admin, _ := base64.StdEncoding.DecodeString(token)

	var admin models.Administrator
	json.Unmarshal(encode_admin, &admin)
	return admin
}
