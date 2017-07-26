$(function() {
    $('#add').click(function() {
        addType();
    });
    $('#update').click(function() {
        // 获取选中行信息
        var row = $('#table').bootstrapTable('getSelections');
        if (row == null || "" == row) {
            swal({
                title : "初始化失败!",
                text : "请选择分组!",
                type : "error",
                confirmButtonText : "确定"
            });
        } else {
            editType(row[0]);
        }
    });

    $('#del').click(function() {
        // 获取选中行信息
        var row = $('#table').bootstrapTable('getSelections');
        if (row == null) {
            swal("删除失败", "请选择分组", "error");
        } else {
            swal({
                title : "确定到删除",
                text : "确定要删除该分组，删除后将无法回复",
                type : "warning",
                showCancelButton : true,
                confirmButtonColor : "#DD6B55",
                confirmButtonText : "确定",
                cancelButtonText : "取消",
                closeOnConfirm : true,
                closeOnCancel : true
            }, function(isConfirm) {
                if (isConfirm) {
                    delType(row[0].id);
                }
            });
        }
    });

    // 加载数据
    $('#table')
            .bootstrapTable(
                    {
                        url : '../../layMatchController/arrangeAgorithmType.json',
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
                                {
                                    field : 'number',
                                    title : '行号',
                                    align : 'center',
                                    width : 50,
                                    checkbox : true
                                },
                                {
                                    field : 'title',
                                    title : '类型标题',
                                    align : 'center',
                                    sortable : true,

                                },
                                {
                                    field : 'id',
                                    title : '操作',
                                    align : 'center',
                                    cardVisible : false,
                                    formatter : function(value, row, index) {
                                        var a = '<a href="#"  style="margin-right: 10px;"  onclick="add(\''
                                                + row.id
                                                + '\',\''
                                                + table
                                                + '\')"><i class="glyphicon glyphicon-plus"/></a> ';
                                        var e = '<a href="#"  style="margin-right: 10px;"  onclick="editInitType(\''
                                                + index
                                                + '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
                                        var d = '<a href="#" mce_href="#" onclick="delType(\''
                                                + value
                                                + '\')"><i class="glyphicon glyphicon-remove"/></a> ';
                                    return a + e + d;
                                    }
                                } ],

                    });

});

function show_main(table, toolbar, id) {
 // 加载数据
    $('#' + table)
            .bootstrapTable(
                    {
                        url : '../../layMatchController/arrangeAgorithm.json?typeId=' + id,
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
                        sortable : false,// 是否启用排序
                        showColumns : false,
                        showToggle : false,
                        showRefresh : false, // 是否显示刷新按钮
                        selectItemName : 'btSelectItem',
                        columns : [
                                {
                                    align : 'center',
                                    width : 50,
                                    checkbox : true
                                },
                                {
                                    field : 'title',
                                    title : '算法标题',
                                    align : 'center',
                                    sortable : true,

                                },
                                {
                                    field : 'useTeamNum',
                                    title : '使用队伍数',
                                    align : 'center',
                                    sortable : true
                                },
                                {
                                    field : 'id',
                                    title : '操作',
                                    align : 'center',
                                    cardVisible : false,
                                    formatter : function(value, row, index) {
                                        var e = '<a href="#"  style="margin-right: 10px;"  onclick="editInit(\''
                                                + index
                                                + '\',\''
                                                + table
                                                + '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
                                        var d = '<a href="#" mce_href="#" onclick="del(\''
                                                + value
                                                + '\',\''
                                                + table
                                                + '\')"><i class="glyphicon glyphicon-remove"/></a> ';
                                    return e + d;
                                    }
                                } ],

                    });
}

//-------------------------------------------------添加操作-------------------------------------------------
function addType() {
    $("#div_add_arrange_type input[type='text']").val("");

    var index_main = layer.open({
        type : 1,
        title : '添加编排分类',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_add_arrange_type'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#table').bootstrapTable('refresh');
        }
    });

    $('#btn_add_close_type').click(function() {
        layer.close(index_main);
    });
}

function add(id, table) {
    $("#div_add_arrange input[type='text']").val("");
    $("#typeId").val(id);

    var index_main = layer.open({
        type : 1,
        title : '添加编排算法',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_add_arrange'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });

    $('#btn_add_close').click(function() {
        layer.close(index_main);
    });
}

//-------------------------------------------------添加实现-------------------------------------------------
$('#btn_add_type').click(function() {
    if (!$('#from_arrange_add_type').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../layMatchController/addArrangeType.json",
        dataType : "json",
        data : $("#from_arrange_add_type").serialize(),
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
    if (!$('#from_arrange_add').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../layMatchController/addArrange.json",
        dataType : "json",
        data : $("#from_arrange_add").serialize(),
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

//-------------------------------------------------修改操作-------------------------------------------------
//行内修改初始化i
function editInitType(index) {
    var row = $('#table').bootstrapTable('getData')[index];
    editType(row);
}

//行内修改初始化i
function editInit(index, table) {
    alert(table);
    var row = $('#' + table).bootstrapTable('getData')[index];
    edit(row, table);
}

function editType(row) {
    $("#div_edit_arrange_type input[type='text']").val("");

    bindForm('from_arrange_edit_type', row);
    var index_main = layer.open({
        type : 1,
        title : '修改编排分类',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '80%', '85%' ],
        content : $('#div_edit_arrange_type'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "活动信息保存成功", "success");
            $('#table').bootstrapTable('refresh');
        }
    });

    $('#btn_edit_close').click(function() {
        layer.close(index_main);
    });
}

function edit(row, table) {
    $("#div_edit_arrange input[type='text']").val("");

    bindForm('from_arrange_edit', row);
    var index_main = layer.open({
        type : 1,
        title : '修改编排算法',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '80%', '85%' ],
        content : $('#div_edit_arrange'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "活动信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });

    $('#btn_edit_close').click(function() {
        layer.close(index_main);
    });
}

//-------------------------------------------------修改实现-------------------------------------------------
$('#btn_edit_type').click(function() {
    if (!$('#from_arrange_edit_type').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../layMatchController/editArrangeType.json",
        dataType : "json",
        data : $("#from_arrange_edit_type").serialize(),
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

$('#btn_edit').click(function() {
    if (!$('#from_arrange_edit').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../layMatchController/editArrange.json",
        dataType : "json",
        data : $("#from_arrange_edit").serialize(),
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

//-------------------------------------------------删除操作-------------------------------------------------
function delType(id) {
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
                url : "../../layMatchController/delArrangeType.json",
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
                url : "../../layMatchController/delArrange.json",
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