package controllers

import (
	"github.com/astaxie/beego"
	"littleyellow/models"
)

type BackLoginController struct {
	beego.Controller
}

func (this *BackLoginController) Get() {
	this.TplName = "backlogin/signin.html"
}
func (this *BackLoginController) Post() {
	username := this.GetString("username")
	password := this.GetString("password")
	config_username, err := models.GetConfigByKey("username")
	config_password, err := models.GetConfigByKey("password")
	if err != nil || (config_username != username) || config_password != password {
		this.Redirect("/back/login", 302)
		return
	} else {
		this.SetSession("administrator", true)
		this.Redirect("/back/", 302)
	}
}
