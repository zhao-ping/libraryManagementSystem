package base

import (
	"git.zituo.net/zhaoping/LibraryManagementSystem/controllers/conn"
	"git.zituo.net/zhaoping/LibraryManagementSystem/models"
)

func GetPager(page int, limit int, count int) models.Pager {
	var pageCount int
	if count%limit > 0 {
		pageCount = (count / limit) + 1
	} else {
		pageCount = count / limit
	}
	pager := models.Pager{
		Page:      page,
		Limit:     limit,
		Count:     count,
		PageCount: pageCount,
	}
	return pager
}
func GetListFormDB(filter interface{}, list interface{}, page int, limit int) models.ResData {
	var count int
	db := conn.GetORM()
	dbErr := db.Where(&filter).Offset(page - 1).Limit(limit).Find(&list).Count(&count).Error

	resData := models.ResData{
		Code: 1,
		Msg:  "error",
		Data: nil,
	}
	if dbErr == nil {
		pager := GetPager(page, limit, count)
		list := models.List{
			Pager: pager,
			List:  list,
		}
		resData.Code = 0
		resData.Msg = "success"
		resData.Data = list
	}
	return resData
}
