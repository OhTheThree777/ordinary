//列表邀请该教练
var index = layer.load(0, {
        shade : false
    });
function invite (coach_id){
	$.ajax({
		type:"post",
		url:'../../tcoachTeamController/add.json',
		data:{'coachId':coach_id},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				var id=data.data.obj.personId
				swal({
					title :"邀请已发送",
					text : "请耐心等待",
					type : "success",
					confirmButtonText : "确定"
				});
				layer.closeAll('page');
				layer.close(index);
				$("#"+'invite_btn'+id+'').hide();
				$("#"+'invite_btno'+id+'').show();
			}
			
		},
		error : function () {
            layer.close(index);
            lrError("服务器异常！");
        }
	});
}
//-----------------------------------------我的球队---------------------------------------------------
//列表邀请该教练
function invite3 (coach_id){
	$.ajax({
		type:"post",
		url:'../../../tcoachTeamController/add.json',
		data:{'coachId':coach_id},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				var id=data.data.obj.personId
				swal({
					title :"邀请已发送",
					text : "请耐心等待",
					type : "success",
					confirmButtonText : "确定"
				});
				layer.closeAll('page');
				layer.close(index);
				$("#"+'invite_btn'+id+'').hide();
				$("#"+'invite_btno'+id+'').show();
			}
			
		},
		error : function () {
            layer.close(index);
            lrError("服务器异常！");
        }
	});
}
//------------------------------------------主页详情-------------------------------------------------
//详情邀请教练
function invite1(){
	$.ajax({
		type:"post",
		url:'../../tcoachTeamController/add.json',
		data:{'coachId':$.cookie('coach_id')},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				swal({
					title :"邀请已发送",
					text : "请耐心等待",
					type : "success",
					confirmButtonText : "确定"
				});
				layer.closeAll('page');
				layer.close(index);
				$("#invite_btn").hide();
				$("#invite_btno").show();
			}
			
		},
		error : function () {
            layer.close(index);
            lrError("服务器异常！");
        }
	});
}
//------------------------------------------更多里的详情---------------------------------------------
//详情邀请教练
function invite2(){
	$.ajax({
		type:"post",
		url:'../../tcoachTeamController/add.json',
		data:{'coachId':$.cookie('coach_more_id')},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				swal({
					title :"邀请已发送",
					text : "请耐心等待",
					type : "success",
					confirmButtonText : "确定"
				});
				layer.closeAll('page');
				layer.close(index);
				$("#invite_btn").hide();
				$("#invite_btno").show();
			}
			
		},
		error : function () {
            layer.close(index);
            lrError("服务器异常！");
        }
	});
}