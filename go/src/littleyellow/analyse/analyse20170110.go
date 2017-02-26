package analyse

import (
	"github.com/PuerkitoBio/goquery"
	"littleyellow/models"
	"littleyellow/utils"
	"time"
)

func AnalyseCover(url, cookie string) (ret []models.Cover, err error) {
	res, err := utils.HttpDoReturnRes(url, cookie)
	doc, err := goquery.NewDocumentFromResponse(res)
	if err != nil {
		return nil, err
	}
	doc.Find(".entry-title").Each(func(i int, s *goquery.Selection) {
		s.Find("p").Each(func(i2 int, s2 *goquery.Selection) {
			var c models.Cover
			c.Name = s2.Find("a").Text()
			href, exist := s2.Find("a").Attr("href")
			if exist {
				c.Url = href
			}
			ret = append(ret, c)
		})
	})
	return ret, nil
}

func AnalyseDetail(url, cookie string) (ret *models.Detail, err error) {
	res, err := utils.HttpDoReturnRes(url, cookie)
	doc, err := goquery.NewDocumentFromResponse(res)
	if err != nil {
		return nil, err
	}
	var r models.Detail
	doc.Find(".post").Each(func(i int, s *goquery.Selection) {
		r.Name = s.Find(".post-title").Text()
		r.DownLoad = s.Find(".panel-body").Text()
		r.AddTime = time.Now()
	})
	return &r, nil
}
