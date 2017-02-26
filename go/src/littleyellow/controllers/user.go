package controllers

import (
	"github.com/astaxie/beego"
	"littleyellow/models"
)

type UserListController struct {
	beego.Controller
}

func (this *UserListController) Get() {
	name := this.GetString("name")
	ret, err := models.GetUserList(name)
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	this.Data["userlist"] = ret
	this.Layout = "layout.html"
	this.TplName = "user/userlist.html"
}

type DeleteUserController struct {
	beego.Controller
}

func (this *DeleteUserController) Get() {
	id, err := this.GetInt("userid")
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	err = models.DeleteUserById(id)
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	} else {
		this.Redirect("/back/userlist", 302)
	}
}

type UserAddTimeController struct {
	beego.Controller
}

func (this *UserAddTimeController) Get() {
	id, err := this.GetInt("userid")
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	dt, err := this.GetInt("time")
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	err = models.AddPerDay(id, dt)
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	} else {
		this.Redirect("/back/userlist", 302)
	}
}
