<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

<!-- start: Meta -->
<meta charset="utf-8">
<title>BIM方案设计</title>
<meta name="description" content="Bootstrap Metro Dashboard">
<meta name="author" content="Dennis Ji">
<meta name="keyword"
	content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
<!-- end: Meta -->

<!-- start: Mobile Specific -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- end: Mobile Specific -->

<link id="bootstrap-style"
	href="${ctx }/static/page/common/css/bootstrap.min.css"
	rel="stylesheet">
<link href="${ctx }/static/page/common/css/bootstrap-responsive.min.css"
	rel="stylesheet">
<link id="base-style" href="${ctx }/static/page/common/css/style.css"
	rel="stylesheet">
<link id="base-style-responsive"
	href="${ctx }/static/page/common/css/style-responsive.css"
	rel="stylesheet">
<link rel="stylesheet" href="${ctx }/static/page/common/css/common.css">
<link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
<link rel="stylesheet"
	href="${ctx }/static/page/common/IconFont/iconfont.css">
<script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
<link rel="stylesheet"
	href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
<script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>
<link rel="stylesheet"
	href="${ctx }/static/page/designcoordination/designplan/css/design.css">
<link rel="stylesheet" href="${ctx }/static/page/common/css/media.css">
</head>

<body>
	<!-- start: Header -->
	<div class="navbar">
		<div class="navbar-inner">
			<div class="container-fluid">
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".top-nav.nav-collapse,.sidebar-nav.nav-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
				</a> <a class="brand" href="${ctx }/toIndex"><span>BIM全生命周期管理平台</span></a>

				<!-- start: Header Menu -->
				<div class="nav-no-collapse header-nav">
					<ul class="nav pull-right">
						<li class="dropdown hidden-phone"><a
							class="btn dropdown-toggle" data-toggle="dropdown" href="#">
								<i class="icon-bell"></i>
						</a></li>
						<!-- start: Message Dropdown -->
						<li class="dropdown hidden-phone"><a
							class="btn dropdown-toggle" href="${ctx }/toSet"> <i
								class="iconfont icon-set"></i>
						</a></li>
						<!-- start: Notifications Dropdown -->
						<li class="dropdown hidden-phone"><a
							class="btn dropdown-toggle" href="${ctx }/toIndex"> <i
								class="icon-home" style="font-size: 20px"></i>
						</a></li>
						<!-- end: Notifications Dropdown -->
						<!-- start: User Dropdown -->
						<li class="dropdown"><a class="btn dropdown-toggle"
							data-toggle="dropdown" href="#"> <i
								class="halflings-icon white user"></i>李荣 <span class="caret"></span>
						</a>
							<ul class="dropdown-menu">
								<li class="dropdown-menu-title"><span>账户设置</span></li>
								<li><a href="#"><i class="halflings-icon user"></i> 文件</a></li>
								<li><a href="${ctx }/loginPage"><i
										class="halflings-icon off"></i>退出登录</a></li>
							</ul></li>
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
						<li><a href="${ctx }/toSurveystudyGK"> <i
								class="iconfont icon-kcmanager"></i> <span class="hidden-tablet">勘测可研</span>
						</a></li>
						<li class="active"><a href="${ctx }/toGaikuang"> <i
								class="iconfont icon-sheji"></i> <span class="hidden-tablet">设计协同</span>
						</a></li>
						<li><a href="${ctx }/toShigongguanliGK"> <i
								class="iconfont icon-construct"></i> <span class="hidden-tablet">施工管理</span>
						</a></li>
						<li><a href="${ctx }/toYunweiGK"> <i
								class="iconfont icon-Refresh"></i> <span class="hidden-tablet">运维管理</span>
						</a></li>
					</ul>
				</div>
			</div>
			<!-- end: Main Menu -->

			<!-- start: Content -->
			<div id="content" class="span10">
				<ul class="breadcrumb">
					<i class="iconfont icon-hxzfont08"></i>
					<li class="lists"><a href="${ctx }/toGaikuang">项目概况</a> <a
						href="${ctx }/toTask">任务</a> <a href="${ctx }/toDesign"
						class="activeList">BIM方案设计</a> <a href="${ctx }/toDocument">文档管理</a>
						<a href="#">项目信息</a> <a href="${ctx }/toShuziyijiao">数字移交</a><a
						href="${ctx }/toDesignShow">3D综合展示</a></li>
				</ul>
				<div id="tree" class="ztree"></div>
				<div class="row-fluid sortable">

					<div class="box span12">

						<div class="box-content">
							<ul class="listProject">
								<li class="first-list"><a href="#"> <i
										class="iconfont icon-plus"></i>
										<div class="upload">上传方案</div>
								</a></li>
								<li><a href="${ctx }/toMainbuilding">
										<p>
											<i class="iconfont icon-gongcheng"></i>安检设备
										</p> <img
										src="${ctx }/static/page/designcoordination/designplan/img/anjianshebei.png"
										alt="">
										<div class="des">
											<p>
												<span>负责人员 :</span>杨强
											</p>
											<p>
												<span>设计单位 :</span>六院
											</p>
											<p>
												<span>合同金额 :</span>600W
											</p>
											<span class="check">已提交</span>
										</div>
								</a>
									<div class="history">
										<a href="javascript:void(0)">更新模型</a> <a
											href="javascript:void(0)">删除模型</a> <a
											href="${ctx }/toHistoryCompare">版本对比</a>
									</div></li>
								<li><a href="${ctx }/toMainbuilding">
										<p>
											<i class="iconfont icon-gongcheng"></i>电梯设备
										</p> <img
										src="${ctx }/static/page/designcoordination/designplan/img/diantishebei.png"
										alt="">
										<div class="des">
											<p>
												<span>负责人员 :</span>杨强
											</p>
											<p>
												<span>设计单位 :</span>六院
											</p>
											<p>
												<span>合同金额 :</span>600W
											</p>
											<span class="check">已审核</span>
										</div>
								</a>
									<div class="history">
										<a href="javascript:void(0)">更新模型</a> <a
											href="javascript:void(0)">删除模型</a> <a
											href="${ctx }/toHistoryCompare">版本对比</a>
									</div></li>
								<li><a href="${ctx }/toMainbuilding">
										<p>
											<i class="iconfont icon-gongcheng"></i>检票设备
										</p> <img
										src="${ctx }/static/page/designcoordination/designplan/img/zhajishebei.png"
										alt="">
										<div class="des">
											<p>
												<span>负责人员 :</span>杨强
											</p>
											<p>
												<span>设计单位 :</span>六院
											</p>
											<p>
												<span>合同金额 :</span>600W
											</p>
											<span class="check">审核中</span>
										</div>
								</a>
									<div class="history">
										<a href="javascript:void(0)">更新模型</a> <a
											href="javascript:void(0)">删除模型</a> <a
											href="${ctx }/toHistoryCompare">版本对比</a>
									</div></li>
								<li><a href="${ctx }/toMainbuilding">
										<p>
											<i class="iconfont icon-gongcheng"></i>服务中心
										</p> <img
										src="${ctx }/static/page/designcoordination/designplan/img/server.png"
										alt="">
										<div class="des">
											<p>
												<span>负责人员 :</span>杨强
											</p>
											<p>
												<span>设计单位 :</span>六院
											</p>
											<p>
												<span>合同金额 :</span>600W
											</p>
											<span class="check">已提交</span>
										</div>
								</a>
									<div class="history">
										<a href="javascript:void(0)">更新模型</a> <a
											href="javascript:void(0)">删除模型</a> <a
											href="${ctx }/toHistoryCompare">版本对比</a>
									</div></li>
							</ul>
						</div>

						<div class="different">
							<p>
								电厂主体建筑-审批详细 <span class="gb">关闭</span>
							</p>
							<div class="box span12">
								<div class="box-header">
									<h2>
										<i class="halflings-icon white align-justify"></i><span
											class="break"></span>审批流程
									</h2>
									<div class="box-icon">
										<a href="#" class="btn-setting"><i
											class="halflings-icon white wrench"></i></a> <a href="#"
											class="btn-minimize"><i
											class="halflings-icon white chevron-up"></i></a>
										<!--<a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>-->
									</div>
								</div>
								<div class="box-content">
									<table
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th>节点</th>
												<th>审批人</th>
												<th>审批时间</th>
												<th>审批内容</th>
												<th>审批意见</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td class="center">石勇</td>
												<td class="center">2017/10/12</td>
												<td class="center">这次修改的很恰当。</td>
												<td class="center">通过</td>
											</tr>
											<tr>
												<td>2</td>
												<td class="center">李寒冰</td>
												<td class="center">2017/10/13</td>
												<td class="center"></td>
												<td class="center">审批中</td>
											</tr>
										</tbody>
									</table>

								</div>
							</div>
							<!--/span-->
							<p>审批进度:</p>
							当前节点：<i></i>通过: <i></i>
							<div class="lct">
								<span title="申请人：张冲&#10;申请时间：2017/10/10 08:06:56 &#10;"></span>
								<span title="审批人：石勇&#10;审批时间：2017/10/12 09:31:47 &#10;审批状态：审批通过"></span>
								<span
									title="审批人：李寒冰 &#10;审批时间：2017/10/13 14:28:34 &#10;审批状态：审批中"></span>
								<span title="审批人：黄理建&#10;审批时间：无 &#10;审批状态：未审批"></span> <span
									title="结束时间：无 &#10;审批状态：未知"></span>
							</div>

						</div>
						<div class="different">
							<p>
								电厂主体建筑-审批详细 <span class="gb">关闭</span>
							</p>
							<div class="box span12">
								<div class="box-header">
									<h2>
										<i class="halflings-icon white align-justify"></i><span
											class="break"></span>审批流程
									</h2>
									<div class="box-icon">
										<a href="#" class="btn-setting"><i
											class="halflings-icon white wrench"></i></a> <a href="#"
											class="btn-minimize"><i
											class="halflings-icon white chevron-up"></i></a>
										<!--<a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>-->
									</div>
								</div>
								<div class="box-content">
									<table
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th>节点</th>
												<th>审批人</th>
												<th>审批时间</th>
												<th>审批内容</th>
												<th>审批意见</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td class="center">开国建</td>
												<td class="center">2017/10/12</td>
												<td class="center">这次修改的很恰当。</td>
												<td class="center">通过</td>
											</tr>

										</tbody>
									</table>

								</div>
							</div>
							<!--/span-->
							<p>审批进度:</p>
							当前节点：<i></i>通过: <i></i>
							<div class="lct1">
								<span title="申请人：许辉&#10;申请时间：2017/10/09 08:06:56 &#10;"></span>
								<span title="审批人：陈华&#10;审批时间：无&#10;审批状态：无"></span> <span
									title="审批人：开国建 &#10;审批时间：2017/10/11 14:28:34 &#10;审批状态：通过"></span>
								<span title="审批人：陈华&#10;审批时间：无&#10;审批状态：无"></span> <span
									title="结束时间：2017/10/11 14:28:34 &#10;审批状态：通过"></span>
							</div>

						</div>
						<div class="different">
							<p>
								电厂主体建筑-审批详细 <span class="gb">关闭</span>
							</p>
							<div class="box span12">
								<div class="box-header">
									<h2>
										<i class="halflings-icon white align-justify"></i><span
											class="break"></span>审批流程
									</h2>
									<div class="box-icon">
										<a href="#" class="btn-setting"><i
											class="halflings-icon white wrench"></i></a> <a href="#"
											class="btn-minimize"><i
											class="halflings-icon white chevron-up"></i></a>
										<!--<a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>-->
									</div>
								</div>
								<div class="box-content">
									<table
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th>节点</th>
												<th>审批人</th>
												<th>审批时间</th>
												<th>审批内容</th>
												<th>审批意见</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td class="center">陈建国</td>
												<td class="center">2017/10/12</td>
												<td></td>
												<td class="center">审批中</td>
											</tr>
										</tbody>
									</table>

								</div>
							</div>
							<!--/span-->
							<p>审批进度:</p>
							当前节点：<i></i>通过: <i></i>
							<div class="lct2">
								<span title="申请人：何林&#10;申请时间：2017/10/14 12:06:56 &#10;"></span>
								<span title="审批人：陈建国&#10;审批时间：无&#10;审批状态：未审批"></span> <span
									title="审批人：刘康&#10;审批时间：无&#10;审批状态：未审批"></span> <span
									title="审批人：程翔&#10;审批时间：无&#10;审批状态：未审批"></span> <span
									title="审批人：霍建峰&#10;审批时间：无&#10;审批状态：未审批"></span> <span
									title="审批人：马布里&#10;审批时间：无&#10;审批状态：未审批"></span> <span
									title="结束时间：无 &#10;审批状态：无"></span>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- start: JavaScript-->
	<script src="${ctx }/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
	<script
		src="${ctx }/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>
	<script src="${ctx }/static/page/common/js/bootstrap.min.js"></script>
	<script src='${ctx }/static/page/common/js/jquery.dataTables.min.js'></script>
	<script src="${ctx }/static/page/common/js/jquery.chosen.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.uniform.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.cleditor.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.noty.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.elfinder.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.raty.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery.uploadify-3.1.min.js"></script>
	<script src="${ctx }/static/page/common/js/custom.js"></script>
	<!-- end: JavaScript-->
	<script
		src="${ctx }/static/page/designcoordination/designplan/js/design.js"></script>

</body>

</html>