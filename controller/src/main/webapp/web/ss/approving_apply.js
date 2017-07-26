var RacingId = $.session.get("Racing_Id");
$(function() {
	$("#table_noapply").bootstrapTable({
		url : '../../ssCompetitionApply/teamManage.json',
		striped : true,
		pagination : true,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : false, // 显示搜索框
		toolbar : '#toolbar', // 工具按钮用哪个容器
		sortable : false, // 是否启用排序
		showToggle : true,
		showRefresh : true, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		undefinedText : '无数据',
		showExport : true,
		uniqueId : "id",
		clickToSelect : true, // 选择行即选择checkbox
		idField : 'id',
		editable : true,
		queryParams : function(params) {
//			params.racingId = $.session.get("RacingId");
			params.racingId = RacingId;
			params.checkState = "0";
			return params;
		},
		detailView : true,// 显示子菜单
		detailFormatter : function(index, row) {
			return '<table id="racing-noapply-' + index + '"></table>';
		},// 格式化子菜单
		onExpandRow : function(index, row) {
			show_racing_noapply('racing-noapply-' + index, '', row.id, row);
		},
		onDblClickRow : function(index, row) {
			$('#table_noapply').bootstrapTable('expandRow', index);
		},// 双击打开,
		onLoadSuccess : function(data) {
			$("#racingName").text("").append(data.data.obj.racingName);
		},//加载完成事件
		columns : [{
					field : 'number',
					title : '行号',
					align : 'center',
					width : 90,
					checkbox : true
				}, {
					field : 'team_name',
					title : '队伍名称',
					align : 'center'
				}, {
					field : 'team_leader',
					title : '队伍领队',
					align : 'center'
				}, {
					field : 'area_code',
					title : '所属地区',
					align : 'center'
				}, {
					title : '操作',
					field : 'id',
					align : 'center',
					cardVisible : false,
					formatter : function(value, row, index) {
						var a = '<a href="#" mce_href="#" onclick="passAll(\''
								+ row.id
								+ '\',\''
								+ RacingId
								+ '\')"><i class="glyphicon glyphicon-ok" title="批量通过"/></a> ';
						var b = '<a href="#"  onclick="noPassAll(\''
								+ row.id
								+ '\',\''
								+ RacingId
								+ '\')"><i class="glyphicon glyphicon-remove" title="批量不通过"/></a>';
						return a + b;
					}
				}]
	});
	$("#table_pass").bootstrapTable({
		url : '../../ssCompetitionApply/teamManage.json',
		striped : true,
		pagination : true,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : false, // 显示搜索框
		toolbar : '#toolbar', // 工具按钮用哪个容器
		sortable : false, // 是否启用排序
		showToggle : true,
		showRefresh : true, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		undefinedText : '无数据',
		showExport : true,
		uniqueId : "id",
		clickToSelect : true, // 选择行即选择checkbox
		idField : 'id',
		editable : true,
		queryParams : function(params) {
			params.racingId = RacingId;
			params.checkState = "1";
			return params;
		},
		detailView : true,// 显示子菜单
		detailFormatter : function(index, row) {
			return '<table id="racing-pass-' + index + '"></table>';
		},// 格式化子菜单
		onExpandRow : function(index, row) {
			show_racing_pass('racing-pass-' + index, '', row.id, row);
		},
		onDblClickRow : function(index, row) {
			$('#table_pass').bootstrapTable('expandRow', index);
		},// 双击打开,
		onLoadSuccess : function(data) {
			$("#racingName").text("").append(data.data.obj.racingName);
		},//加载完成事件
		columns : [{
					field : 'number',
					title : '行号',
					align : 'center',
					width : 90,
					checkbox : true
				}, {
					field : 'team_name',
					title : '队伍名称',
					align : 'center'
				}, {
					field : 'team_leader',
					title : '队伍领队',
					align : 'center'
				}, {
					field : 'area_code',
					title : '所属地区',
					align : 'center'
				}, {
                    title : '操作',
                    field : 'id',
                    align : 'center',
                    cardVisible : false,
                    formatter : function(value, row, index) {
                        var a = '<a href="#"  onclick="noPassAll(\''
                                + row.id
                                + '\',\''
                                + RacingId
                                + '\')"><i class="glyphicon glyphicon-remove" title="批量不通过"/></a>';
                        return a;
                    }
                }]
	});
	$("#table_nopass").bootstrapTable({
		url : '../../ssCompetitionApply/teamManage.json',
		striped : true,
		pagination : true,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : false, // 显示搜索框
		toolbar : '#toolbar', // 工具按钮用哪个容器
		sortable : false, // 是否启用排序
		showToggle : true,
		showRefresh : true, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		undefinedText : '无数据',
		showExport : true,
		uniqueId : "id",
		clickToSelect : true, // 选择行即选择checkbox
		idField : 'id',
		editable : true,
		queryParams : function(params) {
//			params.racingId = $.session.get("RacingId");
			params.racingId = RacingId;
			params.checkState = "2";
			return params;
		},
		detailView : true,// 显示子菜单
		detailFormatter : function(index, row) {
			return '<table id="racing-nopass-' + index + '"></table>';
		},// 格式化子菜单
		onExpandRow : function(index, row) {
			show_racing_nopass('racing-nopass-' + index, '', row.id, row);
		},
		onDblClickRow : function(index, row) {
			$('#table_nopass').bootstrapTable('expandRow', index);
		},// 双击打开,
		onLoadSuccess : function(data) {
			$("#racingName").text("").append(data.data.obj.racingName);
		},//加载完成事件
		columns : [{
					field : 'number',
					title : '行号',
					align : 'center',
					width : 90,
					checkbox : true
				}, {
					field : 'team_name',
					title : '队伍名称',
					align : 'center'
				}, {
					field : 'team_leader',
					title : '队伍领队',
					align : 'center'
				}, {
					field : 'area_code',
					title : '所属地区',
					align : 'center'
				}, {
                    title : '操作',
                    field : 'id',
                    align : 'center',
                    cardVisible : false,
                    formatter : function(value, row, index) {
                        var a = '<a href="#" mce_href="#" onclick="passAll(\''
                                + row.id
                                + '\',\''
                                + RacingId
                                + '\')"><i class="glyphicon glyphicon-ok" title="批量通过"/></a> ';
                        return a;
                    }
                }]
	});
});

