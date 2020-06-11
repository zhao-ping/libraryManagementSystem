package conn

import (
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	defaultDB = "libraryManagementSystem"
	db        *gorm.DB
)

func init() {
	// db = *gorm.DB
	newORM()
	db = GetORM()
}

// 初始化GORM
func newORM() {
	var (
		orm *gorm.DB
		err error
	)
	user := "root"
	password := "12345678"
	host := "localhost"
	port := 3306
	connStr := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", user, password, host, port, defaultDB) + "?charset=utf8mb4&parseTime=true"

	for orm, err = gorm.Open("mysql", connStr); err != nil; {
		fmt.Println("数据库连接失败，正在重试！")
		time.Sleep(5 * time.Second)
		orm, err = gorm.Open("mysql", connStr)
	}

	orm.CommonDB()
	orm.DB().SetMaxOpenConns(1000)
	orm.DB().SetMaxIdleConns(10)
	orm.DB().SetConnMaxLifetime(time.Hour)
	db = orm
}

func GetORM() *gorm.DB {
	return db
}
