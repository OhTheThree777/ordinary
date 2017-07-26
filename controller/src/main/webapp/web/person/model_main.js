$(function() {

	getCodes("../../", 'html_property_type', 'sel_categoryPropertyType');// 赋予字典值
    getCodes("../../", 'html_property_type', 'sel_categoryUpdatePropertyType');// 赋予字典值
	$('#addCategory').click(function() {
		emptyForm('from_panel_model_add');
		addCategory();
	});
	$('#updateCategory').click(function() {
		// 获取选中行信息

		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal("初始化失败", "请选择项目", "error");
		} else {
		    editCategory(row[0]);
		}

	});
	$('#delCategory').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null) {
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
					delCategory(row[0].id);
				}
			});
			// del(row[0].id);
		}
	});

	// 加载数据
	$('#table')
			.bootstrapTable(
					{
						url : '../../PersonModelController/categorymain.json',
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
						sortable : false, // 是否启用排序
						showToggle : true,
						showRefresh : true, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
						undefinedText : '无数据',
						showExport : true,
						uniqueId : "id",
						clickToSelect : true, // 选择行即选择checkbox
						singleSelect : true, // 仅允许单选
						strictSearch : true,
						idField : 'id',
						queryParams : function(params) {
							params.teamName = $('#txt_search_team_name').val();
							return params;
						},
						detailView : true,// 显示子菜单
						detailFormatter : function(index, row) {
							return '<table id="main-' + index + '"></table>';
						},// 格式化子菜单
						onExpandRow : function(index, row) {
							show_main('main-' + index, '', row.id);
						},
						onDblClickRow : function(index, row) {
							$('#table').bootstrapTable('expandRow', index);
						},// 双击打开
						columns : [
								// {
								// align : 'center',
								// width : 90,
								// checkbox : true
								// },
								{
									field : 'number',
									title : '行号',
									align : 'center',
									width : 50,
									radio : true
								},
								{
									field : 'name',
									title : '职业模块分类名称',
									align : 'center'
								},
								{
									field : 'userId',
									title : '职业模块分类添加人',
									align : 'center'
								},
								{
									field : 'createTime',
									title : '创建时间',
									align : 'center'
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var a = '<a href="#" mce_href="#" onclick="add(\''
												+ row.id
												+ '\',\''
												+ table
												+ '\')"><i class="glyphicon glyphicon-plus"/></a> ';
										var e = '<a href="#" mce_href="#" onclick="editInitCategory(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#" mce_href="#" onclick="delCategory(\''
												+ row.id
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
										var m = '<a href="#" mce_href="#" onclick="upCategory(\''
												+ row.id
												+ '\',\''
												+ row.sort
												+ '\')"><i class="glyphicon glyphicon-chevron-up"/></a> ';
										var n = '<a href="#" mce_href="#" onclick="downCategory(\''
												+ row.id
												+ '\',\''
												+ row.sort
												+ '\')"><i class="glyphicon glyphicon-chevron-down"/></a> ';
										return a + e + d + m + n;
									}
								} ]
					});
});

