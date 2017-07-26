//**********************************************************************主处理**************************************************************************************************************************************************
var racing_id =  $.session.get('Racing_Id');
var product_id = $.session.get('Product_Id');
var personFlag = $.session.get("personFlag");
var user_id = $.session.get('User_Id');
$(function(){
	var index = layer.load(0, {
		shade : false
	});
	$.session.remove('Racing_Id');
	$.session.remove('Product_Id');
	$.session.remove('User_Id');
	if(personFlag !="5" && personFlag =="3"){
		$('#AffirmApply').remove();
		$('#div_invt_refferee').append('<div id="btn_T_J"><button type="button" class="btn btn-primary" id="btn_consent">'
					+'<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;同意'
					+'</button>'
					+'<button type="button" class="btn btn-primary" id="btn_refuse">'
					+'<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;拒绝'
					+'</button></div>');
	}else if(personFlag == 5){
		$('#toolbar').append('<button type="button" class="btn btn-success" onclick="editCompetition();"><i class="am-icon-pencil-square-o"></i>&nbsp;修改赛事</button>');
		$('#div_invt_refferee').append('<button type="button" class="btn btn-primary" id="SeeApply">'
					+'<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;查看报名'
					+'</button>');
	}
	$("#racingId").val(racing_id);
	
//    $("#AffirmApply").removeClass("btn-primary").addClass('btn-default');
//	$("#AffirmApply").attr("disabled", true);
	//******************************************************************获取竞赛项目id**************************************************************************************************************************************************	
	//******************************************************************获取竞赛项目信息**************************************************************************************************************************************************	
	$.ajax({
		url:'../../ssRacingController/selectObjById.json',
		type:"post",
		data:{'id':racing_id},
		async:true,
		cache:false,
		success : function(data) {
			valuation(data['data']['obj']);
			var racingdata = new Array(); //定义一数组
			racingdata = data.data.obj.racingData.split(",");
			$("#racingData").val(data.data.obj.racingData);
			$("#racingData1").val(data.data.obj.racingData);
			//是否显示所有产品
			if(personFlag == "3"){
				getYspec(racing_id);
			}else if(personFlag == "5"){
				getSpec(racing_id,racingdata);
			}
			layer.close(index);
		},
		error : function() {
			lrError("服务器错误！");
			layer.close(index);
		}
	});
	isTable();
    isTable2();
});

