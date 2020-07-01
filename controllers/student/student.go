package student

import (
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

	if dbErr == nil {
		pager := base.GetPager(page, limit, count)
		list := models.List{
			Pager: pager,
			List:  students,
		}
		auth.OutputSuccess(c.Ctx, list)
	} else {
		auth.OutputErr(c.Ctx, 1, "查询失败，请重试！")
	}

}
func (c *StudentController) NewStudent() {
	student_name := c.GetString("student_name", "")
	student_major := c.GetString("student_major", "计算机科学与技术")
	student_sex, _ := c.GetInt("student_sex", 0)
	student_age, _ := c.GetInt("student_age", 20)
	student_grade, _ := c.GetInt("student_grade", 1)

	if student_name == "" {
		auth.OutputErr(c.Ctx, 1, "用户名必填")
		return
	}
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

	if dbErr == nil {
		auth.OutputErr(c.Ctx, 1, "新生入库成功！")
	} else {
		auth.OutputErr(c.Ctx, 1, "新生入库失败")
	}

}
