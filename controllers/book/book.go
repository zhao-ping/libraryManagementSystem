package book

import (
	"fmt"
	"strconv"
	"time"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/auth"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/base"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	"git.zituo.net/zhaoping/LibraryManagementSystem/models"
	"github.com/astaxie/beego"
)

type BookController struct {
	beego.Controller
}

func (c *BookController) BookList() {
	page, _ := c.GetInt("page", 1)
	limit, _ := c.GetInt("limit", 10)
	book_name := c.GetString("book_name", "")
	book_id, _ := c.GetInt("book_id", 0)

	book_sql := "book_name LIKE '%" + book_name + "%'"
	book := models.Book{
		BookName: book_name,
	}

	if book_id != 0 {
		book.BookId = book_id
		book_sql = fmt.Sprintf("%s AND book_id=%d", book_sql, book_id)
	}

	books := make([]models.Book, 0)

	var count int
	db := conn.GetORM()
	db.Where(&book).Find(&books).Count(&count)

	dbErr := db.Table("book").Where(book_sql).Order("created desc").Order("borrow_state asc").Limit(limit).Offset((page - 1) * limit).Find(&books).Error

	resData := models.ResData{
		Code: 1,
		Msg:  "查询失败",
		Data: nil,
	}
	if dbErr == nil {
		pager := base.GetPager(page, limit, count)
		list := models.List{
			Pager: pager,
			List:  books,
		}
		resData.Code = 0
		resData.Msg = "success"
		resData.Data = list
	}

	c.Data["json"] = resData
	c.ServeJSON()
}
func (c *BookController) NewBook() {
	book_name := c.GetString("book_name", "")
	book_author := c.GetString("book_author", "")
	book_price, _ := c.GetFloat("book_price", 0)
	book_price, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", book_price), 64)
	book_type_id, _ := c.GetInt("book_type_id", 0)
	book_count, _ := c.GetInt("book_count", 1)
	resData := models.ResData{
		Code: 1,
		Msg:  "请按照要求输入必填信息",
	}
	if book_name == "" || book_author == "" || book_price == 0 || book_type_id == 0 {
		if book_name == "" {
			resData.Msg = "请输入书名"
		}
		if book_author == "" {
			resData.Msg = "请输入作者"
		}
		if book_type_id == 0 {
			resData.Msg = "请输入图书类型"
		}
		if book_price == 0 {
			resData.Msg = "请输入价格"
		}
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	db := conn.GetORM()
	var book_type models.BookType
	db.First(&book_type, book_type_id)

	admin := auth.GetAdminFromToken(c.Ctx)
	book := models.Book{
		BookName:     book_name,
		BookPrice:    book_price,
		BookAuthor:   book_author,
		BookTypeId:   book_type_id,
		BookTypeName: book_type.BookTypeName,
		AdminId:      admin.AdminId,
		AdminName:    admin.AdminName,
		Created:      time.Now().Unix(),
	}
	var books = make([]models.Book, book_count)
	for i := 0; i < book_count; i++ {
		books[i] = book
	}
	err_count := 0
	for i := 0; i < book_count; i++ {
		newBookErr := db.Create(&books[i]).Error
		if newBookErr != nil {
			err_count++
		}
	}
	if err_count > 0 {
		resData.Code = 1
		resData.Msg = fmt.Sprintf("%d本书入库成功，%d本书入库失败", book_count-err_count, err_count)
	} else {
		resData.Code = 1
		resData.Msg = "新书入库成功"
	}
	c.Data["json"] = resData
	c.ServeJSON()
}
func (c *BookController) BookTypeList() {
	book_types := make([]models.BookType, 0)

	db := conn.GetORM()
	dbErr := db.Find(&book_types).Error
	resData := models.ResData{
		Code: 1,
		Msg:  "error",
	}
	if dbErr == nil {
		resData.Code = 0
		resData.Msg = "success"
		resData.Data = book_types
	}
	c.Data["json"] = resData
	c.ServeJSON()
}

func (c *BookController) DeletBook() {

	book_id, _ := c.GetInt("book_id")

	resData := models.ResData{
		Code: 0,
		Msg:  "success",
	}
	if book_id == 0 {
		resData.Code = 1
		resData.Msg = "没有传入图书ID"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	book := models.Book{
		BookId: book_id,
	}
	db := conn.GetORM()
	deleteErr := db.Model(&book).Update("delete_state", 1).Error
	if deleteErr != nil {
		resData.Code = 1
		resData.Msg = "处理出错，请重试！"
		c.Data["json"] = resData
		c.ServeJSON()
		return
	}
	resData.Code = 0
	resData.Msg = "success"
	c.Data["json"] = resData
	c.ServeJSON()
}
