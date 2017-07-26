var Project_Id = $.session.get("Project_Id");
var Racing_Id = $.session.get("Racing_Id");
var personFlag = $.session.get("personFlag");
var teamSign = $.session.get("teamSign");
var teamFlag = $.session.get("teamFlag");
var occupationId = $.session.get("occupationId");
$.session.remove('Project_Id');
$.session.remove('Racing_Id');
var plan = 0;
//var Project_Id = undefined;
//var Racing_Id = "1";
var number = 0;
var teamNumber = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50);
var index = layer.load(0, {
    shade : false
});
$(function() {
    $("#projectId").val(Project_Id);
    $("#racingId").val(Racing_Id);
    
    $("#AffirmApply").removeClass("btn-primary").addClass('btn-default');
    $("#AffirmApply").attr("disabled", true);
    
    if (personFlag == "1") {
        $("#AffirmApply").text("").append('<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;球员无法进行报名');
    } else if (personFlag == "2" && teamSign == "0") {
        $("#AffirmApply").text("").append('<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;普通教练无法进行报名');
    } else if (personFlag == "3") {
        $("#AffirmApply").text("").append('<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;裁判无法进行报名');
    } else if (personFlag == "5") {
        $("#AffirmApply").text("").append('<i class="glyphicon glyphicon-check glyphicon-icon-fw"></i>&nbsp;主办方无法进行报名');
    }
    
    // 获取赛事项目信息
    $.ajax({
        url : '../../ssCompetitionApply/findCompetitionMessage.json',
        type : 'POST',
        dataType : 'JSON',
        data : {id : Project_Id},
        success : function(data) {
            var imgStr = "";
            // 图片列表
            if (data.data.obj != undefined) {
                $("#imgStr").children().remove();
                $("#carousel-indicators").children().remove();
                var liStr = "";
                if (data.data.obj.propagateUrlPhoto != undefined) {
                    var datas= new Array(); //定义一数组 
                    datas = data.data.obj.propagateUrlPhoto.split("|");
                    $.each(datas, function(index, value) {
                        if (index == 0) {
                            imgStr = imgStr
                                    +'<div class="item active">'
                                    +'  <img class="ssxct_pic" src="' + value + '">'
                                    +'</div>';
                        } else {
                            imgStr = imgStr
                                    +'<div class="item">'
                                    +'  <img class="ssxct_pic" src="' + value + '">'
                                    +'</div>';
                        }
                        
                        if (number == 0) {
                            liStr = liStr + '<li data-target="#carousel-example-generic" data-slide-to="' + number + '" class="active"></li>';
                        } else {
                            liStr = liStr + '<li data-target="#carousel-example-generic" data-slide-to="' + number + '"></li>';
                        }
                        number++;
                    });
                } else {
                    imgStr = 
                            '<div class="item active">'
                            +'  <img class="ssxct_pic" src="../../img/zanwu.jpg">'
                            +'</div>';
                }
                $("#imgStr").append(imgStr);
                $("#carousel-indicators").append(liStr);
            
                if (data.data.obj.matchState == "1") {
                    plan = 25;
                    $("#make_preparations").show();
                } else if (data.data.obj.matchState == "2") {
                    plan = 50;
                    $("#make_apply").show();
                } else if (data.data.obj.matchState == "3") {
                    plan = 75;
                    $("#apply_over").show();
                }
                
                if (data.data.obj.matchIntroduce != undefined) {
                    $("#infor").text("").append(data.data.obj.racingIntroduce);
                }
            }
        }
    });
    
    $.ajax({
        url : '../../ssCompetitionApply/findRacingMessage.json',
        type : 'POST',
        dataType : 'JSON',
        data : {
            id : Racing_Id,
            projectId : Project_Id
        },
        success : function(data1) {
            var imgStr = "";
            var liStr = "";
            // 图片列表
            if (data1.data.obj != undefined) {
                
                if (Project_Id == undefined) {
                    $("#imgStr").children().remove();
                    $("#carousel-indicators").children().remove();
                    if (data1.data.obj.racingIntroduce != undefined) {
                        $("#infor").text("").append(data1.data.obj.racingIntroduce);
                    }
                }
                
                if (data1.data.obj.racingPic != undefined) {
                    var datas= new Array(); //定义一数组 
                    datas = data1.data.obj.racingPic.split("|");
                    
                    $.each(datas, function(index, value) {
                        if (Project_Id == undefined) {
                            if (index == 0) {
                                imgStr = imgStr
                                        +'<div class="item active">'
                                        +'  <img class="ssxct_pic" src="' + value + '">'
                                        +'</div>';
                            } else {
                                imgStr = imgStr
                                        +'<div class="item">'
                                        +'  <img class="ssxct_pic" src="' + value + '">'
                                        +'</div>';
                            }
                            if (number == 0) {
                                liStr = liStr + '<li data-target="#carousel-example-generic" data-slide-to="' + number + '" class="active"></li>';
                            } else {
                                liStr = liStr + '<li data-target="#carousel-example-generic" data-slide-to="' + number + '"></li>';
                            }
                        } else {
                            imgStr = imgStr
                                    +'<div class="item">'
                                    +'  <img class="ssxct_pic" src="' + value + '">'
                                    +'</div>';
                            liStr = liStr + '<li data-target="#carousel-example-generic" data-slide-to="' + number + '"></li>';
                        }
                        number++;
                    });
                } else {
                    if (Project_Id == undefined) {
                        imgStr = 
                            '<div class="item active">'
                            +'  <img class="ssxct_pic" src="../../img/zanwu.jpg">'
                            +'</div>';
                        liStr = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
                    }
                }
                $("#imgStr").append(imgStr);
                $("#carousel-indicators").append(liStr);
                
                var racingType = "未知类型";
                if (data1.data.obj.racingType != undefined) {
                    if (data1.data.obj.racingType == 1) {
                        racingType = "公开赛";
                    } else {
                        racingType = "邀请赛";
                    }
                }
                
                var cutOffDateTime = new Date(data1.data.obj.cutOffDate.replace("-", "/").replace("-", "/"));
                if (cutOffDateTime > new Date() && data1.data.obj.matchState !="4") {
                    $("#make_apply").show();
                    plan = 75;
                    
                    var racingdata = new Array(); //定义一数组
                    racingdata = data1.data.obj.racingData.split(",");
                    
                    $("#racingData").val(data1.data.obj.racingData);
                    $("#racingData1").val(data1.data.obj.racingData);
                    
                    if (teamSign == 1 || teamSign == 2) {
                        $("#AffirmApply").removeClass("btn-default").addClass('btn-primary');
                        $("#AffirmApply").attr("disabled", false);
                        // 获取竞赛规格信息
                        $.ajax({
                            url : '../../ssCompetitionApply/findSpecsMessage.json',
                            type : 'POST',
                            dataType : 'JSON',
                            data : {racingId : data1.data.obj.id},
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
                                            +'  <div class="Prefer">'
                                            +'      <!-- 首选项 -->'
                                            +'      <div class="btn-group" data-toggle="buttons" id="Prefer">';
                                        $.each(datas.selData, function(index, value) {
                                            if (index == datas.selData.length-1) {
                                                Str = Str + '<label class="btn btn-info btn-outline" id="' + value.selData + '" onchange="specs_product(this)"><input type="radio" required name="radioList'+datas.specId+'" id="radioList" autocomplete="off" value="' + value.selData + '" >' + value.selData + '</label><label for="radioList'+datas.specId+'" class="error"></label>';
                                            } else {
                                                Str = Str + '<label class="btn btn-info btn-outline" id="' + value.selData + '" onchange="specs_product(this)"><input type="radio" required name="radioList'+datas.specId+'" id="radioList" autocomplete="off" value="' + value.selData + '" >' + value.selData + '</label>';
                                            }
                                        });
                                        Str = Str
                                            +'      </div>'
                                            +'  </div>'
                                            +'</div>'
                                            +'</div>';
                                    });
                                }
                                $("#specslist").append(Str);
                            }
                        });
                    } else {
                        $("#AffirmApply").attr("disabled", true);
                    }
                    
//                  // 通过规格ID获取竞赛产品信息
//                  $.ajax({
//                      url : '../../ssCompetitionApply/findCompetitionProductBySpecsId.json',
//                      type : 'POST',
//                      dataType : 'JSON',
//                      data : {},
//                      success : function(data) {
//                          
//                      }
//                  });
                } else {
                    $("#apply_over").show();
                    plan = 100;
                }
            
                var topStr = 
                    '           <h2>' + isUndefined(data1.data.obj.racingName,"String") + '</h2>'
                    +'          <div class="selid_infor label label-warning"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;温馨提示：手机用户也可以直接报名，让报名更加方便。</div>'
//                  +'          <p>赛事类型：' + racingType + '</p>'
                    +'          <p>赛事地址：' + isUndefined(data1.data.obj.competitionSite,"String") + '</p>'
                    +'          <p>报名截止：<span style="color:#ff4a00;">'+isUndefined(data1.data.obj.cutOffDate,"String")+'</span></p>'
                    +'          <p>比赛时间：<span style="color: #ff4a00;">' + isUndefined(data1.data.obj.racingBeginTime,"String") + '</span>&nbsp;~&nbsp;<span style="color: #ff4a00;">' + isUndefined(data1.data.obj.racingEndTime,"String") + '</span></p>'
                    +'          <p>主办方：'+isUndefined(data1.data.obj.sponsorName,"String")+'</p>';
                if (personFlag == "4" || personFlag == "5") {
                    topStr = topStr +'<p>主办方联系电话：'+isUndefined(data1.data.obj.mainOrganizersPhoneNumber,"String")+'（<span style="color:#ff4a00;">仅球队管理者及主办方能看到</span>）</p>';
                }
                topStr = topStr +'<p>座机号码：'+isUndefined(data1.data.obj.specialPlane,"String")+'</p>'
                    +'          <p>报名截止：<span style="color: #ff4a00;">' + isUndefined(data1.data.obj.cutOffDate,"String") + '</span></p>'
                    +'          <div class="clearfix Event_processbar">'
                    +'              <div class="clearfix event_processtit">'
                    +'                  <div class="processtit_box processed">赛事组织</div>'
                    +'                  <div class="processtit_box processed">赛事发布</div>'
                    +'                  <div class="processtit_box processing"><i class="iconfont icon-wodebisai"></i>&nbsp;报名中</div>'
                    +'                  <div class="processtit_box"><i class="iconfont icon-icon"></i>&nbsp;报名结束</div>'
                    +'              </div>'
                    +'              <div class="clearfix progress">'
                    +'                <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75" style="width:'+plan+'%"></div>'
                    +'              </div>'
                    +'          </div>';
            $("#top").append(topStr);
            layer.close(index);
            }
            
        }
    });
    
    $("#AffirmApply").click(function() {
        if (!$('#form-horizontal').valid()) {
            lrError("请输入必填项！");
            return;
        }
        var index = layer.load(0, {
            shade : false
        });
        $.ajax({
            url : '../../ssCompetitionApply/affirmApply.json',
            type : 'POST',
            dataType : 'JSON',
            data : $("#form-horizontal").serialize(),
            success : function(data) {
                if (data.status == 1) {
                    layer.close(index);
                    var index_main = layer.open({
                        type : 1,
                        title : '添加报名球员',
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
                } else {
                    layer.close(index);
                    swal({
                        title : data.msg,
                        type : "error",
                        confirmButtonText : "确定"
                    });
                }
            },
            error : function() {
                layer.close(index);
                lrError("报名失败！服务器错误！");
            }
        });
    });
    
    $("#btn_addTeamPerson").click(function() {
        var teamNameStr = $("#teamNameStr").val();
        if (teamNameStr != "" && teamNameStr != undefined) {
            var index = layer.load(0, {
                shade : false
            });
            
            $.ajax({
                url : '../../ssCompetitionApply/addApply.json',
                type : 'POST',
                dataType : 'JSON',
                data : $("#form-person").serialize(),
                success : function(data) {
                    if (data.status == 1) {
                        layer.close(index);
                        swal("报名成功!", data.msg, "success");
                        layer.closeAll('page');
                    } else {
                        layer.close(index);
                        swal("报名失败!", data.msg, "error");
                        layer.closeAll('page');
                    }
                },
                error : function() {
                    layer.close(index);
                    lrError("报名失败！服务器错误！");
                }
            });
        }
    });

    isTable();
    isTable2();
});
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
        url : '../../ssCompetitionApply/competitionProduct.json',
        type : 'POST',
        dataType : 'JSON',
        data : $("#form-horizontal").serialize(),
        success : function(data) {
            if(data.data.map.applyFlag == 1) {
                $("#AffirmApply").removeClass("btn-primary").addClass('btn-default');
                $("#AffirmApply").attr("disabled", true);
            } else {
                $("#AffirmApply").removeClass("btn-default").addClass('btn-primary');
                $("#AffirmApply").attr("disabled", false);
            }
            $("#money").text("").append(data.data.map.money);
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
                        +'  <div class="Prefer">'
                        +'      <!-- 首选项 -->'
                        +'      <div class="btn-group" data-toggle="buttons" id="Prefer">';
                    $.each(data.data.list, function(index2, value2) {
                        if (value1.specId == value2.specId) {
                            if (value2.radioFlag == 1) {
                                Str = Str + '<label class="btn btn-default btn-outline div_disabled" id="' + value2.selData + '"><input type="radio" required name="radioList'+value2.specId+'" id="radioList" autocomplete="off" value="' + value2.selData + '" disabled="disabled">' + value2.selData + '</label>';
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
                        +'      </div>'
                        +'  </div>'
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
    
    $.ajax({
        type : "POST",
        url : "../../personInfoController/personInfoByUserId.json",
        success : function(data) {
            var Str = "";
            $("#cyList").children().remove();
            $("#fcyList").children().remove();
            teamNumber = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50);
            
            $.each(data.data.list, function(index, value) {
                Str = Str
                    +'<li class="clearfix">'
                    +'<div class="am-checkbox an_span" id="1" onclick="add_or_del(this, \'' + value.id + '\')">'
                    +'   <img class="am-circle am-img-thumbnail am-inline-block" src="' + value.personPic + '">'
                    +'    <span class="am-inline-block xz_player">' + value.personName + '</br><span class="am-badge am-badge-primary am-square">' + isUndefined(value.attribute_values,"int") + '</span><span class="am-badge am-badge-secondary am-square" id="span_' + value.id + '" >' + isUndefined(value.personNumber,"int") + '号</span><div id="div_' + value.id + '" style="display: none;"><input type="number" id="number_' + value.id + '" name="number_' + value.id + '" min="0" value="' + isUndefined(value.personNumber,"int")  + '" onblur="addPersonNumber(this, \'' + value.id + '\')" /></div></span>'
                    +'    <span class="am-btn am-btn-success am-radius am-fr am-btn-xs an_add addCy_single" id="' + value.id + '">添加</span>'
                    +'    <span class="am-btn am-btn-danger am-radius am-fr am-btn-xs an_add an_del" id="' + value.id + '">取消</span>'
                    +'</div>'
                    +'</li>';
            });
            $("#cyList").append(Str);
            $(".an_del").hide();
            layer.close(index);
        },
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}

//=============================================【START】选择球员【START】========================================================
var numberStr = '';
// 单次添加成员
function add_or_del(tjthis, id) {
    if (tjthis.id == "1") {
        var Num = $("#span_" + id).text();
        if (Num != 0) {
            Num = Num.substring(0, Num.length-1);
        }
        numberStr = '<select class="xlqybh" data-am-selected id="teamNumber">';
        $.each(teamNumber, function(index, value) {
            if (Num == value) {
                numberStr = numberStr + '<option value="' + value + '" selected>' + value + '</option>';
            } else {
                numberStr = numberStr + '<option value="' + value + '">' + value + '</option>';
            }
        });
        numberStr = numberStr + '</select>';
        var teamNum = 0;
        swal({
            title: "确认该队员球衣号码!",
            text: numberStr,
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            confirmButtonText : "确定",
            cancelButtonText : "取消",
            html: true
        },
        function (isConfirm) {
            if (isConfirm) {
                teamNum = $("#teamNumber").val();
                $("#number_" + id).val(teamNum);
                teamNumber.splice($.inArray(Number(teamNum), teamNumber), 1);
                numberStr = '<select class="xlqybh" data-am-selected id="teamNumber">';
                $.each(teamNumber, function(index, value) {
                    numberStr = numberStr + '<option value="' + value + '">' + value + '</option>';
                });
                numberStr = numberStr + '</select>';
                var Str = $("#teamNameStr").val();
                if (Str == "") {
                    Str = Str + id;
                } else {
                    Str = Str + "," + id;
                }
                $("#teamNameStr").val(Str);
                $("#span_" + id).text("").append(teamNum + "号");
                $(tjthis).parent().appendTo($("#fcyList"));
                $("#fcyList li .an_del").show();
                $("#fcyList li .addCy_single").hide();
                tjthis.id=2;
            }
            swal.close();
        });
    } else {
        $("#number_" + id).val();
        var spanName = $("#span_" + id).text();
        if (spanName != 0) {
            spanName = spanName.substring(0, spanName.length-1);
            if ($.inArray(Number(spanName), teamNumber) == -1) {
                teamNumber.push(Number(spanName));
                teamNumber.sort(function(a, b) {
                    return a - b;
                });
                numberStr = '<select class="xlqybh" data-am-selected id="teamNumber">';
                $.each(teamNumber, function(index, value) {
                    numberStr = numberStr + '<option value="' + value + '">' + value + '</option>';
                });
                numberStr = numberStr + '</select>';
            }
        }
        
        var Str = $("#teamNameStr").val();
        if (Str != undefined && Str != "") {
            var data = Str.split(",");
            data.splice($.inArray(id, data), 1);
            Str = data.join(",");
        }
        $("#teamNameStr").val(Str);
        $("#span_" + id).text("").append("0号");
        $(tjthis).parent().appendTo($("#cyList"));
        $("#cyList li .an_del").hide();
        $("#cyList li .addCy_single").show();
        tjthis.id=1;
    }
}

//=============================================【END】选择球员【END】========================================================

function personNumber(row, id) {
    var numberStr = "";
    $("#div_" + id).show();
    if (row.value != 0) {
        if ($.inArray(row.value, teamNumber) == -1) {
            teamNumber.push(row.value);
            teamNumber.sort(function(a, b) {
                return a - b;
            });
            numberStr = '<select class="xlqybh" data-am-selected id="teamNumber">';
            $.each(teamNumber, function(index, value) {
                numberStr = numberStr + '<option value="' + value + '">' + value + '</option>';
            });
            numberStr = numberStr + '</select>';
        }
    }
}

function addPersonNumber(row, id) {
    var numberStr = "";
    teamNumber.splice($.inArray(Number(row.value), teamNumber), 1);
    numberStr = '<select class="xlqybh" data-am-selected id="teamNumber">';
    $.each(teamNumber, function(index, value) {
        numberStr = numberStr + '<option value="' + value + '">' + value + '</option>';
    });
    numberStr = numberStr + '</select>';
    $("#span_" + id).text("").append(row.value + "号");
    $("#div_" + id).hide();
}

//**********************************************************************************下方产品列表（球队）************************************************************************************
function isTable(){
    $.ajax({
        url : '../../ssRacingProductController/findProductByUser.json',
        type : 'POST',
        dataType : 'JSON',
        data :{racingId:Racing_Id},
        success : function(data) {
            $.each(data.data.list,function(k,v){
                var s = '<div role="tabpanel" class="tab-pane" id="Pro'+v.id+'"><ul  class="list-inline clearfix teams-list"></ul></div>';
                var str = '<li><a class="am-btn am-btn-sm am-btn-default" href="#Pro'+v.id+'" role="tab" data-toggle="tab">'+v.productName+'</a></li>';
                $('#isDetails').append(s);
                $('#productUl').append(str);
                queryTeam(v.id,Racing_Id);
            });
            $('#productUl li').eq(1).addClass("active");
            $('#isDetails div').eq(0).addClass("active");
        },
        error : function() {
            lrError("服务器错误！");
        }
    });
}

//**********************************************************************************下方产品列表************************************************************************************
function isTable2(){
    $.ajax({
        url : '../../ssRacingProductController/findProductByUser.json',
        type : 'POST',
        dataType : 'JSON',
        data :{racingId:Racing_Id},
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
        },
        error : function() {
            lrError("服务器错误！");
        }
    });
}

//**********************************************************************************获取已报名的球队************************************************************************************************
function queryTeam(product_id){
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
                            +'              <a class="btn cherk1 join_cherk" onclick="temdetails('+v.team_id+','+product_id+','+Racing_Id+')">查看详情</a>'
                            +'          </div>'
                            +'      </div>'
                            +'  </div>'
                            +'</li>';
                    $("#Pro"+product_id+" ul").append(str);
                });
            },
            error : function() {
                lrError("服务器错误！");
            }
        });
}


//*******************************************************************************获取裁判姓名***********************************************************************************************
function queryRefereeName(product_id){
     $.ajax({
            url : '../../ssRacingProductSignController/queryrefereeList.json',
            type : 'POST',
            dataType : 'JSON',
            data :{productId:product_id},
            success : function(data) {
                noMessages(data.data.list,'Aro'+product_id,"--此项目目前还没有裁判");
                $.each(data.data.list,function(k,v){
                    var str = '<div class="am-u-sm-3 text-center pull-left" onclick="refdetails('+v.referee_id+')">'
                            +'      <a href="javascript:;" class="clearfix">'
                            +'          <img class="am-img-thumbnail Pro_team am-circle" src='+v.referee_pic+' alt=""/>'
                            +'          <h3 class="am-thumbnail-caption Pro_teamname">'+v.referee_name+'</h3>'
                            +'      </a>'
                            +'  </div>';
                    $('#Aro'+product_id).append(str);
                });
            },
            error : function() {
                lrError("服务器错误！");
            }
        });
}

//********************************************************************************裁判详情**********************************************************************************
function refdetails(id){
    $.cookie("referee_id",id,{expires: 7,path: '/'});
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

