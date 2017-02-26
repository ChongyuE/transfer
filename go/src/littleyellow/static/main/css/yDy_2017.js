if (window.location.host == "127.0.0.1") {
	site_url = "http://127.0.0.1/youdian/";
} else if (window.location.host == "youdian.in") {
	site_url = "https://youdian.in/";
} else {
	site_url = "https://youdian.in/";
}

function reset_pass() {
	$("#error").empty();
	var email = $("#email").val();
	var code = $("#code").val();
	if (email == "") {
		swal("请填写邮箱地址");
		return false;
	}
	if (code == "") {
		swal("请填写验证码");
		return false;
	}
	if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(email)) {
		$("#error").html("<span style='color: #D9534F;font-size: 12px;'>请使用正确E-mail地址</span>");
		return false;
	}
	$("#reset_pass_button").val("稍等……");
	$("#reset_pass_button").attr("disabled", "disabled");
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=reset_pass", {
		email: email,
		code: code
	}, resetpasscallback);
}

function resetpasscallback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		swal("", obj.msg, "success");
		$("#email").val("");
		$("#code").val("");
		change_code();
	} else {
		$("#reset_pass_button").attr("disabled", false);
		$("#error").html("<span style='color: #D9534F;font-size: 12px;'>" + obj.msg + "</span>");
	}
	$("#reset_pass_button").val("提交");
}

function change_code() {
	document.getElementById('code_img').src = site_url + "wp-content/themes/yDy_2017/vip_query.php?act=echoResetCode&v=" + Math.random();
}

function getFreeSS(pass) {
	swal({
		title: '免费SS服务',
		//text: '<h3>暂时下线</h3>',
		text: '<p>服务器：<span style="color: #DD6B55;">free-ny-1.y-d-y.org</span></p><p>密码：<span style="color: #DD6B55;">' + pass + '</span>（注：<span>此密码每12小时自动更新</span>）</p><p>端口：<span style="color: #DD6B55;">9000</span></p><p>加密方式：<span style="color: #DD6B55;">rc4-md5</span></p>',
		html: true,
		type: 'warning',
		showCancelButton: false,
		confirmButtonText: '确定',
		confirmButtonColor: '#DD6B55',
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
	})
}

function getYunfile(i) {
	swal({
		title: 'Yunfile离线下载',
		//text: '<h3>暂时下线</h3>',
		text: '<h3>此项服务只对「会员Plus」开放</h3><p>测试中，可能会有Bug，请及时反馈</p>',
		html: true,
		type: 'info',
		showCancelButton: true,
		cancelButtonText: '算了吧',
		confirmButtonText: '带我去',
		confirmButtonColor: '#DD6B55',
		closeOnConfirm: false,
		showLoaderOnConfirm: false,
	}, function(isConfirm) {
		if (isConfirm) {
			window.open("https://lab.youdian.in/?i=" + i);
			swal.close();
		} else {
			return false;
		}
	})
}

function getSSCode(m, n) {
	swal({
		title: '有点硬会员专享SS服务',
		text: '请勿公开连接信息，点击按钮获取邀请码',
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		confirmButtonColor: '#DD6B55',
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
	}, function() {
		var code;
		setTimeout(function() {
			$.post(site_url + "getSScode.php", {}, function(data) {
				var obj = eval('(' + data + ')');
				if (obj.status == 1) {
					swal({
						title: "获取失败",
						text: obj.msg,
						type: 'error',
						confirmButtonText: '确定',
						confirmButtonColor: '#DD6B55',
					});
				}
				if (obj.status == 0) {
					swal({
						title: "获取成功",
						text: '请点击下方链接开始注册（如果提示邀请码无效，请在任意文章下留言，站长会通过站内信的方式补发一枚邀请码）<br><a target="_blank" href="https://hardss.com/auth/register?c=' + obj.msg + '&m=' + m + '&n=' + n + '" style="color: #F07154;text-decoration: underline;margin-top: 10px;display: block;">点击这里开始注册</a><a href="https://youdian.in/2160.html" style="color: #F07154;text-decoration: underline;margin-top: 10px;display: block;">SS的使用教程</a>',
						type: "success",
						html: true,
						confirmButtonText: '确定',
						confirmButtonColor: '#DD6B55',
					})
				}
			})
		}, 2000);
	});
}

