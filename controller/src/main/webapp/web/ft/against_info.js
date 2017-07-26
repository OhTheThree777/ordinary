var pageSize = 10;
var racing_id = $.session.get("Racing_Id");//临时赛事id
var productId = "";
var mainState = $.session.get("mainState");//是否为主裁判----------------------------------
var personFlag = $.session.get("personFlag");//人员状态
var miss = $.session.get("Miss"); //Miss是否具有管理权限的标记
$(function() {
    if (personFlag == 5 && miss == 1) {
        $('#btn_ssbp').append("<button type='button' class='btn btn-info' id='invite_btn' onclick='Competition_Arrange()'>赛事编排</button>");
        $('#btn_ssgg').append("<button type='button' class='btn btn-info' id='invite_btn' onclick='Competition_Notice()'>赛事公告</button>");
        $('#toolbar').append("<button type='button' class='btn btn-info' id='invite_btn' onclick='invite()'>邀请裁判</button>");
    } else if (personFlag == 3 && miss == 1) {
        if(mainState == 1){//-----------------------------------------------------------------
            $('#btn_ssbp').append("<button type='button' class='btn btn-info' id='invite_btn' onclick='Competition_Arrange()'>赛事编排</button>");
            $('#btn_ssgg').append("<button type='button' class='btn btn-info' id='invite_btn' onclick='Competition_Notice()'>赛事公告</button>");
            $('#toolbar').append("<button type='button' class='btn btn-info' id='invite_btn' onclick='invite()'>邀请裁判</button>");
        }
    }
    $('#event_sche').tabs();
    var index = layer.load(0, { shade : false });
    $.ajax({
       type : "post",
       url : "../../ssRacingController/findRacingById.json",
       data : {'id' : racing_id},
       dataType : "json",
       success : function(data) {
           $("#racingName").text("").append(data.data.obj.racingName);
           layer.close(index);
       }
    });
    
    findProduct()//获取产品信息
//  start(0);//自动开始比赛
//  Over(-1);//自动结束比赛
});

//========================================获取产品========================================
function findProduct() {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/racingProduct.json',
        data : {'racingId' : racing_id},
        dataType : "json",
        success : function(data) {
            ergodic_product(data);
            layer.close(index);
        }
    });
}

//数据加载
function ergodic_product(data) {
    // 设置模版
	data.rows["miss"] = miss;
    $("#div_product_against_rows").setTemplateElement("template-product").processTemplate(data.rows);
    productId = $("#productId").val();
    against(productId);
}

