<!--* 
* @description: 常用工作台，添加自己常用模块快速定位 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section class="tab_content-wrapper desksetion">
		<el-button class="fltIcon" @click.native="handleTabsEdit" size="mini" icon="el-icon-plus"></el-button>
		<el-tabs v-model="activeName">
			<el-tab-pane name="first">
				<div slot="label">我的工作台</div>
				<el-row>
					<el-col :span="24">
						<el-collapse v-model="activeNames" class="desk">
							<el-collapse-item title="快捷菜单" name="1">
								<el-row :gutter="20">
									<el-col :span="6" class="deskmediaForipad mt10" v-for="(item,index) in mymenu" v-if="item.path != '/' && item.path != 1 && item.path != 2 && item.path != 3 && item.path != 4 && item.id != 10416">
										<a href="javascript:void(0);" @click.prevent="$router.push({ path: item.path })">
											<div class="block innerShadowGrey" :style="{background:(index <= 10?colorList[index]:colorList[index%10])}">
												<span>{{ item.name ? item.name : item.children[0].name }}</span>
											</div>
										</a>
									</el-col>
									<el-col :span="6" class="deskmediaForipad mt10">
										<a href="javascript:void(0);" @click="addSpeenMenu">
											<div class="block innerShadowGrey noChoseIcon">
												<span></span>
											</div>
										</a>
									</el-col>
								</el-row>
							</el-collapse-item>
							<el-collapse-item title="活动新闻" name="2" v-if="isWW" class="gsxx_news">
								<template slot="title">
									<div class="fl">活动新闻</div>
									<el-tooltip class="item" @click.native.stop='loadMoreNews' effect="dark" content="点击加载更多" placement="left" style="float:right;margin-right:20px;">
										<i class="iconfont icon-more" style="font-size:2rem;"></i>
									</el-tooltip>
								</template>

								<div class="new_list" v-loading="newsLoading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
									<el-row :gutter="10">
										<el-col :span="8" class="mt10 mediaForipad" v-for="(item,index) in newlist" @click.native="newdetail(item.id,item.categoryid)">
											<div class="nl2Img">
												<img width="100%" v-if="item.categoryid == 6" height="100%" :src="item.abstract_pic" :title="item.abstract_" />
												<img width="100%" v-else="item.categoryid != 6" height="100%" :src="$store.state.IMG_URL+item.abstract_pic" :title="item.abstract_" />
											</div>
											<p class="nl2Despp">
												{{ item.abstract_ }}
											</p>
										</el-col>
									</el-row>
								</div>
								</div>
							</el-collapse-item>
							<el-collapse-item title="地图监控" name="3" class="gsxx_gis" v-if="!inArrayTable('11') || !inArrayTable('12')">
								<template slot="title">
									<div class="fl" style="margin-right:20px;">数据图表</div>
									<el-checkbox-group v-model="checkedMap" @change="changeCheckedMap" :min="1" :max="2">
										<template v-if="!inArrayTable('11') && !inArrayTable('12')">
											<el-checkbox label="1">车辆上线分布</el-checkbox>
											<el-checkbox label="2">员工驻地分布</el-checkbox>
										</template>
										<template v-if="!inArrayTable('11') && inArrayTable('12')">
											<el-checkbox label="1">车辆上线分布</el-checkbox>
										</template>
										<template v-if="inArrayTable('11') && !inArrayTable('12')">
											<el-checkbox label="1">员工驻地分布</el-checkbox>
										</template>
									</el-checkbox-group>
								</template>
								<el-row>

									<template v-if="!inArrayTable('11') && !inArrayTable('12')">
										<el-col :span="24" v-if="checkedMap[0] == 1">
											<echartMap :isresize="isresize" :echarts="echarts"></echartMap>
										</el-col>
										<el-col :span="24" v-if="checkedMap[0] == 2">
											<empresident :isresize="isresize" ref="empresident" :echarts="echarts"></empresident>
										</el-col>
									</template>
									<template v-if="!inArrayTable('11') && inArrayTable('12')">
										<el-col :span="24" v-if="checkedMap[0] == 1">
											<echartMap :isresize="isresize" :echarts="echarts"></echartMap>
										</el-col>
									</template>
									<template v-if="inArrayTable('11') && !inArrayTable('12')">
										<el-col :span="24" v-if="checkedMap[0] == 1">
											<empresident :isresize="isresize" ref="empresident" :echarts="echarts"></empresident>
										</el-col>
									</template>
								</el-row>
							</el-collapse-item>

							<el-collapse-item title="数据模板" name="4" class="bigdata" v-if="!inArrayTable('8') || !inArrayTable('9') || !inArrayTable('10')">
								<el-row :gutter="20">
									<el-col :span="6" class="report-group deskmediaForipad mt10" v-for="(item,index) in modelListInfo" v-if="!inArrayTable((index+8)+'')">
										<div class="area" :style="{height:'150px',background:(index <= 10?colorList[index]:colorList[index%10])}">
											<div class="w100 speedName">
												<div class="groupNameShow">
													<span id="selectGroup">
                  <span v-if="item.project==1">{{cpname}} </span> {{item.projectstr}}
													</span>
												</div>
											</div>
											<div class="w100 text-right">
												<font style="font-size:14px;color:white"> 总{{item.projectstr}} </font>
												<span id="selectTotalMile"> {{item.total}}
               <font style="font-size:12px"> {{item.company}}</font>
             </span>
											</div>
											<div class="w100 selectTotalVehicleCount">
												<div class="col-md-6">
													<span>月增长数：</span>
													<span id="mileageAvg">  <font style="font-size:18px"> {{item.monthgain}}</font>  {{item.company}}</span>
												</div>
												<div class="col-md-6 text-right">
													<span>月增长率：</span>
													<span id="selectTotalVehicleCount">   <font style="font-size:18px"> {{item.monthgrowth? (parseFloat(item.monthgrowth)*100).toFixed(2)+"%":"-"}}</font>   </span>
												</div>
											</div>

											<div class="w100 selectTotalVehicleCount">
												<div class="col-md-6">
													<span>日增长数：</span>
													<span>  <font style="font-size:18px"> {{item.daygain}}</font>  {{item.company}}</span>
												</div>
												<div class="col-md-6 text-right">
													<span>日增长率：</span>
													<span>   <font style="font-size:18px"> {{item.daygrowth?(parseFloat(item.daygrowth)*100).toFixed(2)+"%":"-"}}</font>   </span>
												</div>
											</div>
										</div>
										<div class="w100 report-group-more" id="checkGroup" :style="{background:(index <= 10?colorList[index]:colorList[index%10])}">
											<div class="col-md-6"><span style="cursor:pointer;">更多</span></div>
											<div class="col-md-6 text-right"><i class="iconfont icon-gengduo1 fa-lg"></i></div>
										</div>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="24" v-if="!inArrayTable('4')">
						<el-collapse v-model="activeNames5" class="desk">
							<el-collapse-item title="月报单安装量" name="5" class="bigdata">
								<template slot="title">
									<div class="fl">月报单安装量</div>
									<el-select style="width:200px;margin-left:10px;" v-model="tmpCopItem" :disabled="!isWW" value-key="corpname" @click.native.stop="" @visible-change="changeCop" @change="changeVal" clearable filterable :loading="copLoading" placeholder="请选择公司">
										<el-option v-for="item in copName" :key="item.corpname" :label="item.corpname" :value="item">
										</el-option>
									</el-select>
								</template>
								<el-row :gutter="20">
									<el-col :span="24">
										<e2 :isresize="isresize" ref="e2" :echarts="echarts"></e2>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('5')">
						<el-collapse v-model="activeNames6" class="desk">
							<el-collapse-item title="库存统计" name="6" class="bigdata">
								<template slot="title">
									<div class="fl">库存设备统计</div>
									<el-select style="width:200px;margin-left:10px;" v-model="tmpGroupItem" value-key="GROUPNAME" @click.native.stop="" @visible-change="changeGroup" @change="changeGroupval" clearable filterable :loading="copLoading" placeholder="请选择分组">
										<el-option v-for="item in groupname" :key="item.GROUPNAME" :label="item.GROUPNAME" :value="item">
										</el-option>
									</el-select>
								</template>
								<el-col :span="24">
									<groupinformation :isresize="isresize" ref="groupinformation" :echarts="echarts"></groupinformation>
								</el-col>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('19')">
						<el-collapse v-model="activeNames19" class="desk">
							<el-collapse-item title="订单退回" name="19" class="bigdata">
								<el-col :span="24">
									<back :isresize="isresize" ref="backlist" :echarts="echarts"></back>
								</el-col>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('13')">
						<el-collapse v-model="activeNames13" class="desk">
							<el-collapse-item title="保单金额汇总" name="13" class="bigdata">
								<el-col :span="24">
									<insurance ref="insurance" :echarts="echarts"></insurance>
								</el-col>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('14')">
						<el-collapse v-model="activeNames14" class="desk">
							<el-collapse-item title="月安装设备" name="14" class="bigdata">
								<template slot="title">
									<div class="fl">月安装设备统计</div>
									<el-select style="width:200px;margin-left:10px;" v-model="tmpCopItem2" value-key="corpname" @click.native.stop="" @visible-change="changeCop2" @change="changeVal2" clearable filterable :loading="copLoading" placeholder="请选择公司">
										<el-option v-for="item in copName" :key="item" :label="item" :value="item">
										</el-option>
									</el-select>
								</template>
								<el-row :gutter="20">
									<el-col :span="24">
										<equipmentlist :isresize="isresize" ref="equipmentlist" :echarts="echarts"></equipmentlist>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('18')">
						<el-collapse v-model="activeNames18" class="desk">
							<el-collapse-item title="月安装车辆" name="18" class="bigdata">
								<template slot="title">
									<div class="fl">月安装车辆统计</div>
									<el-select style="width:200px;margin-left:10px;" v-model="tmpCopItem3" value-key="corpname" @click.native.stop="" @visible-change="changeCop3" @change="changeVal3" clearable filterable :loading="copLoading" placeholder="请选择公司">
										<el-option v-for="item in copName" :key="item" :label="item" :value="item">
										</el-option>
									</el-select>
								</template>
								<el-row :gutter="20">
									<el-col :span="24">
										<vehicleprodnumcount :isresize="isresize" ref="vehicleprodnumcount" :echarts="echarts"></vehicleprodnumcount>
									</el-col>
								</el-row>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('15')">
						<el-collapse v-model="activeNames15" class="desk">
							<el-collapse-item title="车辆在线率" name="15" class="bigdata">
								<el-col :span="24">
									<available :isresize="isresize" ref="available" :echarts="echarts"></available>
								</el-col>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('16')">
						<el-collapse v-model="activeNames16" class="desk">
							<el-collapse-item title="车辆在线率" name="16" class="bigdata">
								<el-col :span="24">
									<prodcountonline :isresize="isresize" ref="prodcountonline" :echarts="echarts"></prodcountonline>
								</el-col>
							</el-collapse-item>
						</el-collapse>
					</el-col>

					<el-col :span="24" v-if="!inArrayTable('6') || !inArrayTable('7')">
						<el-collapse v-model="activeNames7" class="desk">
							<el-collapse-item title="万网众汇体系" name="7" class="bigdata">
								<template slot="title">
									<div class="fl" style="margin-right:15px;">订单数量</div>
									<el-checkbox-group v-model="WwCheckedData" @change="changeWwCheckedData" :min="1" :max="2">
										<template v-if="!inArrayTable('6') && !inArrayTable('7')">
											<el-checkbox label="1">体系内</el-checkbox>
											<el-checkbox label="2">体系外</el-checkbox>
										</template>
										<template v-if="!inArrayTable('6') && inArrayTable('7')">
											<el-checkbox label="1">体系内</el-checkbox>
										</template>
										<template v-if="inArrayTable('6') && !inArrayTable('7')">
											<el-checkbox label="1">体系外</el-checkbox>
										</template>
									</el-checkbox-group>
								</template>
								<template v-if="!inArrayTable('6') && !inArrayTable('7')">
									<el-col :span="24" v-if="!inArrayTable('6')">
										<daysystem :isresize="isresize" ref="daysystem" :echarts="echarts" v-if='WwCheckedData[0] == 1'></daysystem>
									</el-col>
									<el-col :span="24" v-if="!inArrayTable('7')">
										<daysystembroad :isresize="isresize" ref="daysystembroad" :echarts="echarts" v-if='WwCheckedData[0] == 2'></daysystembroad>
									</el-col>
								</template>
								<template v-if="!inArrayTable('6') && inArrayTable('7')">
									<el-col :span="24" v-if="!inArrayTable('6')">
										<daysystem :isresize="isresize" ref="daysystem" :echarts="echarts" v-if='WwCheckedData[0] == 1'></daysystem>
									</el-col>
								</template>
								<template v-if="inArrayTable('6') && !inArrayTable('7')">
									<el-col :span="24" v-if="!inArrayTable('7')">
										<daysystembroad :isresize="isresize" ref="daysystembroad" :echarts="echarts" v-if='WwCheckedData[0] == 1'></daysystembroad>
									</el-col>
								</template>

							</el-collapse-item>
						</el-collapse>
					</el-col>
				</el-row>
				<el-row v-if="!inArrayTable('0') || !inArrayTable('1') || !inArrayTable('2') || !inArrayTable('3')">
					<el-col :span="24">
						<el-collapse v-model="activeNames8" class="desk">
							<el-collapse-item title="数据分析" name="8" class="bigdata">
								<template slot="title">
									<div class="block">
										<span class="demonstration" style="margin-right:10px;">数据分析</span>
										<el-date-picker @click.native.stop="" @change="changeTime" :picker-options="pickerOptions" v-model="value4" type="month" placeholder="请选择月">
										</el-date-picker>
									</div>
								</template>
								<el-col :span="24" class="mt10" v-if="!inArrayTable('0')">
									<systemabout :isresize="isresize" ref="systemabout" :echarts="echarts"></systemabout>
								</el-col>
								<el-col :span="24" class="mt10" v-if="!inArrayTable('1')">
									<attendance :isresize="isresize" ref="attendance" :echarts="echarts"></attendance>
								</el-col>
								<el-col :span="24" class="mt10" v-if="!inArrayTable('2')">
									<zhsystem :isresize="isresize" ref="zhsystem" :echarts="echarts"></zhsystem>
								</el-col>
								<el-col :span="24" class="mt10" v-if="!inArrayTable('3')">
									<assigndetails :isresize="isresize" ref="assigndetails" :echarts="echarts"></assigndetails>
								</el-col>
							</el-collapse-item>
						</el-collapse>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>

		<!--资源添加界面-->
		<el-dialog title="编辑资源" :modal-append-to-body="false" :visible.sync="addRourceInfoVisible" :close-on-click-modal="false" @close="rouseEditClose">
			<el-tree :data="regions" show-checkbox highlight-current node-key="id" check-strictly :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" ref="treeRouse" :render-content="renderContent" @check-change="handleCheckChange" :props="defaultProps">
			</el-tree>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addRourceInfoVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleNodeClick">保存</el-button>
			</div>
		</el-dialog>

		<!--详情界面-->
		<el-dialog title="" :modal-append-to-body="false" top="60px" class="ueditor_news" :visible.sync="addFormVisible" :close-on-click-modal="false"></el-dialog>

		<!--详图表设置 配置界面-->
		<el-dialog title="图表配置" :modal-append-to-body="false" top="60px" :visible.sync="editTableVisible" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-checkbox-group v-model="tablesCheckList" @change="handleCheckedTablesChange">
					<el-col :span="24">
						<el-col :span="24">
							<span class="formTile">大数据图表</span>
						</el-col>
						<el-col class="mb10 deskmediaForipad" :span="6">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/map.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">车辆上线分布</span>
									<div class="bottom clearfix">
										<time class="time">地图</time>
										<el-checkbox class="checl" label="11">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/map.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">员工驻地分布</span>
									<div class="bottom clearfix">
										<time class="time">地图</time>
										<el-checkbox class="checl" label="12">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6" :offset="0" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/pie.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">月安装量</span>
									<div class="bottom clearfix">
										<time class="time">饼图</time>
										<el-checkbox class="checl" label="0">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>
						<el-col class="mb10 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/line.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">月考察情况</span>
									<div class="bottom clearfix">
										<time class="time">折线图</time>
										<el-checkbox class="checl" label="1">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/line.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">车辆上线率</span>
									<div class="bottom clearfix">
										<time class="time">折线图</time>
										<el-checkbox class="checl" label="15">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/line.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">设备上线率</span>
									<div class="bottom clearfix">
										<time class="time">折线图</time>
										<el-checkbox class="checl" label="16">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">众汇体系月订单情况</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="2">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>
						<el-col class="mb10 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/line.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">文员月订单处理情况</span>
									<div class="bottom clearfix">
										<time class="time">曲线图</time>
										<el-checkbox class="checl" label="3">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">月报单安装量</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="4">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb10 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">库存设备统计</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="5">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb15 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">月订单退回统计</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="19">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb15 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">保单金额汇总</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="13">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb15 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">月安装设备统计</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="14">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb15 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/bar.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">月安装车辆统计</span>
									<div class="bottom clearfix">
										<time class="time">柱状图</time>
										<el-checkbox class="checl" label="18">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb15 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/line.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">万网业务</span>
									<div class="bottom clearfix">
										<time class="time">体系内</time>
										<el-checkbox class="checl" label="6">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

						<el-col class="mb15 deskmediaForipad" :span="6" v-if="isWW">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/line.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">众汇体系</span>
									<div class="bottom clearfix">
										<time class="time">体系外</time>
										<el-checkbox class="checl" label="7">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>

					</el-col>
					<el-col :span="24">
						<el-col :span="24">
							<span class="formTile">数据模板</span>
						</el-col>
						<el-col :span="6" class="deskmediaForipad">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/treemap.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">安装车辆数</span>
									<div class="bottom clearfix">
										<time class="time">数据模板</time>
										<el-checkbox class="checl" label="8">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6" class="deskmediaForipad">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/treemap.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">设备安装数</span>
									<div class="bottom clearfix">
										<time class="time">数据模板</time>
										<el-checkbox class="checl" label="9">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6" class="deskmediaForipad">
							<el-card :body-style="{ padding: '0px' }">
								<img src="/static/images/treemap.svg">
								<div style="padding: 14px;">
									<span class="pz_titl">报单量</span>
									<div class="bottom clearfix">
										<time class="time">数据模板</time>
										<el-checkbox class="checl" label="10">{{ }}</el-checkbox>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-col>
				</el-checkbox-group>
			</el-row>
		</el-dialog>
	</section>
