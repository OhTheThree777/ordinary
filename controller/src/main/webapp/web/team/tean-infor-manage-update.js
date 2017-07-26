$(function(){
		//加载队伍详细信息
		$.ajax({
			url:'../../teamInfoController/selectObj.json',
			data:{'id':$.cookie('tid')},
			async:true,
			cache:false,
			dataType:"json",
			success:function(data){
					var str=$('<ul class="list-unstyled clearfix col-xs-6 team_detail">'
							+'			<li>'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right"  style="line-height: 100px;">队徽</dt>'
							+'					<dd class="col-xs-8 pull-right"><img src="'+data.data.obj.teamEmblem+'" onclick="showPic(1,1);"style="height: 100px; width: 100px;" id="add_pic1"></dd>'
							+'					<input type="hidden" class="form-control pull-right" name="teamEmblem" id="teamEmblem" value='+data.data.obj.teamEmblem+'>'
							+'				</dl>'
							+'			</li>'
							+'			<li id="1">'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right">名称</dt>'
//							+'					<dd class="col-xs-8 pull-right">'+data.data.obj.teamName+'</dd>'
							+'					<input type="text" id="teamName" class="form-control" value='+data.data.obj.teamName+'>'
							+'				</dl>'
							+'			</li>'		
							+'			<li>'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right">领队姓名</dt>'
//							+'					<dd class="col-xs-8 pull-right">'+data.data.obj.teamLeader+'</dd>'
							+'					<input type="text" id="teamLeader" name="teamLeader" readonly="true" data-toggle="modal" data-target="#myModal3" placeholder="领队姓名" class="form-control" value='+isUndefined(data.data.obj.teamLeader,"String")+'>'
							+'					<input type="hidden" name="teamLeaderPic" id="lingduiPic" value='+data.data.obj.teamLeaderPic+'>'
							+'					<input type="hidden" name="teamLeaderIdentity" value='+data.data.obj.teamLeaderIdentity+' class="form-control required" id=teamLeaderIdentity placeholder="请输入身份证号" required:true/>'
							+'					<input type="hidden" name="teamLeaderNumber" value='+data.data.obj.teamLeaderNumber+' class="form-control required" id=teamLeaderNumber placeholder="请输入手机号码" required:true/>'
							+'					<input type="hidden" name="teamLeaderTel" value='+data.data.obj.teamLeaderTel+' class="form-control" id=teamLeaderTel placeholder="请输入固定电话"/>'
							+'				</dl>'
							+'			</li>'
							+'			<li>'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right">队医</dt>'
//							+'					<dd class="col-xs-8 pull-right">'+data.data.obj.teamLeader+'</dd>'
							+'					<input type="hidden" name="teamDoctorPic" id="duiyiPic" value='+data.data.obj.teamDoctorPic+'>'
							+'					<input type="text" name="teamDoctor" class="form-control" id="teamDoctor" placeholder="队医姓名" readonly="true" data-toggle="modal" data-target="#myModal1" value='+isUndefined(data.data.obj.teamDoctor,"String")+'>'
							+'					<input type="hidden" name="teamDoctorIdentity" value='+data.data.obj.teamDoctorIdentity+' class="form-control required" id=teamDoctorIdentity placeholder="请输入身份证号" required:true/>'
							+'				</dl>'
							+'			</li>'
							+'			<li>'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right">赛风监督员</dt>'
//							+'					<dd class="col-xs-8 pull-right">'+data.data.obj.teamLeader+'</dd>'
							+'					<input type="text" class="form-control" id="teamEthos" placeholder="赛风监督员姓名" readonly="true" data-toggle="modal" data-target="#myModal2" name="teamEthos" value='+isUndefined(data.data.obj.teamEthos,"String")+'>'	
							+'					<input type="hidden" name="teamEthosPic" value='+data.data.obj.teamEthosPic+' id="jianduyuanPic">'
							+'					<input type="hidden" name="teamEthosIdentity" value='+data.data.obj.teamEthosIdentity+' class="form-control required" id=teamEthosIdentity placeholder="请输入身份证号">'
							+'				</dl>'
							+'			</li>'
							+'			<li>'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right">成立时间</dt>'
//							+'					<dd class="col-xs-8 pull-right">'+data.data.obj.teamBulidTime+'</dd>'
							+'  				<input name="teamBulidTime" type="text" id="teamBulidTime" class="form-control" value='+data.data.obj.teamBulidTime+'>'
							+'				</dl>'
							+'			</li>'
							+'			<li>'
							+'				<dl class="clearfix">'
							+'					<dt class="col-xs-4 text-right">运动项目</dt>'
							+'					<input type="text" style="background-color:#ffffff;margin-top: 0;cursor: pointer;" class="form-control" id="team_type" placeholder="请选择队伍类型" value='+queryTeamType(data.data.obj.teamType)+' readonly="true" data-toggle="modal" data-target="#sport1">'
				   	 		+'					<input type="hidden" name="teamType" id="teamType">'
							+'				</dl>'
							+'			</li>'
							+'			<li>'
							+'				<dl class="clearfix" id="address">'
							+'					<dt class="col-xs-4 text-right">所在地区</dt>'
//							+'					<dd class="col-xs-8 pull-right">'+data.data.obj.areaCode+'</dd>'
							+'					<input type="text" id="areaCode" name = "areaCode" class="form-control" value='+data.data.obj.areaCode+'>'
							+'				</dl>'
							+'			</li>'
							+'		</ul>'
							+'		<div class="col-xs-6">'
							+'			<div class="col-xs-12">'
							+'				<div class="row clearfix team-intro">'
							+'				<h4>队伍简介<a><button type="button" class="btn btn-success pull-right" onclick="save('+data.data.obj.id+')">确认保存</button></a></h4>'
							+'				</div>'
							+'			</div>'
//							+'			<div class="col-xs-12 clearfix" style="height: 288px;border:1px solid rgba(0, 204, 153, 1);padding-top: 20px;line-height: 22px;">'+data.data.obj.teamIntroduction+''
//							+'			</div>'
							+'			<textarea id="teamIntroduction" name="teamIntroduction" class="col-xs-12 clearfix" style="height: 467px;border:1px solid rgba(0, 204, 153, 1);padding-top: 20px;line-height: 22px;resize: none">'+isUndefined(data.data.obj.teamIntroduction,"String")+'</textarea>'
							+'		</div>');
						$("#team_message").append(str);
						//获取队伍类型
						acquireModels();
						$('#tean_id').val(data.data.obj.id);
						if(data.data.obj.teamDoctorPic != 'undefined'){
							$('#add_pic2').attr('src',data.data.obj.teamDoctorPic);
						}
						$('#teamDoctorPic').val(data.data.obj.teamDoctorPic);
						$('#xin1').val(isUndefined(data.data.obj.teamDoctor,"String"));
						$('#xin2').val(isUndefined(data.data.obj.teamDoctorIdentity,"String"));
						if(data.data.obj.teamEthosPic != 'undefined'){
							$('#add_pic3').attr('src',data.data.obj.teamEthosPic);
						}
						$('#teamEthosPic').val(data.data.obj.teamEthosPic);
						$('#hai1').val(isUndefined(data.data.obj.teamEthos,"String"));
						$('#hai2').val(isUndefined(data.data.obj.teamEthosIdentity,"String"));
						if(data.data.obj.teamLeaderPic != 'undefined'){
							$('#add_pic4').attr('src',data.data.obj.teamLeaderPic);
						}
						$('#teamLeaderPic').val(data.data.obj.teamLeaderPic);
						$('#ling1').val(isUndefined(data.data.obj.teamLeader,"String"));
						$('#ling2').val(isUndefined(data.data.obj.teamLeaderIdentity,"String"));
						$('#ling3').val(isUndefined(data.data.obj.teamLeaderNumber,"String"));
						$('#ling4').val(isUndefined(data.data.obj.teamLeaderTel,"String"));
						laydate({
						    elem: '#teamBulidTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
						    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
						});
						
						//地址初始化
						$("#address").address({
							prov: "内蒙古",
							city: "呼和浩特市",
							district: "",
							scrollToCenter: true,
							footer: true,
							selectEnd: function(json) {
								console.log(JSON.stringify(json));
							}
						});
			}
			
		});
	});