//*************************************************************************给页面动态添加值**************************************************************************************************************************************************
function valuation(obj){
	$.session.set('Project_Id',obj.projectId);
	uid = obj.userId;
	var str = '<div>'
				+'<h2>'+obj.racingName+'</h2>'
//				+'<p>赛制：'+getCodeKey('../../','competition_system',obj.racingType)+'</p>'
				+'<p>比赛时间：<span style="color:#ff4a00;">'+isUndefined(obj.racingBeginTime,"String")+'</span>&nbsp;~&nbsp;<span style="color:#ff4a00;">'+isUndefined(obj.racingEndTime,"String")+'</span></p>'
				+'<p>报名截止时间：<span style="color:#ff4a00;">'+isUndefined(obj.cutOffDate,"String")+'</span></p>'
				+'<p>比赛地点：'+isUndefined(obj.competitionSite,"String")+'</p>'
//				+'<p>发布状态：'+getCodeKey('../../','issue_state',obj.issueState)+'</p>'
				+'<p>赛事状态：'+getCodeKey('../../','match_state',obj.matchState)+'</p>'
				+'<p>主办方：'+isUndefined(obj.sponsorName,"String")+'</p>'
	if (personFlag == "4" || personFlag == "5") {
	    str = str +'<p>主办方联系电话：'+isUndefined(obj.mainOrganizersPhoneNumber,"String")+'（<span style="color:#ff4a00;">仅球队管理者及主办方能看到</span>）</p>';
    }
	str = str +'<p>座机号码：'+isUndefined(obj.specialPlane,"String")+'</p>';
				+'<p>联系电话：'+isUndefined(obj.mainOrganizersPhoneNumber,"String")+'</p>'
				+'<div class="text-center">'
				+'</div>'		
	$('#top').append(str);
	//判断赛事是否结束
	var cutOffDateTime = new Date(obj.cutOffDate.replace("-", "/").replace("-", "/"));
	if(obj.matchState != "4" && cutOffDateTime > new Date()){
		$('#toolbar').append('<button type="button" id = "over_apply" class="btn btn-danger" onclick="overApply('+obj.id+');">结束报名</button>');
	}
	$('#infor').append(obj.racingIntroduce);
	//*************************************************************************遍历图片**************************************************************************************************************************************************
	var array = obj.racingPic.split("|");
	$.each(array,function(k,v){
		var str = '<div class="item">'
			      +'<img class="ssxct_pic" src='+v+'>'
			      +'</div>';
		$('#advertising').append(str);
		$('#advertising>div').eq(0).addClass("active");
	});
}
//*****************************************************************************获取邀请裁判的规格*******************************************************************
function getYspec(racing_id){
	 var index = layer.load(0, {
	        shade : false
	    });
	$('#specslist').children().remove();
	$.ajax({
		type: "post",
		 url : "../../ssRacingProductSignController/queryRerereeState.json",
	    datatype : "json",
	        data : {
	            'racingId' : racing_id,
	        },
		async: false,  
		success: function(json){
			$.each(json.data.list,function(k,v){
				$("#specslist").append('<label data-Anna class="btn btn-info btn-outline"><input type="checkbox" autocomplete="off" name="Anna" value='+v.productId+'>'+v.productName+'</label>');
			});
			layer.close(index);
		}
	}); 
	if($("#specslist>label").length<1){
		$('#btn_T_J').hide();
		 window.history.go(-1);
	}
}

//*****************************************************************************获取CheckBox选中值*******************************************************************************

//***************************************************************************获取规格列表**************************************************************************
function getSpec(racing_id,racingdata){
	 var index = layer.load(0, {
	        shade : false
	    });
	// 获取竞赛规格信息
	$.ajax({
		url : '../../ssCompetitionApply/findSpecsMessage.json',
		type : 'POST',
		dataType : 'JSON',
		data : {racingId : racing_id},
		success : function(data2) {
			var Str = "";
			if (data2.data.obj != undefined) {
				$("#specslist").children().remove();
				var jsonObj = JSON.parse(data2.data.obj.specData);
				$.each(racingdata, function(index, value) {
					var datas = jsonObj['' + value + ''];
					Str = Str
						+'<div class="form-group" style="margin-top: 15px;">'
						+'<label class="label_xq pull-left control-label">' + datas.specName + '</label>'
						+'<div class="col-sm-8">'
						+'	<div class="Prefer">'
						+'		<!-- 首选项 -->'
						+'		<div class="btn-group" data-toggle="buttons" id="Prefer">';
					$.each(datas.selData, function(index, value) {
						if (index == datas.selData.length-1) {
							Str = Str + '<label class="btn btn-info btn-outline" id="' + value.selData + '" onchange="specs_product(this)"><input type="radio" required name="radioList'+datas.specId+'" id="radioList" autocomplete="off" value="' + value.selData + '" >' + value.selData + '</label><label for="radioList'+datas.specId+'" class="error"></label>';
						} else {
							Str = Str + '<label class="btn btn-info btn-outline" id="' + value.selData + '" onchange="specs_product(this)"><input type="radio" required name="radioList'+datas.specId+'" id="radioList" autocomplete="off" value="' + value.selData + '" >' + value.selData + '</label>';
						}
					});
					Str = Str
						+'		</div>'
						+'	</div>'
						+'</div>'
						+'</div>';
				});
			}
			$("#specslist").append(Str);
			layer.close(index);
		}
	});
}

//**********************************************************************邀请裁判按钮*******************************************************************************

