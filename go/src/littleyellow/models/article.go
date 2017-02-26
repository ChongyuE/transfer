package models

import (
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

func init() {
	orm.RegisterModel(new(Article))
}

type Article struct {
	Id         int       `orm:"column(id)";auto`
	Tittle     string    `orm:"column(tittle)"`
	Class      int       `orm:"column(class)"`
	Cover      string    `orm:"column(cover)"`
	Content    string    `orm:"column(content)"`
	Download   string    `orm:"column(download)"`
	ClickTimes int       `orm:"column(click_times)"`
	Icon       int       `orm:"column(icon)"`
	Order      int       `orm:"column(sort)"`
	AddTime    time.Time `orm:"column(add_time)"`
	ReportTime time.Time `orm:"column(report_time)"`
}

func ArticleInsert(article *Article) (err error) {
	o := orm.NewOrm()
	_, err = o.Insert(article)
	return err
}
func GetArticleList(tittle string) (article_list []Article, err error) {
	o := orm.NewOrm()
	sql := `select * from article where tittle like '%` + tittle + `%' order by sort desc,add_time desc`
	_, err = o.Raw(sql).QueryRows(&article_list)
	return article_list, err
}

func DeleteArticleById(id int) (err error) {
	o := orm.NewOrm()
	sql := `delete from article where id =?`
	_, err = o.Raw(sql, strconv.Itoa(id)).Exec()
	return err
}

func GetArticleById(id int) (article *Article, err error) {
	o := orm.NewOrm()
	sql := `select * from article where id =?`
	err = o.Raw(sql, strconv.Itoa(id)).QueryRow(&article)
	return article, err
}
func UpdateArticle(article *Article) (err error) {
	o := orm.NewOrm()
	_, err = o.Update(article)
	return err
}
