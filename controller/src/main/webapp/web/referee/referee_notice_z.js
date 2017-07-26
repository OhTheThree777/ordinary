var issueState;
var racingId;
var productId;
var productName;
var ue;
$(function(){
	racingId =$.session.get("Racing_Id");
	productId =$.session.get("ProductId");
	ue = UE.getEditor('info');
	addnotice();// 添加
	update()//修改
	//********************************************************************查询当前裁判执裁的赛事**********************************************************************
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		url:'../../refereeNoticeController/ssNotice.json',
		type:"post",
		data:{
			'racingId' : racingId,
			'productId' : productId
		},
		success : function(data) {
			racingId = data.data.obj.id;
			productId = data.data.map.productId;
			productName = data.data.map.productName;
			valuation(data['data']['obj']);
			layer.close(index);
		},
		error : function() {
			lrError("服务器错误！");
			layer.close(index);
		}
	});
});


//*************************************************************************给页面动态添加值**************************************************************************************************************************************************
function valuation(obj){
	var str = '<div>'
				+'<h2>'+obj.racingName+'</h2>'
//				+'<p>赛制：'+getCodeKey('../../','competition_system',obj.racingType)+'</p>'
				+'<p>比赛时间：<span style="color:#ff4a00;">'+isUndefined(obj.racingBeginTime,"String")+'</span>&nbsp;~&nbsp;<span style="color:#ff4a00;">'+isUndefined(obj.racingEndTime,"String")+'</span></p>'
				+'<p>报名截止时间：<span style="color:#ff4a00;">'+isUndefined(obj.cutOffDate,"String")+'</span></p>'
				+'<p>比赛地点：'+isUndefined(obj.competitionSite,"String")+'</p>'
//				+'<p>发布状态：'+getCodeKey('../../','issue_state',obj.issueState)+'</p>'
				+'<p>赛事状态：'+getCodeKey('../../','match_state',obj.matchState)+'</p>'
				+'<p>主办方：'+isUndefined(obj.sponsorName,"String")+'</p>'
	str = str +'<p>主办方联系电话：'+isUndefined(obj.mainOrganizersPhoneNumber,"String")+'</p>';
	str = str +'<p>座机号码：'+isUndefined(obj.specialPlane,"String")+'</p>';
	str = str +'<p>比赛项目：'+isUndefined(productName,"String")+'</p>';
				+'<div class="text-center">'
				+'</div>'		
	$('#top').append(str);
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
	table1();
	table2();
}
//未发布的公告
function table1(){
	$('#table_noissue').bootstrapTable({
	    url : '../../refereeNoticeController/announcement.json',
	    striped : true,
	    pagination : true,
	    height : 400,
	    method : 'get',
	    dataType : "json",
	    pageSize : 10,
	    pageList : [10, 20, 30],
	    sidePagination : 'server',// 设置为服务器端分页
	    pageNumber : 1,
	    striped : true, // 是否显示行间隔色
	    search : true, // 显示搜索框
	    toolbar : '#toolbar1', // 工具按钮用哪个容器
	    sortable : false, // 是否启用排序
	    showToggle : true,
	    showRefresh : true, // 是否显示刷新按钮
	    selectItemName : 'btSelectItem',
	    queryParams : function queryParams(params) { // 设置查询参数
	    	params.issueState = "0",
	    	params.racingId = racingId,
	    	params.productId = productId
	        return params;
	    },
	    columns : [{
	                field : 'title',
	                title : '公告标题',
	                align : 'center',
	                formatter : function(value, row, index) {
	                    if (value.length > 10) {
	                        return value.substring(0, 10);
	                    } else {
	                        return value;
	                    }
	                }
	            },{
	                field : 'createTime',
	                title : '时间',
	                align : 'center'
	            },{
	                title : '操作',
	                field : 'id',
	                align : 'center',
	                cardVisible : false,
	                formatter : function(value, row, index) {
	                	var d = '<a href="#" style="margin-right：15px;"  onclick="details(\'' + index + '\',\'0\')"><i class=""/>详情</a> ';
	                    var f = '<a href="#" style="margin-right：15px;"  onclick="editInit(\'' + index + '\',\'0\')"><i class=""/>修改</a> ';
	                    var s = '<a href="#" mce_href="#" class="look" onclick="issue(\'' + row.id + '\',\'0\')"><i class=""/>发布</a> ';
	                    var e = '<a href="#" style="margin-right：15px;"  onclick="delet(\''+ row.id+ '\',\'0\')"><i class=""/>删除</a> ';
	                    return d + s + f + e;

	                }
	            }]
	});
}