function getSSUpgrade() {
	swal({
		title: '专享SS升级服务',
		text: '<p style="margin: 5px 0;">目前硬站SS服务共架设3台节点服务器：<b>纽约、洛杉矶、新加坡</b>，陆续增加中</p><p style="margin: 5px 0;">普通会员可使用<b>1</b>个节点，流量默认为10G</p><p style="margin: 5px 0;">会员PLUS A（50元）升级后可使用<b>2</b>个节点，并且流量+20G</p><p style="margin: 5px 0;">会员PLUS B（100元）升级后可使用<b>全部</b>节点，并且流量+40G</p>',
		html: true,
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		confirmButtonColor: '#DD6B55',
		closeOnConfirm: false,
		showLoaderOnConfirm: true,
	}, function() {
		var code;
		setTimeout(function() {
			$.post(site_url + "SSLevelUpgrade.php", {}, function(data) {
				var obj = eval('(' + data + ')');
				if (obj.status == 1) {
					swal({
						title: "升级失败",
						text: obj.msg,
						type: 'error',
						confirmButtonText: '确定',
						confirmButtonColor: '#DD6B55',
					});
				}
				if (obj.status == 0) {
					swal({
						title: "升级成功",
						text: obj.msg,
						type: "success",
						html: true,
						confirmButtonText: '确定',
						confirmButtonColor: '#DD6B55',
					})
				}
			})
		}, 2000);
	});
}

function showTitle(id) {
	$('.entry-title').hide();
	$('#title-' + id).show();
}

function what_is_check_in() {
	swal({
		title: "签到有什么用",
		text: "根据签到次数获取硬币数及其他福利，月底清零哟",
		type: "info",
		showCancelButton: true,
		cancelButtonText: '算了吧',
		confirmButtonText: '去兑换',
		confirmButtonColor: '#DD6B55',
		closeOnConfirm: true,
		closeOnCancel: true
	}, function(isConfirm) {
		if (isConfirm) {
			window.location.href = "https://youdian.in/exchange";
		} else {
			return false;
		}
	});
}

function what_is_coin() {
	swal({
		title: "什么是硬币",
		text: "非付费会员下载本站资源时可以使用",
		type: "info",
		confirmButtonColor: '#DD6B55',
		closeOnConfirm: true,
	});
}

function ToggleDayNightCSS() {
	if ($("#night-css").length > 0) {
		$("#night-css").remove();
		$("#DayNightCSS").html('<span class="night_icon" style="display:inline">');
		setCookie("ydy_nightmode", "no");
	} else {
		$("<link>").attr({
			id: "night-css",
			rel: "stylesheet",
			type: "text/css",
			href: site_url + "wp-content/themes/yDy_2017/css/night.css?v=" + RndNum(10)
		}).appendTo("head");
		$("#DayNightCSS").html('<span class="night_icon" style="display:inline">');
		setCookie("ydy_nightmode", "yes");
	}
}

function toggleAjax() {
	var mode = getCookie("ydy_ajax_mode");
	if (mode == "" || mode == "no") {
		setCookie("ydy_ajax_mode", "yes");
		swal({
			title: "已开启页面无刷新模式",
			text: "正在重新加载……",
			showConfirmButton: false,
		});
		setTimeout(function() {
			location.reload();
		}, 1000);
	} else {
		setCookie("ydy_ajax_mode", "no");
		swal({
			title: "已关闭页面无刷新模式",
			text: "正在重新加载……",
			showConfirmButton: false,
		});
		setTimeout(function() {
			location.reload();
		}, 1000);
	}
}

