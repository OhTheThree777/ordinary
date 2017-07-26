var pageSize = 9;
var personflag = $.session.get("personFlag");
var index = layer.load(0, {
    shade : false
});
//全部信息
$(function(){
	//加载第一页数据并得到总页数
	Init();

});
	//加载初始化分页设置总页数
function redeploy(TotalPage){
	$('.M-box3').pagination({
        pageCount:TotalPage,
        jump:true,
        coping:true,
        count:5,
        prevContent:'上页',
        nextContent:'下页',
        callback:PageCallback
    });
	
}

function Init(){
   	$.ajax({
   		type:"post",
		url:'../../teamIndexController/more_object',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
		        	redeploy(data.page);
		        	ergodic(data);
		}
	});
}
	//回调函数
function PageCallback(pageIdex){
	//获取下拉选进行分类查询
	//var personOccupation=$("#jobType").val();
	var name=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_object',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize,'racingName':name},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
			$("#more_racing").children().remove(); 
		        	ergodic(data);
		}
	});
}
	//遍历数据
function ergodic(data){
	concealPagination(data.rows);
	if('0'==data.msg){
		swal({
			title :"无相关数据",
			text : "",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
	$.each(data.rows,function(key,val){
		var str=$('<li class="col-md-3 col-sm-6 col-xs-12">'
        		+'	<div class="event_box">'
        		+'		<a href="javascript:;">'
        		+'			<img class="img'+val.id+'" src='+val.propagate_url_photo+' onclick="particulars_object('+val.id+')">'
        		+'			<div class="v-overlay"></div>'
        		+'			<div class="content">'
        		+'				<h4>'+val.project_name+'</h4>'
        		+'				<i class="glyphicon glyphicon-time"><em>'+val.match_begin_date+'</em></i>'
        		+'				<div class="csrs"><i class="am-icon-users am-icon-sm"></i>&nbsp;赛事类型：'+val.match_type+'</div>'
        		+'			</div>'
        		+'			<div class="content1" onclick="particulars_object('+val.id+')">查看详情</div>'
        		+'		</a>'
        		+'	</div>'
        		+'</li>');
		$("#more_racing").append(str);
		listPic(val.id);
	});
	layer.closeAll('page');
	layer.close(index);
}

//姓名查询
$("#seek_btn").click(function(){
	//var personOccupation=$("#jobType").val();
	var name=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_object',
		data:{'pageIndex':1,'pageSize':pageSize,'racingName':name},
		dataType:"json",
		success:function(data){
		        	$("#more_racing").children().remove(); 
		        	redeploy(data.page);
		        	ergodic(data);
		}
	});
});
	
//更多页面赛事详情
function particulars_object(object_id){
	$.session.set("Project_Id", object_id);
    window.location.href="../../web/ss/object_auxiliary.html";
}

//------------------------------------------------------------------------------------跳转单个项目页面-------------------------------------------------------------------
function is_single(){
	window.location.href="racing_single.html";
}
