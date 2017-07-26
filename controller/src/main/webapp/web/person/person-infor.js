var newPerson = $.cookie("newPerson");
var personflag = $.session.get("personFlag");
var occupationId = $.session.get("occupationId");
var teamSign = $.session.get("teamSign");

$(function(){
	var index = layer.load(0, {
	    shade : false
	});
	$("#basic_message").children().remove();
	$("#basic_messages").children().remove();
	$("#extend_message").children().remove();
	$("#experience").children().remove();
	$.ajax({
		url:'../../teamIndexController/selectOnePersonnel.json',
		type:'post',
		data:{'id':$.cookie('person_details_id')},
		dataType:'json',
		success:function(data){
//***********************************************************************************页面上的哪些状态按钮*****************************************************************************************************************************************
			if(personflag ==4 && occupationId !="undefined"){
				btnsa();
			}else if(personflag ==2 & occupationId !="undefined" & teamSign != "0"){
				btnsb();
			}

			function btnsa(){
				//是否邀请过的team_id
				var team_id =data.data.obj.team_id_g;
				var team_check = data.data.obj.team_check_g
				var c_team_id = data.data.obj.c_team_id;
				
					if(occupationId==team_id & 2==data.data.obj.invitation_status_g & 1==data.data.obj.person_state){
						if(1==team_check){
							$("#toolbar").prepend("<button type='button' class='btn btn-success player-state btn-info' style='padding: 6px 50px;'id='invite_btn' disabled='disabled'>邀请已同意</button>");
						}else if(2==team_check){
							$("#toolbar").prepend("<button type='button' class='btn btn-warning player-state' style='padding: 6px 50px;'id='invite_btno' disabled='disabled'>邀请已拒绝</button>");
						}else if(0==team_check){
							$("#toolbar").prepend("<button type='button' class='btn  btn-default player-state' style='padding: 6px 50px;'id='invite_btnto' disabled='disabled' >邀请未处理</button>");
						}
					}else if(occupationId==team_id & 1==data.data.obj.invitation_status_g & 1==newPerson & 0==team_check){
						$("#toolbar").prepend("<button type='button' class='btn btn-danger' onclick='dissenting()'>审批不通过</button>");
						$("#toolbar").prepend("<button type='button' class='btn btn-success' onclick='approval()'>审批通过</button>");
						
						$.cookie("newPerson",null,{expires: 7,path: '/'});
					}else if(occupationId==data.data.obj.c_team_id & data.data.obj.person_state==3){
						var str2 = $('<button type="button" class="btn btn-danger" id="quit_btno" onclick="quit_btno('+data.data.obj.id+','+data.data.obj.phone+');">不同意</button>');
						var str1 = $('<button type="button" class="btn btn-success"  id="quit_btn" onclick="quit_btn('+data.data.obj.id+','+data.data.obj.phone+');" >同意退出</button>');
						
						$("#toolbar").prepend(str2);
						$("#toolbar").prepend(str1);
					}else if(occupationId !=team_id & 1==data.data.obj.person_state){
						$("#toolbar").prepend("<button type='button' class='btn btn-success' id='invite_btn' onclick='invite1()'>邀请</button>");
					}else if(occupationId==team_id & 1==data.data.obj.invitation_status_g & 1==data.data.obj.person_state & undefined==newPerson){
						$("#toolbar").prepend("<button type='button' class='btn  btn-info' id='invite_btnto' disabled='disabled' >申请中</button>");
					}
					if(occupationId==data.data.obj.c_team_id & data.data.obj.person_state==2){
						var str2 = $('<button type="button" class="btn btn-danger" id="quit_btno" onclick="Makeleave('+data.data.obj.id+','+data.data.obj.phone+');">请离队伍</button>');
						$("#toolbar").prepend(str2);
					}
					
			}
			
			function btnsb(){
				//是否邀请过的team_id
				var team_id =data.data.obj.team_id_g;
				var team_check = data.data.obj.team_check_g
				var c_team_id = data.data.obj.c_team_id;
				var my_team_ids = data.data.map.my_teamId;
				
					if(my_team_ids==team_id & 2==data.data.obj.invitation_status_g & 1==data.data.obj.person_state){
						if(1==team_check){
							$("#toolbar").prepend("<button type='button' class='btn btn-info' id='invite_btn' disabled='disabled'>邀请已同意</button>");
						}else if(2==team_check){
							$("#toolbar").prepend("<button type='button' class='btn btn-warning' id='invite_btno' disabled='disabled'>邀请已拒绝</button>");
						}else if(0==team_check){
							$("#toolbar").prepend("<button type='button' class='btn btn-default' id='invite_btnto' disabled='disabled' >邀请未处理</button>");
						}
					}else if(my_team_ids==team_id & 1==data.data.obj.invitation_status_g & 1==newPerson & 0==team_check){
						$("#toolbar").prepend("<button type='button' class='btn btn-danger' onclick='dissenting()'>审批不通过</button>");
						$("#toolbar").prepend("<button type='button' class='btn btn-success' onclick='approval()'>审批通过</button>");
						
						$.cookie("newPerson",null,{expires: 7,path: '/'});
					}else if(my_team_ids==data.data.obj.c_team_id & data.data.obj.person_state==3){
						var str1 = $('<button id="quit_btn" onclick="quit_btn('+data.data.obj.id+','+data.data.obj.phone+');" type="button" class="btn btn-success">同意退出</button>');
						var str2 = $('<button id="quit_btno" onclick="quit_btno('+data.data.obj.id+','+data.data.obj.phone+');" type="button" class="btn btn-danger">拒绝 </button>');
						$("#toolbar").prepend(str2);
						$("#toolbar").prepend(str1);
					}else if(my_team_ids !=team_id & 1==data.data.obj.person_state){
						$("#toolbar").prepend("<button type='button' class='btn btn-success' id='invite_btn' onclick='invite1()'>邀请</button>");
					}else if(my_team_ids==team_id & 1==data.data.obj.invitation_status_g & 1==data.data.obj.person_state & undefined==newPerson){
						$("#toolbar").prepend("<button type='button' class='btn  btn-info' id='invite_btnto' disabled='disabled' >申请中</button>");
					}
					if(my_team_ids==data.data.obj.c_team_id & data.data.obj.person_state==2){
						var str2 = $('<button id="quit_btno" onclick="Makeleave('+data.data.obj.id+','+data.data.obj.phone+');" type="button" class="btn btn-danger">请离队伍 </button>');
						$("#toolbar").prepend(str2);
					}
			}
			var id=data.data.obj.id;
			var str1=$('<div class="clearfix" >'
				 +'			<img class="img img-thumbnail" src="'+data.data.obj.person_pic+'"/>'
				 +'		</div>'
				 +'		<div class="clearfix" id="cock'+id+'">'
				 +'			<p style="margin-top: 5px;">'+isUndefined(data.data.obj.person_name,"String")+'</p><p style="color:#BCBCBC;font-weight: bold;">'+data.data.map.name+'</p>'
				 +'			<div id="Apers" class="current_state">'+getCodeKey('../../','athlete_state',''+data.data.obj.person_state+'')+'</div>'
				 +'		</div>');
			$("#basic_message").append(str1);
			//人员状态样式
			var personState = data.data.obj.person_state;
			if(1==personState){
            	$("#Apers").addClass("current_state");
            }else if(2==personState){
            	$("#Apers").addClass("current_state btn-info");
            }else if(3==personState){
            	$("#Apers").addClass("current_state btn-danger");
            }
			if(undefined !=data.data.obj.team_name){
				var str=$("<p style='margin-top: 5px;'>"+data.data.obj.team_name+"</p>");
				$("#"+'cock'+id+'').append(str);
			}
			
			var str2=$('<tr>'
				+'			<th>性 别</th>'
				+'			<td>'+getCodeKey("../../","sex_code",""+isUndefined(data.data.obj.person_sex),"int"+"")+'</td>'
				+'			<th>民族</th>'
				+'			<td>'+getCodeKey('../../','nation',''+data.data.obj.person_national+'')+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>身高</th>'
				+'			<td>'+isUndefined(data.data.obj.person_height,"String")+'cm</td>'
				+'			<th>体重</th>'
				+'			<td>'+isUndefined(data.data.obj.person_weight,"String")+'kg</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>衣服尺码</th>'
				+'			<td>'+isUndefined(getCodeKey('../../','fixed_size',data.data.obj.person_clothing_size),"String")+'</td>'
				+'			<th>鞋号</th>'
				+'			<td>'+isUndefined(getCodeKey('../../','footwear_size',data.data.obj.person_Shoe_size),"String")+'码</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>政治面貌</th>'
				+'			<td>'+getCodeKey('../../','political_type',''+data.data.obj.person_political_landscape+'')+'</td>'
				+'			<th>毕业学校</th>'
				+'			<td>'+data.data.obj.person_school+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>年龄</th>'
				+'			<td>'+countAge(isUndefined(data.data.obj.person_birthday,"String"))+'</td>'
				+'			<th>学历</th>'
				+'			<td>'+getCodeKey('../../','education_background',''+data.data.obj.person_education+'')+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>出生日期</th>'
				+'			<td>'+isUndefined(data.data.obj.person_birthday,"String")+'</td>'
				+'			<th>联系电话</th>'
				+'			<td>'+isUndefined(data.data.obj.phone,"String")+'</td>'
				+'		</tr>'
				+'		<tr>'
				+'			<th>国籍</th>'
				+'			<td>'+isUndefined(data.data.obj.person_nationality,"String")+'</td>'
				+'			<th>所属地区</th>'
				+'			<td>'+isUndefined(data.data.obj.person_address,"String")+'</td>'
				+'		</tr>');//colspan="3"
			$("#basic_messages").append(str2);
			
			$.ajax({
                type : "POST",
                url : "../../CareerInfoController/selectzhiye.json",
                dataType : "json",
                data : {
                    'personId' : data.data.obj.id
                },
                success : function (data1) {
                	if(data1.data.list.length<1){
                		var str3 = '<label class="control-label">该运动员尚未完善扩展信息</label>';
                		$("#extend_message").append(str3);
                		return;
                	}
                	
                	$.each(data1.data.list,function(key,val) {
                		if(val.input_control=="4" || val.input_control=="1"){
                			
                			var str3 = '<div class="form-group col-lg-3 col-md-4 col-xs-6"><label class="control-label col-sm-6 text-right">' + val.attribute_name + ': </label><div class="col-sm-6">'+isUndefined(getAttributServer(val.c),"String")+'</div></div>';
                    		
                		}else if(val.input_control=="2"){
                			var str3 = '<div id="div_1" class="form-group col-lg-3 col-md-4 col-xs-6"><label class="control-label col-sm-6 text-right">' + val.attribute_name + ': </label>';
                			var a=val.c.split(",");
                			$.each(a,function(k,v) {
                				str3+='<span>'+getAttributServer(v)+ '&nbsp; </span>';
                			});
                        	
                		}else{
                			var str3 = '<div class="form-group col-lg-3 col-md-4 col-xs-6"><label class="control-label col-sm-6 text-right">' + val.attribute_name + '</label><div class="col-sm-6">'+val.c+'</div>';
                    		
                		}
                		$("#extend_message").append(str3);
                	});
                },
                error : function () {
                    layer.close(index);
                    lrError("添加失败！服务器错误！");
                }
			});
			
			var str4=$('<p>'+isUndefined(data.data.obj.person_body,"String")+'</p>');
			$("#body").append(str4);
			infoPic();
			layer.close(index);
		}
	});
	
});