function toggleSidebar() {
	var width = $(window).width();
	if (width < 600) {
		return false;
	} else {
		if ($("#sidebar").is(":hidden")) {
			$("#main").animate({
				width: "75%"
			}, 150, function() {
				$("#sidebar").fadeIn(100);
			});

		} else {
			$("#sidebar").fadeOut(100, function() {
				$("#main").animate({
					width: "100%"
				}, 150);
			});
		}
	}
}

//登录
function vip_login() {
	$("#login_error").empty();
	var vip_username = $("#vip_username").val();
	var vip_password = $("#vip_password").val();
	if (vip_username == "" || vip_password == "") {
		$("#login_error").html("请填写用户名密码");
		return false;
	}
	$("#login_button").attr("disabled", "disabled");
	$("#login_button").val("正在登录…");
	var loading = '<div class="spinner" style="margin:0;width:auto;text-align:left;"><div class="bounce1" style="width:10px;height:10px;"></div><div class="bounce2" style="width:10px;height:10px;"></div><div class="bounce3" style="width:10px;height:10px;"></div><div class="bounce4" style="width:10px;height:10px;"></div><div class="bounce5" style="width:10px;height:10px;"></div></div>';
	$("#login_error").html(loading);
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=login", {
		vip_username: vip_username,
		vip_password: vip_password,
	}, logincallback);
}

function logincallback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		$("#login_error").html("<span style='color: #D9534F;font-size: 12px;'>" + obj.msg + "</span>");
		location.reload();
	} else {
		$("#login_button").attr("disabled", false);
		$("#login_button").val("登陆");
		$("#login_error").html("<span style='color: #D9534F;font-size: 12px;'>" + obj.msg + "</span>");
	}
}

function share_submit() {
	$("#error").empty();
	var share_content = $("#share_content").val();
	var ydy_verification_code = $("#ydy_verification_code").val();
	if (share_content == "") {
		$("#error").html("<span style='color: #D9534F;font-size: 12px;'>请填写内容</span>");
		return false;
	}
	$("#share_submit_button").attr("disabled", "disabled");
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=share_submit", {
		share_content: share_content,
		ydy_verification_code: ydy_verification_code,
	}, share_submit_callback);
}

function share_submit_callback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		swal("提交成功", obj.msg, "success");
		$("#share_content").val("");
		$("#ydy_verification_code").val("");
		change_submit_code();
	} else {
		$("#error").html("<span style='color: #D9534F;font-size: 12px;'>" + obj.msg + "</span>");
	}
	$("#share_submit_button").attr("disabled", false);
}

function change_submit_code() {
	document.getElementById('code_img').src = site_url + "wp-content/themes/yDy_2017/vip_query.php?act=echoCode&v=" + Math.random();
}

function getMyshare() {
	$("#myshare").empty();
	var myshare = $("#myshare");
	myshare.html("正在加载……");
	myshare.load(site_url + 'wp-content/themes/yDy_2017/vip_query.php?act=getMyshare', function(responseTxt, statusTxt, xhr) {
		if (statusTxt == "success") if (statusTxt == "error") myshare.html("加载失败，请刷新后再试！");
	});
}

//兑换
function exchange(type) {
	if (type == "checkin") {
		var have = $("#have_checkin").val();
		var want = $("#want_checkin").val();
		if (parseInt(want) != want) {
			$("#result_checkin").html("输入签到次数需为整数");
			return false;
		}
		if (parseInt(want) < 5) {
			$("#result_checkin").html("最少<span style='color:#FC5757;margin:0px 5px;'>5</span>次");
			return false;
		}
		if (parseInt(have) < parseInt(want)) {
			$("#result_checkin").html("最多可兑换<span style='color:#FC5757;margin:0px 5px;'>" + have + "</span>次");
			return false;
		}
	}
	if (type == "days") {
		var have = $("#have_days").val();
		var want = $("#want_days").val();
		if (parseInt(want) != want) {
			$("#error").html("输入天数需为整数");
			return false;
		}
		if (parseInt(want) < 5) {
			$("#error").html("最少<span style='color:#FC5757;margin:0px 5px;'>5</span>天");
			return false;
		}
		if (parseInt(have) < parseInt(want)) {
			$("#error").html("最多可兑换<span style='color:#FC5757;margin:0px 5px;'>" + have + "</span>天");
			return false;
		}
	}
	swal({
		title: "确定兑换吗？",
		type: "warning",
		closeOnConfirm: false,
		showCancelButton: true,
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		showLoaderOnConfirm: true,
	}, function() {
		$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=exchange", {
			type: type,
			want: want,
		}, exchange_callback);
	});
}

