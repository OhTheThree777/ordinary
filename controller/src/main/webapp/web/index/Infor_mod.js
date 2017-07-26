$(function(){
	var index = layer.load(0, {
	    shade : false
	});
	var personflag = $.session.get("personFlag");
	if(2==personflag || 3==personflag){
		$("#btn-zhiye").hide();
		$("#zhiyexinxi").hide();
	}
	if(4==personflag || 5==personflag){
		$("#main-info").show();
		$("#btn-zhanghu").show();
		$("#btn-geren").hide();
		$("#btn-zhiye").hide();
		$("#zhiping").hide();
		$("#btn-zhanghu").show().children("button").addClass("on2");
		$("#btn_save").remove();
		$.ajax({
			url:'../../CareerInfoController/selectObjById.json',
	        data:{},
	        type:"post",
	        dataType:"json",
	        success:function(data){
	        	callback(data);
	        	var headPortrait = data.data.obj.head_portrait
	        	$('#portrait').val(headPortrait);
	           	if(undefined !=headPortrait){
	           		if(headPortrait.indexOf("http") !=-1){
		           		$("#add_pic").attr('src',headPortrait);
		           	}
	           	}
	        	valuserfrom();
	        	layer.close(index);
	        }
		});
	}else{
		$("#main-info").show();
		$("#zhiping").show();
	//获取基本信息
	$.ajax({
        url:'../../CareerInfoController/selectObjById.json',
        data:{},
        type:"post",
        dataType:"json",
        success:function(data){
        	call_back(data);
        	verification();	
        	if(1==personflag){
        		$("#personId").val(data.data.map.occupation);
        		$("#personPropId").val(personflag);
        		$.ajax({
                        type : "POST",
                        url : "../../CareerInfoController/selectPersonAffiliated.json",
                        dataType : "json",
                        data : {
                            'modelId' : data.data.map.occupation,
                            'pId' : '-1'
                        },
                        success : function (data2) {
                            var str5 = "";
                            $.each(data2.data.list,function(key,val) {
                                $.ajax({
                                    type : "POST",
                                    url : "../../CareerInfoController/selectPersonAffiliated.json",
                                    dataType : "json",
                                    data : {
                                        'modelId' : data.data.map.occupation,
                                        'pId' : val.id
                                    },
                                    success : function (data1) {
                                        layer.close(index);
                                        str5 = str5 +'<div class="row">'
													+'		<div class="form-group">'
													+'			<div class="col-sm-4 text-right">'
													+'				<label class="control-label">' + val.attribute_name + '</label>'
													+'			</div>';
                                        if (val.input_control == 1) {
                                            str5 = str5 + '<div class="col-sm-8">';
                                            $.each(data1.data.list,function(key1,val1) {
                                            	if (val1.id == val.attributeValues) {
                                                	str5 = str5 + '<label class="am-radio-inline"><input type="radio" class="required" id="radioList' + val.id + '" name="radioList' + val.id + '" value="' + val1.id + '" data-am-ucheck checked>' + val1.attribute_values + '</label>';
                                            	} else {
                                            		str5 = str5 + '<label class="am-radio-inline"><input type="radio" class="required" id="radioList' + val.id + '" name="radioList' + val.id + '" value="' + val1.id + '" data-am-ucheck>' + val1.attribute_values + '</label>';
                                            	}
                                            });
                                            str5 = str5 + '</div>';
                                        } else if (val.input_control == 2) {
                                            str5 = str5 + '<div class="col-sm-8">';
                                            $.each(data1.data.list,function(key1,val1) {
                                            	if (val.attributeValues.indexOf(val1.id) >= 0) {
                                                	str5 = str5 + '<label class="am-checkbox-inline"><input type="checkbox" class="required" id="checkboxList' + val.id + '" name="checkboxList' + val.id + '"value="' + val1.id + '" checked>' + val1.attribute_values + '</label>';
                                            	} else {
                                            		str5 = str5 + '<label class="am-checkbox-inline"><input type="checkbox" class="required" id="checkboxList' + val.id + '" name="checkboxList' + val.id + '"value="' + val1.id + '">' + val1.attribute_values + '</label>';
                                            	}
                                            });
                                            str5 = str5 + '</div>';
                                        } else if (val.input_control == 3) {
                                            str5 = str5 + '<div class="col-sm-4"><input type="text" class="form-control required" id="textList' + val.id + '" name="textList' + val.id + '" value="' + isUndefined(val.attributeValues,"String") + '"></div>';
                                        } else if (val.input_control == 4) {
                                            str5 = str5 + '<div class="col-sm-4"><select class="form-control required" id="selectList' + val.id + '" name="selectList' + val.id + '">';
                                            $.each(data1.data.list,function(key1,val1) {
                                            	if (val1.id == val.attributeValues) {
                                                	str5 = str5 + '<option value="' + val1.id + '" selected>' + val1.attribute_values + '</option>';
                                            	} else {
                                                	str5 = str5 + '<option value="' + val1.id + '">' + val1.attribute_values + '</option>';
                                            	}
                                            });
                                            str5 = str5 + '</select></div>';
                                        }
                                        str5 = str5 +'			</div>'
												  +'		</div>'
												  +'	</div>';
                                        $("#job").children().remove();
                                        $("#job").append(str5);
                                    },
                                    error : function () {
                                        layer.close(index);
                                        lrError("添加失败！服务器错误！");
                                    }
                                });
                            });
                            
                            $(".main .main-floor").eq(2).fadeIn().siblings().fadeOut();
                            $(".step_tit h5").eq(2).addClass("tit_bg").siblings().removeClass("tit_bg");
                            $(".step_tit h5").eq(1).css("background","#F7F7F7");
                        },
                        error : function () {
                            layer.close(index);
                            lrError("添加失败！服务器错误！");
                        }
                    });
        		$("#btn_add2").show();
        	}
        	var str6 = $('<table class="table infor-table">'
					+'			<tr>'
					+'				<th class="text-center">用户昵称</th>'
					+'				<td><input class="form-control" id="nickname" name="nickname" value="'+isUndefined(data.data.obj.nickname,"String")+'"></td>'
					+'			</tr>'
					+'			<tr id="xia">'
					+'				<th class="text-center">旧密码</th>'
					+'				<td ><input type="password" class="form-control" id="pwdtext" name="pwdtext" value=""></td>'
					+'			</tr>'
					+'			<tr id="newPwd">'
					+'				<th class="text-center">新密码</th>'
					+'				<td><input type="password" class="form-control" id="confirm_password" name="confirm_password" value=""></td>'
					+'			</tr>'
					+'			<tr id ="affirmPwd">'
					+'				<th class="text-center">确认密码</th>'
					+'				<td><input type="password" class="form-control" id="confirm_passwords" name="confirm_passwords" value=""></td>'
					+'			</tr>'
					+'		</table>');
        	$("#use").append(str6);
        	laydate({
        	    elem: '#birthday', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
        	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
        	});
        	valuserfrom();
        	getCodes('../../','sex_code','sex',data.data.map.sex);
        	getCodes('../../','nation','national',data.data.map.national);
        	getCodes('../../','education_background','education',data.data.map.education);
        	getCodes('../../','political_type','political_landscape',data.data.map.political_landscape);
        	getCodes('../../','fixed_size','clothingSize',data.data.map.clothingSize);
        	getCodes('../../','footwear_size','shoeSize',data.data.map.shoeSize);
        	var ue_body = UE.getEditor('update_body');
        	ue_body.ready(function() {//编辑器初始化完成再赋值  
        		ue_body.setContent(data.data.map.body); 
            }); 
        	layer.close(index);
        }
    });
	}
	
});

