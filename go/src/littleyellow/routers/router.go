package routers

import (
	"github.com/astaxie/beego"
	"littleyellow/controllers"
)

func init() {
	beego.Router("/back/", &controllers.MainController{})
	// article
	beego.Router("/back/articleadd", &controllers.ArticleAddController{})
	beego.Router("/back/articlelist", &controllers.ArticleListController{})
	beego.Router("/back/deletearticle", &controllers.DeleteArticleController{})
	beego.Router("/back/articlemodify", &controllers.ModifyArticleContrller{})
	// user
	beego.Router("/back/userlist", &controllers.UserListController{})
	beego.Router("/back/deleteuser", &controllers.DeleteUserController{})
	beego.Router("/back/useraddtime", &controllers.UserAddTimeController{})
	// 插件上传图片接口
	beego.Router("/back/fileupload", &controllers.ImageUploadController{})
	// 有点硬爬虫接口
	beego.Router("/back/youdianin", &controllers.YoudianController{})
	beego.Router("/back/deleteyoudianin", &controllers.DeleteYoudianController{})
	//后台登录
	beego.Router("/back/login", &controllers.BackLoginController{})
}