//从服务器获取值
function getAttributServer(affid){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "../../CareerInfoController/selectAffiliateKey.json",
	    dataType : "json",
	        data : {
	            'affid' : affid
	        },
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.obj.attribute_values;
		}
	}); 
	return jsonObject;
}


//退出球队（同意）
function quit_btn(id,phone){
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../teamIndexController/quitconsent.json',
		data:{'id':id,'phone':phone},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			if(data.status==1){
				$("#quit_btn").hide();
				$("#quit_btno").hide();
				swal({
					title :"反馈成功",
					text : "同意退出球队",
					type : "success",
					confirmButtonText : "确定"
				},function(){
					window.location.href='../../web/team/my_team/tean-infor-manage.html';
				});
			}else{
				swal({
					title :"反馈失败",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}
			layer.close(index);
		}
		
	});
}


//退出球队（不同意）
function quit_btno(id,phone){
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../teamIndexController/quitrefuse.json',
		data:{'id':id,'phone':phone},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			if(data.status==1){
				$("#quit_btn").hide();
				$("#quit_btno").hide();
				swal({
					title :"反馈成功",
					text : "不同意退出球队",
					type : "success",
					confirmButtonText : "确定"
				},function(){
					window.location.href='../../web/team/my_team/tean-infor-manage.html';
				});
			}else{
				swal({
					title :"反馈失败",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
			}
			layer.close(index);
		}
		
	});
}

