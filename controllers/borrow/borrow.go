package borrow

import (
	"fmt"
	"strconv"
	"time"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/base"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	"git.zituo.net/zhaoping/LibraryManagementSystem/models"
	"github.com/astaxie/beego"
)

type BorrowController struct {
	beego.Controller
}

func (c *BorrowController) BorrowList() {
	student_id, _ := c.GetInt("student_id", 0)
	book_id, _ := c.GetInt("book_id", 0)
	limit, _ := c.GetInt("limit", 10)
	page, _ := c.GetInt("page", 1)
	book_name := c.GetString("book_name", "")

	borrows := make([]models.Borrow, 0)

	db := conn.GetORM()

	resData := models.ResData{
		Code: 1,
		Msg:  "查询出错",
	}
	var sql_str = "book_name LIKE '%" + book_name + "%'"
	if student_id != 0 {
		sql_str += " AND student_id =" + strconv.Itoa(student_id)
	}
	if book_id != 0 {
		sql_str += " AND book_id =" + strconv.Itoa(book_id)
	}
	count := 0
	countErr := db.Table("borrow").Where(sql_str).Find(&borrows).Count(&count).Error
	pager := models.Pager{}
	if countErr != nil {
		resData.Code = 1
		resData.Msg = "查询数据数量出错"
		c.Data["json"] = resData
		c.ServeJSON()
	} else {
		pager = base.GetPager(page, limit, count)
	}
	borrowErr := db.Table("borrow").Order("borrow_state desc").Order("start_time desc").Where(sql_str).Limit(limit).Offset((page - 1) * limit).Find(&borrows).Error

	if borrowErr == nil {
		resData.Code = 0
		resData.Msg = "success"
		resData.Data = models.List{
			Pager: pager,
			List:  borrows,
		}
	}
	c.Data["json"] = resData
	c.ServeJSON()
}
func (c *BorrowController) TimeoutList() {
	student_id, _ := c.GetInt("student_id", 0)
	book_name := c.GetString("book_name", "")
	page, _ := c.GetInt("page", 0)
	limit, _ := c.GetInt("limit", 10)

	db := conn.GetORM()
	time := time.Now().Unix()
	sql_str := "end_time < " + strconv.FormatInt(time, 10) + " AND book_name LIKE '%" + book_name + "%'"

	fmt.Println("sql_str")
	fmt.Println(sql_str)
	if student_id != 0 {
		sql_str += "AND student_id=" + strconv.Itoa(student_id)
	}

	var resData models.ResData

	var count int
	countErr := db.Table("borrow").Where(sql_str).Count(&count).Error
	if countErr != nil {
		resData.Code = 1
		resData.Msg = "查询出错，请重试"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	pager := base.GetPager(page, limit, count)

	var borrows []models.Borrow
	dbErr := db.Table("borrow").Where(sql_str).Order("borrow_state desc").Order("end_time asc").Limit(limit).Offset((page - 1) * limit).Find(&borrows).Error
	if dbErr != nil {
		resData.Code = 1
		resData.Msg = "查询出错，请重试"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	list := models.List{
		Pager: pager,
		List:  borrows,
	}

	resData.Code = 0
	resData.Msg = "success"
	resData.Data = list
	c.Data["json"] = resData
	c.ServeJSON()
}
func (c *BorrowController) Borrow() {
	student_id, _ := c.GetInt("student_id", 0)
	book_id, _ := c.GetInt("book_id", 0)
	borrow_days, _ := c.GetInt64("borrow_days", 0)
	admin_id, _ := c.GetInt("admint_id", 1)

	db := conn.GetORM()
	resData := models.ResData{}
	var student models.Student
	var book models.Book
	var admin models.Administrator
	// 查询借阅学生
	studentErr := db.Table("student").Where(fmt.Sprintf("student_id=%d", student_id)).First(&student).Error
	if studentErr != nil {
		resData.Code = 1
		resData.Msg = "没有检索到该学生,请检查学号是否错误"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	// 查询借阅书籍
	bookErr := db.Table("book").Where(fmt.Sprintf("book_id=%d", book_id)).First(&book).Error
	if bookErr != nil {
		resData.Code = 1
		resData.Msg = "没有检索到该书籍"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	fmt.Println("borrow book")
	fmt.Println(book)
	if book.BorrowState == 1 || book.DeletState == 1 {
		resData.Code = 1
		if book.BorrowState == 1 {
			resData.Msg = "此书籍已经借出，请借阅其他书籍"
		}
		if book.DeletState == 1 {
			resData.Msg = "此书籍已下架，请借阅其他书籍"
		}
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	// 查询录入管理员
	adminErr := db.Table("administrator").Where(fmt.Sprintf("admin_id=%d", admin_id)).First(&admin).Error
	if adminErr != nil {
		resData.Code = 1
		resData.Msg = "没有检索到管理员"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	// 改写图书状态
	bookStateErr := db.Table("book").Where(fmt.Sprintf("book_id=%d", book_id)).Update("borrow_state", 1).Error
	if bookStateErr != nil {
		resData.Code = 1
		resData.Msg = "书籍借出出错，请重新处理！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}

	nowTime := time.Now().Unix()
	borrow := models.Borrow{
		BookId:      book.BookId,
		BookName:    book.BookName,
		BookAuthor:  book.BookAuthor,
		BookPrice:   book.BookPrice,
		StudentId:   student.StudentId,
		SutdentName: student.StudentName,
		StartTime:   nowTime,
		BorrowDays:  borrow_days,
		EndTime:     nowTime + (borrow_days * 60 * 60 * 24),
		AdminId:     admin.AdminId,
		AdminName:   admin.AdminName,
		BorrowState: 1,
	}
	borrowErr := db.Create(&borrow).Error
	if borrowErr != nil {
		resData.Code = 1
		resData.Msg = "书籍借出出错，请重新处理！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	} else {
		resData.Code = 0
		resData.Msg = "书籍借出成功！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
}
func (c *BorrowController) Back() {
	borrow_id, _ := c.GetInt("borrow_id", 0)

	var resData models.ResData

	if borrow_id == 0 {
		resData.Code = 1
		resData.Msg = "请传入借阅编号！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}

	borrow := models.Borrow{
		BorrowId: borrow_id,
	}
	borrowBook := models.Borrow{}
	db := conn.GetORM()
	borrowErr := db.Where(&borrow).First(&borrowBook).Updates(map[string]interface{}{"end_time": time.Now().Unix(), "borrow_state": 0}).Error
	if borrowErr != nil {
		resData.Code = 1
		resData.Msg = "还书出错，请重新操作！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	book := models.Book{
		BookId: borrowBook.BookId,
	}

	bookErr := db.Table("book").Where(&book).Update("borrow_state", 0).Error
	if bookErr != nil {
		resData.Code = 1
		resData.Msg = "还书出错，请重新操作！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	resData.Code = 0
	resData.Msg = "success"
	c.Data["json"] = resData
	c.ServeJSON()
}
