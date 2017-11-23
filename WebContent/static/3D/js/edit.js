edit = {};


// 获取对应的数据
edit.getData = function (changeData) {
    $(".editStr .text>#text").val(changeData.text);
    $(".editStr .file>#filePath").val(changeData.filePath);
    $(".editStr .lon>#lon").val(changeData.lon);
    $(".editStr .lat>#lat").val(changeData.lat);
    $(".editStr .height>#height").val(changeData.height);
    $(".editStr .course>#course").val(changeData.course);
    $(".editStr .alpha>#alpha").val(changeData.alpha);
    $(".editStr .roll>#roll").val(changeData.roll);
    $(".editStr .scaleX>#scaleX").val(changeData.scaleX);
    $(".editStr .scaleY>#scaleY").val(changeData.scaleY);
    $(".editStr .scaleZ>#scaleZ").val(changeData.scaleZ);
};

// 获取对应的步长
edit.getStep = function (stepData) {
    $(".stepSize").each(function () {
        var str = $(this).parent().attr('class');
        stepData[str] = $(this).val()
    });
};

// 修改步长
edit.editStep = function (stepData) {
    $(".editStr .stepSize").blur(function () {
        var str = $(this).parent().attr('class');
        if (parseFloat($(this).val()) < 0) {
            $(this).val(stepData["delfault" + str]);
        }
        stepData[str] = $(this).val();
    });
};

// 检测最大值
edit.checkMaxSize = function (str, num, changeData) {

    if (str == "lon") {
        if (num >= 180) {
            num = 180;
        }
        num.toFixed(6);
    } else if (str == "lat") {
        if (num >= 90) {
            num = 90;
        }
        num.toFixed(6);
    } else if (str == "course" || str == "roll") {
        if (num >= 360) {
            num = 360;
        }
    } else if (str == "alpha") {
        if (num >= 90) {
            num = 90;
        }
    }
    changeData[str] = num;
    $("#" + str).val(num);
};

// 检测最小值
edit.checkMinSize = function (str, num, changeData) {
    if (str == "lon") {
        if (num < 0) {
            num = 0;
        }
        num.toFixed(6);
    } else if (str == "lat") {
        if (num < 0) {
            num = 0;
        }
        num.toFixed(6);
    } else if (str == "course" || str == "roll") {
        if (num < 0) {
            num = 0;
        }
    } else if (str == "alpha") {
        if (num < -90) {
            num = -90;
        }
    }
    changeData[str] = num;
    $("#" + str).val(num);

};

// 数据增加步长
edit.addStep = function (stepData, changeData) {
    $("#singleEdit .editStr .addChange").each(function () {
        var timer1;
        var timer2;
        var that = this;

        $(this).off("mousedown").off("mouseup");
        $(this).on({
            mousedown: function (e) {
                console.log("mousedonw事件调用")
                timer1 = setTimeout(function () {
                    timer1 = 0;
                    timer2 = setInterval(function () {
                        var str = $(that).parent().attr('class');
                        var step = parseFloat(stepData[str]) * 100;
                        var num;

                        num = parseFloat($("#" + str).val()) * 100;
                        num = (num + step) / 100;

                        if (str == "lon") {
                            if (num >= 180) {
                                num = 180;
                            }
                            num = num.toFixed(6);

                        } else if (str == "lat") {
                            if (num >= 90) {
                                num = 90;
                            }
                            num = num.toFixed(6);
                        } else if (str == "course" || str == "roll") {
                            if (num >= 360) {
                                num -= 360;
                            }
                        } else if (str == "alpha") {
                            if (num >= 90) {
                                num = 90;
                            }
                        }
                        changeData[str] = num;
                        $("#" + str).val(num);
                        FD_Viewer.UpdatePmodelAll(num);
                    }, 300)

                }, 800);
                e.preventDefault();
            },
            mouseup: function () {
                clearTimeout(timer1);
                clearTimeout(timer2);
                if (timer1 != 0) {
                    var str = $(this).parent().attr('class');
                    var step = parseFloat(stepData[str]) * 100;

                    var num = parseFloat($("#" + str).val()) * 100;
                    num = (num + step ) / 100;

                    // 保证精度
                    if (str == "lon") {
                        if (num >= 180) {
                            num = 180;
                        }
                        num = num.toFixed(6);

                    } else if (str == "lat") {
                        if (num >= 90) {
                            num = 90;
                        }
                        num = num.toFixed(6);
                    } else if (str == "course" || str == "roll") {
                        if (num >= 360) {
                            num -= 360;
                        }
                    } else if (str == "alpha") {

                        if (num >= 90) {
                            num = 90;
                        }
                    }
                    changeData[str] = num;

                    $("#" + str).val(num);
                    FD_Viewer.UpdatePmodelAll(changeData);
                }
                return false;
            }
        });
    });
};

