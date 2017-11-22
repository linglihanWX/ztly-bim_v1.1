<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>设置</title>
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
	<script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
	<link rel="stylesheet" href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
	<script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>

	<!-- start: Favicon -->
	<!-- end: Favicon -->

	<link rel="stylesheet" href="${ctx }/static/page/set/css/set.css">


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
							<a class="btn dropdown-toggle" href="#">
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
								<li><a href="${ctx }\loginPage"><i class="halflings-icon off"></i>退出登录</a></li>
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
			<!-- start: Content -->
			<div id="content" class="span10">
				<ul class="breadcrumb">
					<li style="margin-right: 20px;"><i class="iconfont icon-return"></i>返回</li>

					<i class="iconfont icon-hxzfont08"></i>
					<li class="lists">
						<a href="${ctx }/toSet" class="activeList">用户</a>
						<a href="#">权限</a>
						<a href="#">组织</a>
						<a href="${ctx }/toCodeLibrary">编码库</a>
						<a href="#">文档库</a>
						<a href="#">基础库配置</a>
					</li>
				</ul>


				<div class="row-fluid sortable">
					<div class="box span12">
						<div class="box-header" data-original-title>
							<h2><i class="iconfont icon-hxzfont08"></i><span class="break"></span>用户数据</h2>
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
										<th>ID</th>
										<th>姓名</th>
										<th>用户名</th>
										<th>职位</th>
										<th>邮箱</th>
										<th>性别</th>
										<th>电话</th>
										<th>QQ</th>
										<th>微信</th>
										<th>最后访问时间</th>
										<th>操作</th>
									</tr>

								</thead>
								<tbody>
								<tr>
									<td>00001</td>
									<td>李荣</td>
									<td>风一样的男人</td>
									<td>三维建模工程师</td>
									<td>jack2017@163.com</td>
									<td>男</td>
									<td>137-8248-9870</td>
									<td>342534534</td>
									<td>32134234</td>
									<td>2017/10/10 10:10:10</td>
									<td>删除用户/禁止用户</td>
								</tr>
								<tr>
									<td>00002</td>
									<td>王伟</td>
									<td>未来，尽在我手中</td>
									<td>JAVA工程师</td>
									<td>weiwei123@163.com</td>
									<td>男</td>
									<td>188-8888-8888</td>
									<td>30214710938</td>
									<td>3214093423</td>
									<td>2017/09/05 15:10:10</td>
									<td>删除用户/禁止用户</td>
								</tr>
								<tr>
									<td>00003</td>
									<td>张雪</td>
									<td>那哖、柒月</td>
									<td>产品经理</td>
									<td>snow7392@163.com</td>
									<td>女</td>
									<td>137-5356-9746</td>
									<td>39345932</td>
									<td>65434357</td>
									<td>2017/08/30 07:10:10</td>
									<td>删除用户/禁止用户</td>
								</tr>
								<tr>
									<td>00004</td>
									<td>吴昊</td>
									<td>茶淡情浓</td>
									<td>项目经理</td>
									<td>wusky@163.com</td>
									<td>男</td>
									<td>155-8567-2854</td>
									<td>302644345</td>
									<td>8644093423</td>
									<td>2017/04/15 10:45:10</td>
									<td>删除用户/禁止用户</td>
								</tr>
								<tr>
									<td>00005</td>
									<td>董鹏</td>
									<td>奋斗小青年</td>
									<td>产品助理</td>
									<td>dongpeng3423@163.com</td>
									<td>男</td>
									<td>189-8482-2844</td>
									<td>6434710938</td>
									<td>732093423</td>
									<td>2017/02/33 09:21:10</td>
									<td>删除用户/禁止用户</td>
								</tr>
								<tr>
									<td>00006</td>
									<td>梅莉</td>
									<td>静沐暖阳</td>
									<td>文员</td>
									<td>lili123@163.com</td>
									<td>女</td>
									<td>177-6473-8343</td>
									<td>46346732</td>
									<td>3244093423</td>
									<td>2017/10/10 10:15:10</td>
									<td>删除用户/禁止用户</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- start: JavaScript-->
	<script src="${ctx }/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
	<script src="${ctx }/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>
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
	<script src="${ctx }/static/page/set/js/set.js"></script>

</body>

</html>