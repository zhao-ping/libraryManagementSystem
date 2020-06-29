package chart

import (
	"fmt"
	"time"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/auth"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	"git.zituo.net/zhaoping/LibraryManagementSystem/models"
	"github.com/astaxie/beego"
)

type ChartController struct {
	beego.Controller
}

func (c *ChartController) BorrowTypeCount() {

	var book_type_count []models.BorrowTypeCount
	db := conn.GetORM()

	borrowErr := db.Raw("SELECT book_type.book_type_id,book_type.book_type_name,Count( borrow.book_id) as count FROM `borrow` left join book on book.book_id=borrow.book_id left join book_type on book_type.book_type_id=book.book_type_id GROUP BY  book.book_type_id,book.book_type_name").Scan(&book_type_count).Error
	if borrowErr != nil {
		auth.OutputErr(c.Ctx, 1, "书籍借阅列表分类查询出错")
	}

	auth.OutputSuccess(c.Ctx, book_type_count)
}
func (c *ChartController) BorrowTime() {
	now := time.Now().Unix()
	fmt.Println(now)
	var week [7]int64
	var i int64
	for i = 0; i < 7; i++ {
		time := now - i*60*60*24
		week[i] = time
	}

	db := conn.GetORM()
	db.Where("borrow.start_time>")
	fmt.Println(week)
	auth.OutputSuccess(c.Ctx, now)
}
