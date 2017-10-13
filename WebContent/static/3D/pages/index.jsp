<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>WebGL</title>
	<!-- <link rel="stylesheet" href="http://freedo.tech:9999/txf/170626/FreeDo/Widgets/widgets.css"> -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/static/webgl/css/easyui.css">
 	<link rel="stylesheet" href="${pageContext.request.contextPath}/static/webgl/css/index.css" />
 	<link rel="stylesheet" href="${pageContext.request.contextPath}/static/webgl/css/nav-style.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/static/webgl/css/alert-box.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/static/webgl/css/zTreeStyle/zTreeStyle.css" />
	<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/WebGl-INF/css/widgets.css" /> --%>
	<link rel="stylesheet" href="http://freedoonline.com:9999/txf/src/czm/Cesium170407/Widgets/widgets.css" />
 	<!-- <style>
      @import url(http://freedoonline.com:9999/txf/src/czm/Cesium170407/Widgets/widgets.css);
      html, body, #ViewerContainer {
          width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
      }
  </style> -->
</head>
<body>
<div id="ViewerContainer">
	<div id="left" class="left">	
		<div class="easyui-panel">
			<ul id="tree" class="ztree" style="height: 100%"></ul>
		</div>
	</div>
	<div id="right" class="right" style="height: 100%"></div>
	<ul class="nav" id ="toolBox">
	   <!-- <li class="nav-item nav-item-1"></li> -->
	</ul>
</div>
</body>
	<%-- <script src="${pageContext.request.contextPath}/WebGl-INF/js/FreeDo.js"></script> --%>
	<script src="http://freedo.tech:9999/txf/170626/FreeDo/FreeDo.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/FreeDoTool.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/throttleRequestByServer.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/FreedoTerrainProvider.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/viewer.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/jquery-3.2.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/jquery.easyui.min.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/edit.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/index.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/toolbar.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/alertBox.js"></script>
	<script src="${pageContext.request.contextPath}/static/webgl/js/jquery.ztree.core.js"></script>
</html>