var personflag  = $.session.get("personFlag");
var occupationId = $.session.get("occupationId");
var teamSign = $.session.get("teamSign");
var projectId =$.cookie("projectId");
var createTeam = $.session.get("createTeam");
var team_details_id = $.cookie('team_details_id');
//$.cookie('team_details_id', null,{expires: 7, path: '/' });
var v1 = $('<div class="btn-group" id="yaoqingydy">'
			+'	<button type="button" class="btn btn-default on1" onclick="invite_sportsman()">邀请运动员</button>'
		  +'</div>');
var v2 = $('<div class="btn-group" id="yaoqingjiaolian">'
			+'	<button type="button" class="btn btn-default on1" onclick="invite_coach()">邀请教练</button>'
		+'</div>');
var index = layer.load(0, {
    shade : false
});
$(function(){
	//创建球队跳转
	if(createTeam == "1"){
		  //头部用户信息获取
	    $.ajax({
	       url : '../../../userAction/findUser.json',
	       type : 'POST',
	       async : true,
	       cache : false,
	       success : function(data) {
	    	   occupationId = data.data.obj.occupationId;
	    	   teamSign = data.data.obj.teamSign;
	       }
	    });
	}
	if(1==$.cookie("yaoqingxiangqing")){
	    $.cookie('yaoqingxiangqing', null,{expires: 7, path: '/' });
		//加载队伍详细信息
		$.ajax({
			url:'../../../teamHomepageController/selectObjById.json',
			data:{'id':team_details_id},
			async:true,
			cache:false,
			dataType:"json",
			success:function(data){
				multiplexing(data);
				//是否为人员已加入的队伍
				if(1==data.data.map.cotch_check || 1==data.data.map.team_check){
					var s1='<button type="button" id="" class="btn btn-danger disabled ">已拒绝</button>';
					$("#a1").append(s1);
				}else{
					if(data.data.map.teamId !=$.cookie('team_details_id')){
						var s1='<button type="button" id="btn-1" class="btn btn-success" onclick="consent('+data.data.obj.id+')">同意加入</button>';
						var s2='<button type="button" id="btn-2" class="btn btn-danger" onclick="disagree('+data.data.obj.id+')">拒绝加入</button>';
						$("#toolbar").append(s1);
						$("#toolbar").append(s2);
					}else if(data.data.map.teamId ==$.cookie('team_details_id')||data.data.map.cotch_check==1){
						var s1='<button type="button" id="" class="btn btn-info disabled ">已加入</button>';
						var s2='<button type="button" id="btn-2" class="btn btn-danger" onclick="quitss()">退出</button>';
						$("#toolbar").append(s1);
						$("#toolbar").append(s2);
					}
				}
			}
		});
	}else{
		//加载我de队伍详细信息
		$.ajax({
			url:'../../../teamHomepageController/selectManageTeam.json',
			data:{'id':team_details_id},
			async:true,
			cache:false,
			dataType:"json",
			success:function(data){
				multiplexing(data);
			}
			
		});
	}
		
	});