swfobject.addDomLoadEvent(function () {
	//以下两行代码正式环境下请删除
var swf = new fullAvatarEditor("fullAvatarEditor.swf", "expressInstall.swf", "swfContainer", {
		    id : 'swf',
			upload_url : '../../common/upload/upPic.json',	//上传接口
			method : 'post',	//传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
			src_upload : 2,		//是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
			avatar_box_border_width : 0,
			width: 600,						//flash文件的宽度
			height: 430,
			expressInstall:'../../js/plugins/fullavatareditor/expressInstall.swf',
			file:'../../js/plugins/fullavatareditor/fullAvatarEditor.swf',
			avatar_sizes : '100*100',
			avatar_sizes_desc : '100*100像素'
		}, function (msg) {
			switch(msg.code)
			{
				case 1 : break;
				case 2 : 
					//alert("已成功加载图片到编辑面板。");
					document.getElementById("upload").style.display = "inline";
					break;
				case 3 :
					if(msg.type == 0)
					{
						alert("摄像头已准备就绪且用户已允许使用。");
					}
					else if(msg.type == 1)
					{
						alert("摄像头已准备就绪但用户未允许使用！");
					}
					else
					{
						alert("摄像头被占用！");
					}
				break;
				case 5 : 
					var result=eval(msg.content);
					if(result.status=="1"){
						var COCKLEBUR = $.session.get("COCKLEBUR");
						$.session.remove("COCKLEBUR");
						if(COCKLEBUR==1){
							$('#add_pic1').attr('src',''+result.list[0].uri);
							$('#teamEmblem').val(result.list[0].uri);
						}else if(COCKLEBUR==2){
							$('#add_pic2').attr('src',''+result.list[0].uri);
							$('#teamDoctorPic').val(result.list[0].uri);
						}else if(COCKLEBUR==3){
							$('#add_pic3').attr('src',''+result.list[0].uri);
							$('#teamEthosPic').val(result.list[0].uri);
						}else if(COCKLEBUR==4){
							$('#add_pic4').attr('src',''+result.list[0].uri);
							$('#teamLeaderPic').val(result.list[0].uri);
						}
					}else{
						alert('图片上传失败');
					}
					layer.close(pic_layer);
						
				break;
			}
		}
	);

});
var pic_layer;
function showPic(type,baby){
	if(baby==1){
		$.session.set("COCKLEBUR",1);
	}else if(baby==2){
		$.session.set("COCKLEBUR",2);
	}else if(baby==3){
		$.session.set("COCKLEBUR",3);
	}else if(baby==4){
		$.session.set("COCKLEBUR",4);
	}
	 pic_layer=layer.open({
	      type: 1,
	      title: '上传头像',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['60%', '95%'],
	      content: $('#div_pic'),
	      end: function(){ //此处用于演示
	    	
		  }
	});
}