$('#btn_add1').click(function(){
	if(!$('#form-jiben').valid()){
		lrError("请输入必填项！");
		return;
	}
	var index=layer.load(0, {shade: false});
	$.ajax({
		   type: "POST",
		   url: "../../CareerInfoController/updateInfo.json",
		   dataType:"json",
		   data: $("#form-jiben").serialize(),
		   success: function(data){
				   layer.close(index);  
				   swal({
					   title:"修改成功",
					   text:"个人信息保存成功",
					   type:"success",
					   confirmButtonText:"确定"
				   },function(){
					   top.location.reload();//刷新最顶端窗口
				   });
		   },
		   error:function(){
			   layer.close(index);    
			   lrError("修改失败！服务器错误！");
		   }
	});	
});

$('#btn_add2').click(function(){
	var index=layer.load(0, {shade: false});
	$.ajax({
		   type: "POST",
		   url: "../../CareerInfoController/updateOccupation.json",
		   dataType:"json",
		   data: $("#form-occupation").serialize(),
		   success: function(data){
				   layer.close(index); 
				   swal({
					   title:"修改成功",
					   text:"个人信息保存成功",
					   type:"success",
					   confirmButtonText:"确定"
				   },function(){
					   top.location.reload();//刷新最顶端窗口
				   });
		   },
		   error:function(){
			   layer.close(index);    
			   lrError("修改失败！服务器错误！");
		   }
	});	
});
//账户信息修改
function cocklebur(){
	var index=layer.load(0, {shade: false});
	var confirm_password = $("#confirm_password").val();
	var confirm_passwords = $("#confirm_passwords").val();
	var pwdtext = $("#pwdtext").val();
	if(pwdtext =="" || pwdtext ==undefined || pwdtext ==null){
		if(confirm_password==undefined || confirm_password=="" || confirm_password==null){
			if(confirm_passwords==undefined || confirm_passwords=="" || confirm_passwords==null){
				submit_u();
			}else{
				$("#xia span").hide();
				$("#xia").append("<span class='ymm'>请输入旧密码</span>");
			}
		}else{
			$("#xia span").hide();
			$("#xia").append("<span class='ymm'>请输入旧密码</span>");
		}
	}else{
		$("#xia span").hide();
		if(confirm_password==undefined || confirm_password=="" || confirm_password==null){
			$("#newPwd").append("<span class='ymm'>请输入新密码</span>");
		}else if(confirm_passwords==undefined || confirm_passwords=="" || confirm_passwords==null){
			$("#newPwd span").hide();
			$("#affirmPwd span").hide();
			$("#affirmPwd").append("<span class='ymm'>请输入新密码</span>");
		}else if(confirm_password==confirm_passwords){
			$("#affirmPwd span").hide();
			submit_u();
		}else{
			$("#newPwd span").hide();
			$("#affirmPwd span").hide();
		}
	}
}

