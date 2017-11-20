<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>摄像头</title>
	<meta name="description" content="Bootstrap Metro Dashboard">
	<meta name="author" content="Dennis Ji">
	<meta name="keyword" content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
	<!-- end: Meta -->

	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- end: Mobile Specific -->

	<!-- start: CSS -->
	<link id="bootstrap-style" href="${ctx }/static/page/common/css/bootstrap.min.css" rel="stylesheet">
	<link href="${ctx }/static/page/common/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link id="base-style" href="${ctx }/static/page/common/css/style.css" rel="stylesheet">
	<link id="base-style-responsive" href="${ctx }/static/page/common/css/style-responsive.css" rel="stylesheet">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext'
	    rel='stylesheet' type='text/css'>
	<!-- end: CSS -->
	<link rel="stylesheet" href="${ctx }/static/page/common/css/common.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/IconFont/iconfont.css">
	<link href="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Widgets/widgets.css" rel="stylesheet">
    <script src="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Freedo.js"></script>
    <script src="http://res.gbim360.com/shared/1710_lodash/lodash.min.js"></script>
    <script src="http://res2.gbim360.com/projects/FreedoHolo3DForWeb/develop/API/FreedoX.js"></script>
	<link rel="stylesheet" href="${ctx }/static/webgl/compass/css/compass.css">
	<script src="${ctx }/static/webgl/compass/js/Compass.js"></script>
	<script src="${ctx }/static/page/common/js/FreeDoTool.js"></script>
	<script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
	<script src="${ctx }/static/page/common/js/echarts.common.min.js"></script>
	<link rel="stylesheet" href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
	<script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>

	<!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	  	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<link id="ie-style" href="css/ie.css" rel="stylesheet">
	<![endif]-->

	<!--[if IE 9]>
		<link id="ie9style" href="css/ie9.css" rel="stylesheet">
	<![endif]-->


	<link rel="stylesheet" href="${ctx }/static/page/shigongguanli/camera/css/camera.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/css/appendTools.css">
	
    <link rel="stylesheet" href="${ctx }/static/page/common/css/media.css">


</head>

<body>
	<!-- start: Header -->
	<div class="navbar">
		<div class="navbar-inner">
			<div class="container-fluid">
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".top-nav.nav-collapse,.sidebar-nav.nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</a>
				<a class="brand" href="${ctx }/toIndex"><span>BIM全生命周期管理平台</span></a>

				<!-- start: Header Menu -->
				<div class="nav-no-collapse header-nav">
					<ul class="nav pull-right">
						<li class="dropdown hidden-phone">
							<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
								<i class="icon-bell"></i>
							</a>
						</li>
						<!-- start: Message Dropdown -->
						<li class="dropdown hidden-phone">
							<a class="btn dropdown-toggle"  href="${ctx }/toSet">
								<i class="iconfont icon-set"></i>
							</a>
						</li>
						<!-- start: Notifications Dropdown -->
						<li class="dropdown hidden-phone">
							<a class="btn dropdown-toggle" href="${ctx }/toIndex">
								<i class="icon-home" style="font-size: 20px"></i>
							</a>
						</li>
						<!-- end: Notifications Dropdown -->
						<!-- start: User Dropdown -->
						<li class="dropdown">
							<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
								<i class="halflings-icon white user"></i>李荣
								<span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li class="dropdown-menu-title">
									<span>账户设置</span>
								</li>
								<li><a href="#"><i class="halflings-icon user"></i> 文件</a></li>
								<li><a href="${ctx }/loginPage"><i class="halflings-icon off"></i>退出登录</a></li>
							</ul>
						</li>
						<!-- end: User Dropdown -->
					</ul>
				</div>

			</div>
		</div>
	</div>
	<!-- start: Header -->

	<div class="container-fluid-full">
		<div class="row-fluid">

			<!-- start: Main Menu -->
			<div id="sidebar-left" class="span2">
				<div class="nav-collapse sidebar-nav">
					<ul class="nav nav-tabs nav-stacked main-menu">
						<li>
							<a href="${ctx }/toSurveystudyGK">
								<i class="iconfont icon-kcmanager"></i>
								<span class="hidden-tablet">勘测可研</span>
							</a>
						</li>
						<li>
							<a href="${ctx }/toGaikuang">
								<i class="iconfont icon-sheji"></i>
								<span class="hidden-tablet">设计协同</span>
							</a>
						</li>
						<li  class="active">
							<a href="${ctx }/toShigongguanliGK">
								<i class="iconfont icon-construct"></i>
								<span class="hidden-tablet">施工管理</span>
							</a>
						</li>
						<li>
							<a href="${ctx }/toYunweiGK">
								<i class="iconfont icon-Refresh"></i>
								<span class="hidden-tablet">运维管理</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- end: Main Menu -->
			<!-- start: Content -->
			<div id="content" class="span10">
				<ul class="breadcrumb">
					<a href="${ctx }/toRiskmgmt"><i class="iconfont icon-return"></i>返回</a>
					<li>
						<a href="${ctx }/toEbs">进度管理</a>
						<a href="${ctx }/toPm" >场景管理</a>
						<a href="${ctx }/toSafe">安全管理</a>
						<a href="${ctx }/toDungou">盾构监测</a>
						<a href="${ctx }/toRiskmgmt" class="activeList">风险管理</a>
						<a href="#">质量管理</a>
						<a href="#">成本管理</a>
						<a href="#">合同管理</a>
						<a href="#">施工日志</a>
						<a href="#">项目信息</a>
						<a href="${ctx }/toWorkShow">3D综合展示</a>
					</li>
				</ul>
				<div class="row-fluid sortable">
					<div class="box span12 changWidth">
						<div class="box-content">
							<div id="tree" class="ztree"></div>

						</div>
					</div>

					<div id="earth"><img alt="" src="${ctx}/static/page/shigongguanli/camera/img/cameracontent.png" id="detailInfo"></div>
				</div>
			</div>
		</div>
	</div>
</body>
	<script src="${ctx }/static/page/common/js/appendTool.js"></script>
	<script src="${ctx }/static/page/shigongguanli/camera/js/CameraViewer.js"></script>
	<script src="${ctx }/static/webgl/Tool/surveyCallBack.js"></script>
	<script src="${ctx }/static/page/shigongguanli/camera/js/camera.js"></script>
	<script src="${ctx }/static/webgl/pModel/js/move.js"></script>
	<script src="${ctx}/static/page/common/js/FreeDoUtil.js"></script>
	<script src="${ctx}/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
	<script src="${ctx}/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>
	<script src="${ctx}/static/page/common/js/bootstrap.min.js"></script>
	<script src='${ctx}/static/page/common/js/jquery.dataTables.min.js'></script>
	<script src="${ctx}/static/page/common/js/jquery.chosen.min.js"></script>
	<script src="${ctx}/static/page/common/js/jquery.uniform.min.js"></script>
	<script src="${ctx}/static/page/common/js/jquery.cleditor.min.js"></script>
	<script src="${ctx}/static/page/common/js/jquery.noty.js"></script>
	<script src="${ctx}/static/page/common/js/jquery.elfinder.min.js"></script>
	<script src="${ctx}/static/page/common/js/jquery.raty.min.js"></script>
	<script src="${ctx}/static/page/common/js/jquery.uploadify-3.1.min.js"></script>
	<script src="${ctx}/static/page/common/js/custom.js"></script>

</html>