$("#AffirmApply").click(function() {
	if (!$('#form-horizontal').valid()) {
        lrError("请输入必填项！");
        return;
    }
	$("#fcyList").children().remove();
    var index = layer.load(0, {
        shade : false
    });
    $("#AffirmApply").removeClass("btn-primary").addClass('btn-default');
	$("#AffirmApply").children().attr("disabled", true);
	var index = layer.load(0, {
        shade : false
    });
    $.ajax({
    	url : '../../ssCompetitionApply/affirmApply_s.json',
		type : 'POST',
		dataType : 'JSON',
		data : $("#form-horizontal").serialize(),
		success : function(data) {
			$("#teamNameStr").val("");
        	layer.close(index);
        	var index_main = layer.open({
			    type : 1,
			    title : '邀请裁判',
			    shadeClose : true,
			    shade : false,
			    maxmin : true, // 开启最大化最小化按钮
			    area : [ '95%', '95%' ],
			    content : $('#div_pick_players'),
			    end : function() { // 此处用于演示
			        // swal("添加成功!", "信息保存成功", "success");
			    }
			});
			
			$('#btn_close').click(function() {
			    layer.close(index_main);
			});
		},
		error : function() {
			layer.close(index);
        	lrError("邀请失败！服务器错误！");
		}
    });
    var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		type : "POST",
		url : "../../refereeController/hostselectListAllReferee.json",
		dataType : 'JSON',
		data : $("#form-horizontal").serialize(),
		success : function(data) {
			var Str = "";
			$.each(data.data.list, function(index, value) {
				Str = Str
					+'<li class="clearfix">'
 				    +'<label class="am-checkbox an_span">'
					+'    <input type="checkbox" name="person" value="' + value.id + '" data-am-ucheck required>'
					+'   <img class="am-circle am-img-thumbnail am-inline-block" src="' + value.referee_pic + '">'
					+'    <span class="am-inline-block xz_player">' + value.referee_name + '</br><span class="am-badge am-badge-secondary am-round" id="span_' + value.id + '" onclick="personNumber(this, \'' + value.id + '\')"></span><div id="div_' + value.id + '" style="display: none;"><input type="number" name="number_' + value.id + '" min="0" value="' + value.idNoNum + '" onblur="addPersonNumber(this, \'' + value.id + '\')" /></div></span>'
					+'    <button type="button" data-reId=' + value.id + ' class="am-btn am-btn-success am-radius am-fr am-btn-xs an_add addCy_single" style="display:block !important;">添加</button>'
					+'<button type="button" data-reff='+value.id+' class="am-btn am-btn-danger am-radius am-fr am-btn-xs an_add an_del" style="display:none;">取消</button>'
				    +'</label>'
				  	+'</li>';
			});
			$("#cyList").children().remove();
			$("#cyList").append(Str);
			$('input[type="checkbox"], input[type="radio"]').uCheck();
			a();
			layer.close(index);
		},
		error : function() {
			lrError("添加失败！服务器错误！");
		}
	});
});

$(document).on('click','#SeeApply', function(){
    $.session.set("Racing_Id", racing_id);
    
    var index_main = layer.open({
        type : 2,
        title : '查看报名',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : 'approving_apply.html',
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
        }
    });
    
    $('#btn_close').click(function() {
        layer.close(index_main);
    });
});

