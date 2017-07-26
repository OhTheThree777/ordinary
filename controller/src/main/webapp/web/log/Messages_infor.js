$(function(){
	$.ajax({
        url:'../../TeamLogController/selectLogInfo.json',
        type:'post',
        data:{
            'id':$.session.get('log_message_infor')
        },
        dataType:'json',
        success:function(data){
        	var Str1 = data.data.obj.info;
        	var Str2 = data.data.obj.createTime;
        	
        	if (Str1.indexOf("|") > 0) {
        		Str1 = Str1.substring(0, Str1.indexOf("|"));
        	}
        	
        	Str2 = Str2
        		+ '&nbsp;&nbsp;<button class="btn btn-sm btn-white" id="del" onclick="del(' + $.session.get('log_message_infor') + ')">'
				+ '<i class="fa fa-trash-o"></i>'
				+ '</button>';
        	
        	$("#mail-body").append(Str1);
        	$("#font-noraml").append(Str2);
        	
        	/*使其显示title*/
        	$('[data-toggle="tooltip"]').tooltip();
        	$("#del").tooltip({title: '删除'});
        }
	});
});

function del(id) {
	swal({
		title : "确定要删除吗",
		text : "删除后将无法恢复",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			var index = layer.load(0, {
						shade : false
					});
			$.ajax({
				type : "POST",
				url : "../../TeamLogController/del.json",
				dataType : "json",
				data : {
					"id" : id
				},
				success : function(data) {
					layer.closeAll('page');
					layer.close(index);
					swal("删除成功", "用户删除成功", "success");
				},
				error : function() {
					lrError("删除失败！服务器错误！");
					layer.close(index);
				}
			});
		}
	});
}