function against(productId) {
    $("li[id^='li_']").removeClass("active");
    $("#li_" + productId).attr("class", "active");
    Init_GVT(productId);
    Init_GT(productId);
    Underway_GVT(productId);//进行中的赛事
    Notstart_GVT(productId);//未开始的赛事
    okEnd_GVT(productId);//结束的赛事
    if(personFlag == 3){
    	 referee_jurisdiction(productId);//查询当前裁判是否有权执裁当前项目，用于是否显示赛事编排，以及赛事公告
    }
   
}
//========================================获取赛事========================================
function Init_GVT(productId) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : 1,
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId
        },
        dataType : "json",
        success : function(data) {
            redeploy_GVT(data.page);
            ergodic_GVT(data);
            layer.close(index);
        }
    });
}
function Init_GT(productId) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GT.json',
        data : {
            'pageIndex' : 1,
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId
        },
        dataType : "json",
        success : function(data) {
            redeploy_GT(data.page);
            ergodic_GT(data);
            layer.close(index);
        }
    });
}
function redeploy_GVT(TotalPage) {
    $('.M-box2').pagination({
        pageCount : TotalPage,
        jump : true,
        coping : true,
        count : 5,
        prevContent : '上页',
        nextContent : '下页',
        callback : PageCallback_GVT
    });
}
// 回调函数
function PageCallback_GVT(pageIdex) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : pageIdex.getCurrent(),
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId
        },
        dataType : "json",
        success : function(data) {
            // 再次获取并设置总页数防止数据改动
            pageIdex.setTotalPage(data.page);
            ergodic_GVT(data);
            layer.close(index);
        }
    });
}
// 数据加载
function ergodic_GVT(data) {
    // 设置模版
    $("#div_all_against_rows").setTemplateElement("template-items-GVT").processTemplate(data.rows);
}
//============================================获取进行中的==========================================
function Underway_GVT(productId) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : 1,
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId,
            'state'    : 2
        },
        dataType : "json",
        success : function(data) {
            Pageunderway_GVT(data.page);
            underway_GVT(data);
            layer.close(index);
        }
    });
}
function Pageunderway_GVT(TotalPage) {
    $('.M-box3').pagination({
        pageCount : TotalPage,
        jump : true,
        coping : true,
        count : 5,
        prevContent : '上页',
        nextContent : '下页',
        callback : PUnderway_GVT
    });
}
// 回调函数
function PUnderway_GVT(pageIdex) {
	 var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : pageIdex.getCurrent(),
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId,
            'state'    : 2
        },
        dataType : "json",
        success : function(data) {
            // 再次获取并设置总页数防止数据改动
            pageIdex.setTotalPage(data.page);
            underway_GVT(data);
            layer.close(index);
        }
    });
}
// 数据加载
function underway_GVT(data) {
    // 设置模版
    $("#div_underway_against_rows").setTemplateElement("template-items-GVT").processTemplate(data.rows);
}

//============================================获取未开始的==========================================
function Notstart_GVT(productId) {
	 var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : 1,
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId,
            'state'    : 1
        },
        dataType : "json",
        success : function(data) {
            PageNotstart_GVT(data.page);
            notstart_GVT(data);
            layer.close(index);
        }
    });
}
function PageNotstart_GVT(TotalPage) {
    $('.M-box4').pagination({
        pageCount : TotalPage,
        jump : true,
        coping : true,
        count : 5,
        prevContent : '上页',
        nextContent : '下页',
        callback : PNotstart_GVT
    });
}
// 回调函数
function PNotstart_GVT(pageIdex) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : pageIdex.getCurrent(),
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId,
            'state'    : 1
        },
        dataType : "json",
        success : function(data) {
            // 再次获取并设置总页数防止数据改动
            pageIdex.setTotalPage(data.page);
            notstart_GVT(data);
            layer.close(index);
        }
    });
}
// 数据加载
function notstart_GVT(data) {
    // 设置模版
    $("#div_notstart_against_rows").setTemplateElement("template-items-GVT").processTemplate(data.rows);
}

//============================================获取已经结束的==========================================
function okEnd_GVT(productId) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : 1,
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId,
            'state'    : 3
        },
        dataType : "json",
        success : function(data) {
            PageEnd_GVT(data.page);
            end_GVT(data);
            layer.close(index);
        }
    });
}
function PageEnd_GVT(TotalPage) {
    $('.M-box5').pagination({
        pageCount : TotalPage,
        jump : true,
        coping : true,
        count : 5,
        prevContent : '上页',
        nextContent : '下页',
        callback : PEnd_GVT
    });
}
// 回调函数
function PEnd_GVT(pageIdex) {
	 var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GVT.json',
        data : {
            'pageIndex' : pageIdex.getCurrent(),
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId,
            'state'    : 3
        },
        dataType : "json",
        success : function(data) {
            // 再次获取并设置总页数防止数据改动
            pageIdex.setTotalPage(data.page);
            end_GVT(data);
            layer.close(index);
        }
    });
}
// 数据加载
function end_GVT(data) {
    // 设置模版
    $("#div_end_against_rows").setTemplateElement("template-items-GVT").processTemplate(data.rows);
}

