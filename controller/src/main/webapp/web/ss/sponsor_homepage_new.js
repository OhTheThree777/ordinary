//*************************************************************初始化页面完成后加载**************************************************************************************
var pageSize = 5;

$(function() {
	$('[data-toggle="popover"]').popover();
//*************************************************************拉取主办方信息**********************************************************************************************
	$.ajax({
		url:'../../ssSponsorController/findSponsorByUserId.json',
		type:"post",
		async:true,
		cache:false,
		success : function(data) {
			$("#headportrait").attr('src',data.data.obj.headportrait); 
			$("#name").text("").append(data.data.obj.name);
			$("#establishmentTime").text("").append(data.data.obj.establishmentTime);
		},
		error : function() {
			lrError("服务器错误！");
		}
	});
	//加载第一页数据并得到总页数
	Init2();
});


//*********************************************************************项目部分********************************************************************************************
//*************************************************************加载初始化分页设置总页数*************************************************************************************
function redeploy2(TotalPage){
	$('#M-box3-2').pagination({
    pageCount:TotalPage,
    jump:true,
    coping:true,
    count:5,
    prevContent:'上页',
    nextContent:'下页',
    callback:PageCallback2
});
	
}

function Init2(){
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type:"post",
		url:'../../ssRacingController/queryMy_racing.json',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
			if(data.rows.length<1){
				$("#profile").append("<div class='weui-loadmore weui-loadmore_line zbf_nothings'><span class='weui-loadmore__tips'>暂无数据</span></div>");
				$('.M-box3').hide();
			}
		        	//$("#more_racing").children().hide(); 
		        	redeploy2(data.page);
		        	ergodic2(data);
		        	layer.close(index);
		}
	});
}
	//回调函数
function PageCallback2(pageIdex){
	var index = layer.load(0, {
		shade : false
	});
	//获取下拉选进行分类查询
	//var personOccupation=$("#jobType").val();
	var name=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../ssRacingController/queryMy_racing.json',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize,'racingName':name},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
			//$("#more_racing").children().remove(); 
		        	ergodic2(data);
		        	layer.close(index);
		}
	});
}
	//遍历数据
function ergodic2(data){
	$("#profile li").not("#fs").each(function(){
		$(this).remove();
	});
	if('0'==data.msg){
		swal({
			title :"无相关数据",
			text : "",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
	$.each(data.rows,function(key,val){

		var str=$(	'<li class="col-md-4 col-sm-6 col-xs-12">'
					+'	<div class="event_box">'
					+'		<img class="" src='+incisionPicture(val.racingPic)+'>'
					+'		<div class="v-overlay"></div>'
					+'		<div class="content">'
					+'			<h4>'+val.racingName+'</h4>'
					+'			<i class="glyphicon glyphicon-time">&nbsp;时间:<em>'+val.racingBeginTime+'</em>~<em>'+val.racingEndTime+'</em></i>'
					+'			<div class="csrs">'
					+'				<i class="am-icon-users am-icon-sm"></i>&nbsp;参赛人数：'+val.attendNumber+''
					+'			</div>'
					+'		</div>'
					+'		<a href="javascript:;">'
					+'			<div class="content1" style="top: 30%;" onclick="racing_details('+val.id+')">查看详情</div>'
					+'		</a>'
                    +'      <a href="javascript:;">'
                    +'          <div class="content1" style="top: 50%;" onclick="racing_against('+val.id+')">查看对阵图</div>'
                    +'      </a>'
					+'      <a href="javascript:;">'
					+'			<div class="content1" style="top: 70%;" onclick="racing_apply('+val.id+')">查看报名</div>'
					+'		</a>'
					+'	</div>'
					+'</li>');
		$("#profile").append(str);
	});
	
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
			content : 'racing_add.html',
			cancel: function(){
				 window.location.reload();//刷新当前页面.
			  }
		});
	}else{
		swal({
			title :"您还没有通过主办方审批",
			text : "请联系管理员进行审批！",
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
		 url : "../../ssSponsorController/checkJurisdiction.json",
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

//*********************************************************************************查看竞赛项目报名信息********************************************************************
function racing_apply(racing_id){
	$.session.set("Racing_Id", racing_id);
	window.location.href="approving_apply.html";
}

//*********************************************************************************查看竞赛对阵图信息********************************************************************
function racing_against(racing_id) {
    $.session.set("Racing_Id", racing_id);
    //Miss是否具有管理权限的标记
    $.session.set("Miss", 1);
    window.location.href="../../web/ft/against_main.html";
}

//***********************************************************************************查看项目详情********************************************************************
function racing_details(racing_id){
	$.session.set("Racing_Id", racing_id);
    window.location.href="front_project_details.html";
}