function valuserfrom(){
	$("#from-user-info").validate({
		 rules : {
		        pwdtext : {
		            required : true,
		            minlength : 5
		        },
		        confirm_password : {
		            required : true,
		            minlength : 5
		        },
		        confirm_passwords : {
		            required : true,
		            minlength : 5,
		            equalTo : "#confirm_password"
		        },
		     
		    },
		    messages : {
		        pwdtext : {
		            required : "<i class='fa fa-times-circle'></i>请输入密码",
		            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母"
		        },
		        confirm_password : {
		            required : "<i class='fa fa-times-circle'></i>请输入密码",
		            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母"
		        },
		        confirm_passwords : {
		            required : "<i class='fa fa-times-circle'></i>请输入密码",
		            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母",
		            equalTo : "<i class='fa fa-times-circle'></i>两次密码输入不一致"
		        }
		    } 
   	});
}

function call_back(data){
	var str1 = $('<div class="clearfix" >'
			+'			<img src="'+data.data.map.portrait+'" onclick="showPic(1);" id="add_pic"/>'
			+'			<input type="hidden" name="portrait" id="portrait">'
			+'		</div>');
    	var str2 = $('<div class="clearfix" >'
				+'			<img src="../../img/tx.png" onclick="showPic(1);" id="add_pic"/>'
				+'			<input type="hidden" name="portrait" id="portrait">'
				+'	  </div>');
    	if(data.data.map.portrait.indexOf("http") !=-1){
    		$("#toubu").append(str1);
    	}else{
    		$("#toubu").append(str2);
    	}
    	$('#portrait').val(data.data.map.portrait);
    	var str3 = $('<div class="clearfix" id="str3">'
				+'		<p style="margin-top: 5px; name="name"">'+data.data.map.name+'</p>'
				+'	  </div>');
    		$("#toubu").append(str3);
    	var str4 = '<div id="div">'
    			+'<table class="table infor-table" id="zhjtable">'
    			+'		<tr>'
    			+'		<th>性 别</th>'
    			+'			<td><select class="form-control required" name="sex" id="sex"></select></td>'
    			+'		<th>民族</th>'
    			+'		<td><select class="form-control" name="national" id="national"></select></td>'
    			+'	</tr>'
    			+'	<tr>'
    			+'		<th>身高(cm)</th>'
    			+'		<td><input class="form-control " name="height" value="'+isUndefined(data.data.map.height,"String")+'"></td>'
    			+'		<th>体重(kg)</th>'
    			+'		<td><input class="form-control " name="weight" value="'+isUndefined(data.data.map.weight,"String")+'"></td>'
    			+'	</tr>'
    			+'	<tr>'
    			+'		<th>衣服尺码</th>'
//    			+'		<td><input class="form-control " name="clothingSize" value="'+isUndefined(data.data.map.clothingSize,"String")+'"></td>'
    			+'		<td><select class="form-control " id="clothingSize" name="clothingSize"></select></td>'
    			+'		<th>鞋号</th>'
//    			+'		<td><input class="form-control " name="shoeSize" value="'+isUndefined(data.data.map.shoeSize,"String")+'"></td>'
    			+'		<td><select class="form-control " id="shoeSize" name="shoeSize"></select></td>'
    			+'	</tr>'
    			+'	<tr>'
    			+'		<th>身份证号</th>'
    			+'		<td><input type="text" class="form-control " id="idNumber" name="identity" value="'+isUndefined(data.data.map.identity,"String")+'""></td>'
    			+'		<th>出生日期</th>'
    			+'		<td ><input class="form-control " name="birthday" id="birthday" value="'+isUndefined(data.data.map.birthday,"String")+'"></td>'
    			+'	</tr>'
    			+'<tr>'
                +'      <th>学历</th>'
                +'      <td><select class="form-control" name="education" id="education"></td>'
                +'        <th>毕业学校</th>'
                +'      <td><div id="div_school">';
                if (data.data.map.education >= 5) {
                    str4 = str4 + '<input type="text" class="form-control" id="school" name="school" value="'+data.data.map.school+'"/>';
                } else {
        			str4 = str4 + '<input type="text" class="form-control " id="schoolName"'
    				+'				name="school" value="'+data.data.map.school+'" readonly>'
    				+'			<div id="proSchool" class="provinceSchool">'
    				+'				<div class="title">'
    				+'					<span>请选择学校</span>'
    				+'				</div>'
    				+'				<div class="proSelect">'
    				+'					<select></select> <span>如没找到选择项，请选择其他手动填写</span> <input'
    				+'						type="text" />'
    				+'				</div>'
    				+'				<div class="schoolList">'
    				+'					<ul></ul>'
    				+'				</div>'
    				+'			</div>'
                }
    			str4 = str4 + '	</div></td></tr>'
    			+'	<tr>'
    			+'		<th>政治面貌</th>'
    			+'		<td><select class="form-control" name="political_landscape" id="political_landscape"></select></td>'
    			+'		<th>联系电话</th>'
    			+'		<td><input type="text" class="form-control" required="required" name="phone" value="'+isUndefined(data.data.map.phone,"String")+'"></td>'
    			+'	</tr>'
				+'	<tr>'
				+'      <th>国籍</th>'
    			+'		<td><input class="form-control " type="text" name="nationality"  value='+isUndefined(data.data.map.nationality,"String")+'></td>'
    			+'		<th>所属地区</th>'
    			+'		<td id="addres"><input class="form-control " type="text" name="address" id="v" value='+isUndefined(data.data.map.address,"String")+'></td>'
    			+'	</tr>'
    			+'</table>'
    			+'</div>';
    		$("#zhj").append(str4);
    		city();//地区控件
    		var str4_1 = $('<hr data-am-widget="divider" style="" class="am-divider am-divider-default" />'
    				+'		<div class="form-group clearfix">'
    				+'			<label class="col-sm-2 control-label text-right" style="font-size:15px;">个人介绍</label>'
    				+'			<div class="col-sm-10">'
    				+'				<script id="update_body" name="body" type="text/plain"></script>'
    				+'			</div>'
    				+'		</div>');
    		$("#jibendiv").append(str4_1);
    		$("#btn_add2").hide();
}