//保存修改
function save(id){
	if(!$('#form_teamInfo_add').valid()){
		lrError("请输入必填项！");
		return;
	}
	$.ajax({
		url:'../../teamHomepageController/updateTeam.json',
		data:$("#form_teamInfo_add").serialize(),
		async:true,
		cache:false,
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.status==1){
				parent.swal({
					   title:"修改成功",
					   text:"球队信息保存成功",
					   type:"success",
					   confirmButtonText:"确定"
				   },function(){
					   parent.location.reload();//刷新父窗口
				   });
			}else{
				parent.swal({
					   title:"修改失败",
					   text:data.msg,
					   type:"error",
					   confirmButtonText:"确定"
				   },function(){
					   parent.location.reload();//刷新父窗口
				   });
			}
			
				
		}
	});
	
}
//*********************************************************************************8获取队伍类型*********************************************************************
function queryTeamType(teamType){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "../../JoinTeamController/queryTeamType",
	    dataType : "json",
	        data : {
	            'teamType' : teamType,
	        },
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.map.name;
		}
	}); 
	return jsonObject;
}



//*****************************************************************************队医确定按钮*****************************************************************************************
function btn_Doctor(){
	if(!$('#form_teamDoctor').valid()){
		lrError("请输入必填项！");
		$("#btn_D").attr("data-dismiss","");
		return;
	}else{
		$('#teamDoctor').val($('#xin1').val());
		$('#teamDoctorIdentity').val($('#xin2').val());
		$('#duiyiPic').val($('#teamDoctorPic').val());
		$("#btn_D").attr("data-dismiss","modal");
	}
}

