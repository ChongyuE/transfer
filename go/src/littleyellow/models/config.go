package models

import (
	"github.com/astaxie/beego/orm"
)

type Config struct {
	Id    int    `orm:"column(id);auto"`
	Key   string `orm:"column(keyconfig)"`
	Value string `orm:"column(value)"`
}

func init() {
	orm.Debug = true
}
func GetConfigByKey(key string) (value string, err error) {
	o := orm.NewOrm()
	sql := `select value from config where keyconfig=?`
	err = o.Raw(sql, key).QueryRow(&value)
	return value, err
}
func SetConfigByKey(key string, value string) (err error) {
	o := orm.NewOrm()
	sql := `update config set value=? where keyconfig=?`
	_, err = o.Raw(sql, value, key).Exec()
	return err
}
