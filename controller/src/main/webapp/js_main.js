//----------------------------------------------------列表数据加载----------------------------------------------------

var nickname; //用户昵称
var headPortrait; // 用户头像
var lastLoginTime; // 上次登录时间
var personFlag; //用户职业状态
var occupationId; //用户职业ID
var teamFlag; // 队伍标记 0：未加入队伍 1：已加入队伍
var teamSign; // 队伍标记（0：未创建球队 1：以创建球队（权限））
var personRacging; //人员是否已经加入赛事
var setFlag = $.session.get("setFlag"); //快速创建队伍及赛事
var myDate = new Date();
var mytime = myDate.toLocaleDateString(); // 获取当前时间
var mainState;//是否为主裁判
$(function(){
    $("title").html("体育赛事管理平台");
	$('#a_exit').html('<span class="am-icon-sign-out"></span> 退出');
	$('#a_main').html("首页");
	$("#xxwh").html('<span class="am-icon-pencil"></span> 信息维护');
	$('#am-dropdown-toggle').dropdown({justify: '#doc-dropdown-justify-js'});
	
	$("#hot-team").append("<a href='javascript:;' onclick='hot_team()'>球队</a>");
	$("#hot-person").append("<a href='javascript:;' onclick='hot_person()'>球员</a>");
	$("#hot-coach").append("<a href='javascript:;' onclick='hot_coach()'>教练</a>");
	$("#hot-referee").append("<a href='javascript:;' onclick='hot_referee()'>裁判</a>");
	$("#hot-racing").append("<a href='javascript:;' onclick='hot_competition()'>赛事</a>");
	
    //头部用户信息获取
    $.ajax({
       url : 'userAction/findUser.json',
       type : 'POST',
       async : true,
       cache : false,
       success : function(data) {
           if (data.status == 0) {
               lrError(data.msg);
               window.location.href="user_login.html";
           } else {
               nickname = data.data.obj.nickname;
               username = data.data.obj.username;
               loginName = data.data.obj.loginname;
               headPortrait = data.data.obj.headPortrait;
               lastLoginTime = data.data.obj.lastlogintime;
               personFlag = data.data.obj.personflag;
               occupationId = data.data.obj.occupationId;
               teamSign = data.data.obj.teamSign;
               teamFlag = data.data.teamFlag;
               personRacging = data.data.personRacging;
               mainState = data.data.obj.mainState;
               
               $.session.set("teamSign", teamSign);
               $.session.set("personFlag", personFlag);
               $.session.set("teamFlag", teamFlag);
               $.session.set("occupationId", occupationId);
               $.session.set("mainState", mainState);
//               if(5 !=personFlag && occupationId !=undefined & 3 !=personFlag && 1 !=personFlag && 4 !=personFlag && 0==teamSign){
//            	   $("#invite-list").append("<a href='javascript:;' onclick='invite_list()'>邀请信息</a>");
//               }
               //用户名称
               if (nickname != null && nickname != undefined) {
                   $("#username").append(nickname);
                   $("#l_username").append(nickname);
               } else if (username != null && username != undefined) {
                   $("#username").append(username);
                   $("#l_username").append(username);
               } else if (loginName != null && loginName != undefined) {
                   $("#username").append(loginName);
                   $("#l_username").append(loginName);
               } else {
                   $("#username").append("未知用户");
                    
                   $("#l_username").append("未知用户");
               }
               
               //用户角色
               if (personFlag != null && nickname != "undefined") {
                   if (personFlag == "1") {
                       $("#personflag").append("运动员");
                       
                       //侧边栏显示
                       var Str = 
                           '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>';
                           if (teamFlag == "0") {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="join_team()"> <i class="am-icon-wpforms sidebar-nav-link-logo"></i>加入球队</a></li>';
                           } else {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_team()"><i class="am-icon-wheelchair-alt sidebar-nav-link-logo"></i>我的球队</a></li>';
                           }
                           if (personRacging == "0") {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="join_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>加入赛事</a></li>';
                           } else {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>我的赛事</a></li>';
                           }
                           Str = Str
//                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                       $("#ul_side").append(Str);
                   } else if (personFlag == "2") {
                       $("#personflag").append("教练");
//                       if(teamSign ==0){
//                    	   //$("#invite-list").remove();
//                    	   $("#quit_team_list").append("<a href='javascript:;' onclick='quit_team_list()'>退队信息</a>");
//                       }
                       
                       //侧边栏显示
                       var Str = 
                           '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>';
                           if (teamFlag == "0" && teamSign == "0") {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="creat_team()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>创建球队</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="join_team()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>加入球队</a></li>'
//                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                           } else if(teamSign != "0") {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_team()"><i class="am-icon-wheelchair-alt sidebar-nav-link-logo"></i>我的球队</a></li>';
                               if (personRacging == "0") {
                                   Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="join_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>加入赛事</a></li>';
                               } else {
                                   Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>我的赛事</a></li>';
                               }
                               Str = Str
//                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                           } else {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_team()"><i class="am-icon-wheelchair-alt sidebar-nav-link-logo"></i>我的球队</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>我的赛事</a></li>'
//                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                           }
                       $("#ul_side").append(Str);
                   } else if (personFlag == "3") {
                       $("#personflag").append("裁判");
                       
                       //侧边栏显示
                       var Str = 
                           '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_competition()"><i class="am-icon-trophy sidebar-nav-link-logo"></i>热门赛事</a></li>';
                           if (teamFlag == "0") {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="competition_invite()"> <i class="am-icon-wpforms sidebar-nav-link-logo"></i>赛事邀请</a></li>';
                           } else {
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="competition_course()"><i class="am-icon-wheelchair-alt sidebar-nav-link-logo"></i>赛事进程</a></li>';
                           }
                           Str = Str
//                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="ss_notice()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>赛事公告</a></li>';
                       $("#ul_side").append(Str);
                   } else if (personFlag == "4") {
                       //侧边栏显示
                       var Str = 
                           '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>';
                           if (occupationId == undefined) {
                               $("#personflag").append("球队管理者");
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="creat_team()"> <i class="am-icon-wpforms sidebar-nav-link-logo"></i>创建球队</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_competition()"><i class="am-icon-american-sign-language-interpreting sidebar-nav-link-logo"></i>热门赛事</a></li>';
                           } else {
                               $("#personflag").append("球队管理者");
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="team_manage()"><i class="am-icon-table sidebar-nav-link-logo"></i>球队管理</a></li>';
                               if (personRacging == "0") {
                                   Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="join_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>加入赛事</a></li>';
                               } else {
                                   Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="my_competition()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>我的赛事</a></li>';
                               }
                           }
                           Str = Str
//                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                       $("#ul_side").append(Str);
                       if(occupationId !=undefined){
                    	  // $("#quit_team_list").append("<a href='javascript:;' onclick='quit_team_list()'>退队列表</a>");
                       }
                   } else if (personFlag == "5") {
                       //侧边栏显示
                       var Str = 
                           '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>';
                           if (occupationId != undefined) {
                               $("#personflag").append("赛事主办方");
                               Str = Str + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="creat_competition()"><i class="am-icon-table sidebar-nav-link-logo"></i>创建赛事</a></li>'
                               + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="competition_manage()"><i class="am-icon-sign-language sidebar-nav-link-logo"></i>赛事管理</a></li>';
                           }
                           Str = Str
//                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                       $("#ul_side").append(Str);
                       //$("#quit_team_list").append("<a href='javascript:;' onclick='sponsor_manage()'>主办方信息</a>");
                   } else {
                       $("#personflag").append("其他用户");
                       
                       //侧边栏显示
                       var Str = 
                           '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>'
//                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                           + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                       $("#ul_side").append(Str);
                   }
               } else {
                   $("#personflag").append("未知用户");
                   
                   var Str = 
                       '<li class="sidebar-nav-link"><a href="javascript:;" onclick="javascript:window.location.reload();" class="active"><i class="am-icon-home sidebar-nav-link-logo"></i>首页</a></li>'
//                       + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="circle_matter()"><i class="am-icon-first-order sidebar-nav-link-logo"></i>圈里那些事儿</a></li>'
                       + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="message_maintain()"><i class="am-icon-user sidebar-nav-link-logo"></i>个人信息维护</a></li>'
                       + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_team()"><i class="am-icon-users sidebar-nav-link-logo"></i>热门球队</a></li>'
                       + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_person()"><i class="am-icon-maxcdn sidebar-nav-link-logo"></i>热门球员</a></li>'
                       + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_coach()"> <i class="am-icon-ship sidebar-nav-link-logo"></i>最佳教练</a></li>'
                       + '<li class="sidebar-nav-link"><a href="javascript:;" onclick="hot_referee()"> <i class="am-icon-street-view sidebar-nav-link-logo"></i>金哨裁判</a></li>';
                   $("#ul_side").append(Str);
               }
               
               //用户头像
               if (headPortrait != null && headPortrait != "undefined" && headPortrait != "") {
                   $("#headportrait").attr("src", headPortrait);
                   $("#Head-portrait").attr("src", headPortrait);
               } else {
                   $("#headportrait").attr("src", "img/user04.png");
                   $("#Head-portrait").attr("src", "img/user04.png");
               }
           }
       },
       error : function() {
           lrError("用户信息获取失败！请重新登录！");
           window.location.href="user_login.html";
       }
    });
    
    reminder();
	
	if (setFlag == 4) {
		$.session.remove("setFlag");
		creat_team();
		index_main();
	} else if (setFlag == 5) {
		$.session.remove("setFlag");
		sponsor_manage();
	} else {
   		index_main();
	}
});
//----------------------------------------------------实时交互WebSocket----------------------------------------------------
function reminder() {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        url:'TeamLogController/log_info.json',
        type:"post",
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
            layer.close(index);
            var reminderNum = data.data.list.length;
            $("#reminderNum").text("").append(reminderNum);
            var Str = '';
            $.each(data.data.list,function(key,val){
                var msg = val.info.substring(0, val.info.indexOf("|"));
                var url = val.info.substring(val.info.indexOf("|")+1, val.info.length);
                Str = Str + 
                    '<li class="warning-element" onclick="info_element(\'' + url + '\', \'' + val.id + '\')">'
                    +'<div class="am-text-truncate clearfix">' + msg + '</div>'
                    +'<div class="agile-detail">'
                    +'<a href="javascript:;" class="pull-right btn btn-xs btn-white" onclick="seeflag(' + val.id + ');">设为已读</a>'
                    +'<i class="fa fa-clock-o"></i>' + val.create_time + '</div></li>';
            });
            Str = Str +
                '<div class="tpl-dropdown-menu-notifications">'
                +'<a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf am-text-center" onclick="messageList();">'
                +'<i class="am-icon-bell"></i> 更多消息…</a></div>';
            $("#reminder").text("").append(Str);
        },
        error : function() {
            layer.close(index);
            lrError("查询失败！服务器错误！");
        }
    });
}


