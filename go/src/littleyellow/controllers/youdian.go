package controllers

import (
	"github.com/astaxie/beego"
	"littleyellow/analyse"
	"littleyellow/models"
	"strconv"
	"strings"
)

type YoudianController struct {
	beego.Controller
}

func (this *YoudianController) Get() {
	// name := this.GetString("name")
	ret, err := models.GetDetaillist()
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	value, _ := models.GetConfigByKey("youdianin")
	if value == "false" {
		this.Data["is_s"] = "忙碌"
	} else {
		this.Data["is_s"] = "空闲"
	}
	this.Data["detail_list"] = ret
	this.Layout = "layout.html"
	this.TplName = "youdian/list.html"
}
func (this *YoudianController) Post() {
	cookie := this.GetString("cookie")
	if strings.TrimSpace(cookie) == "" {
		this.Redirect("/back/youdianin", 302)
		return
	}
	value, _ := models.GetConfigByKey("youdianin")
	// if err != nil {
	// 	this.Data["json"] = err
	// 	this.ServeJSON()
	// 	return
	// }
	if value == "false" {
		// beego.Info(22222222222)
		this.Redirect("/back/youdianin", 302)
		return
	} else {
		// beego.Info(111111)
		models.SetConfigByKey("youdianin", "false")
		// beego.Info("")
		go SpYoudianin(cookie)
		this.Redirect("/back/youdianin", 302)
		return
	}
}

type DeleteYoudianController struct {
	beego.Controller
}

func (this *DeleteYoudianController) Get() {
	id, err := this.GetInt("id")
	if err != nil {
		this.Ctx.WriteString(err.Error())
		return
	}
	err = models.UpdateIsUsedYoudianin(id)
	if err != nil {
		this.Ctx.WriteString(err.Error())
		return
	} else {
		this.Redirect("/back/youdianin", 302)
		return
	}
}

func SpYoudianin(cookie string) {
	beego.Info("开始爬数据")
	url := "https://youdian.in/page/"
	// cookie := "PHPSESSID=44doe1kqv13rk5lpo6a8qihvtpthg82s"
	for i := 1; i < 31; i++ {
		coverlist, err := analyse.AnalyseCover(url+strconv.Itoa(i), cookie)
		if err != nil {
			beego.Error(err)
		}
		// beego.Info(coverlist, err)
		for _, x := range coverlist {
			r, err := analyse.AnalyseDetail(x.Url, cookie)
			r.Url = x.Url
			if err != nil {
				beego.Error(err)
			}
			err = models.InsertDetail(r)
			if err != nil {
				beego.Error(err)
			}
		}
	}
	beego.Info("数据爬完了")
	models.SetConfigByKey("youdianin", "true")

}