function show_main(table, toolbar, id) {
    $('#' + table)
            .bootstrapTable(
                    {
                        url : '../../PersonModelController/main.json?categoryId=' + id,
                        striped : true,
                        pagination : true,
                        method : 'get',
                        dataType : "json",
                        pageSize : 10,
                        pageList : [ 10, 20, 30 ],
                        sidePagination : 'server',// 设置为服务器端分页
                        pageNumber : 1,
                        striped : true, // 是否显示行间隔色
                        search : false, // 显示搜索框
                        sortable : false, // 是否启用排序
                        showToggle : false,
                        showRefresh : false, // 是否显示刷新按钮
                        selectItemName : 'btSelectItem',
                        columns : [
                                {
                                    field : 'name',
                                    title : '职业模型名称',
                                    align : 'center'
                                },
                                {
                                    field : 'createTime',
                                    title : '创建时间',
                                    align : 'center'
                                },
                                {
                                    field : 'remark',
                                    title : '职业模型备注',
                                    align : 'center'
                                },
                                {
                                    title : '操作',
                                    field : 'id',
                                    align : 'center',
                                    cardVisible : false,
                                    formatter : function(value, row, index) {
                                        var e = '<a href="#" mce_href="#" onclick="editInit(\''
                                                + index
                                                + '\',\''
                                                + table
                                                + '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
                                        var d = '<a href="#" mce_href="#" onclick="del(\''
                                                + row.id
                                                + '\',\''
                                                + table
                                                + '\')"><i class="glyphicon glyphicon-remove"/></a> ';
                                        var i = '<a href="#" mce_href="#" onclick="show_prop(\''
                                                + index
                                                + '\',\''
                                                + table
                                                + '\',\''
                                                + row.id
                                                + '\')"><i class="glyphicon glyphicon-user"/></a> ';
                                        var l = '<a href="#" mce_href="#" onclick="control(\''
                                                + row.id
                                                + '\',\''
                                                + table
                                                + '\',\''
                                                + row.name
                                                + '\')"><i class="glyphicon glyphicon-list-alt"/></a> ';
                                        var m = '<a href="#" mce_href="#" onclick="up(\''
                                                + row.id
                                                + '\',\''
                                                + table
                                                + '\',\''
                                                + row.sort
                                                + '\')"><i class="glyphicon glyphicon-chevron-up"/></a> ';
                                        var n = '<a href="#" mce_href="#" onclick="down(\''
                                                + row.id
                                                + '\',\''
                                                + table
                                                + '\',\''
                                                + row.sort
                                                + '\')"><i class="glyphicon glyphicon-chevron-down"/></a> ';
                                        return e + d + i + l + m + n;
                                    }
                                } ]
                    });
}

function show_prop(index, table, id) {
    var row = $('#' + table).bootstrapTable('getData')[index];
    bindForm('from_tree_prop', row);
    var index_main = layer.open({
        type : 1,
        title : '职业展示',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '75%', '85%' ],
        content : $('#div_propTree'),
        success : function(layero, index) {

            var _treeRoot = $('<ul />').addClass('ztree').attr('id',
                    'treePropRoot');
            $('#div_prop').empty().append(_treeRoot).data(row);
            load_tree(row, _treeRoot, table)
        },
        end : function() {

        }
    });

    $('#btn_tree_prop_close').click(function() {
        layer.close(index_main);
    });
}

function load_tree(row, _treeRoot, table) {
    $.post('../../PersonModelController/proptreemain.json', {
        'id' : row['id']
    }, function(d) {
        if (d.status == 1) {
            var setting = {
                check : {
                    enable : true
                },
                data : {
                    simpleData : {
                        enable : true
                    }
                }
            };
            $.fn.zTree.init(_treeRoot, setting, d['data']['list']);
        } else {
            swal('成功信息', d.msg, 'info');
        }
    });
}

$('#btn_tree_prop_submit').click(function() {
    prop_tree('../../PersonModelController/addPropTree.json', table);
});

//表单提交
function prop_tree(url, table) {
    var treeObj = $.fn.zTree.getZTreeObj("treePropRoot");
    var nodes = treeObj.getCheckedNodes();
    var _cp = new Array();
    $.each(nodes, function(i, o) {
        var _p = new Object();
        _p['id'] = o['id'];
        _p['checked'] = o['checked'];
        _cp.push(_p);
    });
    var _postdata = {
            'id' : $('#div_prop').data()['id'],
            'list' : _cp
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : url,
        dataType : "json",
        contentType:'application/json;charset=UTF-8',
        data : JSON.stringify(_postdata),
        success : function(data) {
            layer.closeAll('page');
            layer.close(index);
            swal("授权成功", data['msg'], "success");
            $('#' + table).bootstrapTable('refresh');
        },
        error : function() {
            layer.close(index);
            lrError("授权失败！服务器错误！");
        }
    });
}

// -------------------------------------------------添加操作-------------------------------------------------
function addCategory() {
    
    $("#div_addCategory input[type='text']").val("");

	var index_main = layer.open({
		type : 1,
		title : '添加职业模型分类',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '95%', '95%' ],
		content : $('#div_addCategory'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "信息保存成功", "success");
			$('#table').bootstrapTable('refresh');
		}
	});

	$('#btn_closeCategory').click(function() {
		layer.close(index_main);
	});
	
	$("#addCategory_name").keyup(function(){
	    $("#addCategory_spelling").val(Pinyin.GetQP($("#addCategory_name").val()));
	});
}

