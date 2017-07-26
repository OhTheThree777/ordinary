//列表邀请该运动员
function invite (person_id){
	$.ajax({
		type:"post",
		url:'../../personTeamController/add.json',
		data:{'personId':person_id},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title :"邀请失败!",
					text :  data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				var id=data.data.obj.personId
				swal({
					title : "邀请已发送!",
					text : "请耐心等待运动员同意!",
					type : "success",
					confirmButtonText : "确定"
				});
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

//-----------------------------------------------主页详情------------------------------------------------------------------
//详情邀请运动员
function invite1(){
	$.ajax({
		type:"post",
		url:'../../personTeamController/add.json',
		data:{'personId':$.cookie('person_details_id')},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败!",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				swal({
					title : "邀请已发送!",
					text : "请耐心等待运动员同意!",
					type : "success",
					confirmButtonText : "确定"
				});
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
//-------------------------------------------------更多里的详情----------------------------------------------------------
//详情邀请运动员
function invite2(){
	$.ajax({
		type:"post",
		url:'../../personTeamController/add.json',
		data:{'personId':$.cookie('person_id')},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败!",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				swal({
					title : "邀请已发送!",
					text : "请耐心等待运动员同意!",
					type : "success",
					confirmButtonText : "确定"
				});
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
//-------------------------------------------我的球队--------------------------------------------------------------------
//详情邀请运动员
function invite3 (person_id){
	$.ajax({
		type:"post",
		url:'../../../personTeamController/add.json',
		data:{'personId':person_id},
		dataType:"json",
		success:function(data){
			if(0==data.status){
				swal({
					title : "邀请失败!",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}else{
				var id=data.data.obj.personId
				swal({
					title : "邀请已发送!",
					text : "请耐心等待运动员同意!",
					type : "success",
					confirmButtonText : "确定"
				});
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