var websocket;

if ('WebSocket' in window) {
    websocket = new WebSocket("ws://" + window.location.host + "/lr_tyss/webSocketServer");
} else if ('MozWebSocket' in window) {
    websocket = new MozWebSocket("ws://" + window.location.host + "/lr_tyss/webSocketServer");
} else {
    websocket = new SockJS("http://" + window.location.host + "/lr_tyss/sockjs/webSocketServer");
}

websocket.onopen = function (evnt) {
};

websocket.onmessage = function (evnt) {
	reminder();
    var msg = evnt.data.substring(0, evnt.data.indexOf("|"));
    var url = evnt.data.substring(evnt.data.indexOf("|")+1, evnt.data.length);
    toastr.options = {
            "closeButton": true,
            "debug": true,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "showDuration": "400",
            "hideDuration": "1000",
            "timeOut": "7000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };
    toastr.options.onclick = function() {
//    	$('#am-dropdown-toggle').dropdown('open');
        var src = $('#iframe-floor').attr('src');
        $('#iframe-floor').attr('src', url);
        $(this).addClass("active");
        $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
        $(".index-content-wrapper").css("display","none");
        $(".other-content-wrapper").css("display","block");
		toastr.clear();
    };
     var $toast = toastr['info'](msg, '通知！');
};

websocket.onerror = function (evnt) {
};

websocket.onclose = function (evnt) {
}

function info_element(url, logId) {
    seeflag(logId);
//	$.session.set('log_message_infor', logId);
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', url);
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
    seeflag(logId);
}

function seeflag(logId) {
    $.ajax({
        url:'TeamLogController/seeFlag.json',
        type:"post",
        data:{id : logId},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
            reminder();
        },
        error : function() {
            layer.close(index);
            lrError("查询失败！服务器错误！");
        }
    })
}