// 数据减少步长
edit.reduceStep = function (stepData, changeData) {

    $("#singleEdit .editStr .reduceChange").each(function () {
        var timer1;
        var timer2;
        var that = this;
        $(this).off("mousedown").off("mouseup");

        $(this).on({
            mousedown: function (e) {
                timer1 = setTimeout(function () {
                    timer1 = 0;
                    timer2 = setInterval(function () {
                        var str = $(that).parent().attr('class');
                        var step = parseFloat(stepData[str]) * 100;
                        var num;

                        num = parseFloat($("#" + str).val()) * 100;
                        num = (num - step) / 100;
                        if (str == "lon") {
                            if (num < 0) {
                                num = 0;
                            }
                            num = num.toFixed(6);
                        } else if (str == "lat") {
                            if (num < 0) {
                                num = 0;
                            }
                            num = num.toFixed(6);
                        } else if (str == "course" || str == "roll") {
                            if (num < 0) {
                                num += 360;
                            }
                        } else if (str == "alpha") {
                            if (num < -90) {
                                num = -90;
                            }
                        }
                        changeData[str] = num;
                        $("#" + str).val(num);
                        FD_Viewer.UpdatePmodelAll(changeData);
                    }, 300)

                }, 800);
                e.preventDefault();
            },
            mouseup: function () {
                clearTimeout(timer1);
                clearTimeout(timer2);
                if (timer1 != 0) {
                    var str = $(this).parent().attr('class');
                    var step = parseFloat(stepData[str]) * 100;

                    var num = parseFloat($("#" + str).val()) * 100;
                    num = (num - step ) / 100;
                    if (str == "lon") {
                        if (num < 0) {
                            num = 0;
                        }
                        num = num.toFixed(6);
                    } else if (str == "lat") {
                        if (num < -90) {
                            num = -90;
                        }
                        num = num.toFixed(6);
                    } else if (str == "course" || str == "roll") {
                        if (num < 0) {
                            num += 360;
                        }
                    } else if (str == "alpha") {
                        if (num < -90) {
                            num = -90;
                        }
                    }
                    changeData[str] = num;
                    $("#" + str).val(num);
                    FD_Viewer.UpdatePmodelAll(changeData);
                }
                return false;
            }
        });

    });
};


// 检测输入框
edit.checkInp = function (changeData) {
	$(".editStr #text").blur(function(){
        var num = $("#text").val();
        changeData.text = num;
        
		});
	console.log(changeData)
	
    $(".editStr .numMath").each(function () {
            $(this).blur(function () {
                var str = $(this).parent().attr('class');
                var num = parseFloat($("#" + str).val());
                if ($("#" + str).val() == "") {
                    $(this).val(changeData[str]);
                    return false;
                }
                if (str == "lon") {
                    if (num > 180) {
                        num = 180;
                    } else if (num < 0) {
                        num = 0;
                    }
                } else if (str == "lat") {
                    if (num > 90) {
                        num = 90;
                    } else if (num < 0) {
                        num = 0;
                    }
                } else if (str == "course" || str == "roll") {
                    if (num > 360) {
                        num = 360;
                    } else if (num < 0) {
                        num = 0;
                    }
                }
                else if (str == "alpha") {
                    if (num > 90) {
                        num = 90;
                    } else if (num < -90) {
                        num = -90;
                    }
                }
                changeData[str] = num;
                $("#" + str).val(num);
                FD_Viewer.UpdatePmodelAll(changeData);
            })
        }
    );
};

