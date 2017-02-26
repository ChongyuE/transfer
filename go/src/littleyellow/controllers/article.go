package controllers

import (
	"github.com/astaxie/beego"
	"github.com/satori/go.uuid"
	"littleyellow/models"
	"os"
	"path"
	"strings"
	"time"

	// "encoding/json"
	"io"
)

type ArticleAddController struct {
	beego.Controller
}

func (this *ArticleAddController) Get() {
	this.Data["time"] = time.Now().Format("2006-01-02 15:04:05")
	this.Data["icon"] = "1"
	this.Data["order"] = "1"
	this.Layout = "layout.html"
	this.TplName = "article/addormodify.html"
}
func (this *ArticleAddController) Post() {
	var article models.Article
	var err error
	article.Tittle = this.GetString("tittle")
	file, header, err := this.GetFile("cover")
	if file != nil {
		if err != nil {
			beego.Error(err)
			this.Data["json"] = map[string]interface{}{"error": err}
			this.ServeJSON()
			return
		}
		filename := strings.Replace(uuid.NewV4().String(), "-", "", -1) + path.Ext(header.Filename)
		outFile, err := os.Create(path.Join("static", "upload", filename))
		if err != nil {
			beego.Error(err)
			this.Data["json"] = map[string]interface{}{"error": err}
			this.ServeJSON()
			return
		}
		defer outFile.Close()
		io.Copy(outFile, file)
		article.Cover = "../static/upload/" + filename
	}
	article.Class, err = this.GetInt("class")
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	article.Content = this.GetString("content")
	article.Download = this.GetString("downpath")
	article.ClickTimes = 0
	article.ClickTimes, err = this.GetInt("click_times")
	if err != nil {
		beego.Error(err)
		article.ClickTimes = 0
	}
	article.Icon = 1
	article.Icon, err = this.GetInt("icon")
	if err != nil {
		beego.Error(err)
		article.Icon = 1
	}
	article.Order = 1
	article.Order, err = this.GetInt("order")
	if err != nil {
		beego.Error(err)
		article.Order = 1
		return
	}
	article.AddTime = time.Now()
	article.ReportTime, err = time.Parse("2006-01-02 15:04:05", this.GetString("report_time"))
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	err = models.ArticleInsert(&article)
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		return
	} else {
		this.Redirect("/back", 302)
	}
}

type ArticleListController struct {
	beego.Controller
}

func (this *ArticleListController) Get() {
	tittle := this.GetString("tittle")
	article_list, err := models.GetArticleList(tittle)
	if err != nil {
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	this.Data["article_list"] = article_list
	this.Layout = "layout.html"
	this.TplName = "article/list.html"
}

type ModifyArticleContrller struct {
	beego.Controller
}

func (this *ModifyArticleContrller) Get() {
	id, err := this.GetInt("id")
	if err != nil {
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	article, err := models.GetArticleById(id)
	this.Data["article"] = article
	// beego.Error(article.Content)
	this.Layout = "layout.html"
	this.TplName = "article/modify.html"
}
func (this *ModifyArticleContrller) Post() {
	var article models.Article
	var err error
	article.Id, err = this.GetInt("id")
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	article.Tittle = this.GetString("tittle")
	file, header, err := this.GetFile("cover")
	if file != nil {
		if err != nil {
			beego.Error(err)
			this.Data["json"] = map[string]interface{}{"error": err}
			this.ServeJSON()
			return
		}
		filename := strings.Replace(uuid.NewV4().String(), "-", "", -1) + path.Ext(header.Filename)
		outFile, err := os.Create(path.Join("static", "upload", filename))
		if err != nil {
			beego.Error(err)
			this.Data["json"] = map[string]interface{}{"error": err}
			this.ServeJSON()
			return
		}
		defer outFile.Close()
		io.Copy(outFile, file)
		article.Cover = "../static/upload/" + filename

	} else {
		a, err := models.GetArticleById(article.Id)
		if err != nil {
			beego.Error(err)
			this.Data["json"] = map[string]interface{}{"error": err}
			this.ServeJSON()
			return
		}
		article.Cover = a.Cover
	}
	article.Class, err = this.GetInt("class")
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	article.Content = this.GetString("content")
	article.Download = this.GetString("downpath")
	article.ClickTimes = 0
	article.ClickTimes, err = this.GetInt("click_times")
	if err != nil {
		beego.Error(err)
		article.ClickTimes = 0
	}
	article.Icon = 1
	article.Icon, err = this.GetInt("icon")
	if err != nil {
		beego.Error(err)
		article.Icon = 1
	}
	article.Order = 1
	article.Order, err = this.GetInt("order")
	if err != nil {
		beego.Error(err)
		article.Order = 1
		return
	}
	article.AddTime = time.Now()
	article.ReportTime, err = time.Parse("2006-01-02 15:04:05", this.GetString("report_time"))
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	err = models.UpdateArticle(&article)
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		return
	} else {
		this.Redirect("/back", 302)
	}
}

type DeleteArticleController struct {
	beego.Controller
}

func (this *DeleteArticleController) Get() {
	id, err := this.GetInt("id")
	if err != nil {
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	}
	err = models.DeleteArticleById(id)
	if err != nil {
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	} else {
		this.Redirect("/back", 302)
	}
}
