package controllers

import (
	"bytes"
	"github.com/astaxie/beego"
	"github.com/satori/go.uuid"
	// "log"
	"os"
	"path"
	// "time"
	"encoding/json"
	"fmt"
	"io"
	"strings"
)

func init() {
	file, err := os.Open("conf/ueditor_config.json")
	if err != nil {
		beego.Error(err)
		os.Exit(1)
	}
	defer file.Close()
	buf := bytes.NewBuffer(nil)
	buf.ReadFrom(file)
	configJson = buf.Bytes()
}

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	// beego.Info(c.Layout)
	c.Redirect("/back/articlelist", 302)

}
func (this *MainController) Post() {
	beego.Info(this.Ctx.Input.RequestBody)
}

type ImageUploadController struct {
	beego.Controller
}

var configJson []byte

func (this *ImageUploadController) Get() {
	this.Ctx.WriteString(string(configJson))
}

func (this *ImageUploadController) Post() {
	file, header, err := this.GetFile("upfile")
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
	b, err := json.Marshal(map[string]string{
		"url":      fmt.Sprintf("../static/upload/%s", filename), //保存后的文件路径
		"title":    "",                                           //文件描述，对图片来说在前端会添加到title属性上
		"original": header.Filename,                              //原始文件名
		"state":    "SUCCESS",                                    //上传状态，成功时返回SUCCESS,其他任何值将原样返回至图片上传框中
	})
	if err != nil {
		beego.Error(err)
		this.Data["json"] = map[string]interface{}{"error": err}
		this.ServeJSON()
		return
	} else {
		this.Ctx.WriteString(string(b))
		return
	}
}
