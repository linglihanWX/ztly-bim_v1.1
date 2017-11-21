<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>其他系统</title>
	<meta name="description" content="Bootstrap Metro Dashboard">
	<meta name="author" content="Dennis Ji">
	<meta name="keyword" content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
	<!-- end: Meta -->

	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- end: Mobile Specific -->

	<!-- start: CSS -->
	<link id="bootstrap-style" href="${ctx}/static/page/common/css/bootstrap.min.css" rel="stylesheet">
	<link href="${ctx}/static/page/common/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link id="base-style" href="${ctx}/static/page/common/css/style.css" rel="stylesheet">
	<link id="base-style-responsive" href="${ctx}/static/page/common/css/style-responsive.css" rel="stylesheet">

	<!-- end: CSS -->
	<link rel="stylesheet" href="${ctx}/static/page/common/css/common.css">
	<link rel="stylesheet" href="${ctx}/static/page/common/css/reset.css">
	<link rel="stylesheet" href="${ctx}/static/page/common/IconFont/iconfont.css">
	<script src="${ctx}/static/page/common/js/jquery-1.9.1.min.js"></script>
	<link rel="stylesheet" href="${ctx}/static/page/yunweimgmt/jicheng/css/jicheng.css">
	
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
						<li >
							<a href="${ctx }/toShigongguanliGK">
								<i class="iconfont icon-construct"></i>
								<span class="hidden-tablet">施工管理</span>
							</a>
						</li>
						<li class="active">
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
					<i class="iconfont icon-hxzfont08"></i>
					<li class="lists">
					<a href="${ctx }/toYunweiGK">项目概况</a>
						<a href="${ctx }/toSpacemgmt">空间管理</a>
						<a href="${ctx }/toAssetmgmt">资产管理</a>
						<a href="#" >巡检管理</a>
						<a href="#">维护管理</a>
						<a href="#">调度管理</a>
						<a href="#">风险管控</a>
						<a href="#">应急指挥</a>
						<a href="${ctx }/toJicheng"  class="activeList">其他系统</a>
						<a href="#">知识库建设</a>
					</li>


				</ul>
				<img src="${ctx }/static/page/yunweimgmt/jicheng/img/jicheng.jpg" alt="">

			</div>
		</div>
	</div>


	<!-- start: JavaScript-->
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
	<!-- end: JavaScript-->
	<script src="${ctx}/static/page/yunweimgmt/jicheng/js/jicheng.js"></script>
<script src="${ctx }/static/webgl/pModel/js/move.js"></script>
</body>

</html>