function show_racing_noapply(table, toolbar, id, rows) {
	$("#" + table).bootstrapTable({
		url : '../../ssCompetitionApply/teamApplyManage.json',
		striped : true,
		pagination : true,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : false, // 显示搜索框
		sortable : false, // 是否启用排序
		showToggle : false,
		showRefresh : false, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		queryParams : function(params) {
//			params.racingId = $.session.get("RacingId");
			params.racingId = RacingId;
			params.teamId = id;
			params.checkState = "0";
			return params;
		},
		columns : [
				{
					field : 'productName',
					title : '项目产品名称',
					align : 'center'
				}, {
					field : 'signCost',
					title : '报名费用',
					align : 'center'
				}, {
					field : 'create_time',
					title : '报名时间',
					align : 'center'
				}, {
					title : '操作',
					field : 'id',
					align : 'center',
					cardVisible : false,
					formatter : function(value, row, index) {
						var a = '<a href="#" mce_href="#" onclick="playerApply(\''
								+ table
								+ '\',\''
								+ row.id
								+ '\',\''
								+ rows.team_name
								+ '\')"><i class="glyphicon glyphicon-user" title="查看球员信息"/></a> ';
						var b = '<a href="#" mce_href="#" onclick="pass(\''
								+ table
								+ '\',\''
								+ row.team_id
								+ '\',\''
								+ row.racing_id
								+ '\',\''
								+ row.product_id
								+ '\',\''
								+ row.id
								+ '\')"><i class="glyphicon glyphicon-ok" title="批量通过"/></a> ';
						var c = '<a href="#"  onclick="noPass(\''
								+ table
								+ '\',\''
								+ row.team_id
								+ '\',\''
								+ row.racing_id
								+ '\',\''
								+ row.product_id
								+ '\',\''
								+ row.id
								+ '\')"><i class="glyphicon glyphicon-remove" title="批量不通过"/></a>';
						return a + b + c;
					}
				}]
	});
}