function multiplexing(data){
	var str=$('<ul class="list-unstyled clearfix col-xs-6 team_detail">'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right"  style="line-height: 100px;">队徽</dt>'
			+'					<dd class="col-xs-8 pull-right"><img class="img" src="'+data.data.obj.teamEmblem+'" style="height: 100px;width: 100px;"></dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li id="1">'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">名称</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.teamName,"String")+'</dd>'
//			+'					<input type="text" class="form-control pull-right" value='+val.teamName+'>'
			+'				</dl>'
			+'			</li>'		
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">领队人</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.teamLeader,"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">联系电话</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.teamLeaderNumber,"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">队医</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.teamDoctor,"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">赛风监督员</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.teamEthos,"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">成立时间</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.teamBulidTime,"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">运动项目</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(queryTeamType(data.data.obj.teamType),"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'			<li>'
			+'				<dl class="clearfix">'
			+'					<dt class="col-xs-4 text-right">所在地区</dt>'
			+'					<dd class="col-xs-8 pull-right">'+isUndefined(data.data.obj.areaCode,"String")+'</dd>'
			+'				</dl>'
			+'			</li>'
			+'		</ul>'
			+'		<div class="col-xs-6">'
			+'			<div class="col-xs-12">'
			+'				<div class="row clearfix team-intro">'
			+'				<h4>队伍简介<div id="toolbar" class="btn-group pull-right" data-toggle="buttons" ><button id="xiugai" type="button" onclick="change('+data.data.obj.id+')" class="btn btn-success">修改信息</button></div></h4>'
			+'				</div>'
			+'			</div>'
			+'			<div class="col-xs-12 clearfix" style="height: 346px;border:1px solid rgba(0, 204, 153, 1);padding-top: 20px;line-height: 22px;">'+isUndefined(data.data.obj.teamIntroduction,"String")+''
			+'			</div>'
//			+'			<textarea id="teamIntroduction" class="col-xs-12 clearfix" style="height: 288px;border:1px solid rgba(0, 204, 153, 1);padding-top: 20px;line-height: 22px;resize: none">'+val.teamIntroduction+'</textarea>'
			+'		</div>');
		$("#team_message").append(str);
		infoPics();
		//
		if(4==personflag && occupationId==data.data.obj.id){
			$("#zaiyiduiyuan").append(v1);
			$("#zaiyijiaolian").append(v2);
			$("#xsqqy_btn").show(); 
			$("#xsqjl_btn").show();
			accredit(occupationId);
			$("#toolbar").append('<button id="" type="button" class="btn btn-success" data-toggle="modal" data-target="#sqjl">权限设置</button>');
		}else{
			$("#xiugai").hide();
			if((data.data.map.my_team_id ==data.data.obj.id || data.data.map.team_id ==data.data.obj.id)&& data.data.map.tdbz==undefined & teamSign !="1"){
				var str = $('<button id="tuidui" type="button" class="btn btn-danger" onclick="quitss()">退出球队</button>');
				$("#toolbar").append(str);
			}else if(data.data.map.person_state==1 || data.data.map.coach_state==1){
				var str = $('<button id="jiadui" type="button" class="btn btn-success" onclick="join('+data.data.obj.id+')">加入球队</button>');
				$("#toolbar").append(str);
			}
		}
//		if(projectId =="null" || projectId ==undefined){
//		}else{
//			var str = $('<a><button id="jiadui" type="button" class="btn btn-success pull-right" onclick="invite_team('+data.data.obj.id+')">邀请球队</button></a>');
//			$("#h4").append(str);
//		}
		cocklebur(data.data.obj.id);
}

function cocklebur(my_team_id){
	//查询当前用户球队
	$.ajax({
		url:'../../../teamInfoController/query_user_message.json',
		data:{},
		async:true,
		cache:false,
		dataType:"json",
		success:function(js){
			if(js.data.map.team_id == my_team_id && teamSign == "0"){
				$("#xsqqy_btn").show(); 
				$("#xsqjl_btn").show();
			}else if(js.data.map.team_id == my_team_id && teamSign == "1"){
				$("#zaiyiduiyuan").append(v1);
				$("#zaiyijiaolian").append(v2);
				$("#xsqqy_btn").show(); 
				$("#xsqjl_btn").show();
				$("#xiugai").show();
				$("#toolbar").append('<button id="" type="button" class="btn btn-success" data-toggle="modal" data-target="#sqjl">权限设置</button>');
				accredit(js.data.map.team_id);
			}else if(js.data.map.team_id == my_team_id && teamSign == "2"){
				$("#zaiyiduiyuan").append(v1);
				$("#zaiyijiaolian").append(v2);
				$("#xsqqy_btn").show(); 
				$("#xsqjl_btn").show();
				$("#xiugai").show();
			}
		}
	});
	jzNewPerson_coach(my_team_id);
	//加载所属队伍在役人员
	$.ajax({
		url:'../../../teamHomepageController/selectPerson.json',
		data:{'id':my_team_id},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"person_message_in","--您的队伍目前还没有球员，请邀请球员！");
			$.each(data.data.list,function(key,val){
				var id = val.id;
	                var str2=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
	                        +'  <div class="player-list">'
	                        +'          <div class="player-tx img-circle">'
	                        +'              <div class="img-circle"></div>'
	                        +'              <img src="'+val.person_pic+'" class="img'+id+'" >'
	                        +'          </div>'
	                        +'          <a class="btn cherk cherk-detail" role="button" onclick="person_details('+val.id+', '+my_team_id+')">查看详情</a>'
	                        +'          <h4>'+isUndefined(val.person_name,"String")+'</h4>'
	                        +'          <div id='+val.id+'></div>'
	                        +'      </div>'
	                        +'  </li>');
					$("#person_message_in").append(str2);
					var src = $(".img"+id+"").attr("src");    //获取图片路径
					 if(src == "" || undefined==src){
					        $(".img"+id+"").attr("src","../../../img/zanwu.jpg");
					    }
					 $(".img"+id+"").error(function() { 
						 $(".img"+id+"").attr("src", "../../../img/zanwu.jpg"); 
						}); 
			});
		}
	});
	
	//加载所属页面教练
	$.ajax({
		url:'../../../teamHomepageController/selectCoach.json',
		data:{'id':my_team_id},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"coach_message_in","--您的队伍目前还没有教练，请邀请教练！");
			$.each(data.data.list,function(key,val){
				var id = val.id;
				var str3=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
	                        +'  <div class="player-list">'
	                        +'          <div class="player-tx img-circle">'
	                        +'              <div class="img-circle"></div>'
	                        +'              <img src="'+val.coach_portrait+'" class="imgzai'+id+'" >'
	                        +'          </div>'
	                        +'          <a class="btn cherk cherk-detail" role="button" onclick="coach_details('+val.id+', '+my_team_id+')">查看详情</a>'
	                        +'          <h4>'+isUndefined(val.name,"String")+'</h4>'
	                        +'          <div id='+val.id+'></div>'
	                        +'      </div>'
	                        +'  </li>');
				$("#coach_message_in").append(str3);
				var src = $(".imgzai"+id+"").attr("src");    //获取图片路径
				 if(src == "" || undefined==src){
				        $(".imgzai"+id+"").attr("src","../../../img/zanwu.jpg");
				    }
				 $(".imgzai"+id+"").error(function() { 
					 $(".imgzai"+id+"").attr("src", "../../../img/zanwu.jpg"); 
					}); 
				
			});
		}
	});
	layer.closeAll('page');
	layer.close(index);
}

