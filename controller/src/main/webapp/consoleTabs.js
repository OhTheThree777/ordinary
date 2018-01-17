$(function () {
    var index = layer.load(0, {
        shade: false
    });
    $
        .ajax({
            type: "POST",
            url: "sysuserController/findMenus.json",
            dataType: "json",
            data: {},
            success: function (data) {
                layer.close(index);
                var list = data['data']['list'];
                $
                    .each(
                        list,
                        function (i, n) {

                            var li = '';
                            if (typeof (n.attributes) == "undefined") {
                                li = '<li ><a class="J_menuItem"><i class="'
                                    + n.iconCls
                                    + '"></i><span class="nav-label">';
                                li += n.text;
                                li += '</span> <span class="fa arrow"></span></a>';
                                li += '<ul class="nav nav-second-level">';
                                $
                                    .each(
                                        n.children,
                                        function (j, cn) {
                                            if (typeof (cn.attributes) == "undefined") {
                                                li += '<li ><a class="J_menuItem"><i class="fa '
                                                    + cn.iconCls
                                                    + '"></i><span class="nav-label">';
                                                li += cn.text;
                                                li += '</span> <span class="fa arrow"></span></a>';
                                                li += '<ul class="nav nav-third-level">';
                                                $
                                                    .each(
                                                        cn.children,
                                                        function (f,
                                                                  cnn) {
                                                            li += '<li ><a class="J_menuItem" href='
                                                                + cnn.attributes.url
                                                                + '><i class="fa '
                                                                + cnn.iconCls
                                                                + '"></i><span class="nav-label"></span>';
                                                            li += cnn.text;
                                                            li += "</a></li>";
                                                        });
                                                li += "</ul>";
                                                li += "</li>";
                                            } else {
                                                li += '<li ><a class="J_menuItem" href='
                                                    + cn.attributes.url
                                                    + '><i class="fa '
                                                    + cn.iconCls
                                                    + '"></i><span class="nav-label"></span>';
                                                li += cn.text;
                                                li += "</a></li>";
                                            }
                                        });

                                li += "</ul>";
                                li += "</li>";

                            } else {
                                li += '<li ><a class="J_menuItem" href='
                                    + n.attributes.url
                                    + '><i class="fa '
                                    + n.iconCls
                                    + '"></i><span class="nav-label"></span>';
                                li += n.text;
                                li += '<span class=""></span></a>';
                                li += "</li>";
                            }
                            $('#side-menu').append(li);

                        });
                loadMenujs();
            },
            error: function () {
                layer.close(index);
                lrError("添加失败！服务器错误！");
            }
        });

});

var loadMenujs = function () {
    /*
     * var script = document.createElement('script') script.setAttribute('src',
     * 'hi/js/layer.min.js');
     * document.getElementsByTagName('head')[0].appendChild(script)
     */
    var script1 = document.createElement('script')
    script1.setAttribute('src', 'js/plugins/contabs.min.js');
    document.getElementsByTagName('head')[0].appendChild(script1)

    var script2 = document.createElement('script')
    script2.setAttribute('src', 'js/plugins/hplus.min.js?v=4.1.0');
    document.getElementsByTagName('head')[0].appendChild(script2)

}

var logout = function () {
    // delCookie("JSESSIONID");

    $.ajax({
        type: "POST",
        url: "../../sysuserController/logout.json",
        success: function (data) {
            alert("sususu");
        },
        error: function () {
            lrError("授权失败！服务器错误！");
        }
    });


    window.location.href = '/logout.html';
}

function userinfo() {
    $.ajax({
        type: "POST",
        url: "../../currentUser/getSysUserInfo.json",
        success: function (data) {
            edit(data);
        },
        error: function () {
            lrError("授权失败！服务器错误！");
        }
    });

}

$('#sys_user_info_update_button').click(function () {
    edit();
});



function edit() {

    $.ajax({
        type: "POST",
        url: "../../currentUser/getSysUserInfo.json",
        success: function (data) {
            bindForm('from_sys_user_update', data.list[0]);
            var index_main = layer.open({
                type: 1,
                title: '修改信息',
                shadeClose: true,
                shade: false,
                maxmin: true, // 开启最大化最小化按钮
                area: ['75%', '85%'],
                content: $('#div_update')
            });


            $('#btn_update_close').click(function () {
                layer.close(index_main);
            });

        },
        error: function () {
            lrError("授权失败！服务器错误！");
        }
    });



}

$('#btn_update_submit').click(function () {
    var index = layer.load(0, {
        shade: false
    });
    ;
    $.ajax({
        type: "POST",
        url: "../../sysuserController/update.json",
        dataType: "json",
        data: $("#from_sys_user_update").serialize(),
        success: function (data) {
            swal({
                title: "修改成功!",
                text: "用户信息修改成功!",
                type: "success",
                confirmButtonText: "确定"
            });
            layer.closeAll('page');
            layer.close(index);
        },
        error: function () {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
});

