package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	_ "littleyellow/routers"
	// "strconv"
)

func init() {
	contect := beego.AppConfig.String("mysql_contect_string")
	orm.RegisterDataBase("default", "mysql", contect, 30)
}

func main() {
	// go SpYoudianin()
	var Back = func(ctx *context.Context) {
		// beego.Info(*ctx.Input)
		_, ok := ctx.Input.Session("administrator").(bool)
		beego.Info(ctx.Request.RequestURI)
		if !ok && ctx.Request.RequestURI != "/back/login" {
			ctx.Redirect(302, "/back/login")
		}
	}
	beego.InsertFilter("*", beego.BeforeRouter, Back)
	beego.Run()
}