//========================================获取编辑中的赛事========================================
function redeploy_GT(TotalPage) {
    $('.M-box1').pagination({
        pageCount : TotalPage,
        jump : true,
        coping : true,
        count : 5,
        prevContent : '上页',
        nextContent : '下页',
        callback : PageCallback_GT
    });
}
// 回调函数
function PageCallback_GT(pageIdex) {
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/against_main_GT.json',
        data : {
            'pageIndex' : pageIdex.getCurrent(),
            'pageSize' : pageSize,
            'racingId' : racing_id,
            'productId' : productId
        },
        dataType : "json",
        success : function(data) {
            // 再次获取并设置总页数防止数据改动
            pageIdex.setTotalPage(data.page);
            ergodic_GT(data);
            layer.close(index);
        }
    });
}
// 数据加载
function ergodic_GT(data) {
	//筹备赛事
	if(data.rows.length < 1 || miss == 0){
		$('#racingUl > li').eq(0).hide().removeClass("am-active");
		$('#racingUl > li').eq(1).addClass("am-active");
		$('#racingDiv > div').eq(0).hide().removeClass("am-active");
		$('#racingDiv > div').eq(1).addClass("am-active");
	}
    // 设置模版
    $("#div_preparations_against_rows").setTemplateElement("template-items-GT").processTemplate(data.rows);
}

//========================================修改赛事========================================
function btnEditInit(id) {
	var index = layer.load(0, { shade : false });
    productId = $("#productId").val();
    $.ajax({
        type : "post",
        url : '../../layAgainstController/selectObjById.json',
        data : {
            'id' : id,
            'productId' : productId
        },
        dataType : "json",
        success : function(data) {
            ergodic_edit_event(data);
            btnEditEvent();
            
            //*******************日期控件************************
            compareDateTime("event_begin_time","event_end_time");
            laydate.skin("danlan");
            layer.close(index);
        }
    });
}
// 数据加载
function ergodic_edit_event(data) {
    //设置模板
    $("#div_editEvent").setTemplateElement("template-edit-event").processTemplate(data.data.map);
}

function btnEditInitOver(id) {
    var varName = $("#vaesName_" + id).text();
    if (varName == "") {
        lrError("请选择比赛场地！");
    } else {
        swal({
            title: "确认赛事已经编辑完成了吗!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            confirmButtonText : "确定",
            cancelButtonText : "取消",
            html: true
        },
        function (isConfirm) {
            if (isConfirm) {
            	var index = layer.load(0, { shade : false });
                $.ajax({
                    type : "post",
                    url : '../../layAgainstController/update.json',
                    data : {
                        'id' : id,
                        'state' : '1'
                    },
                    dataType : "json",
                    success : function(data) {
                    	layer.close(index);
                        window.location.href = "against_main.html";
                    }
                });
            }
        });
    }
}

function btnEditInitBack(id) {//退回
    swal({
        title: "确认要将赛事退回编辑吗!",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        html: true
    },
    function (isConfirm) {
        if (isConfirm) {
        	var index = layer.load(0, { shade : false });
            $.ajax({
                type : "post",
                url : '../../layAgainstController/update.json',
                data : {
                    'id' : id,
                    'state' : '0'
                },
                dataType : "json",
                success : function(data) {
                	layer.close(index);
                    window.location.href = "against_main.html";
                }
            });
        }
    });
}