//审批不通过(拒绝入队)
function dissenting() {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        url:'../../teamIndexController/personInviteBtno.json',
        type:'post',
        data:{
            'personId':$.cookie('person_details_id'),
        },
        dataType:'json',
        success:function(data){
        	if(data.status == 1){
        		swal({
    				title :"反馈成功",
    				text : "已向球员反馈为不通过！",
    				type : "success",
    				confirmButtonText : "确定"
    			},function(){
    				window.location.href='../../web/team/my_team/tean-infor-manage.html';
    			});
                $("#toolbar").hide();
                layer.close(index);
        	}else{
        		swal({
    				title :"反馈失败",
    				text : data.msg,
    				type : "error",
    				confirmButtonText : "确定"
    			},function(){
    				window.location.href='../../web/team/my_team/tean-infor-manage.html';
    			});
                $("#toolbar").hide();
                layer.close(index);
        	}
        	
        },
        error:function(){
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}

//审批通过（同意入队）
function approval() {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        url:'../../teamIndexController/personInviteBtn.json',
        type:'post',
        data:{
            'personId':$.cookie('person_details_id'),
        },
        dataType:'json',
        success:function(data){
        	if(data.status == 1){
        		swal({
    				title :"反馈成功",
    				text : "已向球员反馈为通过！",
    				type : "success",
    				confirmButtonText : "确定"
    			},function(){
    				window.location.href='../../web/team/my_team/tean-infor-manage.html';
    			});
                $("#toolbar").hide();
                layer.close(index);
        	}else{
        		swal({
    				title :"反馈失败",
    				text : data.msg,
    				type : "error",
    				confirmButtonText : "确定"
    			},function(){
    				window.location.href='../../web/team/my_team/tean-infor-manage.html';
    			});
                $("#toolbar").hide();
                layer.close(index);
        	}
        	
        },
        error:function(){
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}

//踢人
function Makeleave (person_id,phone){
	swal({
		   title:"您确定要将此队员请离队伍吗？",
		   type:"warning",
		   showCancelButton : true,
		   confirmButtonColor : "#DD6B55",
		   confirmButtonText : "确定",
		   cancelButtonText : "取消",
		   closeOnConfirm : false,
		   closeOnCancel : true
	   },function(isConfirm){
		   if(isConfirm){
			   var index = layer.load(0, {
			        shade : false
			    });
			   $.ajax({
			        url:'../../teamIndexController/makeleave.json',
			        type:'post',
			        data:{
			            'id':person_id,
			            'phone' : phone,
			            'role' : "1"
			        },
			        dataType:'json',
			        success:function(data){
			        	if(data.status == 1){
			        		swal({
								title :"请离成功！",
								text : data.msg,
								type : "success",
								confirmButtonText : "确定"
							},function(){
								window.location.href='../../web/team/my_team/tean-infor-manage.html';
							});
				            $("#toolbar").hide();
				            layer.closeAll('page');
				            layer.close(index);
			        	}else{
			        		swal({
								title :"请离失败！",
								text : data.msg,
								type : "error",
								confirmButtonText : "确定"
							},function(){
								window.location.href='../../web/team/my_team/tean-infor-manage.html';
							});
				            $("#toolbar").hide();
				            layer.closeAll('page');
				            layer.close(index);
			        	}
			        	
			        },
			        error:function(){
			            layer.close(index);
			            lrError("操作失败！服务器错误！");
			        }
			    });
		   }
	   });
}
