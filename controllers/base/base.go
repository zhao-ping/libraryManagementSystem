package base

import (
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
