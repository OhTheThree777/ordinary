$(function() {

	$('#add').click(function() {
		getTeamPart();
	});
	$('#update').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : "初始化失败!",
				text : "请选择队伍!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			getTeamPartUpdate(row[0]);
		}
	});

	$('#del').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null) {
			swal("删除失败", "请选择队伍", "error");
		} else {
			swal({
				title : "确定到删除",
				text : "确定要删除该队伍，删除后将无法回复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : true,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(row[0].id);
				}
			});
		}
	});

	// 加载数据
	$('#table')
			.bootstrapTable(
					{
						url : '../../personInfoController/main.json',
						striped : true,
						pagination : true,
						height : 450,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',// 设置为服务器端分页
						pageNumber : 1,
						striped : true, // 是否显示行间隔色
						search : true, // 显示搜索框
						toolbar : '#toolbar', // 工具按钮用哪个容器
						sortable : true,// 是否启用排序
						showColumns : true,
						showToggle : true,
						showRefresh : true, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
						showExport : true,
						uniqueId : "id",
						exportDataType : 'basic',
						uniqueId : "id",
						idField : "id",
						undefinedText : '-',// 当数据为 undefined 时显示的字符
						clickToSelect : true,
						singleSelect : true,
						strictSearch : true,
						columns : [
								{

									align : 'center',
									width : 50,
									checkbox : true
								},
								{

									field : 'personPic',
									title : '头像',
									align : 'center',
									formatter : function(value, row, index) {
										var html = "<img src='"
												+ value
												+ "' style='width:50px;height:50px;'>";
										return html;
									}

								},
								{
									field : 'personName',
									title : '姓名',
									align : 'center',
									sortable : true,

								},
								{
									field : 'personSex',
									title : '性别',
									align : 'center',
									sortable : true,
									visible : false

								},
								{
									field : 'personAge',
									title : '年龄',
									align : 'center',
									sortable : true,
									visible : false
								},
								{
									field : 'personIdNumber',
									title : '身份证号',
									align : 'center',
									sortable : true
								},
								{
									field : 'teamName',
									title : '所属队伍',
									align : 'center',
									sortable : true
								},
								
								{
									field : 'issueState',
									title : '发布状态',
									align : 'center',
									formatter : function(value, row,
											index) {
										var html="";
										var b=getCodeKey("../../", "issue_state",value);
										if("0"==value){
											html="<span class='badge badge-danger'>"+b+"</span>";
										}else{
											html="<span class='badge badge-success'>"+b+"</span>";
										}
										return html;
									}
								},

								{
									field : 'id',
									title : '操作',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="#"  style="margin-right: 10px;"  onclick="editInit(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#" mce_href="#" onclick="delRight(\''
												+ value
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
									return e + d;
									}
								} ],

					});

});

