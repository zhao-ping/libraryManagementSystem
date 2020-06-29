package models

type Student struct {
	StudentId    int    `gorm:"primary_key;column:student_id" json:"student_id"`
	StudentName  string `gorm:"column:student_name" json:"student_name"`
	StudentSex   int    `gorm:"column:student_sex;default:0" json:"student_sex"`
	StudentAge   int    `gorm:"column:student_age;default:18" json:"student_age"`
	StudentGrade int    `gorm:"column:student_grade;default:1" json:"student_grade"`
	StudentMajor string `gorm:"column:student_major;" json:"student_major"`
	AdminId      int    `gorm:"column:admin_id" json:"admin_id"`
	AdminName    string `gorm:"column:admin_name" json:"admin_name"`
	Created      int64  `gorm:"column:created" json:"created"`
}

func (c *Student) TableName() string {
	return "student"
}

type Administrator struct {
	AdminId   int    `gorm:"primary_key;column:admin_id" json:"admin_id"`
	AdminName string `gorm:"column:admin_name" json:"admin_name"`
	AdminSex  int    `gorm:"column:admin_sex" json:"admin_sex"`
	AdminAge  int    `gorm:"column:admin_age" json:"admin_age"`
	Password  string `gorm:"column:password" json:"password"`
	Created   int64  `gorm:"column:created" json:"created"`
}

func (c *Administrator) TableName() string {
	return "administrator"
}

type BookType struct {
	BookTypeId   int    `gorm:"primary_key;column:book_type_id" json:"book_type_id"`
	BookTypeName string `gorm:"column:book_type_name" json:"book_type_name"`
	Created      int64  `gorm:"column:created" json:"created"`
}

func (c *BookType) TableName() string {
	return "book_type"
}

type Book struct {
	BookId       int     `gorm:"primary_key;column:book_id" json:"book_id"`
	BookName     string  `gorm:"column:book_name" json:"book_name"`
	BookAuthor   string  `gorm:"column:book_author" json:"book_author"`
	BookPrice    float64 `gorm:"column:book_price;default:50" json:"book_price"`
	BookTypeId   int     `gorm:"column:book_type_id" json:"book_type_id"`
	BookTypeName string  `gorm:"column:book_type_name" json:"book_type_name"`
	Created      int64   `gorm:"column:created" json:"created"`
	AdminId      int     `gorm:"column:admin_id" json:"admin_id"`
	AdminName    string  `gorm:"column:admin_name" json:"admin_name"`
	BorrowState  int     `gorm:"column:borrow_state" json:"borrow_state"`
	DeletState   int     `gorm:"column:delete_state" json:"delete_state"`
}

func (c *Book) TableName() string {
	return "book"
}

type Borrow struct {
	BorrowId    int     `gorm:"primary_key;column:borrow_id" json:"borrow_id"`
	BookId      int     `gorm:"column:book_id" json:"book_id"`
	BookName    string  `gorm:"column:book_name" json:"book_name"`
	BookAuthor  string  `gorm:"column:book_author" json:"book_author"`
	BookPrice   float64 `gorm:"column:book_price" json:"book_price"`
	StudentId   int     `gorm:"column:student_id" json:"student_id"`
	SutdentName string  `gorm:"column:student_name" json:"student_name"`
	StartTime   int64   `gorm:"column:start_time" json:"start_time"`
	EndTime     int64   `gorm:"column:end_time" json:"end_time"`
	BorrowDays  int64   `gorm:"column:borrow_days" json:"borrow_days"`
	BackTime    int64   `gorm:"column:back_time" json:"back_time"`
	AdminId     int     `gorm:"column:admin_id" json:"admin_id"`
	AdminName   string  `gorm:"column:admin_name" json:"admin_name"`
	BorrowState int     `gorm:"column:borrow_state" json:"borrow_state"`
}

func (c *Borrow) TableName() string {
	return "borrow"
}

type BorrowTypeCount struct {
	Count        int    `gorm:"column:count" json:"count"`
	BookTypeId   int    `gorm:"column:book_type_id" json:"book_type_id"`
	BookTypeName string `gorm:"column:book_type_name" json:"book_type_name"`
}

type ResData struct {
	Code int         `json:"code"` //0:成功，1：错误并提示
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

type Pager struct {
	Limit     int `json:"limit"`
	Page      int `json:"page"`
	Count     int `json:"count"`
	PageCount int `json:"page_count"`
}
type List struct {
	Pager Pager       `json:"pager"`
	List  interface{} `json:"list"`
}