//兑换callback
function exchange_callback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		swal({
			title: "兑换成功",
			text: obj.msg,
			type: "success",
			closeOnConfirm: false
		}, function() {
			location.reload();
		});
	} else {
		$("#error").html("<span style='color: #D9534F;font-size: 12px;'>" + obj.msg + "</span>");
	}
	$("#checkin_button").attr("disabled", true);
	$("#days_button").attr("disabled", true);
}

//兑换计算
function calculate(type) {
	if (type == "checkin") {
		var have = $("#have_checkin").val();
		var want = $("#want_checkin").val();
		if (parseInt(want) != want) {
			$("#error").html("输入签到次数需为整数");
			$("#checkin_button").attr("disabled", true);
			return false;
		}
		if (parseInt(want) < 5) {
			$("#error").html("最少<span style='color:#FC5757;margin:0px 5px;'>5</span>次");
			$("#checkin_button").attr("disabled", true);
			return false;
		}
		if (parseInt(have) < parseInt(want)) {
			$("#error").html("最多可兑换<span style='color:#FC5757;margin:0px 5px;'>" + have + "</span>次");
			$("#checkin_button").attr("disabled", true);
			return false;
		}
		if (parseInt(want) < 10) {
			var result = want * 1;
		}
		if (parseInt(want) > 9 && parseInt(want) < 15) {
			var result = Math.round(want * 1.5);
		}
		if (parseInt(want) > 14 && parseInt(want) < 25) {
			var result = want * 2;
		}
		if (parseInt(want) > 24) {
			var result = want * 3;
		}
		$("#error").html("可获得<span style='color:#FC5757;margin:0px 5px;'>" + result + "</span>枚硬币，剩余<span style='color:#FC5757;margin:0px 5px;'>" + (parseInt(have) - parseInt(want)) + "</span>次签到")
	}

	if (type == "days") {
		var have = $("#have_days").val();
		var want = $("#want_days").val();
		if (parseInt(want) != want) {
			$("#error").html("输入天数需为整数");
			$("#days_button").attr("disabled", true);
			return false;
		}
		if (parseInt(have) < parseInt(want)) {
			$("#error").html("最多可兑换<span style='color:#FC5757;margin:0px 5px;'>" + have + "</span>天");
			$("#days_button").attr("disabled", true);
			return false;
		}
		if (parseInt(want) < 5) {
			$("#error").html("最少<span style='color:#FC5757;margin:0px 5px;'>5</span>天");
			$("#checkin_button").attr("disabled", true);
			return false;
		}
		var result = Math.round(want * 1.5);
		$("#error").html("可获得<span style='color:#FC5757;margin:0px 5px;'>" + result + "</span>枚硬币，剩余<span style='color:#FC5757;margin:0px 5px;'>" + (parseInt(have) - parseInt(want)) + "</span>天有效期")
	}
}

//获取分享列表
function getsharelist(type, page) {
	$("#sharelist").empty();
	var sharelist = $("#sharelist");
	sharelist.html("正在加载……");
	sharelist.load(site_url + 'wp-content/themes/yDy_2017/vip_query.php?act=getsharelist&page=' + page + '&type=' + type, function(responseTxt, statusTxt, xhr) {
		if (statusTxt == "success") if (statusTxt == "error") sharelist.html("加载失败，请刷新后再试！")
	})
}

function getsharecontent(id) {
	$("div[name='share_box_div']").empty();
	$("div[name='share_box_div']").animate({
		height: "-10px",
		padding: "0px"
	}, 300);
	$("tr[status='on']").fadeOut();
	var content = $("#sharecontent_" + id);
	content.attr("status", "off");
	content.html("<td colspan='4'>正在加载……</td>");
	content.fadeIn(600, function() {
		content.attr("status", "on");
	});
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=getsharecontent", {
		id: id
	}, function(data) {
		content.html(data)
	})

}