//==================================================开始结束比赛=====================================
function startGame(id){//手动开始比赛
    swal({
        title: "确认要开始赛事并发布么!",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        animation: "slide-from-top",
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        html: true
    },
    function (isConfirm) {
        if (isConfirm) {
        	var index = layer.load(0, { shade : false });
            $.ajax({
                type : "post",
                url : '../../layAgainstController/update_game.json',
                data : {
                    'id' : id,
                    'ok' : '1'//手动开赛
                },
                dataType : "json",
                success : function(data) {
                	layer.close(index);
//                    window.location.href = "against_main.html";
                	//比赛开始后将本次比赛发布在cms
                	issue(id);
                }
            });
        }
    });
}
function gameOver(id){//手动结束比赛
    swal({
        title: "请录入比赛结果!",
        text: "<input class='qyhm' type='number' id='co_a_score' min='0' value='0'>:<input class='qyhm' type='number' id='co_b_score' min='0' value='0'>",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        html: true
    },
    function (isConfirm) {
        if (isConfirm) {
            var co_a_score = $("#co_a_score").val();
            var co_b_score = $("#co_b_score").val();
            var index = layer.load(0, { shade : false });
            $.ajax({
                type : "post",
                url : '../../layAgainstController/update_game.json',
                data : {
                    'id' : id,
                    'coAScore' : co_a_score,
                    'coBScore' : co_b_score,
                    'ok' : '2'
                },
                dataType : "json",
                success : function(data) {
                	layer.close(index);
                    window.location.href = "against_main.html";
                }
            });
        }
    });
}
//==================================================观看直播=====================================
function looklive(id){
	var index = layer.load(0, { shade : false });
    $.ajax({
        type : "post",
        url : '../../layAgainstController/selectObjById.json',
        data : {
            'id' : id,
            'productId' : $("#productId").val()
        },
        dataType : "json",
        success : function(data) {
             $.session.set('app_name',data.data.map.layAgainst.appName);
             $.session.set('stream_name',data.data.map.layAgainst.streamName);
             $.session.set('live_addr',data.data.map.layAgainst.liveM3u8);
           layer.open({
                type : 2,
                title : '赛事直播',
                shadeClose : true,
                shade : false,
                maxmin : true, // 开启最大化最小化按钮
                area : ['90%', '90%'],
                content : '../../web/ft/live_player.html',
                end : function() { // 此处用于演示
                    window.location.href = "../../web/ft/against_main.html";
                }
            });
            layer.close(index);
        }
    });
}

//==================================================数据详情=====================================
function dataParticulars(id) {
    $.session.set("Against_Id", id);
    window.location.href = "../../web/referee/ss_contestants_information.html"
}

//==================================================查看教练详情=====================================
function refereeInfo(id) {
    $.cookie("referee_id", null,{expires: 7,path: '/'});
    $.cookie('referee_id', id,{expires: 7,path: '/'});
    $.session.set("Racing_Id", racing_id);
    $.session.set("Product_Id", productId);
    var index_main = layer.open({
        type : 2,
        title : '教练详情',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : ['90%', '90%'],
        content : '../../web/referee/referee-infor.html',
        end : function() { // 此处用于演示
        }
    });
}

//==================================================赛事编排=====================================
function Competition_Arrange() {
    $.session.set("Racing_Id", racing_id);
    var index_main = layer.open({
        type : 2,
        title : '赛事编排',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : ['90%', '90%'],
        content : '../../web/lay/macth_main.html',
        end : function() { // 此处用于演示
            window.location.href = "../../web/ft/against_main.html";
        }
    });
}

//==================================================赛事公告=====================================
function Competition_Notice() {
    $.session.set("Racing_Id", racing_id);
    $.session.set("ProductId",$("#productId").val());
    window.location.href = "../../web/referee/referee_notice_z.html";
}


