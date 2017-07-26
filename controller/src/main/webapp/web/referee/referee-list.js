var pageSize = 9;
var personflag = $.session.get("personFlag");
var racing_id = $.session.get("Racing_Id");
var product_id = $.session.get("Product_id");
var project_id = $.session.get("Project_Id");

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
	var index = layer.load(0, {
	    shade : false
	});
   	$.ajax({
   		type:"post",
		url:'../../refereeController/more_referee',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
		        	$("#more_person").children().remove(); 
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
	var refereeName=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../refereeController/more_referee',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize,'refereeName':refereeName},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
			$("#more_person").children().remove(); 
		        	ergodic(data);
					layer.close(index);
		}
	});
}
	//遍历数据
function ergodic(data){
	if('0'==data.msg){
		$(".M-box3").hide();
		swal({
			title :"无相关数据",
			text : "请确认姓名是否确",
			type : "warning",
			confirmButtonText : "确定"
		});
	}
	noMessages(data,"more_person");
	$.each(data.rows,function(key,val){
		var id=val.id
		var str=$('<li class="col-md-4 col-sm-6 col-xs-12">'
				+'		<div class="clearfix player-ctt">'
				+'			<div class="col-xs-6 player-head clearfix">'
				+'				<a href="javascript:;">'
				+'					<img src="'+val.referee_pic+'" class="img-circle img'+id+'" />'
				+'						<div class="img-circle"><button type="button" class="btn cherk" onclick="detail('+val.id+')">查看详情</button></div>'
				+'				</a>'
//				+'				<div id="lanxin'+id+'" class="btn-success player-state">'+getCodeKey('../../','athlete_state',''+val.person_state+'')+'</div>'
				+'			</div>'
				+'			<div class="col-xs-6 player-infor clearfix" id="cocklebur'+id+'">'
				+'				<dl>'
				+'					<dt>'+isUndefined(val.referee_name,"String")+'</dt>'
				+'					<dd>'
				+'						<p>'+isUndefined(val.referee_height,"int")+'cm</p><p>'+isUndefined(val.referee_weight,"int")+'kg</p><p>'+val.personProp+'</p>'
				+'					</dd>'
				+'				</dl>'
				+'			</div>'
				+'			<div id="invite_div'+id+'"></div>'	
				+'	</div>'
				+'</li>');
		$("#more_person").append(str);
		//邀请按钮
//		isRacing(id);
		//无图片处理
		listPic(id);
	});
}
//姓名查询
$("#seek_btn").click(function(){
	var index = layer.load(0, {
	    shade : false
	});
	//var personOccupation=$("#jobType").val();
	var refereeName=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../refereeController/more_referee',
		data:{'pageIndex':1,'pageSize':pageSize,'refereeName':refereeName},
		dataType:"json",
		success:function(data){
		        	$("#more_person").children().remove(); 
		        	redeploy(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
});

//更多球员查看运动员详情
	function detail(referee_id){
		$.cookie("referee_id",null,{expires: 7,path: '/'});
		$.cookie('referee_id', referee_id,{expires: 7,path: '/'});
		window.location.href="referee-infor.html";
	}
//*****************************************************************************是否为竞赛项目跳转过来的追加邀请按钮**************************************************************************
//	function isRacing(id){
//		if(racing_id !=undefined){
//			var str = '<button type="button" class="btn btn-success pull-left player-invite" onclick="invite('+id+')">邀请</button>';
//			$("#"+"invite_div"+id).append(str);
//		}
//	}
//	//*****************************************************************************邀请实现**************************************************************************	
//	function invite(referee_id){
//		if(racing_id=="undefined"){
//			racing_id="";
//		}
//		if(product_id=="undefined"){
//			product_id="";
//		}
//		if(project_id=="undefined"){
//			project_id="";
//		}
//		$.ajax({
//			type:"post",
//			url:'../../refereeController/inviteReferee.json',
//			data:{
//				'racingId':racing_id,
//				'personId':referee_id,
//				'projectId':project_id,
//				'productId':product_id
//				
//				},
//			dataType:"json",
//			success:function(data){
//				if(data.status==1){
//					swal({
//						title :data.msg,
//						text : "",
//						type : "success",
//						confirmButtonText : "确定"
//					},function(){
//	    				   window.location.reload();
//					}); 
//				}else{
//					swal({
//						title :data.msg,
//						text : "",
//						type : "error",
//						confirmButtonText : "确定"
//					},function(){
//	    				   window.location.reload();
//					}); 
//				}
//				 	
//			}
//		});
//	}