//*******************************************************************产品点击事件******************************************************8
function specs_product(row) {
	var racingdata = new Array(); //定义一数组
	racingdata = $("#racingData").val().split(",");
	if (row != undefined) {
		$("#checkedId").val(row.id);
	}
	var index = layer.load(0, {
        shade : false
    });
	// 获取竞赛规格信息
	$.ajax({
		url : '../../ssRacingProductSignController/competitionProduct.json',
		type : 'POST',
		dataType : 'JSON',
		data : $("#form-horizontal").serialize(),
		success : function(data) {
//			if(data.data.map.applyFlag == 1) {
//				$("#AffirmApply").removeClass("btn-primary").addClass('btn-default');
//				$("#AffirmApply").attr("disabled", true);
//			} else {
//				$("#AffirmApply").removeClass("btn-default").addClass('btn-primary');
//				$("#AffirmApply").attr("disabled", false);
//			}
			$("#specslist").children().remove();
			var Str = "";
			var typeStr = "";
			$.each(data.data.list, function(index1, value1) {
				if (typeStr.indexOf(value1.specName) == -1) {
					if (typeStr == "") {
						typeStr = value1.specName;
					} else {
						typeStr = typeStr + "," + value1.specName;
					}
					Str = Str
						+'<div class="form-group" style="margin-top: 15px;">'
						+'<label class="label_xq pull-left control-label">' + value1.specName + '</label>'
						+'<div class="col-sm-8">'
						+'	<div class="Prefer">'
						+'		<!-- 首选项 -->'
						+'		<div class="btn-group" data-toggle="buttons" id="Prefer">';
					$.each(data.data.list, function(index2, value2) {
						if (value1.specId == value2.specId) {
							if (value2.radioFlag == 1) {
								Str = Str + '<label class="btn btn-default btn-outline active" id="' + value2.selData + '" disabled="disabled"><input type="radio" required name="radioList'+value2.specId+'" id="radioList" autocomplete="off" value="' + value2.selData + '" disabled="disabled">' + value2.selData + '</label>';
							} else {
								if (value2.clickFlag == 1) {
									Str = Str + '<label class="btn btn-info btn-outline active" id="' + value2.selData + '" onchange="specs_product(this)"><input type="radio" required name="radioList'+value2.specId+'" id="radioList" autocomplete="off" value="' + value2.selData + '" checked>' + value2.selData + '</label>';
								} else {
									Str = Str + '<label class="btn btn-info btn-outline" id="' + value2.selData + '" onchange="specs_product(this)"><input type="radio" required name="radioList'+value2.specId+'" id="radioList" autocomplete="off" value="' + value2.selData + '">' + value2.selData + '</label>';
								}
							}
							if (index2 == data.data.list.length-1) {
								Str = Str + '<label for="radioList'+value2.specId+'" class="error"></label>';
							}
						}
					});
					Str = Str
						+'		</div>'
						+'	</div>'
						+'</div>'
						+'</div>';
				}
			});
			$("#specslist").append(Str);
			layer.close(index);
		},
		error : function(data) {
			window.location.href="../../userAction/logout";
		}
	});
	var index = layer.load(0, {
        shade : false
    });

	
}

//********************************************************************************确认人员按钮****************************************************************************************
$("#btn_addTeamPerson").click(function() {
	var teamNameStr = $("#teamNameStr").val();
	$("#racingId").val(racing_id);
	if (teamNameStr != "" && teamNameStr != undefined) {
		var index = layer.load(0, {
	        shade : false
	    });
	    
	    $.ajax({
	    	url : '../../refereeController/inviteReferee.json',
			type : 'POST',
			dataType : 'JSON',
			data : $("#form-person").serialize(),
			success : function(data) {
	        	if (data.status == 1) {
	        		layer.close(index);
	        		swal({
	        			title : "邀请成功!",
	        			text : data.msg,
	        			type : "success",
	        			confirmButtonText : "确定"
	        		});
	        		layer.closeAll('page');
	        	} else {
	        		layer.close(index);
	        		swal({
	        			title : "邀请失败!",
	        			text : data.msg,
	        			type : "error",
	        			confirmButtonText : "确定"
	        		});
	        		layer.closeAll('page');
	        	}
			},
			error : function() {
				layer.close(index);
	        	lrError("邀请失败！服务器错误！");
			}
	    });
	}
});
///********************************************************给同意按钮绑定未来单击事件*************************************************
$(document).on('click','#btn_consent', function(){
	$('input[name="Anna"]:checked').each(function() {
        	realize("1",$(this).val());
        	$(this).parent().remove();
	});
});