function table2(){
	// 加载数据
	$('#table_issue').bootstrapTable({
	    url : '../../refereeNoticeController/announcement.json',
	    striped : true,
	    pagination : true,
	    height : 400,
	    method : 'get',
	    dataType : "json",
	    pageSize : 10,
	    pageList : [10, 20, 30],
	    sidePagination : 'server',// 设置为服务器端分页
	    pageNumber : 1,
	    striped : true, // 是否显示行间隔色
	    search : true, // 显示搜索框
	    toolbar : '#toolbar2', // 工具按钮用哪个容器
	    sortable : false, // 是否启用排序
	    showToggle : true,
	    showRefresh : true, // 是否显示刷新按钮
	    selectItemName : 'btSelectItem',
	    queryParams : function queryParams(params) { // 设置查询参数
	    	params.issueState = "1",
	    	params.racingId = racingId,
	    	params.productId = productId
	        return params;
	    },
	    columns : [{field : 'title',
	                title : '公告标题',
	                align : 'center',
	                formatter : function(value, row, index) {
	                    if (value.length > 10) {
	                        return value.substring(0, 10);
	                    } else {
	                        return value;
	                    }
	                }
	            },{
	                field : 'createTime',
	                title : '时间',
	                align : 'center'
	            },{
	                title : '操作',
	                field : 'id',
	                align : 'center',
	                cardVisible : false,
	                formatter : function(value, row, index) {
	                	var d = '<a href="#" style="margin-right：15px;"  onclick="details(\'' + index + '\',\'1\')"><i class=""/>详情</a> ';
	                	var f = '<a href="#" style="margin-right：15px;"  onclick="editInit(\'' + index + '\',\'1\')"><i class=""/>修改</a> ';
	                    var s = '<a href="#" mce_href="#" class="look" onclick="issue(\'' + row.id + '\',\'1\')"><i class=""/>更新</a> ';
	                    var e = '<a href="#" style="margin-right：15px;"  onclick="delet(\''+ row.id+ '\',\'1\')"><i class=""/>删除</a> ';
	                    return d + s + f + e;
	                }
	            }]
	});
}


//********************************添加公告*******************************
function addnotice() {
	$('#add').click(function() {
		$('#racingId').val(racingId);
		$('#productId').val(productId);
		var index = layer.open({
			type : 1,
			title : '添加公告',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '80%', '75%' ],
			content : $('#notice_id'),
			end : function() { // 此处用于演示
			}
		});
		$('#btn_close').click(function() {
		});

	});
	add();
}
function add() {
	$("#btn_add_submit").click(function() {
		if (!$("#EssentialInformationForm").valid()) {
			lrError("输入必填项！");
			return;
		}
		var index = layer.load(0, {
			shade : false
		});
		$.ajax({	
			url : '../../refereeNoticeController/add.json',
			type : 'post',
			datatype : 'json',
			data : $('#EssentialInformationForm').serialize(),
			cache : false,
			success : function(data) {
				swal({
					title :"添加成功!",
					text : "信息添加成功",
					type : "success",
					confirmButtonText : "确定"
				});
				$('#table_noissue').bootstrapTable('refresh');// 刷新列表
				layer.closeAll('page');
				layer.close(index);
			},
			error : function() {
				swal({
					title :"添加失败!",
					text : "信息添加失败",
					type : "error",
					confirmButtonText : "确定"
				});
				layer.closeAll('page');
				layer.close(index);
			}

		});

	});

}
// **********删除公告**********
function delet(id,Anna) {
			swal({
				title : '确定要删除！',
				text : '删除之后就无法恢复了',
				type : 'warning',
				showCancelButton : true,
				confirmButtoncolor : '#ff00ff',
				confirmButtonText : '确定',
				cancelButtonText : '取消',
				closeOnConfirm : true,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(id,Anna);
				}
			});

}