function callback(data){
	var str =$('<div class="table-responsive col-xs-5" id="use" style="float:none;margin:0 auto;">'
			+'	</div>'
			+'	<div class="clearfix text-center">'
			+'		<a class="btn btn-primary" role="button" onclick="cocklebur();">保存修改</a>'
			+'	</div>');
	$("#zhanghu").append(str);
	$("#zhanghu").show();
   	var str1 = $('<div class="clearfix text-center" >'
			+'			<img id="add_pic" src="../../img/tx.png" onclick="showPic(1);" id="add_pic" style="width:auto;height:150px;"/>'
			+'			<input type="hidden" name="portrait" id="portrait">'
			+'		</div>');
   	$("#use").append(str1);
   	var str2 = $('<table class="table infor-table">'
			+'			<tr>'
			+'				<th class="text-center">用户昵称</th>'
			+'				<td><input class="form-control" id="nickname" name="nickname" value="'+isUndefined(data.data.obj.nickname,"String")+'"></td><td></td>'
			+'			</tr>'
			+'			<tr id="xia">'
			+'				<th class="text-center">旧密码</th>'
			+'				<td><input type="password" class="form-control" id="pwdtext" name="pwdtext" value=""></td><td></td>'
			+'			</tr>'
			+'			<tr id="newPwd">'
			+'				<th class="text-center">新密码</th>'
			+'				<td><input type="password" class="form-control" id="confirm_password" name="confirm_password" value="" ></td>'
			+'			</tr>'
			+'			<tr id ="affirmPwd">'
			+'				<th class="text-center">确认密码</th>'
			+'				<td><input type="password" class="form-control" id="confirm_passwords" name="confirm_passwords" value=""></td>'
			+'			</tr>'
			+'		</table>');
	$("#use").append(str2);
	
	$("#from-user-info").validate({
	    ignore: [],
	    rules : {
	        portrait : {
	            required : true
	        }
	    },
	    messages : {
	        portrait : {
	            required : "<i class='fa fa-times-circle'></i>请添加头像"
	        }
	    }
	});
}
//--------------------------------------------------输入身份证自动填入性别及生日--------------------------------------------------
function GetBirthdatByIdNo(iIdNo) {
    var tmpStr = "";
    var birthday = $("#birthday");
    var sex = $("#sex");
    iIdNo = $.trim(iIdNo);
    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(iIdNo.substring(14, 1), 10) % 2 ? "1" : "2";
        birthday.val("");
        birthday.val(tmpStr);
        sex.val("");
        sex.val(sexStr);
    } else {
        tmpStr = iIdNo.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(iIdNo.substring(17, 1), 10) % 2 ? "1" : "2";
        birthday.val("");
        birthday.val(tmpStr);
        sex.val("");
        sex.val(sexStr);
    }
}
function verification (){

	$("#idNumber").blur(function() {
	    GetBirthdatByIdNo($(this).val());
	});

    // 学校名称 激活状态
    $("#schoolName").focus(function() {
                var top = $(this).position().top + $(this).height() + 2;
                var left = $(this).position().left;
                $("div[class='provinceSchool']").css({
                            top : top,
                            left : left
                        });
                $("div[class='provinceSchool']").show("slow");
            });
    // 初始化省下拉框
    var provinceArray = "";
    var provicneSelectStr = "";
    for (var i = 0, len = province.length; i < len; i++) {
        provinceArray = province[i];
        provicneSelectStr = provicneSelectStr + "<option value='"
                + provinceArray[0] + "'>" + provinceArray[1]
                + "</option>"
    }
    $("div[class='proSelect'] select").html(provicneSelectStr);
    // 初始化学校列表
    var selectPro = $("div[class='proSelect'] select").val();
    var schoolUlStr = "";
    var schoolListStr = new String(proSchool[selectPro]);
    var schoolListArray = schoolListStr.split(",");
    var tempSchoolName = "";
    for (var i = 0, len = schoolListArray.length; i < len; i++) {
        tempSchoolName = schoolListArray[i];
        if (tempSchoolName.length > 13) {
            schoolUlStr = schoolUlStr
                    + "<li class='DoubleWidthLi' title="
                    + schoolListArray[i] + ">" + schoolListArray[i]
                    + "</li>"
        } else {
            schoolUlStr = schoolUlStr + "<li>" + schoolListArray[i]
                    + "</li>"
        }
    }
    $("div[class='schoolList'] ul").html(schoolUlStr);
    // 省切换事件
    $("div[class='proSelect'] select").change(function() {
        if ("99" != $(this).val()) {
            $("div[class='proSelect'] span").show();
            $("div[class='proSelect'] input").hide();
            schoolUlStr = "";
            schoolListStr = new String(proSchool[$(this).val()]);
            schoolListArray = schoolListStr.split(",");
            for (var i = 0, len = schoolListArray.length; i < len; i++) {
                tempSchoolName = schoolListArray[i];
                if (tempSchoolName.length > 13) {
                    schoolUlStr = schoolUlStr
                            + "<li class='DoubleWidthLi' title="
                            + schoolListArray[i] + ">"
                            + schoolListArray[i] + "</li>"
                } else {
                    schoolUlStr = schoolUlStr + "<li>"
                            + schoolListArray[i] + "</li>"
                }
            }
            $("div[class='schoolList'] ul").html(schoolUlStr);
        } else {
            $("div[class='schoolList'] ul")
                    .html(  "<span class='entertext'>请在输入框内手动输入学校！</span>");
            $("div[class='proSelect'] span").hide();
            $("div[class='proSelect'] input").show();
        }
    });
    // 学校列表mouseover事件
    $(document).on("mouseover", "div[class='schoolList'] ul li", function() {
                $(this).css("background-color", "#72B9D7");
            });
    // 学校列表mouseout事件
    $(document).on("mouseout", "div[class='schoolList'] ul li", function() {
                $(this).css("background-color", "");
            });
    // 学校列表点击事件
    $(document).on("click", "div[class='schoolList'] ul li", function() {
                $("#schoolName").val($(this).html());
                $("div[class='provinceSchool']").hide();
            });
    // 按钮点击事件
    $("#quxiao").click(function() {
        var flag = $(this).attr("flag");
        if ("0" == flag) {
            $("div[class='provinceSchool']").hide();
        } 
    });
    
//-------------------------------------------------信息验证--------------------------------------------------
    $("#form-jiben").validate({
       ignore: [],
       rules : {
           portrait : {
               required : true
           },
    	   identity : {
               required : true,
               isIdCardNo : true
           },
           phone : {
               required : true,
               isMobile : true
           },
           birthplace : {
               required : true
           }
       },
       messages : {
           portrait : {
               required : "<i class='fa fa-times-circle'></i>请添加头像"
           },
    	   identity : {
               required : "<i class='fa fa-times-circle'></i>请输入身份证号",
               isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
           },
           school : {
               required : "<i class='fa fa-times-circle'></i>请输入毕业学校"
           },
           phone : {
               required : "<i class='fa fa-times-circle'></i>请输入联系电话",
               isMobile : "<i class='fa fa-times-circle'></i>请输入正确的手机号码"
           }
       }
    });

    $("#education").change(function() {
        GetSchoolNameByEducation($(this).val());
    });
}