//获取分享内容
function getsharecontent2(id) {
	var box = $("#sharecontent_" + id);
	box.attr("status", "off");
	box.html("<td colspan='4'>正在加载……</td>");
	box.fadeIn(300, function() {
		$("tr[status='on']").slideUp(500);
		box.attr("status", "on");
	});
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=getsharecontent", {
		id: id
	}, function(data) {
		box.html(data)
	})
}

//签到
function check_in() {
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=check_in", {}, function(data) {
		var obj = eval('(' + data + ')');
		if (obj.status == 0) {
			swal(obj.msg, "注：签到次数每月初第一天会清零哟~请在每月底来兑换", "success");
			var times = $("#check_in_times").html();
			var times = parseInt(times) + 1;
			$("#check_in_times").html(times.toString());
		} else {
			swal(obj.msg, "", "warning");
		}
	})
}

//提交信息
function vipSubmit(step) {
	if (step == 0) {
		$("#VIPbox_body_1").show();
		$("#VIPbox_body_2").hide();
		$("#VIPbox_footer").html('<input type="button" class="btn btn-danger" value="提交" onclick="vipSubmit(1)" id="vip_se_submit_button" style="">');
	}

	var status = getCookie("ydy_vip_submit");
	if (status == "yes") {
		swal("您已提交过信息，请等待管理员审核，或12小时后再次提交", "", "warning");
		return false;
	}

	var vip_select_type = $("#vip_select_type").val();
	var m = $("#vip_pay_month option:selected").val();
	var d = $("#vip_pay_day option:selected").val();
	var h = $("#vip_pay_hour option:selected").val();
	var i = $("#vip_pay_minute option:selected").val();
	var s = $("#vip_pay_second option:selected").val();
	var pay_num = $("#choose_pay_code option:selected").val();
	if (s == "" || s == "秒") {
		var vip_pay_time = "2017-" + m + "-" + d + " " + h + ":" + i;
	} else {
		var vip_pay_time = "2017-" + m + "-" + d + " " + h + ":" + i + ":" + s;
	}
	if (pay_num == "") {
		swal("请选择您的付款金额", "", "warning");
		return false;
	}
	if (m == "月" || d == "日" || h == "时" || i == "分") {
		swal("请填写转账时的交易时间", "", "warning");
		return false;
	}

	if (step == 1) {
		$("#VIPbox_body_1").hide();
		$("#VIPbox_body_2").html("<p style='text-align:center;'>请确认您的付款交易时间为：</p><p style='text-align:center;'><strong style='color: #FF0000;font-size: 20px;text-decoration: underline;'>" + vip_pay_time + "</strong></p><p><img src='https://youdian.in/files/upload/0919bbb2e2fdc5b8e5bd12098c61f4b5.jpg' style='width: 80%;display: block;border: 1px solid #dadada;border-radius: 5px;margin: 10px auto;'></p>");
		$("#VIPbox_body_2").show();
		$("#VIPbox_footer").html('<input type="button" class="btn btn-default" value="返回" onclick="vipSubmit(0)" id="vip_submit_button" style=""><input type="button" class="btn btn-danger" value="提交" onclick="vipSubmit(2)" id="vip_submit_button" style="">');
		return false;
	}

	if (step == 2) {
		$("#VIPbox_body_1").hide();
		$("#VIPbox_body_2").hide();
		$("#VIPbox_body_3").html("<p style='text-align:center;'>本站由人工进行审核，若您没有付款，请不要尝试</p>");
		$("#VIPbox_body_3").show();
		$("#VIPbox_footer").html('<input type="button" class="btn btn-danger" value="提交" onclick="vipSubmit(3)" id="vip_submit_button" style="">');
		return false;
	}

	if (step == 3) {
		$("#vip_submit_button").val("正在提交…");
		$("#vip_submit_button").attr("disabled", "disabled");
		$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=vipSubmit", {
			vip_select_type: vip_select_type,
			vip_pay_time: vip_pay_time,
			pay_num: pay_num
		}, vipSubmit_callback);
	}
}

