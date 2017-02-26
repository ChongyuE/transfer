package models

import (
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

func init() {
	orm.RegisterModel(new(Detail))
}

type Cover struct {
	Name string
	Url  string
}
type Detail struct {
	Id       int       `orm:"column(id);auto"`
	Name     string    `orm:"column(name)"`
	DownLoad string    `orm:"column(download)"`
	AddTime  time.Time `orm:"column(addtime)"`
	Url      string    `orm:"column(url)"`
	IsUsed   int       `orm:"column(is_used)"`
}

func InsertDetail(detail *Detail) (err error) {
	o := orm.NewOrm()
	sql := `select count(*) from detail where url=?`
	var i int
	err = o.Raw(sql, detail.Url).QueryRow(&i)
	if i > 0 || err != nil {
		return nil
	}
	//
	detail.AddTime = time.Now()
	detail.IsUsed = 0
	_, err = o.Insert(detail)
	return err
}
func GetDetaillist() (detaillist []Detail, err error) {
	o := orm.NewOrm()
	sql := `select * from detail where is_used=0 order by addtime desc`
	_, err = o.Raw(sql).QueryRows(&detaillist)
	return detaillist, err
}
func UpdateIsUsedYoudianin(id int) (err error) {
	o := orm.NewOrm()
	sql := `update detail set is_used=1 where id=?`
	_, err = o.Raw(sql, strconv.Itoa(id)).Exec()
	return err
}