function GetSchoolNameByEducation(education) {
    if (education >= 5) {
        $("#div_school").children().remove();
        $("#div_school").append('<input type="text" class="form-control" id="school" name="school" placeholder="请选择毕业院校"/>');
    } else {
        $("#div_school").children().remove();
        $("#div_school").append('<input type="text" class="form-control " id="schoolName" name="school" placeholder="请选择毕业院校" readonly>'
                            +'<div id="proSchool" class="provinceSchool">'
                            +'   <div class="title">'
                            +'        <span>请选择学校</span>'
                            +'    </div>'
                            +'    <div class="proSelect">'
                            +'        <select></select> <!-- <span>如没找到选择项，请选择其他手动填写</span> --> <input type="text" />'
                            +'    </div>'
                            +'    <div class="schoolList">'
                            +'        <ul></ul>'
                            +'    </div>'
                            +'</div>');
     // 学校名称 激活状态
        $("#schoolName").focus(function() {
                    var top = $(this).position().top + $(this).height() + 2;
                    var left = $(this).position().left;
                    $("div[class='provinceSchool']").css({
                                top : top,
                                left : left
                            });
                    $("div[class='provinceSchool']").show("slow");
                });
        // 初始化省下拉框
        var provinceArray = "";
        var provicneSelectStr = "";
        for (var i = 0, len = province.length; i < len; i++) {
            provinceArray = province[i];
            provicneSelectStr = provicneSelectStr + "<option value='"
                    + provinceArray[0] + "'>" + provinceArray[1]
                    + "</option>"
        }
        $("div[class='proSelect'] select").html(provicneSelectStr);
        // 初始化学校列表
        var selectPro = $("div[class='proSelect'] select").val();
        var schoolUlStr = "";
        var schoolListStr = new String(proSchool[selectPro]);
        var schoolListArray = schoolListStr.split(",");
        var tempSchoolName = "";
        for (var i = 0, len = schoolListArray.length; i < len; i++) {
            tempSchoolName = schoolListArray[i];
            if (tempSchoolName.length > 13) {
                schoolUlStr = schoolUlStr
                        + "<li class='DoubleWidthLi' title="
                        + schoolListArray[i] + ">" + schoolListArray[i]
                        + "</li>"
            } else {
                schoolUlStr = schoolUlStr + "<li>" + schoolListArray[i]
                        + "</li>"
            }
        }
        $("div[class='schoolList'] ul").html(schoolUlStr);
        
     // 学校名称 激活状态
        $("#schoolName").focus(function() {
                    var top = $(this).position().top + $(this).height() + 2;
                    var left = $(this).position().left;
                    $("div[class='provinceSchool']").css({
                                top : top,
                                left : left
                            });
                    $("div[class='provinceSchool']").show("slow");
                });
        // 初始化省下拉框
        var provinceArray = "";
        var provicneSelectStr = "";
        for (var i = 0, len = province.length; i < len; i++) {
            provinceArray = province[i];
            provicneSelectStr = provicneSelectStr + "<option value='"
                    + provinceArray[0] + "'>" + provinceArray[1]
                    + "</option>"
        }
        $("div[class='proSelect'] select").html(provicneSelectStr);
        // 初始化学校列表
        var selectPro = $("div[class='proSelect'] select").val();
        var schoolUlStr = "";
        var schoolListStr = new String(proSchool[selectPro]);
        var schoolListArray = schoolListStr.split(",");
        var tempSchoolName = "";
        for (var i = 0, len = schoolListArray.length; i < len; i++) {
            tempSchoolName = schoolListArray[i];
            if (tempSchoolName.length > 13) {
                schoolUlStr = schoolUlStr
                        + "<li class='DoubleWidthLi' title="
                        + schoolListArray[i] + ">" + schoolListArray[i]
                        + "</li>"
            } else {
                schoolUlStr = schoolUlStr + "<li>" + schoolListArray[i]
                        + "</li>"
            }
        }
        $("div[class='schoolList'] ul").html(schoolUlStr);
        // 省切换事件
        $("div[class='proSelect'] select").change(function() {
            if ("99" != $(this).val()) {
                $("div[class='proSelect'] span").show();
                $("div[class='proSelect'] input").hide();
                schoolUlStr = "";
                schoolListStr = new String(proSchool[$(this).val()]);
                schoolListArray = schoolListStr.split(",");
                for (var i = 0, len = schoolListArray.length; i < len; i++) {
                    tempSchoolName = schoolListArray[i];
                    if (tempSchoolName.length > 13) {
                        schoolUlStr = schoolUlStr
                                + "<li class='DoubleWidthLi' title="
                                + schoolListArray[i] + ">"
                                + schoolListArray[i] + "</li>"
                    } else {
                        schoolUlStr = schoolUlStr + "<li>"
                                + schoolListArray[i] + "</li>"
                    }
                }
                $("div[class='schoolList'] ul").html(schoolUlStr);
            } else {
                $("div[class='schoolList'] ul")
                        .html(  "<span class='entertext'>请在输入框内手动输入学校！</span>");
                $("div[class='proSelect'] span").hide();
                $("div[class='proSelect'] input").show();
            }
        });
        // 学校列表mouseover事件
        $(document).on("mouseover", "div[class='schoolList'] ul li", function() {
                    $(this).css("background-color", "#72B9D7");
                });
        // 学校列表mouseout事件
        $(document).on("mouseout", "div[class='schoolList'] ul li", function() {
                    $(this).css("background-color", "");
                });
        // 学校列表点击事件
        $(document).on("click", "div[class='schoolList'] ul li", function() {
                    $("#schoolName").val($(this).html());
                    $("div[class='provinceSchool']").hide();
                });
        // 按钮点击事件
        $("#quxiao").click(function() {
            var flag = $(this).attr("flag");
            if ("0" == flag) {
                $("div[class='provinceSchool']").hide();
            } 
        });
    }
}