function vipSubmit_callback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		$("#VIPbox_body").html('<p style="text-align: center;font-size: 20px;margin:10px 0">' + obj.msg + '</p><p style="text-align: center;font-size: 20px;margin:10px 0">正常审核在2小时内完成<br>00:00~08:00休息时段除外');
		$("#VIPbox_footer").html('');
		setCookie("ydy_vip_submit", "yes");
		showVIPseBox();
	} else {
		$("#VIPbox_body").html('<p style="text-align: center;font-size: 20px;margin:10px 0">' + obj.msg + "</p>");
		$("#VIPbox_footer").html('');
	}
}

function showVIPseBox(status){
	var status = getCookie("ydy_vip_submit");
	if (status == "yes"){
		$("#vip_submit_box").hide();
		$("#vip_submit_box_already").show();
	}
	else{
		return false;
	}
}

function change_pay_code(num){
	var pay_num;
	pay_num=$("#choose_pay_code option:selected").val();
	if(pay_num==""){
		return false;
	}else{
		$("#pay_code").html('<img src="'+site_url + 'wp-content/themes/yDy_2017/img/pay_'+num+'_'+pay_num+'.png" style="width:100%">');
	}
}
	
//评分

function raty_share(id, score) {
	swal({
		title: "确定给此分享评<span style='color: #FF4825;margin: 0 10px;'>" + score + "</span>分吗？",
		text: '虽然只是点点鼠标的事，但还请认真评分',
		html: true,
		showCancelButton: true,
		closeOnConfirm: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: '确定',
		cancelButtonText: "取消",
	}, function() {
		$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=raty_share", {
			id: id,
			score: score
		}, function(data) {
			var obj = eval('(' + data + ')');
			if (obj.status == 0) {
				//swal(obj.msg, "", "success");
				getsharecontent(id);
			}
			if (obj.status == 1) {
				swal(obj.msg, "", "error");
			}
		})
	});
}

//补填邮箱

function submit_email() {
	swal({
		title: "请补填Email地址",
		text: '检测到您还没有填写E-mail地址，为了更好的服务，请您补填',
		type: 'input',
		showCancelButton: false,
		closeOnConfirm: false,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: '提交',
		cancelButtonText: "取消",
		inputPlaceholder: "请填写您的邮箱地址，QQ邮箱优先",
	}, function(inputValue) {
		var email;
		email = inputValue;
		if (email === false) return false;

		if (email === "") {
			swal.showInputError("请填写邮箱地址");
			return false;
		}
		if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(email)) {
			swal.showInputError("请填写正确的E-mail地址");
			return false;
		}
		$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=email_submit", {
			email: email
		}, function(data) {
			var obj = eval('(' + data + ')');
			if (obj.status == 0) {
				swal(obj.msg, "", "success");
				location.reload();
			}
			if (obj.status == 1) {
				swal.showInputError(obj.msg);
			}
		})
	});
}

//用硬币购买

function pay_with_coin(postid, coins) {
	swal({
		title: "是否花费" + coins + "硬币购买此资源？",
		type: "info",
		showCancelButton: true,
		closeOnConfirm: false,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: '提交',
		cancelButtonText: "取消",
		showLoaderOnConfirm: true,
	}, function() {
		$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=pay_with_coin", {
			postid: postid
		}, function(data) {
			var obj = eval('(' + data + ')');
			if (obj.status == 0) {
				swal({
					title: obj.msg,
					type: "success",
					showConfirmButton: false
				});
				location.reload();
			}
			if (obj.status == 1) {
				swal(obj.msg, "", "warning");
			}
		})
	});
}

//审核提交,ok