///********************************************************给拒绝按钮绑定未来单击事件*************************************************
$(document).on('click','#btn_refuse', function(){
	$('input[name="Anna"]:checked').each(function() {
    	realize("2",$(this).val());
    	$(this).parent().remove();
});
});


//********************************************************8**反馈实现*******************************************************************
function realize(state,product_id){
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
    	url : '../../ssRacingProductSignController/fan_referee.json',
		type : 'POST',
		dataType : 'JSON',
		data :{
			racingId:racing_id,
			productId:product_id,
			userId:user_id,
			state:state
			},
		success : function(data) {
        	if (data.status == 1) {
        		layer.close(index);
        		swal({
        			title : "反馈成功!",
        			text : data.msg,
        			type : "success",
        			confirmButtonText : "确定"
        		},function(){
        			layer.closeAll('page');
            		//getYspec(racing_id);
            		window.location.href='../../web/referee/referee_homepage_new.html';
        		});
        		
        	} else {
        		layer.close(index);
        		swal({
        			title : "反馈失败!",
        			text : data.msg,
        			type : "error",
        			confirmButtonText : "确定"
        		});
        		layer.closeAll('page');
        	}
		},
		error : function() {
			layer.close(index);
        	lrError("反馈失败！服务器错误！");
		}
    });
}
////**********************************************************************************已参赛裁判************************************************************************************
//function isTable(){
//    $.ajax({
//    	url : '../../ssRacingProductController/findProductByUser.json',
//		type : 'POST',
//		dataType : 'JSON',
//		data :{racingId:racing_id},
//		success : function(data) {
//			$.each(data.data.list,function(k,v){
//				var str = '<tr ><td>'+v.productName+'</td><td>'+isUndefined(queryRefereeName(v.id),"String")+'</td></tr>';
//				$('#tbody').append(str);
//			});
//		},
//		error : function() {
//			layer.close(index);
//        	lrError("服务器错误！");
//		}
//    });
//}
//
////*******************************************************************************获取裁判姓名***********************************************************************************************
//function queryRefereeName(product_id){
//			var jsonObject;
//			$.ajax({
//				type: "POST",
//				 url : "../../ssRacingProductSignController/queryreferee.json",
//			    dataType : "json",
//			        data : {
//			        	'racingId':racing_id,
//			            'productId' : product_id,
//			        },
//				async: false,  
//				success: function(json)
//				{
//					jsonObject= json.data.map.refereeName;
//				}
//			}); 
//			return jsonObject;
//}


