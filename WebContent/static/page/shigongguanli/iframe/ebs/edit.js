edit = {};

// 点击其他区域隐藏查看和编辑的表单
edit.clickHideForm = function () {
    // 点击空白处隐藏
    $(document).off("click").click(function () {
        $("#singleEdit").hide();
        $(".editStr").hide();
        $(".manyEdit").hide();
        $("#content #left").css({"overflow-y": "auto"});
    });

    // 点击自己时也要阻止冒泡
    $(".editStr").off("click").click(function (e) {
        e.stopPropagation();
    });
    $("#singleEdit").off("click").click(function (e) {
        e.stopPropagation();
    });

    // 点击其他节点时隐藏
    $("#tree").off("click").click(function () {
        // $("#singleEdit").hide();
        $(".editStr").hide();
        $(".manyEdit").hide();
        $("#content #left").css({"overflow-y": "auto"});
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
};

// 点击取消或者关闭
edit.close = function (str,defaultData,changeData) {
	
    var id = str.getAttribute('id');
    
    $(".cancel").off("click").click(function () {     
    	cancel(id,defaultData,changeData);
    	$("#ban").hide();
    });
   

    function cancel(id,defaultData,changeData) {
    	
    	// 设置是否提示标志
    	var flag = false;
    	
    	// 判断传入的值
    	if(Array.isArray(defaultData)){
    		for(let i = 0; i < defaultData.length; i++){
    			for (var key in defaultData[i]) {
    				if(defaultData[i][key] != changeData[i][key]){
    					flag = true;
    					break;
    		    	}
    		    }
    		}
    	}else{
    		// 遍历对比值是否改变
		    for (var key in defaultData) {
				if(defaultData[key] != changeData[key]){
					flag = true;
					break;
		    	}
		    }
    	}
    	// 值改变取消时提示，否则不提示
        if(flag){
        	$('#' + id).dialog({closed: false});
			$("#quit").show();
	        $("#quit p").html("您还有保存，确认就行此操作？");
	        $("#quit #quitYes").off("click").click(function(){
	            $('#' + id).dialog({closed: true});
	            $("#quit").hide();
	            edit.leftCloseOrOpen(true);
	            edit.arrayOrObject(defaultData);
	        });
	        $("#quit #quitNo").off("click").click(function(){
	            $("#quit").hide();
	            return false;
	        });
        }else{
        	$('#' + id).dialog({closed: true});
        	$("#ban").hide();
    		edit.leftCloseOrOpen(true);
    	}
    }
};


// 判断是数组还是对象
edit.arrayOrObject = function (defaultData){
    if (Object.prototype.toString.call(defaultData) === '[object Array]'){
        for(let i = 0;i < defaultData.length;i++){
            FD_Viewer.UpdatePmodelAll(defaultData[i]);
        }

    }else if(Object.prototype.toString.call(defaultData) === '[object Object]'){
        FD_Viewer.UpdatePmodelAll(defaultData);
    }
};


//组合拼接
edit.joinString = function(obj){
	var paramer = {
            "filePath": obj.filePath,
            "lon": obj.lon,
            "lat": obj.lat,
            "height": obj.height,
            "course": obj.course,
            "alpha": obj.alpha,
            "roll": obj.roll,
            "scaleX": obj.scaleX,
            "scaleY": obj.scaleY,
            "scaleZ": obj.scaleZ
        };
    paramer = JSON.stringify(paramer);
    return paramer;
};

//修改后，取消之后提示
edit.cancelTip = function(){
	 $("#quit").show();
    $("#quit p").html("您还未保存，确认继续行此操作？");
    $("#quit #quitYes").off("click").click(function(){
        $('#nodeModel').dialog({closed: true});
        $('#addNodeModel').dialog({closed: true});
        $('#singleEdit').dialog({closed: true});
        $("#ban").hide();
        $("#quit").hide();
    });
    $("#quit #quitNo").off("click").click(function(){
        $("#quit").hide();
        return false;
    });
};

//时间戳转化为日期
/**

 * @param {any} time 
 * @returns 
 */
edit.formatDate = function (time) {
    var a = new Date(time);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var day = a.getDate();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return time = year + "-" + month + "-" + day;
};

// 去除空格
/**
 * @param {any} str 
 * @param {any} is_global 
 * @returns 
 */
edit.Trim = function (str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};



