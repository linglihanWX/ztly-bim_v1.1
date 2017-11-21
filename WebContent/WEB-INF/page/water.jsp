<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>水文数据</title>
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
	<link rel="stylesheet" href="${ctx }/static/page/common/css/common.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/IconFont/iconfont.css">
	<link rel="stylesheet" href="${ctx }/static/webgl/compass/css/compass.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
	<link rel="stylesheet" href="${ctx }/static/page/surveystudy/water/css/water.css">
	<link rel="stylesheet" href="${ctx }/static/page/common/css/appendTools.css">
	<!-- end: CSS -->
	
	<link href="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Widgets/widgets.css" rel="stylesheet">
    <script src="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Freedo.js"></script>
    <script src="http://res.gbim360.com/shared/1710_lodash/lodash.min.js"></script>
    <script src="http://res2.gbim360.com/projects/FreedoHolo3DForWeb/develop/API/FreedoX.js"></script>
	<script src="${ctx }/static/webgl/compass/js/Compass.js"></script>
	<script src="${ctx }/static/page/common/js/FreeDoTool.js"></script>
	<script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
	<script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>
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
					<li class="lists">
					<i class="iconfont icon-hxzfont08"></i>
						<a href="${ctx }/toSurveystudyGK">项目概况</a>
						<a href="${ctx }/toWater" class="activeList">水文数据</a>
						<a href="${ctx }/toEnvironment">环境数据</a>
						<a href="${ctx }/toGeology">地质数据</a>
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
							<h2><i class="iconfont icon-hxzfont08"></i><span class="break"></span>水文数据</h2>
							<div class="box-icon">
								<a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
								<a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
							</div>
						</div>
						<div class="box-content">
							<table class="table table-striped table-bordered bootstrap-datatable datatable">
								<thead>
									<tr>
										<th rowspan="3">水源地名称</th>
										<th rowspan="3">水源地所在地</th>
										<th rowspan="3">服务城镇</th>
										<th rowspan="3">取水口名称</th>
										<th rowspan="3">设计能力(万吨/日)</th>
										<th colspan="2">取水口坐标</th>
										<th colspan="6">保护区域</th>
										<th rowspan="3">备注</th>
									</tr>
									<tr>
										<th rowspan="2">经度</th>
										<th rowspan="2">纬度</th>
										<th colspan="2">一级保护区</th>
										<th colspan="2">二级保护区</th>
										<th colspan="2">准保护区</th>
									</tr>
									<tr>
										<th>水域</th>
										<th>陆域</th>
										<th>水域</th>
										<th>陆域</th>
										<th>水域</th>
										<th>陆域</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>白洋淀水文保护</td>
										<td>白洋淀</td>
										<td>白洋淀中心城区</td>
										<td>水二厂取水口</td>
										<td>104.09</td>
										<td>30.71</td>
										<td>23.00</td>
										<td>自来水二厂</td>
										<td>自来水二厂</td>
										<td>从一级保护区获取</td>
										<td>从一级保护区获取</td>
										<td>从二级保护区获取</td>
										<td>从二级保护区获取</td>
										<td></td>
									</tr>
									<tr>
										<td>大清河水文保护</td>
										<td>清河</td>
										<td>清河中心城区</td>
										<td>水二厂取水口</td>
										<td>104.08</td>
										<td>30.71</td>
										<td>15.00</td>
										<td>自来水二厂</td>
										<td>自来水二厂</td>
										<td>从一级保护区获取</td>
										<td>从一级保护区获取</td>
										<td>从二级保护区获取</td>
										<td>从二级保护区获取</td>
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
				</div>
			</div>
		</div>
	</div>
		<div id="tableInfo">
		<p><span>详细</span><span>关闭</span></p>

		<div class="tableContent">
			<table border="1">
				<tbody>
				<tr>
					<td>规划区名称</td>
					<td id="T_ghqmc"></td>
					<td>项目名称</td>
					<td id="T_xmmc"></td>
				</tr>
				<tr>
					<td>报告名称</td>
					<td id="T_bgmc"></td>
					<td>空间布局</td>
					<td id="T_kjbj"></td>
				</tr>
				<tr>
					<td>行政区划</td>
					<td id="T_xzqh"></td>
					<td>人均用地面积</td>
					<td id="T_rjztmj"></td>
				</tr>
				<tr>
					<td>规划区面积</td>
					<td id="T_ghqmj"></td>
					<td>规划期限</td>
					<td id="T_gdqx"></td>
				</tr>
				<tr>
					<td>职能结构</td>
					<td id="T_znjg"></td>
					<td>镇区规模</td>
					<td id="T_zqgm"></td>
				</tr><tr>
					<td>发展方向</td>
					<td id="T_fzfx"></td>
					<td>城镇化发展目标</td>
					<td id="T_czhfzmb"></td>
				</tr>
				</tbody>
			</table>
		</div>
	<!-- start: JavaScript-->
 	<script src="${ctx }/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
	<%-- <script src="${ctx }/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script> --%>
	<script src="${ctx }/static/page/common/js/jquery-ui.js"></script> 
	<script src="${ctx }/static/page/common/js/bootstrap.min.js"></script>
	<script src='${ctx }/static/page/common/js/jquery.dataTables.min.js'></script>
	<script src="${ctx }/static/page/common/js/jquery.chosen.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.uniform.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.cleditor.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.noty.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.elfinder.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.raty.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.uploadify-3.1.min.js"></script>	
	<script src="${ctx }/static/page/common/js/change2D3D.js"></script>
 	<script src="${ctx }/static/page/common/js/custom.js"></script>
 	<script src="${ctx }/static/page/common/js/tool.js"></script>
 	<script src="${ctx }/static/page/common/js/tableassign.js"></script>
	<script src="${ctx }/static/page/common/js/appendTool.js"></script>
	<script src="${ctx }/static/page/surveystudy/water/js/WaterViewer.js"></script>
	<script src="${ctx }/static/webgl/Tool/surveyCallBack.js"></script>
	<script src="${ctx }/static/page/surveystudy/water/js/water.js"></script>
	
	


	<!-- end: JavaScript-->
</body>

</html>