function add(id, table) {
    
    $("#div_add input[type='text']").val("");

    $('#categoryId').val(id);

    var index_main = layer.open({
        type : 1,
        title : '添加职业模型详情',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_add'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });

    $('#btn_close').click(function() {
        layer.close(index_main);
    });
    
    $("#add_name").keyup(function(){
        $("#add_spelling").val(Pinyin.GetQP($("#add_name").val()));
    });

}

// -------------------------------------------------添加实现-------------------------------------------------
$('#btn_addCategory').click(function() {
    if (!$('#from_panel_model_addCategory').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/addCategory.json",
        dataType : "json",
        data : $("#from_panel_model_addCategory").serialize(),
        success : function(data) {
            layer.close(index);
            swal("添加成功!", "信息保存成功", "success");
            layer.closeAll('page');
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

$('#btn_add').click(function() {
	if (!$('#from_panel_model_add').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../PersonModelController/add.json",
		dataType : "json",
		data : $("#from_panel_model_add").serialize(),
		success : function(data) {
			layer.close(index);
			swal("添加成功!", "信息保存成功", "success");
            layer.closeAll('page');
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

// -------------------------------------------------修改操作-------------------------------------------------
// 行内修改初始化i
function editInitCategory(index) {
	var row = $('#table').bootstrapTable('getData')[index];
	editCategory(row);
}
function editInit(index, table) {
    var row = $('#' + table).bootstrapTable('getData')[index];
    edit(row, table);
}

function editCategory(row) {
    
    $("#div_updateCategory input[type='text']").val("");

	bindForm('from_panel_model_updateCategory', row);
	var index_main = layer.open({
		type : 1,
		title : '修改职业模型分类信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '80%', '85%' ],
		content : $('#div_updateCategory'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');
		}
	});

	$('#btn_update_closeCategory').click(function() {
		layer.close(index_main);
	});
    
    $("#editCategory_name").keyup(function(){
        $("#editCategory_spelling").val(Pinyin.GetQP($("#editCategory_name").val()));
    });
}

function edit(row, table) {
    
    $("#div_update input[type='text']").val("");

    bindForm('from_panel_model_update', row);
    var index_main = layer.open({
        type : 1,
        title : '修改职业模型信息',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '80%', '85%' ],
        content : $('#div_update'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "活动信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });

    $('#btn_update_close').click(function() {
        layer.close(index_main);
    });
    
    $("#edit_name").keyup(function(){
        $("#edit_spelling").val(Pinyin.GetQP($("#edit_name").val()));
    });
}

// -------------------------------------------------修改实现-------------------------------------------------
$('#btn_update_submitCategory').click(function() {
    if (!$('#from_panel_model_updateCategory').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/updateCategory.json",
        dataType : "json",
        data : $("#from_panel_model_updateCategory").serialize(),
        success : function(data) {
            swal("修改成功", "信息修改成功", "success");
            layer.closeAll('page');
            layer.close(index);

        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

$('#btn_update_submit').click(function() {
	if (!$('#from_panel_model_update').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../PersonModelController/update.json",
		dataType : "json",
		data : $("#from_panel_model_update").serialize(),
		success : function(data) {
			swal("修改成功", "信息修改成功", "success");
			layer.closeAll('page');
			layer.close(index);

		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

// -------------------------------------------------删除操作-------------------------------------------------
function delCategory(id) {
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
				url : "../../PersonModelController/delCategory.json",
				dataType : "json",
				data : {
					"id" : id
				},
				success : function(data) {
					$('#table').bootstrapTable('refresh');
					swal("删除成功", "用户删除成功", "success");
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

function del(id, table) {
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
                url : "../../PersonModelController/del.json",
                dataType : "json",
                data : {
                    "id" : id
                },
                success : function(data) {
                    $('#' + table).bootstrapTable('refresh');
                    swal("删除成功", "用户删除成功", "success");
                    

                },
                error : function() {
                    lrError("删除失败！服务器错误！");
                    layer.close(index);
                }
            });
        }
    });
}

//-------------------------------------------------排序操作-------------------------------------------------
function upCategory(id, sort) {
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../PersonModelController/upUpdateCategory.json",
		dataType : "json",
		data : {
			"id" : id,
			"sort" : sort
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			layer.close(index);
		},
		error : function() {
			lrError("上调失败！服务器错误！");
			layer.close(index);
		}
	});
}
function downCategory(id, sort) {
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../PersonModelController/downUpdateCategory.json",
		dataType : "json",
		data : {
			"id" : id,
			"sort" : sort
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			layer.close(index);
		},
		error : function() {
			lrError("下调失败！服务器错误！");
			layer.close(index);
		}
	});
}

function up(id, table, sort) {
    var index = layer.load(0, {
        shade : false
    });
    ;
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/upUpdate.json",
        dataType : "json",
        data : {
            "id" : id,
            "sort" : sort
        },
        success : function(data) {
            $('#'+table).bootstrapTable('refresh');
            layer.close(index);
        },
        error : function() {
            lrError("上调失败！服务器错误！");
            layer.close(index);
        }
    });
}
function down(id, table, sort) {
    var index = layer.load(0, {
        shade : false
    });
    ;
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/downUpdate.json",
        dataType : "json",
        data : {
            "id" : id,
            "sort" : sort
        },
        success : function(data) {
            $('#'+table).bootstrapTable('refresh');
            layer.close(index);
        },
        error : function() {
            lrError("下调失败！服务器错误！");
            layer.close(index);
        }
    });
}

//-------------------------------------------------控件操作-------------------------------------------------
function control(id, table, name) {
    $('#control_add').click(function() {
        emptyForm('from_control_add');
        addControl(id);
    });
    $('#control_update').click(function() {
        // 获取选中行信息

        var row = $('#table_control').bootstrapTable('getSelections');
        if (row == null || "" == row) {
            swal("初始化失败", "请选择项目", "error");
        } else {
            editControl(row[0]);
        }

    });
    $('#control_del').click(function() {
        // 获取选中行信息
        var row = $('#table_control').bootstrapTable('getSelections');
        if (row == null) {
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
                    delControl(row[0].id);
                }
            });
        }
    });
    
    $("#table_control").bootstrapTable('destroy');
    $('#table_control')
    .bootstrapTable(
            {
                url : '../../PersonModelController/controlmain.json?modelId=' + id,
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
                toolbar : '#toolbar1', // 工具按钮用哪个容器
                sortable : false, // 是否启用排序
                showToggle : true,
                showRefresh : true, // 是否显示刷新按钮
                selectItemName : 'btSelectItem',
                undefinedText : '无数据',
                showExport : true,
                uniqueId : "id",
                clickToSelect : true, // 选择行即选择checkbox
                singleSelect : true, // 仅允许单选
                strictSearch : true,
                idField : 'id',
                queryParams : function(params) {
                    params.teamName = $('#txt_search_team_name').val();
                    return params;
                },
                detailView : true,// 显示子菜单
                detailFormatter : function(index, row) {
                    return '<table id="control-' + index + '"></table>';
                },// 格式化子菜单
                onExpandRow : function(index, row) {
                    show_control('control-' + index, '', row.id, name);
                },
                onDblClickRow : function(index, row) {
                    $('#table_control').bootstrapTable('expandRow', index);
                },// 双击打开
                columns : [
                        {
                            field : 'number',
                            title : '行号',
                            align : 'center',
                            width : 50,
                            radio : true
                        },
                        {
                            title : '模型名称',
                            align : 'center',
                            formatter : function(value, row, index) {
                                return name;
                            }
                        },
                        {
                            field : 'inputControl',
                            title : name + '父模型输入控件',
                            align : 'center',
                            formatter : function(value, row, index) {
                                return  getCodeKey("../../", 'html_property_type', value);
                            }
                        },
                        {
                            field : 'attributeName',
                            title : name + '父模型属性名称',
                            align : 'center'
                        },
                        {
                            title : '操作',
                            field : 'id',
                            align : 'center',
                            cardVisible : false,
                            formatter : function(value, row, index) {
                                var a = '<a href="#" mce_href="#" onclick="addControlZ(\''
                                        + id
                                        + '\',\''
                                        + row.id
                                        + '\',\''
                                        + table
                                        + '\')"><i class="glyphicon glyphicon-plus"/></a> ';
                                var e = '<a href="#" mce_href="#" onclick="editInitControl(\''
                                        + index
                                        + '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
                                var d = '<a href="#" mce_href="#" onclick="delControl(\''
                                        + row.id
                                        + '\')"><i class="glyphicon glyphicon-remove"/></a> ';
                                var m = '<a href="#" mce_href="#" onclick="upControl(\''
                                        + row.id
                                        + '\',\''
                                        + row.personOrder
                                        + '\')"><i class="glyphicon glyphicon-chevron-up"/></a> ';
                                var n = '<a href="#" mce_href="#" onclick="downControl(\''
                                        + row.id
                                        + '\',\''
                                        + row.personOrder
                                        + '\')"><i class="glyphicon glyphicon-chevron-down"/></a> ';
                                return a + e + d + m + n;
                            }
                        } ]
            });
    var index_main = layer.open({
        type : 1,
        title : name + '模型父控件',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_control'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });

    $('#btn_close').click(function() {
        layer.close(index_main);
    });
}

function show_control(table, toolbar, id, name) {
    $('#'+table)
    .bootstrapTable(
            {
                url : '../../PersonModelController/controlZmain.json?pId=' + id,
                striped : true,
                pagination : true,
                method : 'get',
                dataType : "json",
                pageSize : 10,
                pageList : [ 10, 20, 30 ],
                sidePagination : 'server',// 设置为服务器端分页
                pageNumber : 1,
                striped : true, // 是否显示行间隔色
                search : false, // 显示搜索框
                sortable : false, // 是否启用排序
                showToggle : false,
                showRefresh : false, // 是否显示刷新按钮
                selectItemName : 'btSelectItem',
                undefinedText : '无数据',
                showExport : true,
                uniqueId : "id",
                clickToSelect : true, // 选择行即选择checkbox
                singleSelect : true, // 仅允许单选
                strictSearch : true,
                idField : 'id',
                columns : [
                        {
                            field : 'attributeName',
                            title : name + '子模型属性名称',
                            align : 'center'
                        },
                        {
                            field : 'attributeValues',
                            title : name + '子模型属性值',
                            align : 'center'
                        },
                        {
                            title : '操作',
                            field : 'id',
                            align : 'center',
                            cardVisible : false,
                            formatter : function(value, row, index) {
                                var e = '<a href="#" mce_href="#" onclick="editInitControlZ(\''
                                        + index
                                        + '\',\''
                                        + table
                                        + '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
                                var d = '<a href="#" mce_href="#" onclick="delControlZ(\''
                                        + row.id
                                        + '\',\''
                                        + table
                                        + '\')"><i class="glyphicon glyphicon-remove"/></a> ';
                                var m = '<a href="#" mce_href="#" onclick="upControlZ(\''
                                        + row.id
                                        + '\',\''
                                        + row.pId
                                        + '\',\''
                                        + table
                                        + '\',\''
                                        + row.personOrder
                                        + '\')"><i class="glyphicon glyphicon-chevron-up"/></a> ';
                                var n = '<a href="#" mce_href="#" onclick="downControlZ(\''
                                        + row.id
                                        + '\',\''
                                        + row.pId
                                        + '\',\''
                                        + table
                                        + '\',\''
                                        + row.personOrder
                                        + '\')"><i class="glyphicon glyphicon-chevron-down"/></a> ';
                                return e + d + m + n;
                            }
                        } ]
            });
}

//-------------------------------------------------添加操作-------------------------------------------------
function addControl(id) {
    $("#div_control_add input[type='text']").val("");
    
    $('#modelId1').val(id);
    $('#modelId2').val(id);
    
    var index_main = layer.open({
        type : 1,
        title : '添加父模型',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_control_add'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#table_control').bootstrapTable('refresh');
        }
    });
    
    $("#index_main").val(index_main);
    
    $('#btn_control_close').click(function() {
        layer.close(index_main);
    });
}

function addControlZ(modelid, id, table) {
    $("#div_control_Z_add input[type='text']").val("");
    
    $('#pId').val(id);
    $('#modelId2').val(modelid);
    
    var index_main = layer.open({
        type : 1,
        title : '添加子模型',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_control_Z_add'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });
    
    $("#index_main").val(index_main);
    
    $('#btn_control_Z_close').click(function() {
        layer.close(index_main);
    });
}

//-------------------------------------------------添加实现-------------------------------------------------
$('#btn_control_add').click(function() {
    if (!$('#from_control_add').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/addControl.json",
        dataType : "json",
        data : $("#from_control_add").serialize(),
        success : function(data) {
            layer.close($("#index_main").val());
            layer.close(index);
            swal("添加成功!", "信息保存成功", "success");

        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

$('#btn_control_Z_add').click(function() {
    if (!$('#from_control_Z_add').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/addControlZ.json",
        dataType : "json",
        data : $("#from_control_Z_add").serialize(),
        success : function(data) {
            layer.close($("#index_main").val());
            layer.close(index);
            swal("添加成功!", "信息保存成功", "success");
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

//-------------------------------------------------修改操作-------------------------------------------------
// 行内修改初始化i
function editInitControl(index) {
    var row = $('#table_control').bootstrapTable('getData')[index];
    editControl(row);
}

function editInitControlZ(index, table) {
    var row = $('#' + table).bootstrapTable('getData')[index];
    editControlZ(row, table);
}

function editControl(row) {
    
    $("#div_control_update input[type='text']").val("");

    bindForm('from_control_update', row);
    var index_main = layer.open({
        type : 1,
        title : '修改父模型',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '80%', '85%' ],
        content : $('#div_control_update'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "活动信息保存成功", "success");
            $('#table_control').bootstrapTable('refresh');
        }
    });
    
    $("#index_main").val(index_main);

    $('#btn_control_update_close').click(function() {
        layer.close(index_main);
    });
}

function editControlZ(row, table) {
    
    $("#div_control_Z_update input[type='text']").val("");

    bindForm('from_control_Z_update', row);
    var index_main = layer.open({
        type : 1,
        title : '修改子模型',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '80%', '85%' ],
        content : $('#div_control_Z_update'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "活动信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });
    
    $("#index_main").val(index_main);

    $('#btn_control_Z_update_close').click(function() {
        layer.close(index_main);
    });
}

//-------------------------------------------------修改实现-------------------------------------------------
$('#btn_control_update_submit').click(function() {
    if (!$('#from_control_update').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/updateControl.json",
        dataType : "json",
        data : $("#from_control_update").serialize(),
        success : function(data) {
            swal("修改成功", "信息修改成功", "success");
            layer.close($("#index_main").val());
            layer.close(index);

        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

$('#btn_control_Z_update_submit').click(function() {
    if (!$('#from_control_Z_update').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/updateControlZ.json",
        dataType : "json",
        data : $("#from_control_Z_update").serialize(),
        success : function(data) {
            swal("修改成功", "信息修改成功", "success");
            layer.close($("#index_main").val());
            layer.close(index);

        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

//-------------------------------------------------删除操作-------------------------------------------------
function delControl(id) {
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
                url : "../../PersonModelController/delControl.json",
                dataType : "json",
                data : {
                    "id" : id
                },
                success : function(data) {
                    $('#table_control').bootstrapTable('refresh');
                    swal("删除成功", "用户删除成功", "success");
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

function delControlZ(id, table) {
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
                url : "../../PersonModelController/delControlZ.json",
                dataType : "json",
                data : {
                    "id" : id
                },
                success : function(data) {
                    $('#' + table).bootstrapTable('refresh');
                    swal("删除成功", "用户删除成功", "success");
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

//-------------------------------------------------排序操作-------------------------------------------------
function upControl(id, sort) {
    var index = layer.load(0, {
        shade : false
    });
    ;
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/upUpdateControl.json",
        dataType : "json",
        data : {
            "id" : id,
            "personOrder" : sort
        },
        success : function(data) {
            $('#table_control').bootstrapTable('refresh');
            layer.close(index);
        },
        error : function() {
            lrError("上调失败！服务器错误！");
            layer.close(index);
        }
    });
}
function downControl(id, sort) {
    var index = layer.load(0, {
        shade : false
    });
    ;
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/downUpdateControl.json",
        dataType : "json",
        data : {
            "id" : id,
            "personOrder" : sort
        },
        success : function(data) {
            $('#table_control').bootstrapTable('refresh');
            layer.close(index);
        },
        error : function() {
            lrError("下调失败！服务器错误！");
            layer.close(index);
        }
    });
}

function upControlZ(id, pId, table, sort) {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/upUpdateControlZ.json",
        dataType : "json",
        data : {
            "id" : id,
            "pId" : pId,
            "personOrder" : sort
        },
        success : function(data) {
            $('#' + table).bootstrapTable('refresh');
            layer.close(index);
        },
        error : function() {
            lrError("上调失败！服务器错误！");
            layer.close(index);
        }
    });
}
function downControlZ(id, pId, table, sort) {
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/downUpdateControlZ.json",
        dataType : "json",
        data : {
            "id" : id,
            "pId" : pId,
            "personOrder" : sort
        },
        success : function(data) {
            $('#' + table).bootstrapTable('refresh');
            layer.close(index);
        },
        error : function() {
            lrError("下调失败！服务器错误！");
            layer.close(index);
        }
    });
}