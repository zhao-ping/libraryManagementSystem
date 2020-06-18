package auth

import (
	"fmt"

	"github.com/astaxie/beego/context"
)

func ApiAuth(c *context.Context) {
	fmt.Println("登录权限验证")
}