// 保存信息
edit.saveData = function (nodeSelected, changeData) {
    nodeSelected.text = $("#text").val();
    nodeSelected.filePath = $("#filePath").val();
    nodeSelected.lon = $("#lon").val();
    nodeSelected.lat = $("#lat").val();
    nodeSelected.height = $("#height").val();
    nodeSelected.course = $("#course").val();
    nodeSelected.alpha = $("#alpha").val();
    nodeSelected.roll = $("#roll").val();
    nodeSelected.scaleX = $("#scaleX").val();
    nodeSelected.scaleY = $("#scaleY").val();
    nodeSelected.scaleZ = $("#scaleZ").val();
    console.log(changeData);
    FreeDoTool.WriteDB_Model(changeData);
    // 隐藏dialog
    $('#singleEdit').dialog({
        closed: true,
    });
};

// 去除空格
edit.Trim = function (str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};

// 点击其他区域隐藏查看和编辑的表单
edit.clickHideForm = function () {
    // 点击空白处隐藏
    $(document).click(function () {
        $("#singleEdit").hide();
        $(".editStr").hide();
        $(".manyEdit").hide();
        $("#content #left").css({"overflow-y": "auto"});
    });

    // 点击自己时也要阻止冒泡
    $(".editStr").click(function (e) {
        e.stopPropagation();
    });
    $("#singleEdit").click(function (e) {
        e.stopPropagation();
    });

    // 点击其他节点时隐藏
    $("#tree").click(function () {
        // $("#singleEdit").hide();
        $(".editStr").hide();
        $(".manyEdit").hide();
        $("#content #left").css({"overflow-y": "auto"});
    });

};

// 编辑已选的，增加
edit.manyEditAdd = function (stepData,checkedArr) {
    $("#manyEdit .editStr .addChange").each(function () {
        var timer1;
        var timer2;
        var that = this;
        $(this).off("mousedown").off("mouseup");
        $(this).on({
            mousedown: function (e) {
                timer1 = setTimeout(function () {
                    timer1 = 0;
                    timer2 = setInterval(function () {
                        var str = $(that).parent().attr('class');
                        var step = parseFloat(stepData[str]) * 100;

                        for (var i = 0; i < checkedArr.length; i++) {
                            var num = parseFloat(checkedArr[i][str]) * 100;
                            num = (num + step) / 100;
                            if (str == "lon") {
                                if (num >= 180) {
                                    num = 180;
                                }
                                num = num.toFixed(6);
                            } else if (str == "lat") {
                                if (num >= 90) {
                                    num = 90;
                                }
                                num = num.toFixed(6);
                            } else if (str == "course" || str == "roll") {
                                if (num >= 360) {
                                    num -= 360;
                                }
                            }
                            checkedArr[i][str] = num;
                        }
                        for (let j = 0; j < checkedArr.length; j++) {
                            FD_Viewer.UpdatePmodelAll(checkedArr[j]);
                        }
                    },300)

                }, 800);
                e.preventDefault();
            },
            mouseup: function () {
                clearTimeout(timer1);
                clearTimeout(timer2);
                if (timer1 != 0) {
                    var str = $(this).parent().attr('class');
                    var step = parseFloat(stepData[str]) * 100;
                    for (var i = 0; i < checkedArr.length; i++) {
                        var num = parseFloat(checkedArr[i][str]) * 100;
                        num = (num + step ) / 100;
                        if (str == "lon") {
                            if (num >= 180) {
                                num = 180;
                            }
                            num = num.toFixed(6);
                        } else if (str == "lat") {
                            if (num >= 90) {
                                num = 90;
                            }
                            num = num.toFixed(6);
                        } else if (str == "course") {
                            if (num >= 360) {
                                num -= 360;
                            }
                        }
                        checkedArr[i][str] = num;

                        for (let j = 0; j < checkedArr.length; j++) {
                            FD_Viewer.UpdatePmodelAll(checkedArr[j]);
                        }
                    }
                }
                return false;
            }
        });
    });
};