function a(){

    $(":checkbox").click(function(){
        checkBgColor();
    });
    // 单次添加成员
    var Str = "";
     $(".addCy_single").click(function(){ 
 	        if ($("#teamNameStr").val() == "") {
 	            Str =$(this).attr("data-reId");
 	        } else {
 	            Str = $("#teamNameStr").val() + "," + $(this).attr("data-reId");
 	        }
 	        $("#teamNameStr").val(Str);
 	        $(this).parent().parent().appendTo($("#fcyList"));
 	        $(this).parents().find(":checkbox").attr("checked", false);
 	        
 	        $("#fcyList li .an_del").show();
 	        $("#fcyList li .addCy_single").hide();
 	            checkBgColor();
     }); 
    // 批量添加成员
    $("#addCy").click(function(){
        var fcy = $("#cyList :checkbox:checked");
        var spCodesTemp = "";
        fcy.each(function(i) {
			if(0==i){
				spCodesTemp = $(this).val();
			}else{
				spCodesTemp += (","+$(this).val());
			}
		});
        var Str = "";
        if ($("#teamNameStr").val() == "") {
            Str = spCodesTemp;
        } else {
            Str = $("#teamNameStr").val();
            Str = Str + "," + spCodesTemp;
        }

        $("#teamNameStr").val(Str);
        
        if(fcy.length){
            fcy.attr("checked", false).parent().parent().appendTo($("#fcyList"));
            $("#fcyList li .an_del").show();
            $("#fcyList li .addCy_single").hide();
            checkBgColor();
        }
    });
    // 单次移除成员
    $(".an_del").click(function(){
    	Str ="";
    	$(this).parent().parent().appendTo($("#cyList"));
        $(this).parents().find(":checkbox").attr("checked", false);
        var teamNameStr = $("#teamNameStr").val();
        if(teamNameStr != ""){
        	//定义一个数组
        	var array = teamNameStr.split(",");
        	array.splice($.inArray(""+$(this).attr("data-reff")+"",array),1);//根据值删除数组中的元素
        	var str = "";
        	for(var i=0;i<array.length;i++){
        		str = str + array[i] + ",";
        	}
        	str = str.substring(0, str.lastIndexOf(","))
        	$("#teamNameStr").val(str);
        }
        $("#cyList li .an_del").hide();
        $("#cyList li .addCy_single").show();
            checkBgColor();
    });
    // 批量移除成员
    $("#delCy").click(function(){
        var cy = $("#fcyList :checkbox:checked");
        if(cy.length){
            cy.attr("checked", false).parent().parent().appendTo($("#cyList"));
            $("#cyList li .an_del").hide();
            $("#cyList li .addCy_single").show();
            checkBgColor();
        }
    });
    // 全选
    $("#checkAllChk").click(function(){
        $(this).parents(".cyList").find(":checkbox").attr("checked", true);
        checkBgColor();
    });
    // 反选
    $("#reverseChk").click(function(){
        $(this).parents(".cyList").find(":checkbox").each(function(){
            $(this).attr("checked", !$(this).attr("checked"));
            checkBgColor();
        })
    });
    checkBgColor();
/* 点击显示高亮 */
function checkBgColor(){
/*   $(":checkbox").parent().css("background-color", "");
   $(":checkbox:checked").parent().css("background-color", "#f9b87e"); */
}

}



