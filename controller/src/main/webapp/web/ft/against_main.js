function btnEditEvent() {
	var index_main = layer.open({
		type : 1,
		title : '编辑赛事信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '95%', '95%' ],
		content : $('#div_editEvent'),
		end : function() { // 此处用于演示
		}
	});
	
	$('#btn_update_closeEditEvent').click(function() {
		layer.close(index_main);
	});
	
	$("from_edit_event").validate({
		rules : {
			beginTime : {
				required : true,
				date : true
			},
			endTime : {
				required : true,
				date : true
			},
			vuesId : {
				min : 1
			},
			referees_z : {
			    required : true
			},
            referees_zl : {
                required : true
            }
		},
		messages : {
			beginTime : {
				required : "<i class='fa fa-times-circle'></i>请选择开始时间",
				date : "<i class='fa fa-times-circle'></i>请选择正确的时间"
			},
			endTime : {
				required : "<i class='fa fa-times-circle'></i>请选择结束时间",
				date : "<i class='fa fa-times-circle'></i>请选择正确的时间"
			},
			vuesId : {
				min : "<i class='fa fa-times-circle'></i>请选择场地"
			},
			referees_z : {
			    required : "<i class='fa fa-times-circle'></i>请选择赛事主裁判"
			},
            referees_zl : {
                required : "<i class='fa fa-times-circle'></i>请选择赛事副裁判"
            }
		}
	});

	$('#btn_update_submitEditEvent').click(function() {
		if (!$('#from_edit_event').valid()) {
		    lrError("请输入必填项！");
		    return;
	    }
	    var index = layer.load(0, {
	        shade : false
	    });
	    $.ajax({
	        type : "POST",
	        url : "../../layAgainstController/update.json",
	        dataType : "json",
	        data : $("#from_edit_event").serialize(),
	        success : function(data) {
	            layer.close(index);
	            swal({
                    title : "比赛编辑成功!",
                    type : "success",
                    confirmButtonText : "确定"
                }, function () {
                    window.location.href = "against_main.html";
                });
	            
	        },
	        error : function() {
	            layer.close(index);
	            lrError("添加失败！服务器错误！");
	        }
	    });
	});
}

function cli_referee(id, flag) {
    if (flag == 1) {
        if ($("#referee_z_" + id).is(":checked")) {
            $("#referee_zl_" + id).prop("disabled", true);
        } else {
            $("#referee_zl_" + id).prop("disabled", false);
        }
    } else if(flag == 2) {
        if ($("#referee_zl_" + id).is(":checked")) {
            $("#referee_z_" + id).prop("disabled", true);
        } else {
            $("#referee_z_" + id).prop("disabled", false);
        }
    }
}

function returnList() {
    
}