$(function() {
	
    getCodes("../../", 'person_flag', 'personflag');// 赋予字典值
    getCodes("../../", 'person_flag', 'personflag1');// 赋予字典值
	
    $('#addProp').click(function() {
        emptyForm('from_panel_model_addProp');
        addProp();
    });
    $('#updateProp').click(function() {
        // 获取选中行信息

        var row = $('#table').bootstrapTable('getSelections');
        if (row == null || "" == row) {
            swal("初始化失败", "请选择项目", "error");
        } else {
            editProp(row[0]);
        }

    });
    $('#delProp').click(function() {
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
                    delProp(row[0].id);
                }
            });
            // del(row[0].id);
        }
    });

    // 加载数据
    $('#table')
            .bootstrapTable(
                    {
                        url : '../../PersonModelController/propmain.json',
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
                                    title : '职业名称',
                                    align : 'center'
                                },
                                {
                                    field : 'personflag',
                                    title : '职业类型',
                                    align : 'center',
                                    formatter : function(value, row, index) {
										return '<span class="see_sign">'+getCodeKey("../../", 'person_flag', value)+'</span>';
									}
                                },
                                {
                                    field : 'createTime',
                                    title : '创建时间',
                                    align : 'center'
                                },
                                {
                                    field : 'remark',
                                    title : '职业备注',
                                    align : 'center'
                                },
                                {
                                    title : '操作',
                                    field : 'id',
                                    align : 'center',
                                    cardVisible : false,
                                    formatter : function(value, row, index) {
                                        var e = '<a href="#" mce_href="#" onclick="editInitProp(\''
                                                + index
                                                + '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
                                        var d = '<a href="#" mce_href="#" onclick="delProp(\''
                                                + row.id
                                                + '\')"><i class="glyphicon glyphicon-remove"/></a> ';
                                        var m = '<a href="#" mce_href="#" onclick="upProp(\''
                                                + row.id
                                                + '\',\''
                                                + row.sort
                                                + '\')"><i class="glyphicon glyphicon-chevron-up"/></a> ';
                                        var n = '<a href="#" mce_href="#" onclick="downProp(\''
                                                + row.id
                                                + '\',\''
                                                + row.sort
                                                + '\')"><i class="glyphicon glyphicon-chevron-down"/></a> ';
                                        return e + d + m + n;
                                    }
                                } ]
                    });
});

// -------------------------------------------------添加操作-------------------------------------------------
function addProp() {
    
    $("#div_addProp input[type='text']").val("");

    var index_main = layer.open({
        type : 1,
        title : '添加职业模型分类',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_addProp'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#table').bootstrapTable('refresh');
        }
    });

    $('#btn_closeProp').click(function() {
        layer.close(index_main);
    });
    
    $("#addProp_name").keyup(function(){
        $("#addProp_spelling").val(Pinyin.GetQP($("#addProp_name").val()));
    });
}

// -------------------------------------------------添加实现-------------------------------------------------
$('#btn_addProp').click(function() {
    if (!$('#from_panel_model_addProp').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/addProp.json",
        dataType : "json",
        data : $("#from_panel_model_addProp").serialize(),
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
function editInitProp(index) {
    var row = $('#table').bootstrapTable('getData')[index];
    editProp(row);
}

function editProp(row) {
    
    $("#div_updateProp input[type='text']").val("");

    bindForm('from_panel_model_updateProp', row);
    var index_main = layer.open({
        type : 1,
        title : '修改职业模型分类信息',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '80%', '85%' ],
        content : $('#div_updateProp'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "活动信息保存成功", "success");
            $('#table').bootstrapTable('refresh');
        }
    });

    $('#btn_update_closeProp').click(function() {
        layer.close(index_main);
    });
    
    $("#editProp_name").keyup(function(){
        $("#editProp_spelling").val(Pinyin.GetQP($("#editProp_name").val()));
    });
}

// -------------------------------------------------修改实现-------------------------------------------------
$('#btn_update_submitProp').click(function() {
    if (!$('#from_panel_model_updateProp').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/updateProp.json",
        dataType : "json",
        data : $("#from_panel_model_updateProp").serialize(),
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
function delProp(id) {
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
                url : "../../PersonModelController/delProp.json",
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

//-------------------------------------------------排序操作-------------------------------------------------
function upProp(id, sort) {
    var index = layer.load(0, {
        shade : false
    });
    ;
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/upUpdateProp.json",
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
function downProp(id, sort) {
    var index = layer.load(0, {
        shade : false
    });
    ;
    $.ajax({
        type : "POST",
        url : "../../PersonModelController/downUpdateProp.json",
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