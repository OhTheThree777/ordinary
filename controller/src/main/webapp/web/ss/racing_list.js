var pageSize = 6;
var personflag = $.session.get("personFlag");

//全部信息
$(function(){
	//加载第一页数据并得到总页数
	Init();
	//数据字典下拉选
	//getCodes('../','job_type','jobType');
	//单个项目单击事件
	$("#is_single").click(function(){
		is_single();
	});
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
	var index = layer.load(0, {
	    shade : false
	});
   	$.ajax({
   		type:"post",
		url:'../../teamIndexController/more_racing',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
		        	$("#more_racing").children().hide(); 
		        	redeploy(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
}
	//回调函数
function PageCallback(pageIdex){
	var index = layer.load(0, {
	    shade : false
	});
	//获取下拉选进行分类查询
	//var personOccupation=$("#jobType").val();
	var name=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_racing',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize,'racingName':name},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
			$("#more_racing").children().remove(); 
		        	ergodic(data);
					layer.close(index);
		}
	});
}
	//遍历数据
function ergodic(data){
	concealPagination(data.rows);
	if('0'==data.msg){
		$(".M-box3").hide();
		swal({
			title :"无相关数据",
			text : "",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
	noMessages(data,"more_racing");
	$.each(data.rows,function(key,val){
		var str = '';
		str = str +'<li class="col-md-4 col-sm-6 col-xs-12">'
	        		+'	<div class="event_box" onclick="particulars_racing('+val.id+')">'
	        		+'		<a href="javascript:;">'
	        		+'			<img class="" src='+incisionPicture(val.racing_pic)+' onclick="particulars_racing('+val.id+')">'
	        		+'			<div class="v-overlay"></div>'
	        		+'			<div class="content">'
	        		+'				<h4>'+val.racing_name+'</h4>'
	        		+'				<i class="glyphicon glyphicon-time">开始时间:<em>'+val.racing_begin_time.substring(0,10)+'</em></i>'
	        		+'				<i class="glyphicon glyphicon-time">结束时间:<em>'+val.racing_end_time.substring(0,10)+'</em></i>'
	        		+'				<div class="csrs"><i class="am-icon-users am-icon-sm"></i>&nbsp;参赛人数：'+isUndefined(val.attend_number,"String")+'</div>'
	        		+'			</div>'
	        		+'			<div class="content1">查看详情</div>'
	    str = competitionState(val,str);    		
	    str = str + 	'</a>'
					+'	</div>'
					+'</li>';    		
		$("#more_racing").append(str);
	});
}

//姓名查询
$("#seek_btn").click(function(){
	var index = layer.load(0, {
	    shade : false
	});
	//var personOccupation=$("#jobType").val();
	var name=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_racing',
		data:{'pageIndex':1,'pageSize':pageSize,'racingName':name},
		dataType:"json",
		success:function(data){
		        	$("#more_racing").children().remove(); 
		        	redeploy(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
});
	
//更多页面项目详情
function particulars_racing(racing_id){
	$.session.remove("Project_Id");
	$.session.set("Racing_Id", racing_id);
	//获取赛事基本信息用来判断（跳转页面）
	var index = layer.load(0, { shade : false });
	$.ajax({
		type:"post",
		url:'../../ssRacingController/findRacingById_z.json',
		data:{'id':racing_id,},
		dataType:"json",
		success:function(data){
		layer.close(index);
		//miss 是否具有管理权
		//Anna(0:赛事报名中，1：报名已截止，2：赛事开始，3：赛事结束)
			var miss = data.data.map.miss;
			//详细页面用来判断是否具有管理权
			$.session.set("Miss", miss);
			var Anna = data.data.map.Anna;
			if(Anna == 0 || Anna == 1){
				window.location.href="apply_main.html";//报名页
			}else if(Anna == 2){
				window.location.href="../../web/ft/against_main.html";//对阵图页面
			}else if(Anna == 3){
				window.location.href="http://www.chinaisport.com/a/chengjigonggao/";//织梦成绩公告页
			}
		}
	});
}

