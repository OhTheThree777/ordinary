var ue;
var head_portrait = $.session.get("head_portrait");
var user_name = $.session.get("user_name");
$(function () {
//    alert(head_portrait);
    getCodes('../../', 'education_background', 'education', '4');
    getCodes('../../', 'political_type', 'politicalLandscape', '4');
    getCodes('../../', 'nation', 'nation', '1');
    getCodes('../../', 'foreign_grade', 'language', '5');
    getCodes('../../', 'fixed_size', 'clothingSize', '2');
    getCodes('../../', 'footwear_size', 'shoeSize', '38');
    $("#headPortrait").val(head_portrait);
    $("#add_pic").attr("src", head_portrait);
    $("#name").val(user_name);
//    laydate({
//        elem: '#birthday', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
//        event: 'focus' //响应事件。如果没有传入event，则按照默认的click
//    });
    ue = UE.getEditor('body');
    
    // province;
    // proSchool;
    // 学校名称 激活状态
    $("#schoolName").focus(function() {
                var top = $(this).position().top + $(this).height() + 2;
                var left = $(this).position().left;
                $("div[class='provinceSchool']").css({
                            top : top,
                            left : left
                        });
                $("div[class='provinceSchool']").show("slow");
            });
    // 初始化省下拉框
    var provinceArray = "";
    var provicneSelectStr = "";
    for (var i = 0, len = province.length; i < len; i++) {
        provinceArray = province[i];
        provicneSelectStr = provicneSelectStr + "<option value='"
                + provinceArray[0] + "'>" + provinceArray[1]
                + "</option>"
    }
    $("div[class='proSelect'] select").html(provicneSelectStr);
    // 初始化学校列表
    var selectPro = $("div[class='proSelect'] select").val();
    var schoolUlStr = "";
    var schoolListStr = new String(proSchool[selectPro]);
    var schoolListArray = schoolListStr.split(",");
    var tempSchoolName = "";
    for (var i = 0, len = schoolListArray.length; i < len; i++) {
        tempSchoolName = schoolListArray[i];
        if (tempSchoolName.length > 13) {
            schoolUlStr = schoolUlStr
                    + "<li class='DoubleWidthLi' title="
                    + schoolListArray[i] + ">" + schoolListArray[i]
                    + "</li>"
        } else {
            schoolUlStr = schoolUlStr + "<li>" + schoolListArray[i]
                    + "</li>"
        }
    }
    $("div[class='schoolList'] ul").html(schoolUlStr);
    // 省切换事件
    $("div[class='proSelect'] select").change(function() {
        if ("99" != $(this).val()) {
            $("div[class='proSelect'] span").show();
            $("div[class='proSelect'] input").hide();
            schoolUlStr = "";
            schoolListStr = new String(proSchool[$(this).val()]);
            schoolListArray = schoolListStr.split(",");
            for (var i = 0, len = schoolListArray.length; i < len; i++) {
                tempSchoolName = schoolListArray[i];
                if (tempSchoolName.length > 13) {
                    schoolUlStr = schoolUlStr
                            + "<li class='DoubleWidthLi' title="
                            + schoolListArray[i] + ">"
                            + schoolListArray[i] + "</li>"
                } else {
                    schoolUlStr = schoolUlStr + "<li>"
                            + schoolListArray[i] + "</li>"
                }
            }
            $("div[class='schoolList'] ul").html(schoolUlStr);
        } else {
            $("div[class='schoolList'] ul")
                    .html(  "<span class='entertext'>请在输入框内手动输入学校！</span>");
            $("div[class='proSelect'] span").hide();
            $("div[class='proSelect'] input").show();
        }
    });
    // 学校列表mouseover事件
    $(document).on("mouseover", "div[class='schoolList'] ul li", function() {
                $(this).css("background-color", "#72B9D7");
            });
    // 学校列表mouseout事件
    $(document).on("mouseout", "div[class='schoolList'] ul li", function() {
                $(this).css("background-color", "");
            });
    // 学校列表点击事件
    $(document).on("click", "div[class='schoolList'] ul li", function() {
                $("#schoolName").val($(this).html());
                $("div[class='provinceSchool']").hide();
            });
    // 按钮点击事件
    $("#quxiao").click(function() {
        var flag = $(this).attr("flag");
        if ("0" == flag) {
            $("div[class='provinceSchool']").hide();
        } 
    });
    city();//城市选择控件
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
        end : function () { // 此处用于演示

        }
    });
}

