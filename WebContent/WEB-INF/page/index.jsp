<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>首页</title>
	<meta name="description" content="Bootstrap Metro Dashboard">
	<meta name="author" content="Dennis Ji">
	<meta name="keyword" content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
	<!-- end: Meta -->

	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- end: Mobile Specific -->

	<!-- start: CSS -->
	<link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/IconFont/iconfont.css">
	<link id="bootstrap-style" href="${ctx }/static/page/common/css/bootstrap.min.css" rel="stylesheet">
	<link href="${ctx }/static/page/common/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link id="base-style" href="${ctx }/static/page/common/css/style.css" rel="stylesheet">
	<link id="base-style-responsive" href="${ctx }/static/page/common/css/style-responsive.css" rel="stylesheet">
	<link rel="stylesheet" href="${ctx }/static/page/index/css/index.css">
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
						<li>
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
				<!-- end: Header Menu -->

			</div>
		</div>
	</div>
	<!-- start: Header -->

	<div class="container-fluid-full" id='aaa'>
		<div class="row-fluid">
			<!-- start: Content -->
			<div id="content" class="span10">
				<ul class="breadcrumb">
					<i class="iconfont icon-hxzfont08"></i>
					<li>
						<a href="#">工程列表(5)</a>
					</li>
					<li class="lists">
					<a href="#">新建项目</a>
					</li>
				</ul>

				<!-- 图片列表 -->
				<ul class="listProject">
					<li>
						<a href="${ctx }/toSurveystudyGK">
							<p> <i class="iconfont icon-gongcheng"></i> 塘沽地铁站</p>
							<img src="${ctx }/static/page/index/img/tanggu.png" alt="">
							<div class="des">
								<p>负责人员 : 杨强</p>
								<p>设计单位 : 六院</p>
								<p>合同金额 : 600W</p>
							</div>
						</a>
					</li>
					<li>
						<a href="${ctx }/toSurveystudyGK">
							<p> <i class="iconfont icon-gongcheng"></i> 电场项目</p>
							<img src="${ctx }/static/page/index/img/dianchangxiangmu.png" alt="">
							<div class="des">
								<p>负责人员 : 杨强</p>
								<p>设计单位 : 六院</p>
								<p>合同金额 : 600W</p>
							</div>
						</a>
					</li>
					<li>
						<a href="${ctx }/toSurveystudyGK">
							<p> <i class="iconfont icon-gongcheng"></i> 水电站</p>
							<img src="${ctx }/static/page/index/img/shuidianzhan.png" alt="">
							<div class="des">
								<p>负责人员 : 杨强</p>
								<p>设计单位 : 六院</p>
								<p>合同金额 : 600W</p>
							</div>
						</a>
					</li>
					<li>
						<a href="${ctx }/toSurveystudyGK">
							<p> <i class="iconfont icon-gongcheng"></i> 斜拉索大桥</p>
							<img src="${ctx }/static/page/index/img/xielasuodaqiao.png" alt="">
							<div class="des">
								<p>负责人员 : 杨强</p>
								<p>设计单位 : 六院</p>
								<p>合同金额 : 600W</p>
							</div>
						</a>
					</li>
					<li>
						<a href="${ctx }/toSurveystudyGK">
							<p> <i class="iconfont icon-gongcheng"></i> 雄安新区特大桥</p>
							<img src="${ctx }/static/page/index/img/xionganxinqutedaqiao.png" alt="">
							<div class="des">
								<p>负责人员 : 杨强</p>
								<p>设计单位 : 六院</p>
								<p>合同金额 : 600W</p>
							</div>
						</a>
					</li>

				</ul>
			</div>
			<!--/.fluid-container-->

			<!-- end: Content -->
		</div>
		<!--/#content.span10-->
	</div>
	<!--/fluid-row-->


	<footer>

		<p>
			<span style="text-align:left;float:left">&copy; 2017版权北京飞渡有限公司所有</span>
		</p>

	</footer>

	<!-- start: JavaScript-->
	<script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.ui.touch-punch.js"></script>
	<script src="${ctx }/static/page/common/js/modernizr.js"></script>
	<script src="${ctx }/static/page/common/js/bootstrap.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.cookie.js"></script>
	<script src='${ctx }/static/page/common/js/fullcalendar.min.js'></script>
	<script src='${ctx }/static/page/common/js/jquery.dataTables.min.js'></script>
	<script src="${ctx }/static/page/common/js/excanvas.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.flot.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.flot.pie.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.flot.stack.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.flot.resize.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.chosen.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.uniform.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.cleditor.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.noty.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.elfinder.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.raty.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.iphone.toggle.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.uploadify-3.1.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.gritter.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.imagesloaded.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.masonry.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.knob.modified.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.sparkline.min.js"></script>
	<script src="${ctx }/static/page/common/js/counter.js"></script>
	<script src="${ctx }/static/page/common/js/custom.js"></script>
	<script src="${ctx }/static/page/index/js/index.js"></script>
	<!-- end: JavaScript-->

</body>

</html>