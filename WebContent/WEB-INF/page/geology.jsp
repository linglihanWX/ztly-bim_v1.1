<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>地质数据</title>
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
	<link rel="stylesheet" href="${ctx }/static/page/common/IconFont/iconfont.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/css/appendTools.css">
	<link href="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Widgets/widgets.css" rel="stylesheet">
    <script src="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Freedo.js"></script>
    <script src="http://res.gbim360.com/shared/1710_lodash/lodash.min.js"></script>
    <script src="http://res2.gbim360.com/projects/FreedoHolo3DForWeb/develop/API/FreedoX.js"></script>
	<link rel="stylesheet" href="${ctx }/static/webgl/compass/css/compass.css">
	<link rel="stylesheet" href="${ctx }/static/page/surveystudy/geology/css/geology.css">
	<script src="${ctx }/static/webgl/compass/js/Compass.js"></script>
	<script src="${ctx }/static/page/common/js/FreeDoTool.js"></script>
	<script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
	<link rel="stylesheet" href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
	<script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>
	<link rel="shortcut icon" href="img/favicon.ico">
	<!-- end: Favicon -->

	<link rel="stylesheet" href="${ctx }/static/page/surveystudy/water/css/water.css">
	<script src="${ctx }/static/page/common/js/echarts.common.min.js"></script>
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
				<!-- end: Header Menu -->

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
						<li class="active">
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
				<i class="iconfont icon-hxzfont08"></i>
					<li class="lists">
						<a href="${ctx }/toSurveystudyGK">项目概况</a>
						<a href="${ctx }/toWater">水文数据</a>
						<a href="${ctx }/toEnvironment">环境数据</a>
						<a href="${ctx }/toGeology" class="activeList">地质数据</a>
						<a href="#">风险数据</a>
						<a href="#">环评报告</a>
						<a href="#">政府批文</a>
						<a href="#">项目信息</a>
						<a href="#">数据导出</a>
						<a href="${ctx }/toPlanRoute">规划选线</a>
						<a href="${ctx }/toShow">3D综合展示</a>
					</li>
					<li>
						<div id="div1" class="close1">
							<div id="div2" class="close2"></div>
						</div>
						<span class="twoThree">2D</span>
					</li>
				</ul>


				<div class="row-fluid sortable">
					<div class="box span12">
						<div class="box-header" data-original-title>
							<h2><i class="iconfont icon-hxzfont08"></i><span class="break"></span>地质数据</h2>
							<div class="box-icon">
								<a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
								<a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
								<!-- <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a> -->
							</div>
						</div>
						<div class="box-content">
							<table class="table table-striped table-bordered bootstrap-datatable datatable">
								<thead>
									<tr>
										<th rowspan="2">钻孔编号</th>
										<th rowspan="2">钻孔深度</th>
										<th rowspan="2">孔口高程</th>
										<th colspan="2">坐标(m)</th>
										<th colspan="3">粉质黏土</th>
										<th colspan="4">泥岩</th>
										<th colspan="3">砂岩</th>
										<th colspan="3">素填土</th>
										<th colspan="3">强风化带(m)</th>
										<th>取样</th>
										<th rowspan="2">操作</th>
									</tr>
									<tr>
										<th>X</th>
										<th>Y</th>
										<th>深度</th>
										<th>厚度</th>
										<th>标高</th>
										<th>序号</th>
										<th>深度</th>
										<th>厚度</th>
										<th>标高</th>
										<th>深度</th>
										<th>厚度</th>
										<th>标高</th>
										<th>深度</th>
										<th>厚度</th>
										<th>标高</th>
										<th>深度</th>
										<th>厚度</th>
										<th>标高</th>
										<th>深度</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>ZY01</td>
										<td>10.40</td>
										<td>887.56</td>
										<td>33751.09</td>
										<td>80139.50</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td>10.40</td>
										<td>10.40</td>
										<td>10.40</td>
										<td></td>
										<td></td>
										<td></td>
										<td>5.20</td>
										<td>5.20</td>
										<td>882.36</td>
										<td>1</td>
										<td></td>
									</tr>
									<tr>
										<td>ZY02</td>
										<td>8.20</td>
										<td>881.56</td>
										<td>33727.98</td>
										<td>80144.34</td>
										<td>3.30</td>
										<td>1.20</td>
										<td>888.26</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td>8.20</td>
										<td>4.90</td>
										<td>883.36</td>
										<td>2.10</td>
										<td>2.10</td>
										<td>889.46</td>
										<td>3.90</td>
										<td>0.60</td>
										<td>887.66</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>ZY03</td>
										<td>8.20</td>
										<td>891.65</td>
										<td>33702.31</td>
										<td>80123.34</td>
										<td>3.40</td>
										<td>1.50</td>
										<td>883.21</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td>8.20</td>
										<td>4.90</td>
										<td>883.36</td>
										<td>2.80</td>
										<td>2.60</td>
										<td>890.60</td>
										<td>4.40</td>
										<td>1.60</td>
										<td>887.25</td>
										<td>1</td>
										<td></td>
									</tr>
								</tbody>
							</table>


							<div id="tree" class="ztree"></div>
						</div>
					</div>
					    <div class="msgInfo" id="showmsg">
        					<h1 id="information"></h1>
   						</div>
					<div id="earth"></div>
					<div class="detailInfo">
					    <ul>
					        <li><span>钻孔编号</span><input type="text"/></li>
					        <li><span>日期</span><input type="text"/></li>
					        <li><span>钻孔深度</span><input type="text"/></li>
					        <li><span>孔口高程</span><input type="text"/></li>
					    </ul>
					    <button class="sureChange">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
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

	<script src="${ctx }/static/page/common/js/change2D3D.js"></script>
	<script src="${ctx }/static/webgl/drillingColumn/js/FDDrillingMgr.js"></script>
	<script src="${ctx }/static/page/common/js/appendTool.js"></script>
	<script src="${ctx }/static/page/surveystudy/geology/js/GeologyViewer.js"></script>
	<script src="${ctx }/static/webgl/Tool/surveyCallBack.js"></script>
	<script src="${ctx }/static/page/surveystudy/geology/js/geology.js"></script>
</body>

</html>