</template>
<style lang="less">
	@import './css/desk.less';
</style>
<script>
	import util from '../../common/js/util';
	import echarts from 'echarts';
	import 'echarts/map/js/china';
	import echartMap from './eacharts/echartMap';
	import e2 from './eacharts/e2';
	import empresident from './eacharts/empresident';
	import daysystem from './eacharts/daysystem';
	import daysystembroad from './eacharts/daysystembroad';
	import groupinformation from './eacharts/groupinformation';
	import attendance from './eacharts/attendance';
	import assigndetails from './eacharts/assigndetails';
	import zhsystem from './eacharts/zhsystem';
	import systemabout from './eacharts/systemabout';
	import evaluate from 'components/comment/evaluate';
	import equipmentlist from './eacharts/equipmentlist';
	import available from './eacharts/available';
	import vehicleprodnumcount from './eacharts/vehicleprodnumcount';
	import prodcountonline from './eacharts/prodcountonline';
	import insurance from './eacharts/insurance';
	import back from './eacharts/backlist';

	import { getCorListInfo, getCorpNameList, getArtcileList, getGroupInformationes, getArtcileListItem, getEquipmentCorpnames, getVehicleCorpnames } from "../../api/api";
	export default {
		components: {
			echartMap,
			e2,
			empresident,
			daysystem,
			daysystembroad,
			groupinformation,
			attendance,
			assigndetails,
			zhsystem,
			systemabout,
			evaluate,
			equipmentlist,
			available,
			vehicleprodnumcount,
			prodcountonline,
			insurance,
			back
		},
		data() {
			return {
				isresize: 0,
				newsLoading: false,
				//是否是万网人员
				isWW: false,
				isDsJFlag: false,
				tablesCheckList: [],
				editTableVisible: false,
				WwCheckedData: ['1'],
				checkedMap: ['1'],
				addRourceInfoVisible: false,
				regions: [],
				echarts: echarts,
				tmpCopItem: '',
				tmpCopItem2: '',
				tmpCopItem3: '',
				tmpGroupItem: '',
				tmpCopModelItem: '',
				modelListInfo: [],
				copName: [],
				colorList: ['#ce6a64', '#0abb6e', '#70DB93', '#5C3317', '#9F5F9F', '#B5A642', '#D9D919', '#A67D3D', '#8C7853', '#FF7F00', '#42426F', '#4F4F2F', '#238E23', '#2F2F4F', '#23238E'],
				mymenu: [],
				copLoading: false,
				nodeLoading: false,
				defaultProps: {
					label: 'name',
					children: 'children'
				},
				modelList: [{
					id: 1,
					name: "车辆安装数"
				}, {
					id: 2,
					name: "设备安装数"
				}, {
					id: 3,
					name: "报单量"
				}],
				defaultCheckedKeys: [],
				defaultExpandedKeys: [],
				tablesDataLists: [],
				emptyText: "加载中...",
				activeName: 'first',
				activeNames: ["1", "2", "3", "4", "5", "6", "7", "8"],
				activeNames5: ["5"],
				activeNames6: ["6"],
				activeNames7: ["7"],
				activeNames8: ["8"],
				activeNames13: ["13"],
				activeNames14: ["14"],
				activeNames15: ["15"],
				activeNames16: ["16"],
				activeNames17: ["17"],
				activeNames18: ["18"],
				activeNames19: ["19"],
				currentPage1: 1,
				currentPage4: 1,
				newlist: [],
				newspage: 6,
				addFormVisible: false,
				cpname: '',
				groupname: [],
				mymenuList: [],
				value4: '',
				isPewe: true,
				pickerOptions: {
					disabledDate(time) {
						var myDate = new Date();
						var year = myDate.getFullYear();
						return time.getTime() > Date.now() - 8.64e7 ||
							time.getTime() < new Date(year + "-0" + 1).getTime();
					}
				}
			}
		},
		methods: {
			//点击配置图表
			handleTabsEdit() {
				if(!this.isDsJFlag) {
					this.$message({
						message: '你没有这个权限访问大数据图表!',
						type: 'warning'
					});
					return;
				}
				this.editTableVisible = true;
			},
			inArrayTable(value) {
				return $.inArray(value, this.tablesCheckList) < 0;
			},
			//切换图表
			handleCheckedTablesChange(value) {
				let tablesData = {
					userid: JSON.parse(sessionStorage.getItem('user')).id,
					tablesData: value
				}
				this.tablesDataLists.forEach((item, index) => {
					if(tablesData.userid == item.useid) {
						this.tablesDataLists.splice(index, 1);
						return false;
					}
				});
				this.tablesDataLists.push(tablesData);
				localStorage.setItem("tablesData", JSON.stringify(this.tablesDataLists));
				this.tablesCheckList = value;
			},
			//进入文章详情
			newdetail(id, copid) {
				let params = {
					id: id
				}
				this.addFormVisible = true;
				getArtcileListItem(params).then((res) => {
					$("div.ueditor_news div.el-dialog__body").html(res.data.data.content);
				});
			},
			//窗体加载时显示图表信息
			chartinformation() {
				var corpid = JSON.parse(sessionStorage.getItem('user'));
				this.cpname = corpid.corporateInfo.corpname;
				let para = {
					corpid: corpid.corporateInfo.id,
					id: '1,2,3'
				}
				getCorListInfo(para).then((res) => {
					this.modelListInfo = res.data.data;
				});
			},
			//切换万网体系内外回调v==1为内否则为外
			changeWwCheckedData(v) {
				let type = 1;
				if(v.length > 1) {
					type = v[1];
					this.WwCheckedData = [v[1]];
				}
			},
			//切换分布地图图
			changeCheckedMap(v) {
				if(v.length > 1) {
					this.checkedMap = [v[1]];
				}
			},
			//加载更多新闻
			loadMoreNews() {
				this.newspage += 3;
				this.initNewList();
			},
			//初始化文章
			initNewList() {
				var params = {
					categoryids: "1,4,6",
					showCount: this.newspage,
				};
				this.newsLoading = true;
				getArtcileList(params).then((res) => { //获取新闻
					this.newsLoading = false;
					if(res.data.result.code == 0) {
						this.newlist = res.data.data.records;
					}
				});
			},
			//菜单树配置窗口关闭
			rouseEditClose() {
				this.regions = [];
			},
			//菜单树配置选择
			renderContent(h, {
				node,
				data,
				store
			}) {
				if((data.hidden == 1 || data.id == 10330) && data.restype == 1 || data.system == 'E' || data.name == "大数据图表") store.remove(data);
				if(!data.name && !data.children[0]) return;
				return(
					<span>
                <span>{!data.name ? data.children[0].name : data.name}</span>
              </span>);
			},
			//树的选中操作
			handleCheckChange(data, checked, indeterminate) {
				var arr = this.$refs.treeRouse.getCheckedKeys(),
					kesarry = this.$refs.treeRouse.getCheckedNodes(),
					isClearFl = false;
				/*如果子菜单有选中不能取消当前选择 start*/
				if(!checked && data.parentid != 0) {
					kesarry.forEach((res, index) => {
						if(res.id == data.parentid) {
							res.children.forEach((res, index) => {
								if($.inArray(res.id, arr) > 0) {
									isClearFl = true;
									return false;
								}
							});
							if(!isClearFl) {
								this.$refs.treeRouse.setChecked(data.parentid, false);
								return false;
							}
						}
					});
				}
				/*如果子菜单有选中不能取消当前选择 end*/
				/*选中子类的时候选中 至少一个父类*/
				if($.inArray(data.parentid, arr) < 0 && checked && data.parentid != 0) {
					this.$refs.treeRouse.setChecked(data.parentid, true);
					/*选中父类时候选中所有子类*/
					if(data.children.length > 0 && this.isPewe) {
						util.setChecked(this.$refs.treeRouse, data, true, true);
					};
					this.isPewe = false;
					return;
				};
				/*选中父类时候选中给所有子类*/
				if(data.parentid == 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid == 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, false, true);
					return;
				};

				/*选中父类时候选中所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, true, true);
					return;
				};
				/*选中父类时候取消所有子类*/
				if(data.parentid != 0 && data.children.length > 0 && !checked && this.isPewe) {
					util.setChecked(this.$refs.treeRouse, data, false, true);
					return;
				};
				this.isPewe = true;
			},
			//选择树的时候
			handleNodeClick() {
				let treeNode = this.$refs.treeRouse.getCheckedNodes(),
					para = [],
					_this = this;
				treeNode.forEach(function(item, index) {
					para.push(item);
					/*2c*/
					if(item.children.length > 0) {
						item.children.forEach(function(item1, index) {
							var obj = {};
							if(item1.hidden == 1 && item1.restype == 1) {
								para.push(item1);
							}
						});
					}
				});
				let mymenu = {
					userid: JSON.parse(sessionStorage.getItem('user')).id,
					mymenu: para
				}
				this.mymenuList.forEach((item, index) => {
					if(mymenu.userid == item.useid) {
						this.mymenuList.splice(index, 1);
						return false;
					}
				});
				this.mymenuList.push(mymenu);
				//用户操作保存到本地
				localStorage.setItem("mymenu", JSON.stringify(this.mymenuList));
				this.mymenu = para;
				this.addRourceInfoVisible = false;
			},
			addSpeenMenu() {
				let routes = JSON.parse(sessionStorage.getItem('routes')),
					mymenu = this.mymenu;
				this.addRourceInfoVisible = true;
				if(mymenu) {
					var dk = [],
						ek = [];
					mymenu.forEach(function(obj) {
						dk.push(obj.id);
						ek.push(obj.id);
					});
					this.defaultCheckedKeys = dk; //选中当前树
					this.defaultExpandedKeys = ek; //展开
				}
				this.regions = routes;
			},
			changeVal(item) {
				if(!item) return;
				this.$refs.e2.findDeclarationInstallNumber(item.id);
			},
			changeVal2(item) {
				if(!item) return;
				this.$refs.equipmentlist.findDeclarationInstallNumber(item);
			},
			changeCop2(r) {
				if(!r || this.copName.length > 0) return;
				this.copLoading = true;
				let para = {
					showCount: 1000
				}
				getEquipmentCorpnames(para).then((res) => {

					this.copName = res.data.data;
					this.copName.splice(0, 1);
					this.copLoading = false;

				});
			},
			changeVal3(item) {
				if(!item) return;
				this.$refs.vehicleprodnumcount.findDeclarationInstallNumber(item);
			},
			changeCop3(r) {
				if(!r || this.copName.length > 0) return;
				this.copLoading = true;
				let para = {
					showCount: 1000
				}
				getEquipmentCorpnames(para).then((res) => {
					this.copName = res.data.data;
					this.copName.splice(0, 1);
					this.copLoading = false;

				});
			},
			changeGroupval(item) {
				if(typeof item == "object")
					this.$refs.groupinformation.getGroupInformations(item.ID);
			},
			changeCop(r) {
				if(!r || this.copName.length > 0) return;
				this.copLoading = true;
				let para = {
					showCount: 1000
				}
				getCorpNameList(para).then((res) => {
					this.copName = res.data.data.records;
					this.copName.splice(0, 1);
					this.copLoading = false;
				});
			},

			//选择时间
			changeTime(date) {
				date = util.formatDate.format(new Date(date), 'yyyy-MM-dd');

				if(!date) return;
				var para = {
					date: date
				}

				if(this.$refs.attendance) this.$refs.attendance.findattendance(para);
				if(this.$refs.assigndetails) this.$refs.assigndetails.findassigndetails(para);
				if(this.$refs.zhsystem) this.$refs.zhsystem.findzhsysytem(para);
				if(this.$refs.systemabout) this.$refs.systemabout.findsystemaboutcount(para);
			},
			//组信息切换
			changeGroup(r) {
				if(!r || this.groupname.length > 0) return;
				this.copLoading = true;
				getGroupInformationes().then((res) => {
					this.groupname = res.data.data;
					this.copLoading = false;
				});
			},
			/*初始化时间范围*/
			initDateCei() {
				var myDate = new Date();
				var year = myDate.getFullYear();
				var montch = myDate.getMonth();
				if(montch >= 1 && montch <= 9) {
					montch = "0" + montch;
				}
				this.value4 = year + "-" + montch;
			}
		},
		created() {
			let user = JSON.parse(sessionStorage.getItem('user')),
				mymenu = JSON.parse(localStorage.getItem("mymenu")),
				tablesData = JSON.parse(localStorage.getItem("tablesData"));
			this.tablesDataLists = tablesData ? tablesData : [];
			if(mymenu) this.mymenuList = mymenu;
			this.tmpCopItem = user.corporateInfo.corpname;
			//判断是否具有大数据图表查看权限*start*/
			let routes = JSON.parse(sessionStorage.getItem('routes'));
			routes.forEach((item, index) => {
				if(item.name == "工作台") {
					item.children.forEach((item2, index) => {
						if(item2.name == "大数据图表") {
							this.isDsJFlag = true;
							return false;
						}
					})
				}
			});
			//判断是否是内部人员
			this.isWW = user.corporateInfo.corptype == 'WW' ? true : false;
			if(mymenu) {
				mymenu.forEach((item, index) => {
					if(user.id == item.userid) {
						this.mymenu = item.mymenu;
						return false;
					}
				});
			}

			if(this.isWW) this.initNewList();
			if(!this.isDsJFlag) return;

			//判断是否具有大数据图表查看权限*end*/
			getEquipmentCorpnames().then((res) => {
				this.tmpCopItem2 = res.data.data[0];
			});

			getVehicleCorpnames().then((res) => {
				this.tmpCopItem3 = res.data.data[0];
			});

			if(this.tablesDataLists) {
				this.tablesDataLists.forEach((item, index) => {
					if(user.id == item.userid) {
						this.tablesCheckList = item.tablesData;
						return false;
					}
				});
			}
			this.chartinformation(); //图表信息
			this.initDateCei();
			getGroupInformationes().then((result) => {
				this.tmpGroupItem = result.data.data[0].GROUPNAME;
			});
		},
		mounted() {
			let _this = this;
			//当页面窗口发生变化的时候 重绘echarts图表
			window.onresize = function() {
				setTimeout(() => {
					_this.isresize++;
				}, 50);
			}
		},
	}
</script>