// 编辑已选的，减少
edit.manyEditReduce = function(stepData,checkedArr){
    $("#manyEdit .editStr .reduceChange").each(function () {
        var timer1;
        var timer2;
        var that = this;
        $(this).off("mousedown").off("mouseup");
        $(this).on({
            mousedown: function (e) {
                timer1 = setTimeout(function () {
                    timer1 = 0;
                    timer2 = setInterval(function () {
                        var str = $(that).parent().attr('class');
                        var step = parseFloat(stepData[str]) * 100;

                        for (var i = 0; i < checkedArr.length; i++) {
                            var num = parseFloat(checkedArr[i][str]) * 100;
                            num = (num - step ) / 100;
                            if (str == "lon") {
                                if (num <= 0) {
                                    num = 0;
                                }
                                num = num.toFixed(6);
                            } else if (str == "lat") {
                                if (num <= -90) {
                                    num = -90;
                                }
                                num = num.toFixed(6);
                            } else if (str == "course") {
                                if (num <= 0) {
                                    num += 360;
                                }
                            }
                            checkedArr[i][str] = num;
                        }
                        for (let j = 0; j < checkedArr.length; j++) {
                            FD_Viewer.UpdatePmodelAll(checkedArr[j]);
                        }
                    },300)

                }, 800);
                e.preventDefault();
            },
            mouseup: function () {
                clearTimeout(timer1);
                clearTimeout(timer2);
                if (timer1 != 0) {
                    var str = $(this).parent().attr('class');
                    var step = parseFloat(stepData[str]) * 100;
                    for (var i = 0; i < checkedArr.length; i++) {
                        var num = parseFloat(checkedArr[i][str]) * 100;
                        num = (num - step ) / 100;
                        if (str == "lon") {
                            if (num <= 0) {
                                num = 0;
                            }
                            num = num.toFixed(6);
                        } else if (str == "lat") {
                            if (num <= -90) {
                                num = -90;
                            }
                            num = num.toFixed(6);
                        } else if (str == "course") {
                            if (num <= 0) {
                                num += 360;
                            }
                        }
                        checkedArr[i][str] = num;
                        for (let j = 0; j < checkedArr.length; j++) {
                            FD_Viewer.UpdatePmodelAll(checkedArr[j]);
                        }
                    }
                }
                return false;
            }
        });
    });
};

// 关闭左侧树或者展开左侧树
edit.leftCloseOrOpen = function (open) {
    if(open){
        $("#left").stop().animate({
            width: "200"
        }, 1000);
    }else {
        $("#left").stop().animate({
            width: "0"
        }, 1000);
    }

};

/**
 * @param nodesChecked
 *            选中的对象 数组
 * @param defaultCheckedArr
 *            保存选中对象的原始数据 数组
 * @param checkedArr
 *            保存选中对象的修改数据 数组
 */
edit.manyEditCopyObj = function (nodesChecked,defaultCheckedArr,checkedArr) {

    for (let i = 0; i < nodesChecked.length; i++) {
        if(nodesChecked[i].type == 1){

        }else if(nodesChecked[i].type == 2){
            var obj = {};
            var obj1 = {};
            for (let key in nodesChecked[i]) {
                obj[key] = nodesChecked[i][key];
                obj1[key] = nodesChecked[i][key];
                var json = JSON.parse( nodesChecked[i].attributes.parameter);
                for (let a in json) {
                    obj[a] = json[a]
                    obj1[a] = json[a]
                }
            }
            defaultCheckedArr.push(obj);
            checkedArr.push(obj1);
        }

    }
}

// 点击取消或者关闭
edit.close = function (str,defaultData) {

    var id = str.getAttribute('id');
    $(".cancel").click(function () {
        $('#' + id).dialog({
            closed: true,
        });
        edit.leftCloseOrOpen(true);

        edit.arrayOrObject(defaultData);

        return false;
    });
    $(".closeDialog").click(function () {
        $('#' + id).dialog({
            closed: true,
        });
        edit.leftCloseOrOpen(true);

        edit.arrayOrObject(defaultData);
        return false;
    });

};


//判断是数组还是对象
edit.arrayOrObject = function (defaultData){
    if (Object.prototype.toString.call(defaultData) === '[object Array]'){
        for(let i = 0;i < defaultData.length;i++){
            FD_Viewer.UpdatePmodelAll(defaultData[i]);
        }

    }else if(Object.prototype.toString.call(defaultData) === '[object Object]'){
        FD_Viewer.UpdatePmodelAll(defaultData);
    }
}