function review_submit() {
	var status = getCookie("ydy_review_submit");
	if (status == "yes") {
		swal("您已提交过信息，请等待管理员审核，或12小时后再次提交", "", "warning");
		return false;
	}
	var trade_time = $("#trade_time").val();
	if (trade_time == "") {
		swal("请填写交易时间", "", "warning");
		return false;
	}
	swal({
		title: "确认提交吗？",
		text: "交易时间：<span style='font-weight:bold;color:#D9534F;'>" + trade_time + "</span><br>注意：12小时内无法再次提交",
		type: "warning",
		html: true,
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: '提交',
		closeOnConfirm: false,
		cancelButtonText: "取消",
		showLoaderOnConfirm: true,
	}, function() {
		$("#review_submit_button").val("正在提交…");
		$("#review_submit_button").attr("disabled", "disabled");
		$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=review_submit", {
			trade_time: trade_time,
		}, review_submit_callback);
	});
}

function review_submit_callback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		swal(obj.msg);
		$("#review_submit_button").val("提交");
		$("#review_submit_button").attr("disabled", false);
		setCookie("ydy_review_submit", "yes");
	} else {
		swal(obj.msg);
		$("#review_submit_button").val("提交");
		$("#review_submit_button").attr("disabled", false);
	}
	$("#trade_time").val("");
}

//通知,ok

function vip_register_notice(type, wx_name, pay_num) {
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=vip_submit_notice", {
		type: type,
		wx_name: wx_name,
		pay_num: pay_num
	}, function(data) {}, "text");
}

//注册，√

function vip_reg(type) {
	$("#reg_error").empty();
	var reg_user = $("#reg_user").val();
	var reg_pass = $("#reg_pass").val();
	var reg_pass_check = $("#reg_pass_check").val();
	var reg_email = $("#reg_email").val();
	if (type == 0) {
		$("#registerBox_body_1").hide();
		$("#step1").show();
		$("#registerBox_body_2").fadeIn(400);
		$("#reg_button").attr("onclick", "vip_reg(1)");
	}
	if (type == 1) {
		if (/[\u4E00-\u9FA5]/i.test(reg_user) || /[^\x00-\xff]/i.test(reg_user)) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>请使用字母或数字的用户名</span>");
			return false;
		}
		if (/[\u4E00-\u9FA5]/i.test(reg_pass) || /[^\x00-\xff]/i.test(reg_pass)) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>请使用字母或数字的密码</span>");
			return false;
		}
		if (/[\u4E00-\u9FA5]/i.test(reg_email) || /[^\x00-\xff]/i.test(reg_email)) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>E-mail地址不正确</span>");
			return false;
		}
		if (reg_user.length > 12 || reg_pass.length > 12 || reg_user.length < 5) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>用户名或密码长度需为5~12位</span>");
			return false;
		}
		if (reg_user == "" || reg_pass == "") {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>请填写用户名密码</span>");
			return false;
		}
		if (reg_pass != reg_pass_check) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>两次密码不一致，请检查</span>");
			return false;
		}
		if (reg_pass.length < 5) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>密码必须大于等于6位</span>");
			return false;
		}
		if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(reg_email)) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>请使用正确E-mail地址</span>");
			return false;
		}
		if (reg_email.indexOf(" ") >= 0) {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>E-mail地址不能包含空格</span>");
			return false;
		}
		$("#step1").fadeOut(200, function() {
			$("#step2").fadeIn(400);
		});
		$("#reg_button").attr("onclick", "vip_reg(2)");
		return false;
	}

	if (type == 2) {
		var step2_q = $("#step2_q").val();
		if (step2_q == "" || step2_q != "010") {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>验证问题回答错误</span>");
			return false;
		} else {
			$("#step2").fadeOut(200, function() {
				$("#step3").fadeIn(400);
			});
			$("#reg_button").text("继续");
			$("#reg_button").attr("onclick", "vip_reg(3)");
			return false;
		}
	}
	if (type == 3) {
		var step3_q = $("#step3_q").val();
		if (step3_q == "" || step3_q != "东京") {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>验证问题回答错误</span>");
			return false;
		} else {
			$("#step3").fadeOut(200, function() {
				$("#step4").fadeIn(400);
			});
			$("#reg_button").text("继续");
			$("#reg_button").attr("onclick", "vip_reg(4)");
			return false;
		}
	}
	if (type == 4) {
		var step4_q = $("#step4_q").val();
		if (step4_q == "" || step4_q != "17") {
			$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>验证问题回答错误</span>");
			return false;
		} else {
			$("#step4").fadeOut(200, function() {
				$("#step1").fadeIn(400);
			});
			$("#reg_button").text("正在注册…");
			$("#reg_button").attr("disabled", "disabled");
			$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=register", {
				reg_user: reg_user,
				reg_pass: reg_pass,
				reg_email: reg_email
			}, regcallback);
		}
	}
}