//加载所属队伍新申请运动员员
function jzNewPerson_coach(my_team_id){
	$.ajax({
		url:'../../../teamHomepageController/selectNewPerson.json',
		data:{'dangqian_team_id':my_team_id},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"person_message_no","--目前还没有球员申请您的队伍！");
			$.each(data.data.list,function(key,val){
				var id = val.id;
	                var str2=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
	                        +'  <div class="player-list">'
	                        +'          <div class="player-tx img-circle">'
	                        +'              <div class="img-circle"></div>'
	                        +'              <img src="'+val.person_pic+'" class="img-circle'+id+'" >'
	                        +'          </div>'
	                        +'          <a class="btn cherk cherk-detail" role="button" onclick="person_approve('+val.id+', '+my_team_id+')">查看详情</a>'
	                        +'          <h4>'+isUndefined(val.person_name,"String")+'</h4>'
	                        +'          <div id='+val.id+'></div>'
	                        +'      </div>'
	                        +'  </li>');
					$("#person_message_no").append(str2);
					var src = $(".img-circle"+id+"").attr("src");    //获取图片路径
					 if(src == "" || undefined==src){
					        $(".img-circle"+id+"").attr("src","../../../img/zanwu.jpg");
					    }
					 $(".img-circle"+id+"").error(function() { 
						 $(".img-circle"+id+"").attr("src", "../../../img/zanwu.jpg"); 
						}); 
			});
		}
	});
	
	//加载所属队伍新申请教练
	$.ajax({
		url:'../../../teamHomepageController/selectNewCoach.json',
		data:{'dangqian_team_id':my_team_id},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"coach_message_no","--目前还没有教练申请您的队伍！");
			$.each(data.data.list,function(key,val){
				var id = val.id;
	                var str4=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
	                        +'  <div class="player-list">'
	                        +'          <div class="player-tx img-circle">'
	                        +'              <div class="img-circle"></div>'
	                        +'              <img src="'+val.coach_portrait+'" class="img-circlexin'+id+'" >'
	                        +'          </div>'
	                        +'          <a class="btn cherk cherk-detail" role="button" onclick="coach_approve('+val.id+', '+my_team_id+')">查看详情</a>'
	                        +'          <h4>'+isUndefined(val.name,"String")+'</h4>'
	                        +'          <div id='+val.id+'></div>'
	                        +'      </div>'
	                        +'  </li>');
					$("#coach_message_no").append(str4);
					var src = $(".img-circlexin"+id+"").attr("src");    //获取图片路径
					 if(src == "" || undefined==src){
					        $(".img-circlexin"+id+"").attr("src","../../../img/zanwu.jpg");
					    }
					 $(".img-circlexin"+id+"").error(function() { 
						 $(".img-circlexin"+id+"").attr("src", "../../../img/zanwu.jpg"); 
						}); 
					
			});
		}
	});
}

