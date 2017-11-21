<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

    <!-- start: Meta -->
    <meta charset="utf-8">
    <title>规划-项目概况</title>
    <meta name="description" content="Bootstrap Metro Dashboard">
    <meta name="author" content="Dennis Ji">
    <meta name="keyword" content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
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
    <link rel="stylesheet" href="${ctx }/static/page/surveystudy/surveystudyGK/css/surveystudyGK.css">
     <link rel="stylesheet" href="${ctx }/static/page/common/css/media.css">
    <!--[if lt IE 9]>
    <link id="ie-style" href="css/ie.css" rel="stylesheet">
    <![endif]-->

    <!--[if IE 9]>
    <link id="ie9style" href="css/ie9.css" rel="stylesheet">
    <![endif]-->
</head>

<body>
<!-- start: Header -->
<div class="navbar">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="btn btn-navbar" data-toggle="collapse"
               data-target=".top-nav.nav-collapse,.sidebar-nav.nav-collapse">
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
                    	<a href="${ctx }/toSurveystudyGK" class="activeList">项目概况</a>
						<a href="${ctx }/toWater">水文数据</a>
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

            </ul>
            <div class="row-fluid sortable">
                <div class="box span12">
                    <div class="box-header">
                        <h2>
                            <i class="halflings-icon white align-justify"></i>
                            <span class="break"></span>项目信息</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting">
                                <i class="halflings-icon white wrench"></i>
                            </a>
                            <a href="#" class="btn-minimize">
                                <i class="halflings-icon white chevron-up"></i>
                            </a>
                            <a href="#" class="btn-close">
                                <i class="halflings-icon white remove"></i>
                            </a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>项目序号</th>
                                    <th>项目名称</th>
                                    <th>项目开始时间</th>
                                    <th>项目周期</th>
                                    <th>项目报价(万元)</th>
                                    <th>竞标单位</th>
                                    <th>拆迁面积(㎡)</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="center">1</td>
                                    <td class="center">塘沽地铁站</td>
                                    <td class="center">2017/10/01</td>
                                    <td class="center">3年</td>
                                    <td class="center">35000.00</td>
                                    <td class="center">中铁建设集团</td>
                                    <td class="center">292654</td>
                                </tr>
                                <tr>
                                    <td class="center">2</td>
                                    <td class="center">广州高明区电场</td>
                                    <td class="center">2015/09/03</td>
                                    <td class="center">1年</td>
                                    <td class="center">5000.00</td>
                                    <td class="center">广州天新电力集团</td>
                                    <td class="center">152894</td>
                                </tr>
                                <tr>
                                    <td class="center">3</td>
                                    <td class="center">张通高速</td>
                                    <td class="center">2015/03/11</td>
                                    <td class="center">2年</td>
                                    <td class="center">3000.00</td>
                                    <td class="center">陕西高速集团</td>
                                    <td class="center">58741</td>
                                </tr>
                                <tr>
                                    <td class="center">4</td>
                                    <td class="center">永安水电站</td>
                                    <td class="center">2012/06/01</td>
                                    <td class="center">3年</td>
                                    <td class="center">659000.00</td>
                                    <td class="center">中国水电建设集团国际工程有限公司</td>
                                    <td class="center">2005613</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pagination pagination-centered">
                            <ul>
                                <li>
                                    <a href="#">上页</a>
                                </li>
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">下页</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--/span-->
                <div id="chartOne" class="span6 chart"></div>
                <div id="chartTwo" class="span6 chart"></div>
                <!-- <div id="chartThree" class="chart"></div> -->
                <!--<div id="chartFour" class="chart"></div>-->
            </div><!--/row-->
        </div>
    </div>
</div>
<script src="${ctx }/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>
<script src="${ctx }/static/page/common/js/bootstrap.min.js"></script>
<script src='${ctx }/static/page/common/js/jquery.dataTables.min.js'></script>
<script src="${ctx }/static/page/common/js/jquery.chosen.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.uniform.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.cleditor.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.elfinder.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.raty.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.uploadify-3.1.min.js"></script>
<script src="${ctx }/static/page/common/js/custom.js"></script>
<script src="${ctx }/static/page/common/js/echarts.min.js"></script>
<script src="${ctx }/static/page/surveystudy/surveystudyGK/js/surveystudyGK.js"></script>

</body>

</html>