package student

import (
	"fmt"
	"time"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/auth"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/base"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	_ "git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"

	"git.zituo.net/zhaoping/LibraryManagementSystem/models"
	"github.com/astaxie/beego"
)

type StudentController struct {
	beego.Controller
}

func (c *StudentController) StudentList() {
	page, _ := c.GetInt("page", 1)
	limit, _ := c.GetInt("limit", 10)
	student_name := c.GetString("student_name", "")
	student_id, _ := c.GetInt("student_id", 0)

	student := models.Student{
		StudentName: student_name,
	}
	if student_id != 0 {
		student.StudentId = student_id
	}

	students := make([]models.Student, 0)

	var count int
	db := conn.GetORM()
	db.Where(&student).Find(&students).Count(&count)

	dbErr := db.Where(&student).Order("created desc").Limit(limit).Offset((page - 1) * limit).Find(&students).Error

	resData := models.ResData{
		Code: 1,
		Msg:  "查询失败",
		Data: nil,
	}
	if dbErr == nil {
		pager := base.GetPager(page, limit, count)
		list := models.List{
			Pager: pager,
			List:  students,
		}
		resData.Code = 0
		resData.Msg = "success"
		resData.Data = list
	}

	c.Data["json"] = resData
	c.ServeJSON()
}
func (c *StudentController) NewStudent() {
	student_name := c.GetString("student_name", "")
	student_major := c.GetString("student_major", "计算机科学与技术")
	student_sex, _ := c.GetInt("student_sex", 0)
	student_age, _ := c.GetInt("student_age", 20)
	student_grade, _ := c.GetInt("student_grade", 1)

	if student_name == "" {
		resData := models.ResData{
			Code: 1,
			Msg:  "用户名必填",
			Data: nil,
		}
		fmt.Println(resData)
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	resData := models.ResData{}
	db := conn.GetORM()

	admin := auth.GetAdminFromToken(c.Ctx)
	student := models.Student{
		StudentName:  student_name,
		StudentGrade: student_grade,
		StudentMajor: student_major,
		StudentAge:   student_age,
		StudentSex:   student_sex,
		AdminId:      admin.AdminId,
		AdminName:    admin.AdminName,
		Created:      time.Now().Unix(),
	}

	dbErr := db.Create(&student).Error
	resData = models.ResData{
		Code: 1,
		Msg:  "新生入库失败",
		Data: nil,
	}
	if dbErr == nil {
		resData.Code = 1
		resData.Msg = "新生入库成功！"
	}

	c.Data["json"] = resData
	c.ServeJSON()
}
