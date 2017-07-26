// 比赛设置
$(function() {
	$('#form_macth').steps({
		headerTag : "h1",
	    bodyTag : "fieldset",
	    enableCancelButton : true,
	    autoFocus : true,
		onStepChanging : function(event, currentIndex, newIndex) {// 点击上一步下一步时进入
			if (currentIndex > newIndex) { // 上一步
				if (currentIndex == 3) {
					cProduct();
				}
				return true
			}
			var form = $(this);
			if (currentIndex < newIndex) { // 下一步
				if (currentIndex == 2) {
					$("#spec_list").empty();
					$("#TeamGroups").empty();
					$("#inputHidden").empty();
					var Str = "";
					var num = 0;
					$("#div_groups input[type='text']").each(function(){
						num++;
						//左侧组别点击事件
						$("#spec_list").append('<li><a onclick="GroupDiv(\'' + $(this).val() + '\', ' + num + ')">' + $(this).val() + '</a></li>');
						//右侧头部组别队伍显示
						Str = '<div class="panel panel-info" id="' + num + '" style="display: none">'
							 +'<div class="panel-heading">' + $(this).val() + '</div>'
							 +'<div class="panel-body">'
							 +'<ul class="tag-list" id="spec_data_' + num + '" style="padding: 0">'
							 +'</ul>'
							 +'</div>'
							 +'</div>';
						$("#TeamGroups").append(Str);
						//添加隐藏显示组别事件
						$("#inputHidden").append('<input type="hideen" id="groupInfo_' + num + '" name="groupInfo_' + num + '" value="" />');
					});
				}
				$(".body:eq(" + newIndex + ") label.error", form).remove();
				$(".body:eq(" + newIndex + ") .error", form).removeClass("error");
			}
			form.validate().settings.ignore = ":disabled,:hidden";
			return form.valid()
		},
		onStepChanged : function(event, currentIndex, priorIndex) {// 上一步下一步执行完成时进入
			if (currentIndex === 2 && Number($("#age").val()) >= 18) {
				$(this).steps("next");
			}
			if (currentIndex === 2 && priorIndex === 3) {
				$(this).steps("previous");
			}
		},
		onFinishing : function(event, currentIndex) {// 点击完成时
			var form = $(this);
			form.validate().settings.ignore = ":disabled"; //隐藏的不校验
			
			return form.valid();
		},
		onFinished : function(event, currentIndex) {// 完成结束后进入
            var groupInfoList = $("input[id*='groupInfo_']");
            var teamNum= $("#algorithm option:selected").attr("id");
            var flag = false;
            
            $.each(groupInfoList, function(index, value) {
               if (value.value.split(",").length < teamNum) {
                   flag = false;
                   lrError("请将每组录入算法规定的队伍数！");
                   return false;
               } else {
                   flag = true;
               }
            });
            
            if (flag) {
    			var form = $(this);
    			var index = layer.load(0, {
    		        shade : false
    		    });
    			$.ajax({
    				url : '../../layMatchController/addCompetitionSet.json',
    				type : 'POST',
    				dataType : 'JSON',
    				data : form.serialize(),
    				success : function(data) {
    		            layer.close(index);
    		            if (data.status == '1') {
    		                swal({
                                title : "对阵图创建成功!",
                                text : "请在生成的对阵图中编辑比赛信息!",
                                type : "success",
                                confirmButtonText : "确定"
                            }, function () {
                                parent.layer.closeAll();
                            });
    		            } else {
    		                swal({
                                title : "对阵图创建失败!",
                                text : data.msg,
                                type : "error",
                                confirmButtonText : "确定"
                            });
    		            }
    				},
    				error : function() {
    					layer.close(index);
    		        	lrError("赛事设置失败！服务器错误！");
    				}
    			});
            }
		},
		onCanceled : function(event) {// 取消
		    parent.layer.closeAll();
		}
	}).validate({
		errorPlacement : function(error, element) {
			element.before(error);
		},
		rules : {
			productId : {
			    min : 1
			},
			siteName : {
				required : true
			},
			siteTypes : {
			    min : 1
			},
			arrangeId : {
			    min : 1
			},
			arrangeTypeId : {
			    min : 1
			}
		},
	   messages : {
	   		productId : {
				min : "<i class='fa fa-times-circle'></i>请选择项目产品"
			},
			siteName : {
				required : "<i class='fa fa-times-circle'></i>请输入场地名称"
			},
			siteTypes : {
			    min : "<i class='fa fa-times-circle'></i>请选择场地类型"
			},
            arrangeId : {
                min : "<i class='fa fa-times-circle'></i>请选择编排算法"
            },
            arrangeTypeId : {
                min : "<i class='fa fa-times-circle'></i>请选择编排方式"
            }
	   }
	});
})