function messageList() {
    var src = $('#iframe-floor').attr('src');
	$('#am-dropdown-toggle').dropdown('close');
	toastr.clear();
    $('#iframe-floor').attr('src', 'web/log/Messages_list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//----------------------------------------------------侧边栏----------------------------------------------------
// 主页
function index_main() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'main_info.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//邀请列表
function invite_list() {
	var personflag = $.session.get("personFlag");
	if(4==personflag || teamSign !="0"){
		 var src = $('#iframe-floor').attr('src');
		    $('#iframe-floor').attr('src', 'web/index/invite_list_team.html');
		    $(this).addClass("active");
		    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
		    $(".index-content-wrapper").css("display","none");
		    $(".other-content-wrapper").css("display","block");
	}else{
		 var src = $('#iframe-floor').attr('src');
		    $('#iframe-floor').attr('src', 'web/index/invite_list.html');
		    $(this).addClass("active");
		    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
		    $(".index-content-wrapper").css("display","none");
		    $(".other-content-wrapper").css("display","block");
	}
   
}

//退队列表
function quit_team_list(){
	var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/index/quit_team_list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 加入球队
function join_team(){
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/team/team-list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 我的球队
function my_team() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/team/my_team/tean-infor-manage.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//主办方管理
function sponsor_manage() {
	var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/ss/sponsor_main.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//创建赛事
function creat_competition() {
	add_racing();
}

//赛事管理
function competition_manage() {
    var src = $('#iframe-floor').attr('src');
	$('#iframe-floor').attr('src', 'web/ss/sponsor_homepage_new.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 加入赛事
function join_competition() {
    var src = $('#iframe-floor').attr('src');
	$('#iframe-floor').attr('src', 'web/ss/racing_list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//我的赛事
function my_competition() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/ss/my_racing_list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 热门赛事
function hot_competition() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/ss/racing_list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 赛事邀请
function competition_invite() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/index/invite_list_racing.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(3).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
};

// 赛事进程
function competition_course() {
	  var src = $('#iframe-floor').attr('src');
	   $('#iframe-floor').attr('src', 'web/referee/referee_homepage_new.html');
	   $(".index-content-wrapper").css("display","none");
	   $(".other-content-wrapper").css("display","block");
}

//创建球队
function creat_team() {
    layer.open({
        type: 2,
        title: '创建球队',
        shadeClose: true,
        shade: false,
        maxmin: true, //开启最大化最小化按钮
        area: ['90%', '90%'],
        content:'web/team/create_team.html'
    });
}

//球队管理页面
function team_manage() {
$.cookie('team_details_id', "",{expires: 7, path: '/' });
 $.ajax({
     url:'teamHomepageController/selectManageTeam.json',
     data:{'id':$.cookie('team_details_id')},
     type:"post",
     dataType:"json",
     success:function(data){
         if(0==data.status){
             swal({
                 title : "您还没有创建自己的球队!",
                 text : "请创建自己的球队",
                 type : "info",
                 confirmButtonText : "确定"
             });
             
         }else{
             window.location.href="web/team/my_team/tean-infor-manage.html";
         }   
     }
 });
}

// 圈里那些事儿
function circle_matter() {
    alert("圈里那些事儿");
}

// 个人信息维护
function message_maintain() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/index/Infor_mod.html');
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 热门球队
function hot_team() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/team/team-list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(7).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 热门球员
function hot_person() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/person/person-list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(8).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 最佳教练
function hot_coach() {
    var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/coach/coach-list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(8).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

// 金哨裁判
function hot_referee() {
	var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/referee/referee-list.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(8).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//裁判赛事公告
function ss_notice(){
	var src = $('#iframe-floor').attr('src');
    $('#iframe-floor').attr('src', 'web/referee/referee_notice_z.html');
    $(this).addClass("active");
    $("#ul_side .sidebar-nav-link").eq(8).siblings().children("a").removeClass("active");
    $(".index-content-wrapper").css("display","none");
    $(".other-content-wrapper").css("display","block");
}

//**********************************************************************************竞赛项目添加**********************************************************************
function add_racing() {
	if(checkJurisdiction()=="1"){
		var index_main = layer.open({
			type : 2,
			title : '添加竞赛项目',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '100%', '100%' ],
			content : 'web/ss/racing_add.html',
			cancel: function(){
				 window.location.reload();//刷新当前页面.
			  }
		});
	}else{
		swal({
			title :"您还没有通过主办方审批",
			text : "不能创建竞赛活动！",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
}



//********************************************************************************查询主办方是否通过审批******************************************************************
//从服务器获取值
function checkJurisdiction(){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "ssSponsorController/checkJurisdiction.json",
	    dataType : "json",
	        data : {},
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.obj.approvalFlag;
		}
	}); 
	return jsonObject;
}