//=================================================主裁判邀请裁判=================================
function invite(){//----------------------------------------------------------------------------
    productId = $("#productId").val();
    var index = layer.load(0, { shade : false });
    $.ajax({
        type : "POST",
        url : "../../refereeController/hostselectListAllReferee.json",
        dataType : 'JSON',
        data : {
            'racingId' : racing_id,
            'productId' : productId,
            'flag' : '1'
        },
        success : function(data) {
            var Str = "";
            $.each(data.data.list, function(index, value) {
                Str = Str
                    +'<li class="clearfix">'
                    +'<label class="am-checkbox an_span">'
                    +'    <input type="checkbox" name="person" value="' + value.id + '" data-am-ucheck required>'
                    +'   <img class="am-circle am-img-thumbnail am-inline-block" src="' + value.referee_pic + '">'
                    +'    <span class="am-inline-block xz_player">' + value.referee_name + '</br><span class="am-badge am-badge-secondary am-round" id="span_' + value.id + '" onclick="personNumber(this, \'' + value.id + '\')"></span><div id="div_' + value.id + '" style="display: none;"><input type="number" name="number_' + value.id + '" min="0" value="' + value.idNoNum + '" onblur="addPersonNumber(this, \'' + value.id + '\')" /></div></span>'
                    +'    <button type="button" data-reId=' + value.id + ' class="am-btn am-btn-success am-radius am-fr am-btn-xs an_add addCy_single" style="display:block !important;">添加</button>'
                    +'<button type="button" data-reff='+value.id+' class="am-btn am-btn-danger am-radius am-fr am-btn-xs an_add an_del" style="display:none;">取消</button>'
                    +'</label>'
                    +'</li>';
            });
            $("#cyList").children().remove();
            $("#cyList").append(Str);
            $('input[type="checkbox"], input[type="radio"]').uCheck();
            a();
            layer.close(index);
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
    $("#fcyList").children().remove();
    $("#teamNameStr").val("");
    $("#racingId").val("");
    $('#productId_z').val("");
    var index_main = layer.open({
        type : 1,
        title : '邀请裁判',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_pick_players'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
        }
    });
    $('#btn_close').click(function() {
        layer.close(index_main);
    });
}

function a(){//------------------------------------------------------------------------------------------------------------------

    $(":checkbox").click(function(){
        checkBgColor();
    });
    // 单次添加成员
    var Str = "";
     $(".addCy_single").click(function(){ 
            if ($("#teamNameStr").val() == "") {
                Str = $(this).attr("data-reId");
            } else {
                Str = $("#teamNameStr").val() + "," + $(this).attr("data-reId");
            }
            $("#teamNameStr").val(Str);
            $(this).parent().parent().appendTo($("#fcyList"));
            $(this).parents().find(":checkbox").attr("checked", false);
            
            $("#fcyList li .an_del").show();
            $("#fcyList li .addCy_single").hide();
                checkBgColor();
     }); 
    // 批量添加成员
    $("#addCy").click(function(){
        var fcy = $("#cyList :checkbox:checked");
        var spCodesTemp = "";
        fcy.each(function(i) {
            if(0==i){
                spCodesTemp = $(this).val();
            }else{
                spCodesTemp += (","+$(this).val());
            }
        });
        var Str = "";
        if ($("#teamNameStr").val() == "") {
            Str = spCodesTemp;
        } else {
            Str = $("#teamNameStr").val();
            Str = Str + "," + spCodesTemp;
        }

        $("#teamNameStr").val(Str);
        
        if(fcy.length){
            fcy.attr("checked", false).parent().parent().appendTo($("#fcyList"));
            $("#fcyList li .an_del").show();
            $("#fcyList li .addCy_single").hide();
            checkBgColor();
        }
    });
    // 单次移除成员
    $(".an_del").click(function(){
        Str ="";
        $(this).parent().parent().appendTo($("#cyList"));
        $(this).parents().find(":checkbox").attr("checked", false);
        var teamNameStr = $("#teamNameStr").val();
        if(teamNameStr != ""){
            //定义一个数组
            var array = teamNameStr.split(",");
            array.splice($.inArray(""+$(this).attr("data-reff")+"",array),1);//根据值删除数组中的元素
            var str = "";
            for(var i=0;i<array.length;i++){
                str = str + array[i] + ",";
            }
            str = str.substring(0, str.lastIndexOf(","))
            $("#teamNameStr").val(str);
        }
        $("#cyList li .an_del").hide();
        $("#cyList li .addCy_single").show();
            checkBgColor();
    });
    // 批量移除成员
    $("#delCy").click(function(){
        var cy = $("#fcyList :checkbox:checked");
        if(cy.length){
            cy.attr("checked", false).parent().parent().appendTo($("#cyList"));
            $("#cyList li .an_del").hide();
            $("#cyList li .addCy_single").show();
            checkBgColor();
        }
    });
    // 全选
    $("#checkAllChk").click(function(){
        $(this).parents(".cyList").find(":checkbox").attr("checked", true);
        checkBgColor();
    });
    // 反选
    $("#reverseChk").click(function(){
        $(this).parents(".cyList").find(":checkbox").each(function(){
            $(this).attr("checked", !$(this).attr("checked"));
            checkBgColor();
        })
    });
    checkBgColor();
/* 点击显示高亮 */
function checkBgColor(){
/*   $(":checkbox").parent().css("background-color", "");
   $(":checkbox:checked").parent().css("background-color", "#f9b87e"); */
}

}

//********************************************************************************确认人员按钮****************************************************************************************
$("#btn_addTeamPerson").click(function() {//-------------------------------------------------------------------
    var teamNameStr = $("#teamNameStr").val();
    $("#racingId").val(racing_id);
    $('#productId_z').val($("#productId").val());
    var prctId = $('#productId').val();
    if(prctId =="" || prctId ==undefined){
        lrError("邀请失败!");
        return;
    }
    if (teamNameStr != "" && teamNameStr != undefined) {
        var index = layer.load(0, { shade : false });
        
        $.ajax({
            url : '../../refereeController/hostinviteReferee.json',
            type : 'POST',
            dataType : 'JSON',
            data : $("#form-person").serialize(),
            success : function(data) {
                if (data.status == 1) {
                    layer.close(index);
                    swal({
                        title : "邀请成功!",
                        text : data.msg,
                        type : "success",
                        confirmButtonText : "确定"
                    });
                    layer.closeAll('page');
                } else {
                    layer.close(index);
                    swal({
                        title : "邀请失败!",
                        text : data.msg,
                        type : "error",
                        confirmButtonText : "确定"
                    });
                    layer.closeAll('page');
                }
            },
            error : function() {
                layer.close(index);
                lrError("邀请失败！服务器错误！");
            }
        });
    }
});


//********************************************************************************查询当前裁判是否有权执裁当前项目，用于是否显示赛事编排，以及赛事公告***************************************************
function referee_jurisdiction(productId){
	 var index = layer.load(0, { shade : false });
	 $.ajax({
	        type : "post",
	        url : '../../layAgainstController/jurisdiction.json',
	        data : {
	            'productId' : productId,
	            'racingId' : racing_id
	        },
	        dataType : "json",
	        success : function(data) {
	           if(0==data.status){
	        	   $('#btn_ssbp').hide();
	        	   $('#btn_ssgg').hide();
	           }else{
	        	   $('#btn_ssbp').show();
	        	   $('#btn_ssgg').show();
	           }
	           layer.close(index);
	        }
	    });
}

//******************************************************************************将当前比赛发布在cms**********************************************************************************************
function issue(id){
       var index = layer.load(0, { shade : false });
            $.ajax({
                type : "post",
                url : '../../postmessageController/issue_encounter.json',
                data : {
                    'id' : id,
                },
                dataType : "json",
            	success : function() {
    				swal({
    					title :"发布成功!",
    					type : "success",
    					confirmButtonText : "确定"
    				},function(){
    					layer.open({
    	          		      type: 2,
    	          		      title: '更新信息',
    	          		      shadeClose: true,
    	          		      shade: false,
    	          		      maxmin: true, //开启最大化最小化按钮
    	          		      area: ['60%', '95%'],
    	          		      content:'http://isport.lrkpzx.com/dede/inter_makehtml_all.php',
    	          		      end: function(){ //此处用于演示
    	          		    	  window.location.reload();
    	          			  }
    	          		});
    				});
    			layer.close(index);
    			layer.closeAll("page");
    		},
    		error : function() {
    			swal({
    				title :"信息发布失败!",
    				type : "error",
    				confirmButtonText : "确定"
    			});
    			layer.close(index);
    			layer.closeAll("page");
    		}
            });
}