//修改球队
function change(id){
	$.cookie("tid",null,{expires: 7,path: '/'});
	$.cookie("tid",id,{expires: 7,path: '/'});
	layer.open({
	      type: 2,
	      title: '修改球队信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['90%', '90%'],
	      content:'../../team/tean-infor-manage-update.html'
	});
}

//邀请运动员
function invite_sportsman(){
	//写入标记用来区分挂牌和全部的运动员
	$.session.set("Anna","1");
	layer.open({
	      type: 2,
	      title: '运动员列表',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['90%', '90%'],
	      content:'../../../web/person/person-list.html'
	});
}

//邀请教练
function invite_coach(){
	//写入标记用来区分挂牌和全部的运动员
	$.session.set("Anna","1");
	layer.open({
	      type: 2,
	      title: '教练列表',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['90%', '90%'],
	      content:'../../../web/coach/coach-list.html'
	});
}

//跳转运动员详情
function person_details(person_id, team_id){
	$.cookie("person_details_id",null,{expires: 7,path: '/'});
	$.cookie('person_details_id', person_id,{expires: 7,path: '/'});
	window.location.href="../../../web/person/person-infor.html";
}

//跳转运动员审批
function person_approve(person_id, team_id){
	$.cookie("person_details_id",null,{expires: 7,path: '/'});
	$.cookie('person_details_id', person_id,{expires: 7,path: '/'});
	$.cookie('dangqian_team_id', null,{expires: 7,path: '/'});
	$.cookie('dangqian_team_id', team_id,{expires: 7,path: '/'});
	$.cookie("newPerson",1,{expires: 7,path: '/'});
    window.location.href="../../../web/person/person-infor.html";
}

//跳转教练详情
function coach_details(coach_id){
	$.cookie("coach_id",null,{expires: 7,path: '/'});
    $.cookie("coach_id",coach_id,{expires: 7,path: '/'});
	window.location.href="../../../web/coach/coach-infor.html";
}

//跳转教练审批
function coach_approve(coach_id, team_id){
	$.cookie("coach_id",null,{expires: 7,path: '/'});
    $.cookie("coach_id",coach_id,{expires: 7,path: '/'});
	$.cookie('dangqian_team_id', null,{expires: 7,path: '/'});
	$.cookie('dangqian_team_id', team_id,{expires: 7,path: '/'});
    $.cookie("newPerson",1,{expires: 7,path: '/'});
    window.location.href="../../../web/coach/coach-infor.html";
}