function editCompetition() {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../ssRacingController/findRacingById.json",
        data:{
            id:racing_id
        },
        dataType : "json",
        success : function(data) {
            layer.close(index);
            bindForm('from_ss_racing', data.data.obj);
            
            var index_main = layer.open({
                type : 1,
                title : '竞赛项目修改',
                shadeClose : true,
                shade : false,
                maxmin : true, // 开启最大化最小化按钮
                area : [ '100%', '100%' ],
                content : $('#div_editCompetition'),
                end : function () { // 此处用于演示
                    // swal("添加成功!", "信息保存成功", "success");
                    // $('#table').bootstrapTable('refresh');
                }
            });

            $('#btn_close').click(function () {
                layer.close(index_main);
            });
            
            $('#btn_add').click(function() {
                if (!$('#from_ss_racing').valid()) {
                    lrError("请输入必填项！");
                    return;
                }
                var index = layer.load(0, {
                    shade : false
                });
                $.ajax({
                    type : "POST",
                    url : "../../ssRacingController/update.json",
                    dataType : "json",
                    data : $("#from_ss_racing").serialize(),
                    success : function(data) {
                        layer.closeAll('page');
                        layer.close(index);
                        swal({// 弹出提示框提示用户是否确认删除
                            title : "修改成功",
                            text : "信息修改成功",
                            type : "success",
                            confirmButtonText : "确定",
                        }, function(isConfirm) {
                            $.session.set('Racing_Id', racing_id);
                            $.session.set('Product_Id', product_id);
                            $.session.set("personFlag", personFlag);
                            $.session.set('User_Id', user_id);
                            window.location.href = "front_project_details.html";
                        });
                    },
                    error : function() {
                        layer.close(index);
                        lrError("添加失败！服务器错误！");
                    }
                });
            });
            
            var ue = UE.getEditor('racingIntroduce');
            ue.ready(function() {
                ue.setContent(data.data.obj.racingIntroduce, true);
            });

            //****************************************************************上传文件初始化**********************************************************************************
            $('#file_racing').fileinput({
                  language: 'zh', // 设置语言
                  uploadUrl: '../../common/upload/up.json', // 上传的地址
                  uploadAsync: true,
                  allowedFileExtensions : ['jpg', 'png','gif'],// 接收的文件后缀
                  showUpload: true, // 是否显示上传按钮
                  showRemove: true,//是否显示删除按钮
                  enctype: 'multipart/form-data',
                  showCaption: true,
                  showCaption: false,// 是否显示标题
                  validateInitialCount:true,
                  browseClass: "btn btn-primary", // 按钮样式
                  removeClass: "btn btn-danger",
                  uploadClass: "btn btn-info",
                  maxFilesNum : 8,//上传最大的文件数量
                  previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
                  
                 
              }).on("fileuploaded", function(event, data) {
                  if(data.response)
                  {
                      var tmpUrl=$('#hidRacingPic').val();
                      if(""==tmpUrl){
                          $('#hidRacingPic').val(data.response.data.list[0].uri);
                      }else{
                          $('#hidRacingPic').val(tmpUrl+"|"+data.response.data.list[0].uri);
                      }
                    //  alert('处理成功'+data.response.data.list[0].uri);
                      
                  }
              });
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}



//**********************************************************************************下方产品列表（球队）************************************************************************************
function isTable(){
	var index = layer.load(0, {
		shade : false
	});
    $.ajax({
        url : '../../ssRacingProductController/findProductByUser.json',
        type : 'POST',
        dataType : 'JSON',
        data :{racingId:racing_id},
        success : function(data) {
            $.each(data.data.list,function(k,v){
                var s = '<div role="tabpanel" class="tab-pane" id="Pro'+v.id+'"><ul  class="list-inline clearfix teams-list"></ul></div>';
                var str = '<li><a class="am-btn am-btn-sm am-btn-default" href="#Pro'+v.id+'" role="tab" data-toggle="tab">'+v.productName+'</a></li>';
                $('#isDetails').append(s);
                $('#productUl').append(str);
                queryTeam(v.id,racing_id);
            });
            $('#productUl li').eq(1).addClass("active");
            $('#isDetails div').eq(0).addClass("active");
            layer.close(index);
        },
        error : function() {
        	 layer.close(index);
            lrError("服务器错误！");
        }
    });
}


//**********************************************************************************下方产品列表************************************************************************************
function isTable2(){
	var index = layer.load(0, {
		shade : false
	});
    $.ajax({
        url : '../../ssRacingProductController/findProductByUser.json',
        type : 'POST',
        dataType : 'JSON',
        data :{racingId:racing_id},
        success : function(data) {
            $.each(data.data.list,function(k,v){
                var s = '<div role="tabpanel" class="tab-pane" id="Aro'+v.id+'"></div>';
                var str = '<li><a class="am-btn am-btn-sm am-btn-default" href="#Aro'+v.id+'" role="tab" data-toggle="tab">'+v.productName+'</a></li>';
                $('#isDetails2').append(s);
                $('#productUl2').append(str);
                queryRefereeName(v.id);
            });
            $('#productUl2 li').eq(1).addClass("active");
            $('#isDetails2 div').eq(0).addClass("active");
            layer.close(index);
        },
        error : function() {
        	 layer.close(index);
            lrError("服务器错误！");
        }
    });
}

//**********************************************************************************获取已报名的球队************************************************************************************************
function queryTeam(product_id){
	var index = layer.load(0, {
		shade : false
	});
     $.ajax({
            url : '../../ssRacingProductSignController/queryteam.json',
            type : 'POST',
            dataType : 'JSON',
            data :{productId:product_id},
            success : function(data) {
                noMessages(data.data.list,'Pro'+product_id,"--此项目目前还没有队伍报名");
                $.each(data.data.list,function(k,v){
                    var str ='<li class="col-md-4 col-sm-6 col-xs-12">'
                            +'      <div class="team clearfix">'
                            +'          <img src='+v.team_pic+' />'
                            +'              <div class="hover-tit">'
                            +'              <p>'+v.team_name+'</p>'
                            +'              <div class="text-center">'
                            +'              <a class="btn cherk1 join_cherk" onclick="temdetails('+v.team_id+','+product_id+','+racing_id+')">查看详情</a>'
                            +'          </div>'
                            +'      </div>'
                            +'  </div>'
                            +'</li>';
                    $("#Pro"+product_id+" ul").append(str);
                });
                layer.close(index);
            },
            error : function() {
            	 layer.close(index);
                lrError("服务器错误！");
            }
        });
}


//*******************************************************************************获取裁判***********************************************************************************************
function queryRefereeName(product_id){
	var index = layer.load(0, {
		shade : false
	});
     $.ajax({
            url : '../../ssRacingProductSignController/queryrefereeList.json',
            type : 'POST',
            dataType : 'JSON',
            data :{productId:product_id},
            success : function(data) {
                noMessages(data.data.list,'Aro'+product_id,"--此项目目前还没有裁判");
                $.each(data.data.list,function(k,v){
                    var str = '<div class="am-u-sm-3 text-center pull-left" onclick="refdetails('+v.referee_id+','+product_id+','+racing_id+')">'
                            +'      <a href="javascript:;" class="clearfix">'
                            +'          <img class="am-img-thumbnail Pro_team am-circle" src='+v.referee_pic+' alt=""/>'
                            +'          <h3 class="am-thumbnail-caption Pro_teamname">'+v.referee_name+'</h3>'
                            +'      </a>'
                            +'  </div>';
                    $('#Aro'+product_id).append(str);
                });
                layer.close(index);
            },
            error : function() {
            	 layer.close(index);
                lrError("服务器错误！");
            }
        });
}

//********************************************************************************裁判详情**********************************************************************************
function refdetails(id,product_id,racing_id){
    $.cookie("referee_id",id,{expires: 7,path: '/'});
    //当前产品Id
    $.session.set("Product_Id",product_id);
    //当前赛事Id
    $.session.set("Racing_Id",racing_id);
    layer.open({
        type : 2,
        title : '裁判详情',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '90%', '90%' ],
        content : '../../web/referee/referee-infor.html',
        end : function() { // 此处用于演示
        }
    });
}

