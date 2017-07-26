//ranhongmin 2016.9.22 完成0.1
var projectId;
$(function() {
	//創建項目
	if("0"==$.session.get('ProjectState')){
		projectId = $.session.get('ProjectId');
		 $.session.remove('ProjectId');
		 $.session.remove('ProjectState');
	}else{
		projectId = "";
	}
	$('#add').click(function() {// 从前台按钮点击执行add函数
		$("#model_app").empty();
		$('#spec_view').empty();	
		add();
	});
	$('#update').click(function() {// 从前台按钮点击判断是否选中赛事 选中后执行edit函数 并传递行数
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal("初始化失败", "请选择项目", "error");
		} else {
			edit(row[0]);
		}
	});
	$('#del').click(function() {// 基本等同上面的update
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || row == "") {
			swal("删除失败", "请选择项目", "error");
		} else {
			swal({// 弹出提示框提示用户是否确认删除
				title : "确定要删除吗",
				text : "删除后将无法恢复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(row[0].id);
				}
			});
		}
	});
	
//	$.ajax({//这个ajax是进入竞赛管理界面时用来查询并显示竞赛项目的，下面的cookie是从赛事活动管理中添加项目时存的cookie
//		//存在从赛事活动管理中添加项目后，直接点竞赛管理时cookie还存在的情况，会导致点竞赛管理时其中将会只出现刚刚赛事的赛事
//		//所以在controller中关于使用projectid查询的example已注释掉，用的是查询所有竞赛的example
//		type : "POST",
//		url : "../../ssRacingController/findracing.json",
//		dataType : "json",
//		data : {
//			"projectId" : $.cookie('projectId')
//		},
//		success : function(data) {
//			var myTemplate = Handlebars.compile($("#racing-table-add").html());
//			$('#table_add').prepend(myTemplate(data['data']['list']));
//
//		},
//		error : function() {
//			lrError("删除失败！服务器错误！");
//		}
//	});
	
	$('#table')
	.bootstrapTable(
			{
				url : '../../ssRacingController/main.json',
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
					params.projectId = projectId;
					return params;
				},
				columns : [
						{
							align : 'center',
							width : 50,
							checkbox : true
						},
						{
							field : 'racingName',
							title : '项目名称',
							align : 'center'
						},
						{
							field : 'racingBeginTime',
							title : '开始时间',
							align : 'center'
						},	
						{
							field : 'racingEndTime',
							title : '结束时间',
							align : 'center'
						},	
						{
							field : 'attendNumber',
							title : '参加人数',
							align : 'center'
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
					  ]

			});
//-------------------------------------------------------------------------------------发布点击事件--------------------------------------------------------------------------------
	$('#publish').click(function() {
		var index=layer.load(0, {shade: false});
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == "" || row == null) {
			swal({
				title : "发布失败!",
				text : "请选择要发布的数据!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			swal({
				title : "确定到发布",
				text : "确定要发布("+row[0].racingName+")吗？",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : true,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					publish(row[0].id);
				}
				layer.close(index);
			});
		}
	});

});

//主界面每个竞赛右上角的删除按钮的方法，删除
$(document).on("click", '#delete_racing', function() {
	var data = $(this).attr("value");

	swal({// 弹出提示框提示用户是否确认删除
		title : "确定要删除吗",
		text : "删除后将无法恢复",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			
			$.ajax({
				type : "POST",
				url : "../../ssRacingController/del.json",
				dataType : "json",
				data : {
					'id' : data
				},
				success : function(data) {
					swal("删除成功", "信息删除成功", "success");
					window.location.reload();
					layer.closeAll('page');
				},
				error : function() {
					layer.close(index);
					lrError("删除失败！服务器错误！");
				}
			});
		}
	});
});

//觉得不能有修改的方法，html中没有关于跳转到修改的按钮
$('#btn_update_submit').click(function() { // 修改内的修改按钮
	if (!$('#from_ss_project_update').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../ssProjectController/update.json",
		dataType : "json",
		data : $("#from_ss_project_update").serialize(),
		success : function(data) {
			swal("修改成功", "信息修改成功", "success");
			layer.closeAll('page');
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("修改失败！服务器错误！");
		}
	});
});

// 删除
function del(Id) {// 根据id删除

	swal({
		title : "确定要删除吗",
		text : "删除后将无法恢复",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			var index = layer.load(0, {
				shade : false
			});
			$.ajax({
				type : "POST",
				url : "../../ssProjectController/del.json",
				dataType : "json",
				data : {
					"Id" : Id
				},
				success : function(data) {
					$('#table').bootstrapTable('refresh');
					swal("删除成功", "信息删除成功", "success");
					layer.close(index);

				},
				error : function() {
					lrError("删除失败！服务器错误！");
					layer.close(index);
				}
			});
		}
	});

}

// 添加操作
function add() {
	var index_main = layer.open({
		type : 2,
		title : '添加竞赛项目',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '100%', '100%' ],
		content :"racing_add.html",
		cancel: function(){
			$.session.remove('ProjectState');
			$.session.remove('ProjectId');
		  }
	});

	$('#btn_close').click(function() {
		layer.close(index_main);
	});

}

// 行内修改初始化i没啥用
function editInit(index) {

	var row = $('#table').bootstrapTable('getData')[index];

	edit(row);
}
// 修改操作好像也没啥用

function edit(row) {

	bindForm('from_ss_project_update', row);
	var index_main = layer.open({
		type : 1,
		title : '修改信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_update'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');

		}
	});
	$('#btn_update_close').click(function() {
		layer.close(index_main);
	});

}
//---------------------------------------------------------------------------发布赛事-----------------------------------------------------------------------------------------------------------------------------
function publish(id){
	var index=layer.load(0, {shade: false}); 
	$.ajax({
        url:'../../postmessageController/issues_racing.json',
        type:"post",
        data:{'racing_id':id},
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
          		    	  $('#table').bootstrapTable('refresh');
          			  }
          		});
			});
           }
          }
      });
}


