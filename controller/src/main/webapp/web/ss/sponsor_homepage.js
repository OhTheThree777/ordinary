//*************************************************************初始化页面完成后加载**************************************************************************************
var pageSize = 3;
var index = layer.load(0, {
	shade : false
});
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
	Init1();
	Init2();
	
});
//*********************************************************************赛事部分********************************************************************************************
//*************************************************************加载初始化分页设置总页数*************************************************************************************
function redeploy1(TotalPage){
	$('#M-box3-1').pagination({
        pageCount:TotalPage,
        jump:true,
        coping:true,
        count:5,
        prevContent:'上页',
        nextContent:'下页',
        callback:PageCallback1
    });
	
}

function Init1(){
   	$.ajax({
   		type:"post",
		url:'../../ssProjectController/queryMy_project.json',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
		        	redeploy1(data.page);
		        	ergodic1(data);
		}
	});
}
	//回调函数
function PageCallback1(pageIdex){
	//获取下拉选进行分类查询
	//var personOccupation=$("#jobType").val();
	var name=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../ssProjectController/queryMy_project.json',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize,'racingName':name},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
		        	ergodic1(data);
		}
	});
}
	//遍历数据
function ergodic1(data){
	$("#existing_match li").remove();
	if('0'==data.msg){
		swal({
			title :"无相关数据",
			text : "",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
	$.each(data.rows,function(key,val){

		var str=$(	'<li class="col-md-4 col-sm-6 col-xs-12" onclick="match_details('+val.id+')">'
					+'	<div class="event_box">'
					+'		<img class="" src='+incisionPicture(val.propagateUrlPhoto)+'>'
					+'		<div class="v-overlay"></div>'
					+'		<div class="content">'
					+'			<h4>'+val.projectName+'</h4>'
					+'			<i class="glyphicon glyphicon-time">&nbsp;时间:<em>'+val.matchBeginDate+'</em>~<em>'+val.matchEndDate+'</em></i>'
					+'			<div class="csrs">'
					+'				<i class="am-icon-users am-icon-sm"></i>&nbsp;赛制：'+getCodeKey("../../","competition_system",val.matchSystem)+''
					+'			</div>'
					+'		</div>'
					+'		<a href="javascript:;">'
					+'			<div class="content1">查看详情</div>'
					+'		</a> <a href="javascript:;">'
//					+'			<div class="content1" style="top: 70%;" onclick="match_apply('+val.id+')">查看报名</div>'
					+'		</a>'
					+'	</div>'
					+'</li>');
		$("#existing_match").append(str);
	});
	layer.closeAll('page');
	layer.close(index);
}














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
 	$.ajax({
 		type:"post",
		url:'../../ssRacingController/queryMy_racing.json',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
		        	//$("#more_racing").children().hide(); 
		        	redeploy2(data.page);
		        	ergodic2(data);
		}
	});
}
	//回调函数
function PageCallback2(pageIdex){
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
		}
	});
}
	//遍历数据
function ergodic2(data){
	$("#profile li").remove();
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
					+'			<div class="content1" onclick="racing_details('+val.id+')">查看详情</div>'
					+'		</a> <a href="javascript:;">'
					+'			<div class="content1" style="top: 70%;" onclick="racing_apply('+val.id+')">查看报名</div>'
					+'		</a>'
					+'	</div>'
					+'</li>');
		$("#profile #profile_list").append(str);
	});
	layer.closeAll('page');
	layer.close(index);
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
			end : function() { // 此处用于演示
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

//**********************************************************************************赛事添加**********************************************************************
function add_project() {
	if(checkJurisdiction()=="1"){
		var index_project = layer.open({
			type : 2,
			title : '添加竞赛项目',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '100%', '100%' ],
			content : 'project_add.html',
			end : function() { // 此处用于演示
			}
		});
	}else{
		
		swal({
			title :"您还没有通过主办方审批",
			text : "不能创建赛事！",
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

//***********************************************************************************查看赛事详情********************************************************************
function match_details(project_id){
	$.session.set("Project_Id", project_id);
	$.session.set('ProjectState',"0")
    window.location.href="front_project_main.html";
}

//***********************************************************************************查看项目详情********************************************************************
function racing_details(racing_id){
	$.session.set("Racing_Id", racing_id);
    window.location.href="front_project_details.html";
}