//同意加入
function consent(team_id){
	var index = layer.load(0, {
        shade : false
    });
	$("#toolbar").children().remove();
    $.ajax({
        url:'../../../teamIndexController/consent.json',
        type:'post',
        data:{
            'teamId':team_id,
        },
        dataType:'json',
        success:function(data){
        	swal({
				title :"反馈成功",
				text : "已向队伍反馈为通过！",
				type : "success",
				confirmButtonText : "确定"
			});
            var s1='<button id="" type="button" class="btn btn-danger" onclick="quitss()">退出球队</button>';
			$("#toolbar").append(s1);
            layer.closeAll('page');
            layer.close(index);
        },
        error:function(){
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}
//拒绝加入
function disagree(team_id){
	var index = layer.load(0, {
        shade : false
    });
	$("#toolbar").children().remove();
	$.ajax({
        url:'../../../teamIndexController/disagree.json',
        type:'post',
        data:{
            'teamId':team_id,
        },
        dataType:'json',
        success:function(data){
        	swal({
				title :"反馈成功",
				text : "已向队伍反馈为拒绝！",
				type : "success",
				confirmButtonText : "确定"
			});
//            var s1='<button type="button" id="btn-1" class="btn btn-success pull-right">已拒绝</button>';
//			$("#toolbar").append(s1);
            layer.closeAll('page');
            layer.close(index);
        },
        error:function(){
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}
//退出球队
function quitss(){
	var index = layer.load(0, {
        shade : false
    });
	$("#toolbar").children().remove();
	$.ajax({
        url:'../../../JoinTeamController/quit_team',
        type:'post',
        data:{},
        dataType:'json',
        success:function(data){
        	swal({
				title :"申请已发出",
				text : "等待管理员审批！",
				type : "success",
				confirmButtonText : "确定"
			});
        	layer.closeAll('page');
        	layer.close(index);
        },
        error:function(){
        	layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}

//详情申请加入
function join(team_id){
    swal({// 弹出提示框提示用户是否确认删除
        title : "确定要申请该球队吗？",
        text : "马上提交申请，确定要这样做么！",
        type : "warning",
        showCancelButton : true,
        confirmButtonColor : "#DD6B55",
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        closeOnConfirm : true,
        closeOnCancel : true
    }, function(isConfirm) {
        if (isConfirm) {
         //   swal.close()
        	var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
            $.ajax({
                type:"POST",
                url:'../../../JoinTeamController/join_team',
                data:{row_teamId : team_id},
                dataType:"json",
                success:function(data){
                    if (1==data.status){
                    	swal({
     					   title:"加入球队!",
     					   text:"球队申请已递交到该球队",
     					   type:"success",
     					   confirmButtonText:"确定"
     				   },function(){
     					   $("#jiadui").hide();
     				   });
                    }else{
                    	swal({
     					   title:"加入球队失败!",
     					   text:data.msg,
     					   type:"error",
     					   confirmButtonText:"确定"
     				   });
                    }
                    layer.close(index);
					layer.closeAll("page");
                }
            });
        }
    });
}

//******************************************************************************邀请球队************************************************************************
function invite_team(teamId){
	$.ajax({
   		type:"post",
		url:'../../../JoinTeamController/invite_team.json',
		data:{'teamId':teamId,'projectId':projectId},
		dataType:"json",
		success:function(data){
		        	alert("邀请");
		}
	});
}

//*****************************************************************************授权列表*******************************************************************************
function accredit(teamId){
	$.ajax({
   		type:"post",
		url:'../../../teamInfoController/myteam_coach.json',
		data:{'teamId':teamId},
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"infor","--请先邀请教练");
			noMessages(data.data.list,"description","--请先邀请教练");
			$.each(data.data.list,function(k,v){
				str = '<li class="col-lg-2 col-md-3 col-sm-4 col-xs-6" onclick="accredit_coach(\''+v.name+'\','+v.id+','+v.team_sign+','+v.team_id+')" data-dismiss="modal">'
				+'	<div class="qxsz text-center">'
				+'			<img class="img-circle img-thumbnail" src='+v.coach_portrait+'>'
				+'			<p>'+v.name+'</p>'
				if(v.team_sign=="2"){
					str = str + '<small>已授权</small>'
				}else{
					str = str + '<small>未授权</small>'
				}
				str = str+ '</div>'
						+'</li>';
				
				$("#infor").append(str);
				str = '<li class="col-lg-2 col-md-3 col-sm-4 col-xs-6" onclick="appointAndDismiss(\''+v.name+'\','+v.id+','+v.coach_id_z+','+v.team_id+')" data-dismiss="modal">'
				+'	<div class="qxsz text-center">'
				+'			<img class="img-circle img-thumbnail" src='+v.coach_portrait+'>'
				+'			<p>'+v.name+'</p>'
				if(v.id == v.coach_id_z){
					str = str + '<small>主教练</small>'
				}
				str = str+ '</div>'
				+'</li>';
				$("#description").append(str);
			});
		}
	});
}
//*****************************************************************************授权实现*******************************************************************************
function accredit_coach(name,coach_id,team_sign,team_id){
	if(team_sign=="0"){
		swal({
			   title:"您确定要授权给该教练管理球队吗？",
			   text:name,
			   type:"warning",
			   showCancelButton : true,
			   confirmButtonColor : "#DD6B55",
			   confirmButtonText : "授权",
			   cancelButtonText : "取消",
			   closeOnConfirm : false,
			   closeOnCancel : true
		   },function(isConfirm){
			   if(isConfirm){
				   var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
					$.ajax({
				   		type:"post",
						url:'../../../teamInfoController/accredit_coach.json',
						data:{'id':coach_id,'teamId':team_id},
						dataType:"json",
						success:function(data){
							if(1==data.status){
								swal({
			     					   title:"授权成功!",
			     					   text:"",
			     					   type:"success",
			     					   confirmButtonText:"确定"
			     				   },function(){
			     					  window.location.reload();//刷新当前页面.
			     				   });
							}else{
								swal({
			     					   title:"授权失败!",
			     					   text:"",
			     					   type:"error",
			     					   confirmButtonText:"确定"
			     				   });
							}
							layer.close(index);
							layer.closeAll("page");
						}
					});
			   }
		   });
	}else if(team_sign=="2"){
		swal({
			   title:"您确定要解除该教练管理球队的权限吗？",
			   text:name,
			   type:"warning",
			   showCancelButton : true,
			   confirmButtonColor : "#DD6B55",
			   confirmButtonText : "解除授权",
			   cancelButtonText : "取消",
			   closeOnConfirm : false,
			   closeOnCancel : true
		   },function(isConfirm){
			   if(isConfirm){
				   var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
					$.ajax({
				   		type:"post",
						url:'../../../teamInfoController/cancel_accredit_coach.json',
						data:{'id':coach_id,'teamId':team_id},
						dataType:"json",
						success:function(data){
							if(1==data.status){
								swal({
			     					   title:"解除权限成功!",
			     					   text:"",
			     					   type:"success",
			     					   confirmButtonText:"确定"
			     				   },function(){
			     					  window.location.reload();//刷新当前页面.
			     				   });
							}else{
								swal({
			     					   title:"解除权限失败!",
			     					   text:"",
			     					   type:"error",
			     					   confirmButtonText:"确定"
			     				   });
							}
							layer.close(index);
							layer.closeAll("page");
						}
					});
			   }
		   });
	}

}

//*********************************************************************************任免实现********************************************************************************************
function appointAndDismiss(name,coach_id,coach_id_z,team_id){
	if(coach_id_z == undefined || coach_id_z == null){
		swal({
			   title:"您确定要任职该教练为主教练吗？",
			   text:name,
			   type:"warning",
			   showCancelButton : true,
			   confirmButtonColor : "#DD6B55",
			   confirmButtonText : "确认",
			   cancelButtonText : "取消",
			   closeOnConfirm : false,
			   closeOnCancel : true
		   },function(isConfirm){
			   if(isConfirm){
				   var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
					$.ajax({
				   		type:"post",
						url:'../../../teamInfoController/appoint_coach.json',
						data:{'id':coach_id,'teamId':team_id},
						dataType:"json",
						success:function(data){
							if(1==data.status){
								swal({
			     					   title:"任职成功!",
			     					   text:"",
			     					   type:"success",
			     					   confirmButtonText:"确定"
			     				   },function(){
			     					  window.location.reload();//刷新当前页面.
			     				   });
							}else{
								swal({
			     					   title:"任职失败!",
			     					   text:data.msg,
			     					   type:"error",
			     					   confirmButtonText:"确定"
			     				   });
							}
							layer.close(index);
							layer.closeAll("page");
						}
					});
			   }
		   });
	}else {
		swal({
			   title:"您确定要解除该教练的主教练职务吗？",
			   text:name,
			   type:"warning",
			   showCancelButton : true,
			   confirmButtonColor : "#DD6B55",
			   confirmButtonText : "确认",
			   cancelButtonText : "取消",
			   closeOnConfirm : false,
			   closeOnCancel : true
		   },function(isConfirm){
			   if(isConfirm){
				   var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
					$.ajax({
				   		type:"post",
						url:'../../../teamInfoController/dismiss_coach.json',
						data:{'id':coach_id,'teamId':team_id},
						dataType:"json",
						success:function(data){
							if(1==data.status){
								swal({
			     					   title:"解除成功!",
			     					   text:"",
			     					   type:"success",
			     					   confirmButtonText:"确定"
			     				   },function(){
			     					  window.location.reload();//刷新当前页面.
			     				   });
							}else{
								swal({
			     					   title:"解除失败!",
			     					   text:"",
			     					   type:"error",
			     					   confirmButtonText:"确定"
			     				   });
							}
							layer.close(index);
							layer.closeAll("page");
						}
					});
			   }
		   });
	}
}
