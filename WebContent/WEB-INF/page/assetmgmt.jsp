<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>资产管理</title>
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
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext'
	    rel='stylesheet' type='text/css'>
	<!-- end: CSS -->
	<link rel="stylesheet" href="${ctx}/static/page/common/css/common.css">
	<link rel="stylesheet" href="${ctx}/static/page/common/css/reset.css">
	<link rel="stylesheet" href="${ctx}/static/page/common/IconFont/iconfont.css">
	<link href="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Widgets/widgets.css" rel="stylesheet">
    <script src="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Freedo.js"></script>
    <script src="http://res.gbim360.com/shared/1710_lodash/lodash.min.js"></script>
    <script src="http://res2.gbim360.com/projects/FreedoHolo3DForWeb/develop/API/FreedoX.js"></script>
	<link rel="stylesheet" href="${ctx}/static/webgl/compass/css/compass.css">
	<script src="${ctx}/static/webgl/compass/js/Compass.js"></script>
	<script src="${ctx}/static/page/common/js/FreeDoTool.js"></script>
	<script src="${ctx}/static/page/common/js/jquery-1.9.1.min.js"></script>

	<link rel="stylesheet" href="${ctx}/static/page/common/js/zTreeStyle/zTreeStyle.css">
	<script src="${ctx}/static/page/common/js/zTreeStyle/ztree.js"></script>

	<link rel="stylesheet" href="${ctx}/static/page/yunweimgmt/assetmgmt/css/assetmgmt.css">
	<script src="${ctx}/static/page/common/js/echarts.common.min.js"></script>
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
					<a href="${ctx }/toSpacemgmt"><i class="iconfont icon-return"></i>返回</a>
					<li>
						<a href="${ctx }/toYunweiGK">项目概况</a>
						<a href="${ctx }/toSpacemgmt">空间管理</a>
						<a href="${ctx }/toAssetmgmt" class="activeList">资产管理</a>
						<a href="#" >巡检管理</a>
						<a href="#">维护管理</a>
						<a href="#">调度管理</a>
						<a href="#">风险管控</a>
						<a href="#">应急指挥</a>
						<a href="${ctx }/toJicheng">其他系统</a>
						<a href="#">知识库建设</a>
					</li>
				</ul>
				<div class="row-fluid sortable">
					<div class="box span12 changWidth">
						<div class="box-content">
							<div id="tree" class="ztree"></div>
						</div>
					</div>

					<div id="earth"></div>
				</div>
			</div>
		</div>
	</div>
	<ul id="menu">
		<li class="r1">关键属性</li>
		<li class="r2">详细属性</li>
		<li class="r3">实时数据</li>
		<li class="r4">维修历史</li>
		<li class="r5">检查顶点</li>
		<li class="r6">对象隐藏</li>
		<li class="r7">对象凸显</li>
		<li class="r8">开启工单</li>
	</ul>

	<div class="keyInfo">
		<p>设备信息 <span class="keyClose">关闭</span></p>
		<ul>
			<li><span>资产名称</span><input type="text" value="自动扶梯" disabled></li>
			<li><span>资产编码</span><input type="text" value="A1324316546512" disabled></li>
			<li><span>资产型号</span><input type="text" value="SUPER_START_100276" disabled></li>
			<li><span>生产商</span><input type="text" value="翔云电梯有限公司" disabled></li>
			<li>
				<span>数量</span><input type="number" value="1" disabled  class="listOne"><span>台</span>
				<span>启用日期</span><input type="date" value="2012-10-01" disabled class="listOne">
			</li>
			<li>
				<span>单价</span><input type="number" value="200000.00" disabled class="listOne"><span>元</span>
				<span>使用年限</span><input type="number" value="15" disabled class="listOne"><span>年</span>
			</li>
			<li>
				<span>总价</span><input type="number" value="1000000.00" disabled class="listOne"><span>元</span>
				<span>保修期</span><input type="date" value="2020-09-30" disabled class="listOne">
			</li>
			<li>
				<span>线路段</span><input type="text" value="13号线" disabled class="listOne">
				<span>上次检修日期</span><input type="date" value="2013-02-01" disabled class="listOne">
			</li>
			<li>
				<span>大地点</span><input type="number" value="13号线" disabled class="listOne">
				<span>下次检修时间</span><input type="date" value="2013-11-01" disabled class="listOne">
			</li>
			<li>
				<span>小地点</span><input type="number" value="1000000.00" disabled class="listOne">
				<span>检修周期</span><input type="number" value="3" disabled class="listOne"><span>月</span>
			</li>
		</ul>

	</div>

	<div class="keyDetailInfo">
		<p>详细属性 <span class="keyClose">关闭</span>
		<p>
			<button class="ac">基本属性</button>
			<button>运行数据</button>
			<button>设备工单</button>
			<button>图纸资料</button>
		</p>

		<!--基本属性-->
		<div class="attrKey">
			<p>设计期 <span></span></p>
			<ul>
				<li>编码</li>
				<li>SD-G327</li>
				<li>类型</li>
				<li>单扶梯</li>
				<li>ID</li>
				<li>39542521</li>
				<li>簇与类型</li>
				<li>单扶梯</li>
				<li>踏步深</li>
				<li>400</li>
				<li>族</li>
				<li>电梯</li>
			</ul>
			<p>施工期 <span></span></p>
			<ul>
				<li>型号规格</li>
				<li>PA13(100)</li>
				<li>所属线路</li>
				<li>5号线</li>
				<li>施工单位</li>
				<li>中铁六局</li>
				<li>交付时间</li>
				<li>2017年3月</li>
				<li>使用年限</li>
				<li>144月</li>
				<li>备注</li>
				<li>每日巡检</li>
			</ul>
			<p>运营期 <span></span></p>
			<ul>
				<li>所属单位</li>
				<li>地铁有限公司</li>
				<li>运营单位</li>
				<li>辉耀公司</li>
				<li>安装位置</li>
				<li>5号线大兴站</li>
				<li>当前状态</li>
				<li>正常使用</li>
				<li>质保日期</li>
				<li>2018-10-2</li>
				<li>上次维修</li>
				<li>2016-03-13</li>
			</ul>
		</div>

		<!--运行数据-->
		<div id="chartAttr"></div>

		<!--设备工单-->
		<div class="dKey">
			<div class="row-fluid sortable">
			<div class="box span12">
				<div class="box-header">
					<h2><i class="halflings-icon white align-justify"></i><span class="break"></span>工单列表</h2>
					<div class="box-icon">
						<a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
						<a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
						<a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
					</div>
				</div>
				<div class="box-content tab" >
					<table class="table table-bordered">
						<thead>
						<tr>
							<th>工单号</th>
							<th>工单描述</th>
							<th>负责人</th>
							<th>送单日期</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>1001</td>
							<td class="center">右侧齿轮加油</td>
							<td class="center">程翔</td>
							<td class="center">2017-10-18</td>
						</tr>
						<tr>
							<td>1002</td>
							<td class="center">功耗异常，检查线路部分</td>
							<td class="center">梁策</td>
							<td class="center">2017-10-19</td>
						</tr>
						<tr>
							<td>1003</td>
							<td class="center">功耗异常，检查线路部分</td>
							<td class="center">李华</td>
							<td class="center">2017-10-18</td>
						</tr>
						<tr>
							<td>1004</td>
							<td class="center">右侧齿轮加油</td>
							<td class="center">李华</td>
							<td class="center">2017-10-18</td>
						</tr>
						</tbody>
					</table>

				</div>
			</div><!--/span-->
			</div>
		</div>

		<!--图纸资料-->
		<div class="pic">
			<img src="${ctx }/static/page/yunweimgmt/assetmgmt/img/jiegoupingmiantu1.png" alt="">
			<input type="button" name="" id="" value="下载">
		</div>
	</div>
	<div class="currData">
		<p>实时数据 <span class="keyClose">关闭</span></p>
		<p>
			<span>运行状态：</span><input type="text"disabled value="运行中">
			<span>运行次数：</span><input type="text"disabled id="timeNum">
		</p>
		<p>
			<span>运行总次数：</span><input type="text"disabled id="timeTotal">
			<span>故障报警：</span><input type="text"disabled value="无">
		</p>

		<div id="currData"></div>
	</div>

</body>
	<script src="${ctx }/static/page/common/js/appendTool.js"></script>
	<script src="${ctx}/static/page/yunweimgmt/assetmgmt/js/AssetmgmtViewer.js"></script>
	<script src="${ctx }/static/webgl/Tool/surveyCallBack.js"></script>
	<script src="${ctx }/static/page/yunweimgmt/assetmgmt/js/assetmgmt.js"></script>
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