$("#form_personInfo").validate({
    ignore: [],
    rules : {
        personPic : {
            required : true
        }
    },
    messages : {
        personPic : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$('#btn_add').click(function() {
	if (!$('#form_personInfo').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../personInfoController/add.json",
		dataType : "json",
		data : $("#form_personInfo").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal("添加成功!", "队伍信息保存成功", "success");
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

$('#btn_update').click(function() {
	if (!$('#form_personInfo').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../personInfoController/update.json",
		dataType : "json",
		data : $("#form_personInfo").serialize(),
		success : function(data) {
			swal("修改成功", "人员 基本信息修改成功", "success");
			layer.closeAll('page');
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

// 删除
function del(id) {
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../personInfoController/del.json",
		dataType : "json",
		data : {
			"id" : id
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal("删除成功", "人员删除成功", "success");
			layer.close(index);

		},
		error : function() {
			lrError("删除失败！服务器错误！");
			layer.close(index);
		}
	});
}

// 添加操作
function add() {
	$('#btn_add').show();
	$('#btn_update').hide();
	formReset("form_personInfo");
	var index_main = layer.open({
		type : 1,
		title : '添加人员',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '90%', '90%' ],
		content : $('#div_person'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');
		}
	});

	$('#btn_close').click(function() {
		layer.close(index_main);
	});

}

// 行内修改初始化i
function editInit(index) {
	var row = $('#table').bootstrapTable('getData')[index];
	getTeamPartUpdate(row);
	// getPersonPartUpdate(row);
}
// 修改操作

function edit(row) {
	if(row['personPic'].indexOf("http")!= -1 ){
		$('#img_pic').attr('src',row['personPic']);
	}else{
		$('#img_pic').attr('src',"../../img/tx.png");
	}
	
	var ue_update = UE.getEditor('personBody');
	ue_update.ready(function() {//编辑器初始化完成再赋值  
		ue_update.setContent(row['personBody']);  //赋值给UEditor  
    });  
	$('#btn_update').show();
	$('#btn_add').hide();
	bindForm('form_personInfo', row);
	var index_main = layer.open({
		type : 1,
		title : '修改['+row['personName']+']信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '100%', '100%' ],
		content : $('#div_person'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');

		}
	});

	$('#btn_close').click(function() {
		layer.close(index_main);
	});

}

function getTeamPart() {
	var index = layer.load(0, {
		shade : false
	});

	$.ajax({
		type : "POST",
		url : "../../teamInfoController/findTeamAll.json",
		dataType : "json",
		data : {
			"date" : Date.parse(new Date())
		},
		success : function(data) {

			layer.close(index);
			add();
			var infos = data['data']['list'];
			$('#teamId').empty();
			var item = "<option value='0'>无队伍</option>";
			$('#teamId').append(item);
			$.each(infos, function(i, n) {
				var item = "<option value='" + n.id + "'>" + n['teamName']
						+ "</option>";
				$('#teamId').append(item);
			});
		},
		error : function() {
			lrError("获取队伍失败！服务器错误！");

		}
	});
}

function getTeamPartUpdate(row) {
	var index = layer.load(0, {
		shade : false
	});

	$.ajax({
		type : "POST",
		url : "../../teamInfoController/findTeamAll.json",
		dataType : "json",
		data : {
			"date" : Date.parse(new Date())
		},
		success : function(data) {

			layer.close(index);
			var infos = data['data']['list'];
			$('#teamId').empty();
			var item = "<option value='0'>无队伍</option>";
			$('#teamId').append(item);
			$.each(infos, function(i, n) {
				var item = "<option value='" + n.id + "'>" + n['teamName']
						+ "</option>";
				$('#teamId').append(item);
			});

			edit(row);
		},
		error : function() {
			lrError("获取队伍失败！服务器错误！");

		}
	});
}

swfobject
		.addDomLoadEvent(function() {
			// 以下两行代码正式环境下请删除
			var swf = new fullAvatarEditor(
					"fullAvatarEditor.swf",
					"expressInstall.swf",
					"swfContainer",
					{
						id : 'swf',
						upload_url : '../../common/upload/upPic.json', // 上传接口
						method : 'post', // 传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
						src_upload : 2, // 是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
						avatar_box_border_width : 0,
						width : 600, // flash文件的宽度
						height : 430,
						expressInstall : '../../js/plugins/fullavatareditor/expressInstall.swf',
						file : '../../js/plugins/fullavatareditor/fullAvatarEditor.swf',
						avatar_sizes : '100*100|50*50|32*32',
						avatar_sizes_desc : '100*100像素|50*50像素|32*32像素'
					},
					function(msg) {
						switch (msg.code) {
						case 1:
							break;
						case 2:
							// alert("已成功加载图片到编辑面板。");
							document.getElementById("upload").style.display = "inline";
							break;
						case 3:
							if (msg.type == 0) {
								alert("摄像头已准备就绪且用户已允许使用。");
							} else if (msg.type == 1) {
								alert("摄像头已准备就绪但用户未允许使用！");
							} else {
								alert("摄像头被占用！");
							}
							break;
						case 5:
							var result = eval(msg.content);
							if (result.status == "1") {
								$('#img_pic').attr('src',
										'' + result.list[0].uri);

								$('#personPic').val(result.list[0].uri);

							} else {
								alert('图片上传失败');
							}
							layer.close(pic_layer);

							break;
						}
					});

		});

var pic_layer;
function showPic(type) {

	pic_layer = layer.open({
		type : 1,
		title : '上传头像',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '60%', '95%' ],
		content : $('#div_pic'),
		end : function() { // 此处用于演示

		}
	});
}

function delRight(id) {
	swal({
		title : "确定删除",
		text : "确定要删除该，删除后将无法回复",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			del(id);
		}
	});
}
$("#issue").click(function(){
	// 获取选中行信息
	var row = $('#table').bootstrapTable('getSelections');
	if (null == row || ""==row) {
		swal({
			title : "发布失败!",
			text : "请选择运动员!",
			type : "error",
			confirmButtonText : "确定"
		});
	} else {
		swal({
			title : "确定要发布么",
			text : "确定要发布该运动员么？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : true,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				issue(row[0].id);
			}
		});
	}
});

//发布
function issue(id){
	var index=layer.load(0, {shade: false}); 
	$.ajax({
        url:'../../postmessageController/issues_person.json',
        type:"post",
        data:{'person_id':id},
        dataType:"json",
        success:function(data){
        	if(0==data.status){
        		swal({
					title : "发布失败!",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
        		layer.close(index); 
        	}else if(1==data.status){
        		layer.close(index);
        		swal({
					title : "发布成功",
					text : data.msg,
					type: "warning",
					type : "success",
					confirmButtonText : "确定"
        		}, 
        		function(){
            		layer.open({
          		      type: 2,
          		      title: '发布信息',
          		      shadeClose: true,
          		      shade: false,
          		      maxmin: true, //开启最大化最小化按钮
          		      area: ['60%', '95%'],
          		      content:'http://isport.lrkpzx.com/dede/inter_makehtml_all.php',
          		      end: function(){ //此处用于演示
          		    	  layer.close(index);
          		    	  swal.close();
          		    	  $('#table').bootstrapTable('refresh');
          			  }
          		});
			});
           }
          }
      });
}
var ue = UE.getEditor('personBody');