//********************************************************************************球队详情**********************************************************************************
function temdetails(team_id,product_id,racing_id){
    //当前产品Id
    $.session.set("ProductId",product_id);
    //当前赛事Id
    $.session.set("RacingId",racing_id);
    //当前球队ID
    $.session.set("Team_Id",team_id);
    layer.open({
        type : 2,
        title : '球队详情',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '90%', '90%' ],
        content : '../../web/team/join_team_info.html',
        end : function() { // 此处用于演示
        }
    });
}

//****************************************************************************手动结束报名**************************************************************************************
function overApply(racing_id){
	swal({
		   title:"您确定要手动截止报名吗？",
		   type:"warning",
		   showCancelButton : true,
		   confirmButtonColor : "#DD6B55",
		   confirmButtonText : "确定",
		   cancelButtonText : "取消",
		   closeOnConfirm : false,
		   closeOnCancel : true
	   },function(isConfirm){
		   if(isConfirm){
				var index = layer.load(0, { shade : false });
				 $.ajax({
			         url : '../../ssRacingController/overApply.json',
			         type : 'POST',
			         dataType : 'JSON',
			         data :{id:racing_id},
			         success : function(data) {
			        	 $('#over_apply').hide();
			        	 if(data.status == 1){
			        		 swal({
			          			title :data.msg,
			          			type : "success",
			          			confirmButtonText : "确定"
			          		});
			        	 }else{
			        		 swal({
			          			title :data.msg,
			          			type : "error",
			          			confirmButtonText : "确定"
			          		});
			        	 }
			        	 
			             layer.close(index);
			         },
			         error : function() {
			         	 layer.close(index);
			             lrError("服务器错误！");
			         }
			     });
		   }
	   });
}