//*****************************************************************************监督员确定按钮*****************************************************************************************
function btn_Ethos(){
	if(!$('#form_teamEthos').valid()){
		lrError("请输入必填项！");
		$("#btn_E").attr("data-dismiss","");
		return;
	}else{
		$('#teamEthos').val($('#hai1').val());
		$('#teamEthosIdentity').val($('#hai2').val());
		$('#jianduyuanPic').val($('#teamEthosPic').val());
		$("#btn_E").attr("data-dismiss","modal");
	}
}

//*****************************************************************************领队确定按钮*****************************************************************************************
function btn_Leader(){
	var mobile = /^1[34578]\d{9}$/;//手机号码
	var telephoneRule = /^\d{3,4}-?\d{7,9}$/;//固定电话
	if(!$('#form_Leader').valid()){
		lrError("请输入必填项！");
		$("#btn_T").attr("data-dismiss","");
		return;
	}else if($("#ling3").val().length != 11 || !mobile.test($("#ling3").val())){
		lrError("请输入正确的手机号！");
		$("#btn_T").attr("data-dismiss","");
		return;
	}else{
		if($("#ling4").val()== "" || telephoneRule.test($("#ling4").val())){
			$('#teamLeader').val($('#ling1').val());
			$('#teamLeaderIdentity').val($('#ling2').val());
			$('#teamLeaderNumber').val($('#ling3').val());
			$('#teamLeaderTel').val($('#ling4').val());
			$('#lingduiPic').val($('#teamLeaderPic').val());
			$("#btn_T").attr("data-dismiss","modal");
		}else{
			lrError("请输入正确的固定电话！");
			$("#btn_T").attr("data-dismiss","");
		}
		
	}
}


//-------------------------------------------------信息验证---------------------------------------------------------------------------------------------------------------------------

$("#form_teamDoctor").validate({
   ignore: [],
   rules : {
       teamEmblem : {
           required : true
       },
	   xin2 : {
           required : true,
           isIdCardNo : true
       }
   },
   messages : {
       teamEmblem : {
           required : "<i class='fa fa-times-circle'></i>请添加头像"
       },
	   xin2 : {
           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
       }
   }
});

$("#form_teamEthos").validate({
       ignore: [],
	   rules : {
	       teamEthosPic : {
	           required : true
	       },
	       hai2 : {
	           required : true,
	           isIdCardNo : true
	       }
	   },
	   messages : {
	       teamEthosPic : {
	           required : "<i class='fa fa-times-circle'></i>请添加头像"
	       },
	       hai2 : {
	           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
	           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
	       }
	   }
	});

$("#form_Leader").validate({
       ignore: [],
	   rules : {
	       teamLeaderPic : {
               required : true
           },
	       ling2 : {
	           required : true,
	           isIdCardNo : true
	       },
	       ling3 : {
	           required : true,
	       }
	   },
	   messages : {
	       teamLeaderPic : {
               required : "<i class='fa fa-times-circle'></i>请添加头像"
           },
	       ling2 : {
	           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
	           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
	       },
	       ling3 : {
	           required : "<i class='fa fa-times-circle'></i>请输入手机号码",
	       }
	   }
	});

