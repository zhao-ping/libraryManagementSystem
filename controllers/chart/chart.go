package chart

import (
	"fmt"
	"strconv"
	"time"

	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/auth"
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	"git.zituo.net/zhaoping/LibraryManagementSystem/models"
	"github.com/astaxie/beego"
)

type ChartController struct {
	beego.Controller
}

/**
 * 书籍类型借阅数量
 */
func (c *ChartController) BorrowTypeCount() {

	var book_type_count []models.BorrowTypeCount
	db := conn.GetORM()

	borrowErr := db.Raw("SELECT book_type.book_type_id,book_type.book_type_name,Count( borrow.book_id) as count FROM `borrow` left join book on book.book_id=borrow.book_id left join book_type on book_type.book_type_id=book.book_type_id GROUP BY  book.book_type_id,book.book_type_name ORDER BY count ASC").Scan(&book_type_count).Error
	if borrowErr != nil {
		auth.OutputErr(c.Ctx, 1, "书籍借阅列表分类查询出错")
	}

	auth.OutputSuccess(c.Ctx, book_type_count)
}

/**
 * 最近七天最受欢迎的书籍借阅时间走势 5本
 */
func (c *ChartController) BorrowTime() {
	now := time.Now().Unix()
	var minTime = now - 7*60*60*24
	var dayCount int = 7
	var bookCount = 5

	var mostPupularBooks []models.PopularBook

	db := conn.GetORM()
	dbErr := db.Raw(fmt.Sprintf("SELECT book_name,book_author,book_price, COUNT(book_name) as count FROM borrow WHERE start_time > %d GROUP BY book_name,book_author,book_price ORDER BY count DESC LIMIT %d", minTime, bookCount)).Scan(&mostPupularBooks).Error
	if dbErr != nil {
		auth.OutputErr(c.Ctx, 1, "数据查询出错1")
	}

	day := make([]int, dayCount)
	xaxis := make([]string, dayCount)
	for i := 0; i < dayCount; i++ {
		t := now - int64(i)*60*60*24
		xaxis[i] = strconv.FormatInt(t, 10)
		day[i] = time.Unix(t, 0).Day()
	}

	var borrowBooks []models.Borrow
	borrowBooksErr := db.Raw(fmt.Sprintf("SELECT book_name,book_author,book_price,start_time FROM borrow WHERE start_time > %d ", minTime)).Scan(&borrowBooks).Error
	if borrowBooksErr != nil {
		auth.OutputErr(c.Ctx, 1, "数据查询出错2")
	}
	borrowBookTime := models.PopularBookTime{}
	borrowBookTime.XAxis = xaxis
	serise := make([]models.SingleBookTime, bookCount)
	for i := len(mostPupularBooks) - 1; i >= 0; i-- {
		currentBook := mostPupularBooks[i]
		var borrowBooksByName models.SingleBookTime
		borrowBooksByName.Name = currentBook.BookName
		singleBookTimeOringinData := make([]int, dayCount)
		for i := 0; i < dayCount; i++ {
			singleBookTimeOringinData[i] = 0
		}

		for j := 0; j < len(borrowBooks); j++ {
			book := borrowBooks[j]
			if currentBook.BookName == book.BookName && currentBook.BookAuthor == book.BookAuthor {
				for ti := 0; ti < dayCount-1; ti++ {
					if time.Unix(book.StartTime, 0).Day() == day[ti] {
						singleBookTimeOringinData[ti]++
					}
				}
			}
		}
		borrowBooksByName.Data = singleBookTimeOringinData
		serise[i] = borrowBooksByName
	}
	borrowBookTime.Series = serise
	auth.OutputSuccess(c.Ctx, borrowBookTime)
}

/**
 * 最受欢迎的10本书籍借阅量
 */
func (c *ChartController) MostPopularBooks() {
	var popularBooks []models.PopularBook
	db := conn.GetORM()
	dbErr := db.Raw("SELECT book_name,book_author,book_price,COUNT(book_name) AS count FROM borrow GROUP BY book_name,book_author,book_price ORDER BY count DESC LIMIT 10").Scan(&popularBooks).Error
	if dbErr != nil {
		auth.OutputErr(c.Ctx, 1, "最受欢迎书籍查询出错")
	}
	auth.OutputSuccess(c.Ctx, popularBooks)
}