function show_racing_pass(table, toolbar, id, rows) {
	$("#" + table).bootstrapTable({
		url : '../../ssCompetitionApply/teamApplyManage.json',
		striped : true,
		pagination : true,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : false, // 显示搜索框
		sortable : false, // 是否启用排序
		showToggle : false,
		showRefresh : false, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		queryParams : function(params) {
//			params.racingId = $.session.get("RacingId");
			params.racingId = RacingId;
			params.teamId = id;
			params.checkState = "1";
			return params;
		},
		columns : [
				{
					field : 'productName',
					title : '项目产品名称',
					align : 'center'
				}, {
					field : 'signCost',
					title : '报名费用',
					align : 'center'
				}, {
					field : 'create_time',
					title : '报名时间',
					align : 'center'
				}, {
                    title : '操作',
                    field : 'id',
                    align : 'center',
                    cardVisible : false,
                    formatter : function(value, row, index) {
                        var a = '<a href="#" mce_href="#" onclick="playerApply(\''
                                + table
                                + '\',\''
                                + row.id
                                + '\',\''
                                + rows.team_name
                                + '\')"><i class="glyphicon glyphicon-user" title="查看球员信息"/></a> ';
                        var b = '<a href="#"  onclick="noPass(\''
                                + table
                                + '\',\''
                                + row.team_id
                                + '\',\''
                                + row.racing_id
                                + '\',\''
                                + row.product_id
                                + '\',\''
                                + row.id
                                + '\')"><i class="glyphicon glyphicon-remove" title="批量不通过"/></a>';
                        return a + b;
                    }
				}]
	});
}

function show_racing_nopass(table, toolbar, id, rows) {
	$("#" + table).bootstrapTable({
		url : '../../ssCompetitionApply/teamApplyManage.json',
		striped : true,
		pagination : true,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : false, // 显示搜索框
		sortable : false, // 是否启用排序
		showToggle : false,
		showRefresh : false, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		queryParams : function(params) {
//			params.racingId = $.session.get("RacingId");
			params.racingId = RacingId;
			params.teamId = id;
			params.checkState = "2";
			return params;
		},
		columns : [
				{
					field : 'productName',
					title : '项目产品名称',
					align : 'center'
				}, {
					field : 'signCost',
					title : '报名费用',
					align : 'center'
				}, {
					field : 'create_time',
					title : '报名时间',
					align : 'center'
				}, {
                    title : '操作',
                    field : 'id',
                    align : 'center',
                    cardVisible : false,
                    formatter : function(value, row, index) {
                        var a = '<a href="#" mce_href="#" onclick="playerApply(\''
                                + table
                                + '\',\''
                                + row.id
                                + '\',\''
                                + rows.team_name
                                + '\')"><i class="glyphicon glyphicon-user" title="查看球员信息"/></a> ';
                        var b = '<a href="#" mce_href="#" onclick="pass(\''
                                + table
                                + '\',\''
                                + row.team_id
                                + '\',\''
                                + row.racing_id
                                + '\',\''
                                + row.product_id
                                + '\',\''
                                + row.id
                                + '\')"><i class="glyphicon glyphicon-ok" title="批量通过"/></a> ';
                        return a + b;
                    }
                }]
	});
}

function passAll(teamIdStr, racingIdStr) {
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../ssCompetitionApply/applyPassAll.json',
		type:"post",
		data:{
			teamId : teamIdStr,
			racingId : racingIdStr,
			checkState : "1",
			flag : "0"
		},
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			$('#table_noapply').bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			if (data.status == 1) {
				swal("审批成功", data['msg'], "success");
			} else {
				swal("审批失败", data['msg'], "error");
			}
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}

