<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

    <!-- start: Meta -->
    <meta charset="utf-8">
    <title>盾构监测</title>
    <meta name="description" content="Bootstrap Metro Dashboard">
    <meta name="author" content="Dennis Ji">
    <meta name="keyword"
          content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link id="bootstrap-style" href="${ctx }/static/page/common/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctx }/static/page/common/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link id="base-style" href="${ctx }/static/page/common/css/style.css" rel="stylesheet">
    <link id="base-style-responsive" href="${ctx }/static/page/common/css/style-responsive.css" rel="stylesheet">

    <link rel="stylesheet" href="${ctx }/static/page/common/css/common.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/IconFont/iconfont.css">
    <link href="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Widgets/widgets.css" rel="stylesheet">
    <script src="http://res.gbim360.com/lib/freedo/rel/1.4.0.171017/Freedo/Freedo.js"></script>
    <script src="http://res.gbim360.com/shared/1710_lodash/lodash.min.js"></script>
    <script src="http://res2.gbim360.com/projects/FreedoHolo3DForWeb/develop/API/FreedoX.js"></script>
    <link rel="stylesheet" href="${ctx }/static/webgl/compass/css/compass.css">
    <script src="${ctx }/static/webgl/compass/js/Compass.js"></script>
    <script src="${ctx }/static/page/shigongguanli/dungou/js/base-canvas.js"></script>
    <script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
    <link rel="stylesheet" href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/css/appendTools.css">
    <script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>
    <!--[if lt IE 9]>
    <link id="ie-style" href="css/ie.css" rel="stylesheet">
    <![endif]-->
    <!--[if IE 9]>
    <link id="ie9style" href="css/ie9.css" rel="stylesheet">
    <![endif]-->
    <link rel="stylesheet" href="${ctx }/static/page/shigongguanli/dungou/css/dungou.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/css/media.css">
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
                        <a class="btn dropdown-toggle" href="#">
                            <i class="icon-bell"></i>
                        </a>
                    </li>
                    <!-- start: Message Dropdown -->
                    <li class="dropdown hidden-phone">
                        <a class="btn dropdown-toggle" href="${ctx }/toSet">
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
						<li class="active">
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
                    	<a href="${ctx }/toShigongguanliGK">项目概况</a>
						<a href="${ctx }/toEbs">进度管理</a>
						<a href="${ctx }/toPm">场景管理</a>
						<a href="${ctx }/toSafe">安全管理</a>
						<a href="${ctx }/toDungou"  class="activeList">盾构监测</a>
						<a href="${ctx }/toRiskmgmt">风险管理</a>
						<a href="#">质量管理</a>
						<a href="#">成本管理</a>
						<a href="#">合同管理</a>
						<a href="#">施工日志</a>
						<a href="#">项目信息</a>
						<a href="${ctx }/toWorkShow">3D综合展示</a>
                </li>
                <li>
                    <div id="div1" class="close1">
                        <div id="div2" class="close2"></div>
                    </div>
                    <span class="twoThree">2D</span>
                </li>
            </ul>

            <div class="row-fluid sortable" id="contentBox">
                <div class="box perFour">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>主监控</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                    <div id="wrap" style="text-align: center">
                        <canvas id="cvs" name="cvs" width="500" height="500">
                            你使用的浏览器不支持canvas
                        </canvas>
                    </div>
                    </div>
                </div>

                <!--土压-->
                <div class="box perTwo">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>土压</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th>类别名称</th>
                                <th>数值大小</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="soil">
                                <td>土压1(bar)</td>
                                <td>0.3784722</td>
                            </tr>
                            <tr class="soil">
                                <td>土压2(bar)</td>
                                <td>0.7777778</td>
                            </tr>
                            <tr class="soil">
                                <td>土压3(bar)</td>
                                <td>0.8385417</td>
                            </tr>
                            <tr class="soil">
                                <td>土压4(bar)</td>
                                <td>0.2829861</td>
                            </tr>
                            <tr class="soil">
                                <td>土压5(bar)</td>
                                <td>0.6614583</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--刀盘情况-->
                <div class="box perTwo">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>刀盘情况</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th>类别名称</th>
                                <th>数值大小</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="oil-route">
                                <td>油缸A行程(mm)</td>
                                <td>657</td>
                            </tr>
                            <tr class="oil-route">
                                <td>油缸B行程(mm)</td>
                                <td>642</td>
                            </tr>
                            <tr class="oil-route">
                                <td>油缸C行程(mm)</td>
                                <td>641</td>
                            </tr>
                            <tr class="oil-route">
                                <td>油缸D行程(mm)</td>
                                <td>638</td>
                            </tr>
                            <tr class="oil-bar">
                                <td>油缸A压力(bar)</td>
                                <td>24.1898155</td>
                            </tr>
                            <tr class="oil-bar">
                                <td>油缸B压力(bar)</td>
                                <td>26.8084488</td>
                            </tr>
                            <tr class="oil-bar">
                                <td>油缸C压力(bar)</td>
                                <td>25.83912</td>
                            </tr>
                            <tr class="oil-bar">
                                <td>油缸D压力(bar)</td>
                                <td>0</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--同步注浆量-->
                <div class="box perTwo">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>同步注浆量</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>类别名称</th>
                                <th>数值大小</th>
                            </tr>
                            <tbody>
                            <tr class="mud">
                                <td>1注浆压力(bar)</td>
                                <td>0</td>
                            </tr>
                            <tr class="mud">
                                <td>2注浆压力(bar)</td>
                                <td>0.695891261</td>
                            </tr>
                            <tr class="mud">
                                <td>3注浆压力(bar)</td>
                                <td>0</td>
                            </tr>
                            <tr class="mud">
                                <td>4注浆压力(bar)</td>
                                <td>0.264033556 </td>
                            </tr>
                            <tr class="mud-count">
                                <td>1注浆量(strokes)</td>
                                <td>1668</td>
                            </tr>
                            <tr class="mud-count">
                                <td>2注浆量(strokes)</td>
                                <td>0</td>
                            </tr>
                            <tr class="mud-count">
                                <td>3注浆量(strokes)</td>
                                <td>0</td>
                            </tr>
                            <tr class="mud-count">
                                <td>4注浆量(strokes)</td>
                                <td>2052</td>
                            </tr>


                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="box perFour">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>盾构机偏移</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered ">
                            <thead>

                            </thead>
                            <tbody>
                            <tr>
                                <td>刀盘偏移量X(mm)</td>
                                <td>0.0</td>
                                <td>刀盘偏移量Y(mm)</td>
                                <td>0.0</td>
                            </tr>
                            <tr>
                                <td>前部水平位移(mm)</td>
                                <td>0.0</td>
                                <td>前部垂直位移(mm)</td>
                                <td>0.0</td>
                            </tr>
                            <tr>
                                <td>尾部水平位移(mm)</td>
                                <td>0.0</td>
                                <td>尾部垂直位移(mm)</td>
                                <td>0.0</td>
                            </tr>

                            </tr>
                            </tbody>
                        </table>
                        <canvas id="circleCanvas" width="380" height="380"></canvas>
                        <img src="${ctx }/static/page/shigongguanli/dungou/img/yaw.png" class="yaw">
                        
                    </div>
                </div>

                <!--螺旋机-->
                <div class="box perTwo">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>螺旋机</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th>类别名称</th>
                                <th>数值大小</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="spiral">
                                <td>压力(bar)</td>
                                <td>0</td>
                            </tr>
                            <tr class="deg">
                                <td>油温(Deg.C)</td>
                                <td>28.385416</td>
                            </tr>
                            <tr class="torque">
                                <td>扭矩(kN.m)</td>
                                <td>0</td>
                            </tr>
                            <tr class="speed">
                                <td>转速(bar)</td>
                                <td>0</td>
                            </tr>
                            <tr class="aperture">
                                <td>开度(mm)</td>
                                <td>111.890625</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--铰链情况-->
                <div class="box perTwo">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>铰链情况</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th>类别名称</th>
                                <th>数值大小</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="hinge">
                                <td>铰接油缸A行程(mm)</td>
                                <td>57</td>
                            </tr>
                            <tr class="hinge">
                                <td>铰接油缸B行程(mm)</td>
                                <td>48</td>
                            </tr>
                            <tr class="hinge">
                                <td>铰接油缸C行程(mm)</td>
                                <td>36</td>
                            </tr>
                            <tr class="hinge">
                                <td>铰接油缸D行程(mm)</td>
                                <td>22</td>
                            </tr>
                            <tr class="hinge-bar">
                                <td>铰接油缸压力(bar)</td>
                                <td>0</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--泡沫系统-->
                <div class="box perTwo">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>泡沫系统</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table  table-striped table-bordered ">
                            <thead>
                            <tr>
                                <th>类别名称</th>
                                <th>数值大小</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="froth-bar">
                                <td>泡沫系统1压力(bar)</td>
                                <td>0.79680264</td>
                            </tr>

                            <tr class="air">
                                <td>泡沫系统1空气流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="additive">
                                <td>泡沫系统1添加剂流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="froth-bar">
                                <td>泡沫系统2压力(bar)</td>
                                <td>0.5193866</td>
                            </tr>

                            <tr class="air">
                                <td>泡沫系统2空气流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="additive">
                                <td>泡沫系统2添加剂流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="froth-bar">
                                <td>泡沫系统3压力(bar)</td>
                                <td>0.546151638</td>
                            </tr>

                            <tr class="air">
                                <td>泡沫系统3空气流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="additive">
                                <td>泡沫系统3添加剂流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="froth-bar">
                                <td>泡沫系统4压力(bar)</td>
                                <td>0.4448785</td>
                            </tr>

                            <tr class="air">
                                <td>泡沫系统4空气流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            <tr class="additive">
                                <td>泡沫系统4添加剂流量(L/min)</td>
                                <td>0</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div class="changeToThree">
                    <div id="tree" class="ztree"></div>
                    <div id="earth"></div>
					<div class="detailInfo">
					    <ul>
					        <li><span>名称</span><input type="text"/></li>
					        <li><span>水源所在地</span><input type="text"/></li>
					        <li><span>取水口名称</span><input type="text"/></li>
					        <li><span>设计能力</span><input type="text"/></li>
					    </ul>
					    <button class="sureChange">确认</button>
					</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="chart">
    <span class="closeChart">关闭</span>
    <div id="picChart"></div>
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
<script src="${ctx }/static/page/common/js/echarts.min.js"></script>
	<script src="${ctx }/static/webgl/pModel/js/move.js"></script>
<script src="${ctx }/static/page/common/js/FreeDoUtil.js"></script>
<script src="${ctx }/static/page/shigongguanli/dungou/js/canvasCircle.js"></script>
<script src="${ctx }/static/page/shigongguanli/dungou/js/tbm.js"></script>
<script src="${ctx }/static/page/common/js/appendTool.js"></script>
<script src="${ctx }/static/page/shigongguanli/dungou/js/DungouViewer.js"></script>
<script src="${ctx }/static/webgl/Tool/surveyCallBack.js"></script>
<script src="${ctx }/static/page/shigongguanli/dungou/js/dungou.js"></script>

</body>

</html>