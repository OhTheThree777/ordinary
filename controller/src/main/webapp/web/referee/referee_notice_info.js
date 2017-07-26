/**
 * 赛事公告发布页面
 */
$(function() {

	addnotice();// 添加
	delet();// 删除
	update()//修改
	// 加载公告列表
	$('#table')
			.bootstrapTable(
					{
						url : '../../refereeNoticeController/announcement.json',
						striped : true,
						pagination : true,
						height : 400,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',// 设置为服务器端分页
						pageNumber : 1,
						striped : true, // 是否显示行间隔色
						search : false, // 显示搜索框
						toolbar : '#toolbar', // 工具按钮用哪个容器
						sortable : true, // 是否启用排序
						showToggle : true,
						showRefresh : true, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
						clickToSelect : true, // 选择行即选择checkbox
						singleSelect : true, // 仅允许单选
						strictSearch : true,
						queryParams : function(params) {
							params.racingid =$.cookie("racingid") ;
							return params;
						},
						columns : [
								{
									align : 'center',
									width : 50,
									checkbox : true
								},
								{
									field : 'title',
									title : '公告标题',
									align : 'center',
								},
								{
									field : 'info',
									title : '公告内容',
									align : 'center',
									formatter : function(value, row, index) {
										var html = '<div href="referee_notice_info.html;"class="css";>'
												+ value + '</div>';
										return html;
									}
								},
								{
									field : 'createTime',
									title : '录入时间',
									align : 'center'
								},
								{
									field : 'update_time',
									title : '更新时间',
									align : 'center'
								},
								{
									field : 'delFlag',
									title : '发布状态',
									align : 'center',
									formatter : function(value, row, index) {
										var e;
										if(row.delFlag==1){
											 e = '<a target="_blank"  style="margin-right: 10px;" class="btn btn-outline btn-success btn-xs"'
												+ 'id="butt_fb_id">'
												+ '未发布</a>'
										}else{
										     e = '<a target="_blank"  style="margin-right: 10px;backgroundcolor:#ff0000" class="btn btn-outline btn-success btn-xs"'
												+ 'id="butt_fb_id">'
												+ '已发布</a>'
												}
										return e;
									}
								},
								{
									field : 'id',
									title : '操作',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {

										var e = '<a href="#"  style="margin-right: 10px;"  onclick="editsmallInit(\''
												+ index
												+ '\')" title="修改"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#" mce_href="#" onclick="delsmallRight(\''
												+ row.id
												+ '\')" title="删除"><i class="glyphicon glyphicon-remove"/></a> ';
										return e + d;
									}
								} ]
					});

});

// ********************************添加公告*******************************
function addnotice() {
	var ue = UE.getEditor('info');
	$('#add').click(function() {
		formReset("EssentialInformationForm");// 制空表格内容
		$("#delFlag").val("1");
		var index = layer.open({
			type : 1,
			title : '添加公告',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '80%', '75%' ],
			content : $('#notice_id'),
			end : function() { // 此处用于演示
				$('#table').bootstrapTable('refresh');
				layer.close(index);
			}
		});
		$('#btn_close').click(function() {
			layer.close(index);
		});

	});
	add();
}
function add() {
	$('#btn_update_submit').hide();
	$('#btn_add_submit').show();
	
	
	$("#btn_add_submit").click(function() {
		if (!$("#EssentialInformationForm").valid()) {
			lrError("输入必填项！");
			return;
		}
		var load = layer.load(0, {
			shade : false
		});
		$.ajax({	
			url : '../../refereeNoticeController/add.json',
			type : 'post',
			datatype : 'json',
			data : $('#EssentialInformationForm').serialize(),
			cache : false,
			success : function(data) {
				swal("添加成功！", "信息添加成功", "success");

				$('#table').bootstrapTable('refresh');// 刷新列表
				layer.close('load')
				layer.closeAll('page');
			},
			error : function() {
				swal("修改失败！", "信息修改失败", "error");
				layer.closeAll('page');
			}

		});

	});

}
// **********删除公告**********
function delet() {
	$("#del").click(function() {
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : '先选择要删除的内容',
				type : 'warning',
				confirmButtonText : '确定'
			});

		} else {

			swal({
				title : '确定要删除！',
				text : '删除之后就无法恢复了',
				type : 'warning',
				showCancelButton : true,
				confirmButtoncolor : '#ff00ff',
				confirmButtonText : '确定',
				cancelButtonText : '取消',
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(row[0].id);
				}
			});

		}

	});
}

function del(id) {
	$.ajax({
		url : '../../refereeNoticeController/dele.json',
		type : 'post',
		datatype : 'json',
		data : {
			'id' : id
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');// 刷新列表
			swal({
				title : '删除成功',
				type : 'success',
				confirmButtonText : 'ok'

			});
		},
		error : function(data) {
			swal({
				title : '删除失败',
				type : 'error',
				confirmButtonText : 'ok'

			});

		}

	});

}
function delsmallRight(id) {
	del(id);
}
// *********修改公告*************
function update() {
	
	// 修改
	$("#update").click(function() {
		var row = $('#table').bootstrapTable('getSelections');// 获取表格的数据
		if (row == null || "" == row) {
			swal({
				title : '先选择要修改的内容',
				type : 'warning',
				confirmButtonText : '确定'
			});

		} else {
			edit(row[0]);
		}

	});
	// 修改
	$('#btn_update_submit').click(function() {
		if (!$("#EssentialInformationForm").valid()) {
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
			data : $('#EssentialInformationForm').serialize(),
			cache : false,
			success : function() {
				swal("修改成功！", "信息修改成功", "success");
				$('#table').bootstrapTable('refresh');// 刷新列表
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
function editsmallInit(index) {
	var row = $('#table').bootstrapTable('getData')[index];// 获取表格行数为index的数据
	edit(row);
}
//修改
function edit(row) {
	var ue_body = UE.getEditor('info');
	ue_body.ready(function() {//编辑器初始化完成再赋值  
		ue_body.setContent(row.info); 
    });  
	bindForm('EssentialInformationForm', row);// 得到本行的所有内容并赋值给列表
	$('#btn_update_submit').show();
	$('#btn_add_submit').hide();
	var index_update = layer.open({
		title : '修改信息',
		shade : false,
		maxmin : true,
		type : 1,
		shadeClose : true,
		area : [ '85%', '75%' ],
		content : $('#notice_id'),
		end : function() {
			$('#table').bootstrapTable('refresh');
		}

	});
	$('#btn_close').click(function() {
		layer.close(index_update);
	});
}