function noPassAll(teamIdStr, racingIdStr) {
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../ssCompetitionApply/applyPassAll.json',
		type:"post",
		data:{
			teamId : teamIdStr,
			racingId : racingIdStr,
			checkState : "2",
			flag : "0"
		},
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			$('#table_noapply').bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			if (data.status == 1) {
				swal("审批成功", data['msg'], "success");
			} else {
				swal("审批失败", data['msg'], "error");
			}
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}

function playerApply(table, signIdStr, teamNameStr) {
	$("#playerApplyTable").bootstrapTable({
		url : '../../ssCompetitionApply/playerApplyMain.json?signId='+signIdStr,
		method : 'get',
		striped : true,
		groupBy : true,
		groupByField : 'occupation',
		columns : 
			[{
				field : 'name',
				title : '姓名',
				align : 'center',
				formatter : function(value, row, index) {
					if (value != undefined) {
						return value;
					} else {
						return "";
					}
				}
			}, {
				field : 'occupation',
				title : '职业',
				align : 'center',
				formatter : function(value, row, index) {
					if (value != undefined) {
						return value;
					} else {
						return "";
					}
				}
			}, {
                field : 'birthday',
                title : '年龄',
                align : 'center',
                formatter : function(value, row, index) {
                    if (value != undefined) {
                        return countAge(value);
                    } else {
                        return "";
                    }
                }
            }, {
				field : 'identity',
				title : '身份证号',
				align : 'center',
				formatter : function(value, row, index) {
					if (value != undefined) {
						return value;
					} else {
						return "";
					}
				}
			}]
	});
	var index_main = layer.open({
        type : 1,
        title : teamNameStr + '人员信息表',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '90%', '90%' ],
        content : $('#div_player_apply'),
        success: function(layero, index){
			$("#signId").val(signIdStr);
		},
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });
    
	$('#btn_pass').click(function() {
		var index = layer.load(0, {
			shade : false
		});
		$.ajax({
			url : '../../ssCompetitionApply/applyPassSignAll.json',
			type : "post",
			data : {
				id : $("#signId").val(),
				checkState : "1"
			},
			async : true,
			cache : false,
			dataType : "json",
			success : function(data) {
				layer.closeAll('page');
				layer.close(index);
				if (data.status == 1) {
					swal("审批成功", data['msg'], "success");
				} else {
					swal("审批失败", data['msg'], "error");
				}
			},
			error : function(data) {
				lrError("授权失败！服务器错误！");
			}
		})
	});
	
	$('#btn_noPass').click(function() {
		var index = layer.load(0, {
			shade : false
		});
		$.ajax({
			url : '../../ssCompetitionApply/applyPassSignAll.json',
			type : "post",
			data : {
				id : $("#signId").val(),
				checkState : "2"
			},
			async : true,
			cache : false,
			dataType : "json",
			success : function(data) {
				layer.closeAll('page');
				layer.close(index);
				if (data.status == 1) {
					swal("审批成功", data['msg'], "success");
				} else {
					swal("审批失败", data['msg'], "error");
				}
			},
			error : function(data) {
				lrError("授权失败！服务器错误！");
			}
		})
	});

    $('#btn_close').click(function() {
        layer.close(index_main);
    });
}

function pass(table, teamIdStr, racingIdStr, productIdStr, signIdStr) {
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../ssCompetitionApply/applyPassAll.json',
		type:"post",
		data:{
			teamId : teamIdStr,
			racingId : racingIdStr,
			Id : signIdStr,
			productId : productIdStr,
			checkState : "1"
		},
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			$('#' + table).bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			if (data.status == 1) {
				swal("审批成功", data['msg'], "success");
			} else {
				swal("审批失败", data['msg'], "error");
			}
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}

function noPass(table, teamIdStr, racingIdStr, productIdStr, signIdStr) {
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../ssCompetitionApply/applyPassAll.json',
		type:"post",
		data:{
			teamId : teamIdStr,
			racingId : racingIdStr,
			Id : signIdStr,
			productId : productIdStr,
			checkState : "2"
		},
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			$('#' + table).bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			if (data.status == 1) {
				swal("审批成功", data['msg'], "success");
			} else {
				swal("审批失败", data['msg'], "error");
			}
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}