function del(id,Anna) {
	 var index = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
	$.ajax({
		url : '../../refereeNoticeController/dele.json',
		type : 'post',
		datatype : 'json',
		data : {
			'id' : id,
			'Anna':Anna
		},
		success : function(data) {
			if(Anna == "0"){
				$('#table_noissue').bootstrapTable('refresh');// 刷新列表
			}else{
				$('#table_issue').bootstrapTable('refresh');// 刷新列表
			}
			swal({
				title : '删除成功',
				type : 'success',
				confirmButtonText : '确定'

			});
			layer.close(index);
			layer.closeAll("page");
		},
		error : function(data) {
			swal({
				title : '删除失败',
				type : 'error',
				confirmButtonText : '确定'

			});
			layer.close(index);
			layer.closeAll("page");

		}

	});

}
//*********修改公告*************
function update() {
	// 修改(未发布)
	$('#btn_update_submit').click(function() {
		if (!$("#EssentialInformationFormUpdate").valid()) {
			lrError("输入必填项！");
			return;
		}
		var load = layer.load(0, {
			shade : false
		});

		$.ajax({
			url : '../../refereeNoticeController/updata.json',
			type : 'post',
			datatype : 'json',
			data : $('#EssentialInformationFormUpdate').serialize(),
			cache : false,
			success : function() {
				swal({
					title :"信息修改成功!",
					type : "success",
					confirmButtonText : "确定"
				},function(){
					window.location.reload();
				});
				layer.close(load);
				layer.closeAll("page");
			},
			error : function() {
				swal("修改失败！", "信息修改失败", "error");
				layer.close(load);
				layer.closeAll("page");
			}

		});

	});
}
function editInit(index,Anna) {
	if(Anna ==0){
		var row = $('#table_noissue').bootstrapTable('getData')[index];// 获取表格行数为index的数据
		edit(row);
	}else if(Anna ==1){
		var row = $('#table_issue').bootstrapTable('getData')[index];// 获取表格行数为index的数据
		swal({
			title : '确定要修改当前公告吗？',
			text : '修改完成后请更新',
			type : 'warning',
			showCancelButton : true,
			confirmButtoncolor : '#ff00ff',
			confirmButtonText : '确定',
			cancelButtonText : '取消',
			closeOnConfirm : true,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				edit(row);
			}
		});
	}
}
//修改（未发布）
function edit(row) {
	bindForm('EssentialInformationFormUpdate', row);// 得到本行的所有内容并赋值给列表
	var index_update_a = layer.open({
		title : '修改信息',
		shade : false,
		maxmin : true,
		type : 1,
		shadeClose : true,
		area : [ '85%', '75%' ],
		content : $('#notice_id_update'),
		success : function(){
			var ue_s = UE.getEditor('info_update');
			ue_s.ready(function() {//编辑器初始化完成再赋值  
				ue_s.setContent(row.info); 
			});
		},
//		end : function() {
//			window.location.href = '../../web/referee/referee_notice_z.html';
//		},
		cancel : function(){
			window.location.reload();
		}

	});
	$('#btn_close_a').click(function() {
		layer.close(index_update_a);
		window.location.reload();
	});
}

//发布公告
function issue(id,Anna){
	var msg ="";
	if(Anna ==0){
		msg = msg + "发布";
	}else{
		msg = msg + "更新发布";
	}
	
	swal({
		title : '确定要"'+msg+'"吗？',
		type : 'warning',
		showCancelButton : true,
		confirmButtoncolor : '#ff00ff',
		confirmButtonText : '确定',
		cancelButtonText : '取消',
		closeOnConfirm : true,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			issueExecute(id,Anna);
		}
	});
}
//发布实现
function issueExecute(id,Anna){
	var msg ="";
	if(Anna ==0){
		msg = msg + "发布";
	}else{
		msg = msg + "更新发布";
	}
	var load = layer.load(0, {shade : false});
	$.ajax({
		url : '../../postmessageController/issues_notice.json',
		type : 'post',
		datatype : 'json',
		data : {
			'id':id,
			'Anna':Anna
			},
		cache : false,
		success : function() {
				swal({
					title :""+msg+"成功!",
					type : "success",
					confirmButtonText : "确定"
				},function(){
					layer.open({
	          		      type: 2,
	          		      title: ''+msg+'信息',
	          		      shadeClose: true,
	          		      shade: false,
	          		      maxmin: true, //开启最大化最小化按钮
	          		      area: ['60%', '95%'],
	          		      content:'http://isport.lrkpzx.com/dede/inter_makehtml_all.php',
	          		      end: function(){ //此处用于演示
	          		    	  layer.close(load);
	          		    	  swal.close();
	          		    	  $('#table').bootstrapTable('refresh');
	          			  }
	          		});
				});
			$('#table_noissue').bootstrapTable('refresh');// 刷新列表
			$('#table_issue').bootstrapTable('refresh');// 刷新列表
			layer.close(load);
			layer.closeAll("page");
		},
		error : function() {
			swal({
				title :"信息发布失败!",
				type : "error",
				confirmButtonText : "确定"
			});
			layer.close(load);
			layer.closeAll("page");
		}

	});
}

//详情查看
function details(index,Anna){
	if(Anna ==0){
		var row = $('#table_noissue').bootstrapTable('getData')[index];// 获取表格行数为index的数据
	}else if(Anna ==1){
		var row = $('#table_issue').bootstrapTable('getData')[index];// 获取表格行数为index的数据
	}
//	/*bindForm('EssentialInformationFormUpdate', row);// 得到本行的所有内容并赋值给列表
	$("#title_span").html(row.title);
	$("#body_div").html(row.info);
	layer.open({
		title : '信息预览',
		shade : false,
		maxmin : true,
		type : 1,
		shadeClose : true,
		area : [ '85%', '75%' ],
		content : $('#details_div'),
		end : function() {
		}

	});
}

