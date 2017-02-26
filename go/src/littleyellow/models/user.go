package models

import (
	"github.com/astaxie/beego/orm"
	// "strconv"
	"time"
)

func init() {
	orm.RegisterModel(new(User))
}

type User struct {
	UserId        int       `orm:"column(userid);auto"`
	UserName      string    `orm:"column(username)"`
	Mail          string    `orm:"column(mail)"`
	Password      string    `orm:"column(password)"`
	RegisterTime  time.Time `orm:"column(registertime)"`
	LastLoginTime time.Time `orm:"column(lastlogintime)"`
	DeadTime      time.Time `orm:"column(deadtime)"`
	Disable       int       `orm:"column(disable)"`
}

func GetUserList(name string) (userlist []User, err error) {
	o := orm.NewOrm()
	sql := `select * from user where username like '%` + name + `%' and disable='0' order by registertime desc`
	_, err = o.Raw(sql).QueryRows(&userlist)
	return userlist, err
}
func DeleteUserById(id int) (err error) {
	o := orm.NewOrm()
	sql := `update user set disable='1' where userid=?`
	_, err = o.Raw(sql, id).Exec()
	return err
}
func AddPerDay(id, dt int) (err error) {
	o := orm.NewOrm()
	var u User
	sql := `select * from user where userid=?`
	err = o.Raw(sql, id).QueryRow(&u)
	if err != nil {
		return err
	}
	u.DeadTime = u.DeadTime.Add(time.Hour * 24 * time.Duration(dt))
	_, err = o.Update(&u)
	return err
}