//------------------------------------------------------提交修改----------------------------------------------------------------------------------------
function submit_u(){
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		   type: "POST",
		   url: "../../CareerInfoController/updateUse.json",
		   dataType:"json",
		   data: $("#from-user-info").serialize(),
		   success: function(data){
				   if(0==data.status){
					  swal({
						   title:"修改失败",
						   text:data.msg,
						   type:"error",
						   confirmButtonText:"确定"
					  }); 
				   }else{
					   swal({
						   title:"修改成功",
						   text:"个人信息保存成功",
						   type:"success",
						   confirmButtonText:"确定"
					   },function(){
//						   if(1==data.data.map.pwdtext){
//							   window.location.href ='../../userAction/logout';
//							   top.location.reload();//刷新最顶端窗口 
//						   }else{
//							   top.location.reload();//刷新最顶端窗口 
//						   }
						   top.location.reload();//刷新最顶端窗口
					   });
				   }
				   layer.close(index);
				  
		   },
		   error:function(){
			   layer.close(index);
			   lrError("修改失败！服务器错误！");
		   }
	});	
}

function city(){
	 // 地区
	$("#addres").address({
		prov: "内蒙古",
		city: "呼和浩特市",
		district: "",
		scrollToCenter: true,
		footer: true,
		selectEnd: function(json) {
			console.log(JSON.stringify(json));
		}
	});
//   laydate({
//	    elem: '#teamBulidTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
//	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
//	});
}