function regcallback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>" + obj.msg + "</span>");
		window.location.href = "https://youdian.in/";
	} else {
		$("#reg_button").attr("disabled", false);
		$("#reg_button").text("提交");
		$("#reg_error").html("<span style='color: #ff5757;font-size: 12px;'>" + obj.msg + "</span>");
	}
}
//注销，√

function vip_logout() {
	$("#logout_button").attr("disabled", true);
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=logout", {}, logout_callback);
}

function logout_callback(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		location.reload();
	} else {
		swal("系统错误");
		$("#logout_button").attr("disabled", false);
		//alert("系统错误");
	}
}
//删除信息

function del_message() {
	$.post(site_url + "wp-content/themes/yDy_2017/vip_query.php?act=del_message", {}, function(data) {
		var obj = eval('(' + data + ')');
		if (obj.status == 0) {}
		if (obj.status == 1) {
			swal(obj.msg);
			//alert(obj.msg);
			location.reload();
		}

	});
}

function postcb(data) {
	var obj = eval('(' + data + ')');
	if (obj.status == 0) {
		location.reload();
	}
	if (obj.status == 1) {
		swal(obj.msg);
	}
	$("button").attr("disabled", false);
	$("input").attr("disabled", false);
}
//随机数

function RndNum(n) {
	var rnd = "";
	for (var i = 0; i < n; i++)
	rnd += Math.floor(Math.random() * 10);
	return rnd;
}

//随机字符串

function randomString(len) {
	len = len || 32;　
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　
	var maxPos = $chars.length;　
	var str = '';　
	for (i = 0; i < len; i++) {　　str += $chars.charAt(Math.floor(Math.random() * maxPos));　
	}　
	return str;
}
//set cookie

function setCookie(name, value) {
	if (name == "ydy_ajax_mode") {
		var Days = 30;
	}
	else if(name == "ydy_gonggao_alert"){
		var Days = 1;
	}
	else{
		var Days = 0.5;
	}
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//get cookie

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}

$('.al_mon').click(function() {
	$(this).next().slideToggle(200);
	return false;
});

//roll top

function rolltop(to) {
	to = isNaN(to) ? $('#' + to)["offset"]()["top"] : to;
	$("body,html")["animate"]({
		scrollTop: to
	}, 0x12c);
	return false
};
$(window)["scroll"](function() {
	var jv244 = $(window)["scrollTop"]();
	if (jv244 > 200) {
		$("#roll-top")["fadeIn"]('faster')
	} else {
		$("#roll-top")["fadeOut"]('faster')
	}
});
$('#roll-top').click(function() {
	rolltop(0);
});

$('#gonggao').on('closed.bs.alert', function () {
  setCookie("ydy_gonggao_alert","close");
})
$("#vip_username,#vip_password").keyup(function() {
	if (event.keyCode == 13) {
		vip_login();
	}
});

$('#navbar_mobile').on('show.bs.collapse', function () {
  $(".layer").fadeIn();
})

$('#navbar_mobile').on('hidden.bs.collapse', function () {
  $(".layer").fadeOut();
})

showVIPseBox();

$(function() {
	$("img.lazy,.post-content img").lazyload({
		effect: "fadeIn"
	});
});

swal.setDefaults({
	animation: "pop"
});
swal.setDefaults({
	confirmButtonColor: "#D9534F"
});