swfobject.addDomLoadEvent(function () {
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
                avatar_sizes : '100*100',
                avatar_sizes_desc : '100*100像素'
            },
            function (msg) {
                switch (msg.code) {
                case 1:
                    break;
                case 2:
                    // alert("已成功加载图片到编辑面板。");
                    document.getElementById("upload").style.display = "inline";
                    break;
                case 3:
                    if (msg.type == 0) {
                        //alert("摄像头已准备就绪且用户已允许使用。");
                    } else if (msg.type == 1) {
                        alert("摄像头已准备就绪但用户未允许使用！");
                    } else {
                        alert("摄像头被占用！");
                    }
                    break;
                case 5:
                    var result = eval(msg.content);
                    if (result.status == "1") {
                        $('#add_pic').attr('src', result.list[0].uri);
                        // $('#update_pic').attr('src','../../../../'+result.list[0].uri);

                        $('#headPortrait').val(result.list[0].uri);

                        // $('#update_hid_team_emblem').val(result.list[0].uri);
                    } else {
                        alert('图片上传失败');
                    }
                    layer.close(pic_layer);

                    break;
                }
            });
});

// --------------------------------------------------基本信息--------------------------------------------------
//下一步
$('#EssentialInformationNext').click(function () {
    if (!$('#EssentialInformationForm').valid()) {
        lrError("请输入必填项！");
        return;
    }
//    var countInfo = ue.getContentTxt();
//    if (countInfo == "") {
//        lrError("请输入个人简介！");
//        return;
//    }
    if($('#stature').val() !="" && $('#stature').val()<1){
    	lrError("请输入正确的身高！");
        return;
    }
    if($('#weight').val() !="" && $('#weight').val()<1){
    	lrError("请输入正确的体重！");
        return;
    }
    var index = layer.load(0, { shade : false });
    ;
    $.ajax({
        type : "POST",
        url : "../../CareerInfoController/addEssentialInformation.json",
        dataType : "json",
        data : $("#EssentialInformationForm").serialize(),
        success : function (data) {
            // 清除现有的数据
            $("#personCategory").children().remove();
            // 通过Ajax异步加载页面信息
            $.ajax({
                url : '../../CareerInfoController/selectPersonModelCategory.json',
                type : 'POST',
                success : function (data) {
                    $.each(data.data.list,function (key,val) {
                        var personStr = $('<div class="col-sm-4">'
                                + '<div class="profess-tit" name="fenlei" id="category' + val.id + '" onclick="personCategoryClick('
                                + val.id
                                + ')">'
                                + '<i class="iconfont icon-'
                                + val.spelling
                                + '"></i><p>'
                                + val.name
                                + '</p></div>'
                                + '</div>');
                        
                        $("#personCategory").append(personStr);
                        
                        var id = $("#personId").val();
                        if (id == val.id) {
                            $("#category" + val.id).addClass("on");
                        }
                        
                        $(".main .main-floor").eq(1).fadeIn().siblings().fadeOut();
                        $(".step_tit h5").eq(1).addClass("tit_bg").siblings().removeClass("tit_bg");
                        $(".step_tit h5").eq(0).css("background", "#F7F7F7");
                    });
                    layer.close(index);
                },
                error : function () {
                    layer.close(index);
                    lrError("添加失败！服务器错误！");
                }
            });
        },
        error : function () {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

//--------------------------------------------------输入身份证自动填入性别及生日--------------------------------------------------
function GetBirthdatByIdNo(iIdNo) {
    var tmpStr = "";
    var birthday = $("#birthday");
    var sex = $("#sex");
    iIdNo = $.trim(iIdNo);
    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(iIdNo.substring(14, 1), 10) % 2 ? "1" : "2";
        birthday.val("");
        birthday.val(tmpStr);
        sex.val("");
        sex.val(sexStr);
    } else {
        tmpStr = iIdNo.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(iIdNo.substring(17, 1), 10) % 2 ? "1" : "2";
        birthday.val("");
        birthday.val(tmpStr);
        sex.val("");
        sex.val(sexStr);
    }
}

function GetSchoolNameByEducation(education) {
    if (education >= 5) {
        $("#div_school").children().remove();
        $("#div_school").append('<input type="text" class="form-control" id="school" name="school" placeholder="请选择毕业院校"/>');
    } else {
        $("#div_school").children().remove();
        $("#div_school").append('<input type="text" class="form-control " id="schoolName" name="school" placeholder="请选择毕业院校" readonly>'
                            +'<div id="proSchool" class="provinceSchool">'
                            +'   <div class="title">'
                            +'        <span>请选择学校</span>'
                            +'    </div>'
                            +'    <div class="proSelect">'
                            +'        <select></select> <!-- <span>如没找到选择项，请选择其他手动填写</span> --> <input type="text" />'
                            +'    </div>'
                            +'    <div class="schoolList">'
                            +'        <ul></ul>'
                            +'    </div>'
                            +'</div>');
        // 学校名称 激活状态
        $("#schoolName").focus(function() {
                    var top = $(this).position().top + $(this).height() + 2;
                    var left = $(this).position().left;
                    $("div[class='provinceSchool']").css({
                                top : top,
                                left : left
                            });
                    $("div[class='provinceSchool']").show("slow");
                });
        // 初始化省下拉框
        var provinceArray = "";
        var provicneSelectStr = "";
        for (var i = 0, len = province.length; i < len; i++) {
            provinceArray = province[i];
            provicneSelectStr = provicneSelectStr + "<option value='"
                    + provinceArray[0] + "'>" + provinceArray[1]
                    + "</option>"
        }
        $("div[class='proSelect'] select").html(provicneSelectStr);
        // 初始化学校列表
        var selectPro = $("div[class='proSelect'] select").val();
        var schoolUlStr = "";
        var schoolListStr = new String(proSchool[selectPro]);
        var schoolListArray = schoolListStr.split(",");
        var tempSchoolName = "";
        for (var i = 0, len = schoolListArray.length; i < len; i++) {
            tempSchoolName = schoolListArray[i];
            if (tempSchoolName.length > 13) {
                schoolUlStr = schoolUlStr
                        + "<li class='DoubleWidthLi' title="
                        + schoolListArray[i] + ">" + schoolListArray[i]
                        + "</li>"
            } else {
                schoolUlStr = schoolUlStr + "<li>" + schoolListArray[i]
                        + "</li>"
            }
        }
        $("div[class='schoolList'] ul").html(schoolUlStr);
        
     // 学校名称 激活状态
        $("#schoolName").focus(function() {
                    var top = $(this).position().top + $(this).height() + 2;
                    var left = $(this).position().left;
                    $("div[class='provinceSchool']").css({
                                top : top,
                                left : left
                            });
                    $("div[class='provinceSchool']").show("slow");
                });
        // 初始化省下拉框
        var provinceArray = "";
        var provicneSelectStr = "";
        for (var i = 0, len = province.length; i < len; i++) {
            provinceArray = province[i];
            provicneSelectStr = provicneSelectStr + "<option value='"
                    + provinceArray[0] + "'>" + provinceArray[1]
                    + "</option>"
        }
        $("div[class='proSelect'] select").html(provicneSelectStr);
        // 初始化学校列表
        var selectPro = $("div[class='proSelect'] select").val();
        var schoolUlStr = "";
        var schoolListStr = new String(proSchool[selectPro]);
        var schoolListArray = schoolListStr.split(",");
        var tempSchoolName = "";
        for (var i = 0, len = schoolListArray.length; i < len; i++) {
            tempSchoolName = schoolListArray[i];
            if (tempSchoolName.length > 13) {
                schoolUlStr = schoolUlStr
                        + "<li class='DoubleWidthLi' title="
                        + schoolListArray[i] + ">" + schoolListArray[i]
                        + "</li>"
            } else {
                schoolUlStr = schoolUlStr + "<li>" + schoolListArray[i]
                        + "</li>"
            }
        }
        $("div[class='schoolList'] ul").html(schoolUlStr);
        // 省切换事件
        $("div[class='proSelect'] select").change(function() {
            if ("99" != $(this).val()) {
                $("div[class='proSelect'] span").show();
                $("div[class='proSelect'] input").hide();
                schoolUlStr = "";
                schoolListStr = new String(proSchool[$(this).val()]);
                schoolListArray = schoolListStr.split(",");
                for (var i = 0, len = schoolListArray.length; i < len; i++) {
                    tempSchoolName = schoolListArray[i];
                    if (tempSchoolName.length > 13) {
                        schoolUlStr = schoolUlStr
                                + "<li class='DoubleWidthLi' title="
                                + schoolListArray[i] + ">"
                                + schoolListArray[i] + "</li>"
                    } else {
                        schoolUlStr = schoolUlStr + "<li>"
                                + schoolListArray[i] + "</li>"
                    }
                }
                $("div[class='schoolList'] ul").html(schoolUlStr);
            } else {
                $("div[class='schoolList'] ul")
                        .html(  "<span class='entertext'>请在输入框内手动输入学校！</span>");
                $("div[class='proSelect'] span").hide();
                $("div[class='proSelect'] input").show();
            }
        });
        // 学校列表mouseover事件
        $(document).on("mouseover", "div[class='schoolList'] ul li", function() {
                    $(this).css("background-color", "#72B9D7");
                });
        // 学校列表mouseout事件
        $(document).on("mouseout", "div[class='schoolList'] ul li", function() {
                    $(this).css("background-color", "");
                });
        // 学校列表点击事件
        $(document).on("click", "div[class='schoolList'] ul li", function() {
                    $("#schoolName").val($(this).html());
                    $("div[class='provinceSchool']").hide();
                });
        // 按钮点击事件
        $("#quxiao").click(function() {
            var flag = $(this).attr("flag");
            if ("0" == flag) {
                $("div[class='provinceSchool']").hide();
            } 
        });
    }
}

$("#idNumber").blur(function() {
    GetBirthdatByIdNo($(this).val());
});

$("#education").change(function() {
    GetSchoolNameByEducation($(this).val());
});
//-------------------------------------------------信息验证--------------------------------------------------
$("#EssentialInformationForm").validate({
   ignore: [],
   rules : {
       headPortrait : {
           required : true
       },
       name : {
           required : true,
           minlength : 2
       },
//       nation : {
//           min : 1
//       },
       idNumber : {
           required : true,
           isIdCardNo : true
       },
//       education : {
//           min : 1
//       },
//       school : {
//           required : false
//       },
//       stature : {
//           required : false,
//           digits : true
//       },
//       weight : {
//           required : false,
//           digits : true
//       },
//       politicalLandscape : {
//           min : 1
//       },
//       language : {
//           min : 1
//       },
//       phone : {
//           required : true,
//           isMobile : true
//       },
//       birthplace : {
//           required : false
//       },
       homeadd : {
           required : true
       },
//       registration : {
//           required : false
//       },
//       body : {
//           required : false
//       }
   },
   messages : {
       headPortrait : {
           required : "<i class='fa fa-times-circle'></i>请添加头像"
       },
       name : {
           required : "<i class='fa fa-times-circle'></i>请输入姓名",
           minlength : "<i class='fa fa-times-circle'></i>姓名必需最少由两个字母组成"
       },
//       nation : {
//           min : "<i class='fa fa-times-circle'></i>请选择民族"
//       },
       idNumber : {
           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
       },
//       education : {
//           min : "<i class='fa fa-times-circle'></i>请选择学历"
//       },
//       school : {
//           required : "<i class='fa fa-times-circle'></i>请输入毕业学校"
//       },
//       stature : {
//           required : "<i class='fa fa-times-circle'></i>请输入身高",
//           digits : "<i class='fa fa-times-circle'></i>请输入数字"
//       },
//       weight : {
//           required : "<i class='fa fa-times-circle'></i>请输入体重",
//           digits : "<i class='fa fa-times-circle'></i>请输入数字"
//       },
//       politicalLandscape : {
//           min : "<i class='fa fa-times-circle'></i>请选择政治面貌"
//       },
//       language : {
//           min : "<i class='fa fa-times-circle'></i>请选择外语程度"
//       },
//       phone : {
//           required : "<i class='fa fa-times-circle'></i>请输入联系电话",
//           isMobile : "<i class='fa fa-times-circle'></i>请输入正确的手机号码"
//       },
//       birthplace : {
//           required : "<i class='fa fa-times-circle'></i>请输入籍贯"
//       },
//       homeadd : {
//           required : "<i class='fa fa-times-circle'></i>请输入家庭地址"
//       },
//       registration : {
//           required : "<i class='fa fa-times-circle'></i>请输入户籍地址"
//       },
//       body : {
//           required : "<i class='fa fa-times-circle'></i>请输入个人介绍"
//       } 
   }
});

// --------------------------------------------------职业选择--------------------------------------------------
//选择职业分类
function personCategoryClick(id) {
 $("#personCategoryId").val(id);
 $("#personId").val("");
 $("#personPropId").val("");
 $("#personFlag").val("");
 $("#person").children().remove();
 $("#personProp").children().remove();
 $("div[name='fenlei']").removeClass("on");
 var index = layer.load(0, {
     shade : false
 });
 $.ajax({
     url : '../../CareerInfoController/selectPersonModel.json',
     type : 'POST',
     data : {'id' : id},
     success : function (data) {
         if (data.data.list.length) {
             $.each(data.data.list,function (key,val) {
                 var personPropStr = $('<div class="btn-group" role="group"><button type="button" name="xiangxi" class="btn btn-default category" id="person' + val.id + '" onclick="personClick('
                         + val.id
                         + ')">'
                         + val.name
                         + '</button></div>');
                 $("#person").append(personPropStr);
             });
         } else {
             var personPropStr = $('<div class="btn-group" role="group"><button type="button" name="xiangxi" class="btn btn-default category" >暂未开放！</button></div>');
             $("#person").append(personPropStr);
         }
         layer.close(index);
     }
 });
 $("#category" + id).addClass("on");
}

//选择职业
function personClick(id) {
 $("#personId").val(id);
 $("#personPropId").val("");
 $("#personFlag").val("");
 $("#personProp").children().remove();
 $("button[name='xiangxi']").removeClass("on3");
 var index = layer.load(0, {
     shade : false
 });
 $.ajax({
     url : '../../CareerInfoController/selectPersonModelProp.json',
     type : 'POST',
     data : {'id' : id},
     success : function (data) {
         layer.close(index);
         if (data.data.list.length) {
             $.each(data.data.list,function (key,val) {
                 var personPropStr = $('<li class="col-lg-2 col-md-3 col-sm-4 col-xs-6">'
                         + '<div class="profess-tit" name="zhiye" id="prop' + val.id + '" onclick="personPropClick(\''
                         + val.id
                         + '\',\''
                         + val.personflag
                         + '\')">'
                         + '<i class="iconfont icon-' + val.spelling + '"></i><p>'
                         + val.name
                         + '</p></div>'
                         + '</li>');
                 $("#personProp").append(personPropStr);
             });
         } else {
             var personPropStr = $('<li class="col-lg-2 col-md-3 col-sm-4 col-xs-6">暂未开放！</li>');
             $("#personProp").append(personPropStr);
         }
     }
 });
 $("#person" + id).addClass("on3");
}

//选择职业详情
function personPropClick(id, personflag) {
 $("#personPropId").val(id);
 $("#personFlag").val(personflag);
 $("div[name='zhiye']").removeClass("on");
 $("#prop" + id).addClass("on");
}

$("#CareerChoiceVisitor").click(function() {
    swal({// 弹出提示框提示用户是否确认删除
        title : "确定要跳过吗？",
        text : "跳过后将以普通用户形式登录系统！",
        type : "warning",
        showCancelButton : true,
        confirmButtonColor : "#DD6B55",
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        closeOnConfirm : false,
        closeOnCancel : true
    }, function(isConfirm) {
        if (isConfirm) {
            swal.close();
            var index = layer.load(0, {
                shade : false
            });
            $.ajax({
                url : '../../CareerInfoController/accomplish.json',
                type : 'POST',
                success : function (data) {
                    window.location.href = "../../main";
                }
            });
        }
        layer.close(index);
    });
});

//上一步
$("#CareerChoiceLast").click(function() {
    $(".main .main-floor").eq(0).fadeIn().siblings().fadeOut();
    $(".step_tit h5").eq(0).addClass("tit_bg").siblings().removeClass("tit_bg");
    $(".step_tit h5").eq(1).css("background","");
});

//下一步，如果不选择职业，则直接跳到完成录入
$("#CareerChoiceNext").click(function(){
    var personFlag = $("#personFlag").val();
    var personId = $("#personId").val();
    if (personFlag == "") {
        lrError("请选择职业或以游客身份登录系统");
    } else {
    
        var index = layer.load(0, {
            shade : false
        });
        $.ajax({
            type : "POST",
            url : "../../CareerInfoController/addOccupation.json",
            dataType : "json",
            data : $("#CareerChoiceForm").serialize(),
            success : function (data) {
                layer.close(index);
                
                if (data.data.map.personFlag == '1') {
                    var index = layer.load(0, {
                        shade : false
                    });
                    $.ajax({
                        type : "POST",
                        url : "../../CareerInfoController/selectPersonAffiliated.json",
                        dataType : "json",
                        data : {
                            'modelId' : personId,
                            'pId' : '-1'
                        },
                        success : function (data) {
                            var Str = "";
                            $.each(data.data.list,function(key,val) {
                                $.ajax({
                                    type : "POST",
                                    url : "../../CareerInfoController/selectPersonAffiliated.json",
                                    dataType : "json",
                                    data : {
                                        'modelId' : personId,
                                        'pId' : val.id
                                    },
                                    success : function (data1) {
                                        Str = Str + '<div class="form-group">'
                                            +'<div class="col-sm-4 text-right">'
                                            +'<label class="">' + val.attribute_name + '</label>'
                                            +'</div>';
                                        if (val.input_control == 1) {
                                            Str = Str + '<div class="col-sm-4">';
                                            $.each(data1.data.list,function(key1,val1) {
                                                if (key1 == 0) {
                                                    Str = Str + '<label class="am-radio-inline"><input type="radio" class="required" id="radioList' + val.id + '" name="radioList' + val.id + '" value="' + val1.id + '"  data-am-ucheck checked>' + val1.attribute_values + '</label>';
                                                } else {
                                                    Str = Str + '<label class="am-radio-inline"><input type="radio" class="required" id="radioList' + val.id + '" name="radioList' + val.id + '" value="' + val1.id + '"  data-am-ucheck>' + val1.attribute_values + '</label>';
                                                }
                                            });
                                            Str = Str + '</div>';
                                        } else if (val.input_control == 2) {
                                            Str = Str + '<div class="col-sm-4">';
                                            $.each(data1.data.list,function(key1,val1) {
                                                Str = Str + '<label class="am-checkbox-inline"><input type="checkbox" class="required" id="checkboxList' + val.id + '" name="checkboxList' + val.id + '" value="' + val1.id + '" data-am-ucheck>' + val1.attribute_values + '</label>';
                                            });
                                            Str = Str + '</div>';
                                        } else if (val.input_control == 3) {
                                            Str = Str + '<div class="col-sm-4"><input type="text" maxlength="200" class="form-control required" id="textList' + val.id + '" name="textList' + val.id + '"></div>';
                                        } else if (val.input_control == 4) {
                                            Str = Str + '<div class="col-sm-4"><select class="form-control required" id="selectList' + val.id + '" name="selectList' + val.id + '">';
                                            $.each(data1.data.list,function(key1,val1) {
                                                Str = Str + '<option value="' + val1.id + '">' + val1.attribute_values + '</option>';
                                            });
                                            Str = Str + '</select></div>';
                                        } else if (val.input_control == 5) {
//                                            $.each(data1.data.list, function(key1, val1) {
//                                                if (val1.attribute_name == "scriptStr") {
//                                                    var scriptStr = val1.attribute_values;
//                                                    var scriptStr = scriptStr.split("|");
//                                                }
//                                                if (val1.attribute_name == "divStr") {
//                                                    var divStr = val1.attribute_values;
//                                                }
//                                            });
                                        }
                                        Str = Str + '</div>';
                                        $("#infor_line").children().remove();
                                        $("#infor_line").append(Str);
                                        layer.close(index);
                                        $(".main .main-floor").eq(2).fadeIn().siblings().fadeOut();
                                        $(".step_tit h5").eq(2).addClass("tit_bg").siblings().removeClass("tit_bg");
                                        $(".step_tit h5").eq(1).css("background","#F7F7F7");
                                    },
                                    error : function () {
                                        layer.close(index);
                                        lrError("添加失败！服务器错误！");
                                    }
                                });
                            });
                        },
                        error : function () {
                            layer.close(index);
                            lrError("添加失败！服务器错误！");
                        }
                    });
                } else {
                    $(".main .main-floor").eq(2).fadeIn().siblings().fadeOut();
                    $(".step_tit h5").eq(2).addClass("tit_bg").siblings().removeClass("tit_bg");
                    $(".step_tit h5").eq(1).css("background","#F7F7F7");
                    if(!$('#occupationalForm').valid()){
                		lrError("请输入必填项！");
                		return;
                	}
                    $.ajax({
                        type : "POST",
                        url : "../../CareerInfoController/addCareerChoice.json",
                        dataType : "json",
                        data : $("#occupationalForm").serialize(),
                        success : function (data) {
                            // --------------------------------------------------完成--------------------------------------------------
                            if (data.status == 1) {
                                swal({
                                    title : "职业选择完成!",
                                    text : "您已成功选择职业，现在就开启您的职业生涯!",
                                    type : "success",
                                    confirmButtonText : "确定"
                                }, function () {
                                    window.location.href = "../../main";
                                });
                            } else {
                                swal({
                                    title : data.msg,
                                    type : "error",
                                    confirmButtonText : "确定"
                                });
                            }
                        },
                        error : function () {
                            layer.close(index);
                            lrError("添加失败！服务器错误！");
                        }
                    });
                }
            },
            error : function () {
                layer.close(index);
                lrError("添加失败！服务器错误！");
            }
        });
    }
});

// --------------------------------------------------职业信息--------------------------------------------------
$("#OccupationalInformationLast").click(function(){
    $(".main .main-floor").eq(1).fadeIn().siblings().fadeOut();
    $(".step_tit h5").eq(1).addClass("tit_bg").siblings().removeClass("tit_bg");
    $(".step_tit h5").eq(2).css("background","");
});

$("#OccupationalInformationNext").click(function(){
    $(".main .main-floor").eq(3).fadeIn().siblings().fadeOut();
    $(".step_tit h5").eq(3).addClass("tit_bg").siblings().removeClass("tit_bg");
    $(".step_tit h5").eq(2).css("background","#F7F7F7");
    $.ajax({
        type : "POST",
        url : "../../CareerInfoController/addCareerChoice.json",
        dataType : "json",
        data : $("#occupationalForm").serialize(),
        success : function (data) {
            // --------------------------------------------------完成--------------------------------------------------
            if (data.status == 1) {
                swal({
                    title : "职业选择完成!",
                    text : "您已成功选择职业，现在就开启您的职业生涯!",
                    type : "success",
                    confirmButtonText : "确定"
                }, function () {
                    window.location.href = "../../main";
                });
            } else {
                swal({
                    title : data.msg,
                    type : "error",
                    confirmButtonText : "确定"
                }); 
            }
        },
        error : function () {
//            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

function city(){
	 // 地区
	$("#address_new").address({
		prov: "内蒙古",
		city: "呼和浩特市",
		district: "",
		scrollToCenter: true,
		footer: true,
		selectEnd: function(json) {
			console.log(JSON.stringify(json));
		}
	});
//    laydate({
//	    elem: '#teamBulidTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
//	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
//	});
}