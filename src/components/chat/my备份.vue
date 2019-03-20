<template>
	<section>
		<!-- 聊天列表面板 -->
		<div id="wrap">
			<!-- 标题 -->
			<div class="title"></div>
			<!-- 列表Tab -->
			<div class="content">
				<!-- 主体部分 -->
				<div class="im-main">
					<div class="info">
						<template v-if="!this.sysUserAvatar">
							<img src="../../assets/images/pho.png" class="avatar headImg">
						</template>
						<template else-if>
							<img v-if="this.sysUserAvatar" :src="'/img/'+this.sysUserAvatar" class="avatar headImg">
						</template>
						<div class="user">{{ this.sysUserName }}</div>
						<div class="status"></div>
						<input @change="signName" class="remark" placeholder="编辑签名" v-model="signname" />
					</div>
					<template>
						<el-input size="mini" placeholder="搜索" class="search noborder nofocus" v-model="filterText">
						    <el-button slot="prepend" icon="search"></el-button>
						</el-input>

						<el-tabs class="tablist" v-model="activeName" @tab-click='tabClick'>
							<!-- 会话 -->
							<el-tab-pane name="first">
								<span slot="label"><i class="iconfont icon-xiaoxi" title="会话"></i></span>
							</el-tab-pane>
							<!-- 通讯录 -->
							<el-tab-pane name="second" class="addressList">
								<span slot="label"><i class="iconfont icon-lianxiren1" title="通讯录"></i></span>
								<el-tree
								  v-loading="empDataLoading"
								  element-loading-text="通讯录列表加载中..."
								  element-loading-spinner="el-icon-loading"
								  element-loading-background="rgba(0, 0, 0, 0.7)"
								  class="filter-tree"
								  :data="empData"
								  :props="defaultProps"
								  highlight-current
								  node-key="ID"
								  :filter-node-method="filterNode"
								  expand-on-click-node
						  		  :render-content="renderContent"
								  ref="tree">
								</el-tree>
							</el-tab-pane>
							<!-- 记事本 -->
							<el-tab-pane name="third" id="booktreeMenu" class="jishiben" v-loading="listLoading">
								<span slot="label"><i class="iconfont icon-note" style="font-size:18px;" title="记事本"></i></span>
								<el-menu default-active="1" class="el-menu-vertical-demo" unique-opened style="opacity:0.7;">
									<template v-if="bookData.length == 0">
										<span class="noBook">暂无记事</span>
									</template>
									<template else v-for="item in bookData">
									          <el-menu-item index="0">
											<el-checkbox v-model="item.status" @change="changeStatus(item)">{{item.notetypename}}</el-checkbox>

											<!-- 分享的人 -->
											<template>
												<span v-show='item.recipient != item.userid && item.recipientname != undefined'>
													<!-- <template v-if="item.headiconpath == null"> -->
														<img src="/static/images/pho.png" class="avatar shareImg">
													<!-- </template> -->
													<!-- <template else-if> -->
														<!-- <img :src="'/img/'+item.headiconpath" class="avatar shareImg"> -->
													<!-- </template> -->
													<i class="shareName">{{ item.recipientname }}</i>
												</span>
											</template>

											<!-- 更多操作下拉框 --> 
											<template data="item">
												<el-dropdown trigger="click" class="gengduo">
												      <i class="iconfont icon-gengduo" title="更多"></i>
												      <el-dropdown-menu slot="dropdown">
												      	<template>
												        		<el-dropdown-item @click.native="shareBook(item)"><i class="iconfont icon-fenxiang"></i>&nbsp; 分 享</el-dropdown-item>
												          </template>
												          <template>
													        <el-dropdown-item @click.native="handleEdit(item)"><i class="iconfont icon-bianji"></i>&nbsp; 编 辑</el-dropdown-item>
													</template>
													<template>
													        <el-dropdown-item @click.native="deleteBook(item)"><i class="iconfont icon-shanchu"></i>&nbsp; 删 除</el-dropdown-item>
													</template>
												      </el-dropdown-menu>
												</el-dropdown>
											</template>

											<!-- 记事本内容 -->
											<div class="msgcontent">{{ item.memo }}</div>

											<!-- 图标 【时间】【地址】-->
											<div class="moreinfo">
												<span>{{ fmtdata.formatDate.format(new Date(item.reminddate), 'MM-dd hh:mm') }}</span>
											 	<i class="iconfont icon-naozhong1-copy time" title="时间"></i>
											 	<span>{{ item.address }}</span>
											 	<i class="iconfont icon-dizhi1 time" title="地址"></i>
											</div>
									          </el-menu-item>
									</template>
								</el-menu>
								
								<!-- 悬浮时间框 -->
								<div class="timepicker" @click="timepickerVisible = true">{{date}}</div>

								<!-- footer -->
								<div class="footer">
									<el-tooltip content="筛选" placement="top"><i class="iconfont icon-shaixuanxuanzhong" @click="handleFilter"></i></el-tooltip>
									<el-tooltip content="新增记事" placement="top"><i class="iconfont icon-tianjia" style="float:right;" @click="handleAdd"></i></el-tooltip>
								</div>

								</el-tab-pane>
						</el-tabs>
					</template>
				</div>
			</div>
			<span class="setwin"><a class="iconfont icon-cha1 rotate" href="javascript:;" @click="$emit('closechat')"></a></span>
		</div>


		<!-- 日期选择面板 -->
		<el-card class="box-card chooseTime" v-if="timepickerVisible">
			<el-date-picker
			      style="margin-bottom:10px;"
			      v-model="date"
			      type="date"
			      placeholder="选择日期"
			      @change="saveDate">
			</el-date-picker>
			<el-button-group>
				<el-button @click="timepickerVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="editDate" size="small" :loading="dateLoading">确 定</el-button>
			  </el-button-group>
		</el-card>
		    

		<!-- 筛选查询条件面板 -->
		<el-card class="box-card filter im-filter-card" v-if="filtersVisible">
			  <div class="formTile">类型
				  <el-checkbox-group v-model="checkboxGroupType" size="small">
				    	<el-checkbox-button v-for="item in notetypeOptions" :label="item.value">{{item.label}}</el-checkbox-button>
				  </el-checkbox-group>
			  </div>
			  <div class="formTile">时间
			  	<el-date-picker class="mt5"
			  	      size="mini"
				      v-model="checkboxGroupDate"
				      type="datetimerange"
				      placeholder="选择日期范围"
				      :picker-options="pickerOptions2">
				</el-date-picker>
			  </div>
			  <div class="formTile">状态
			  	<el-radio-group v-model="filterStatus" size="small" class="radio">
			  		<el-radio-button label="1">已完成</el-radio-button>
					<el-radio-button label="0">未完成</el-radio-button>
				</el-radio-group>
			  </div>
			  <el-button-group class="button">
				<el-button @click="reset" size="small">重 置</el-button>
				<el-button type="primary" @click="filterBtn" size="small" :loading="filterLoading">确 定</el-button>
			  </el-button-group>
			  <span class="setwin"><a class="iconfont icon-cha1 rotate" href="javascript:;" @click="filtersVisible = false"></a></span>
		</el-card>

		<!-- 添加记事本面板 -->
		<el-card class="box-card addbook im-filter-card" v-if="addBookVisible">
			<el-select v-model="addBook.notetype" size="mini">
			    <el-option
			      v-for="item in notetypeOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<!-- <el-select v-model="addBook.system" size="mini">
			    <el-option
			      v-for="item in systemOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select> -->
			<el-input type="textarea" placeholder="请输入记事本内容" autofocus v-model="addBook.memo"></el-input>
			<el-date-picker
			      size="mini"
			      v-model="addBook.reminddate"
			      type="datetime"
			      placeholder="选择日期时间"
			      align="right"
			      :picker-options="pickerOptions1">
			 </el-date-picker>
			 <el-input class="address" placeholder="不超过 9个字" v-model="addBook.address" size="mini" icon="my-icon-dizhi1"></el-input>
			  <el-button-group>
				<el-button @click="addBookVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="addSubmit" size="small" :loading="addLoading">确 定</el-button>
			  </el-button-group>
		</el-card>

		<!-- 编辑记事本面板 -->
		<el-card class="box-card addbook" v-if="editBookVisible">
			<el-select v-model="editBook.notetype" size="mini">
			    <el-option
			      v-for="item in notetypeOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="editBook.system" size="mini">
			    <el-option
			      v-for="item in systemOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-input type="textarea"  :autosize="{ minRows: 1, maxRows: 3}" placeholder="请输入记事本内容" autofocus v-model="editBook.memo"></el-input>
			<el-date-picker
			      size="mini"
			      v-model="editBook.reminddate"
			      type="datetime"
			      placeholder="选择日期时间"
			      align="right"
			      :picker-options="pickerOptions1">
			 </el-date-picker>
			 <el-input class="address" placeholder="不超过 9个字" v-model="editBook.address" size="mini" icon="my-icon-dizhi1"></el-input>
			  <el-button-group>
				<el-button @click="editBookVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editLoading" size="small">确 定</el-button>
			  </el-button-group>
		</el-card>
		
		<!-- 分享记事 -->
		<el-card class="box-card share" v-if="shareVisible">
			<div class="spanTitle">分享记事
				<span class="setwin"><a class="iconfont icon-cha1 rotate" href="javascript:;" @click="shareVisible = false"></a></span>
			</div>
			<div class="leftSide">
				<el-input style="margin-bottom:10px" placeholder="输入关键字查找联系人" size="mini" v-model="filterText"></el-input>
				<el-tree
				  v-loading="empDataLoading"
			      element-loading-text="联系人列表加载中..."
			      element-loading-spinner="el-icon-loading"
			      element-loading-background="rgba(0, 0, 0, 0.7)"
				  class="filter-tree"
				  :data="empData"
				  :props="defaultProps"
				  highlight-current
				  node-key="id"
				  :filter-node-method="filterNode"
				  expand-on-click-node
		  		  :render-content="renderContent"
		  		  @node-click="chooseEmp"
				  ref="tree">
				</el-tree>
			</div>
			<div class="rightSide">
				<el-card class="box-card showShareBook">
					<div>{{shareBookShow.notetypename}}</div>
					<hr style="border:0;background-color:#C9C9CA;height:1px;margin-top:5px;'">
					<!-- 记事本内容 -->
					<div class="sharecontent">{{ shareBookShow.memo }}</div>

					<!-- 图标 【时间】【地址】-->
					<div class="sharemoreinfo">
						<span>{{ fmtdata.formatDate.format(new Date(shareBookShow.reminddate), 'MM-dd hh:mm') }}</span>
					 	<i class="iconfont icon-naozhong1-copy time" title="时间"></i>
					 	<span>{{ shareBookShow.address }}</span>
					 	<i class="iconfont icon-dizhi1 time" title="地址"></i>
					</div>
				</el-card>
				<div>
					<p>分享给以下联系人：{{ this.dynamicTags.length + '/' + 1}}</p>
					<el-tag
					  type="primary"
					  :key="tag"
					  v-for="tag in dynamicTags"
					  :closable="true"
					  :close-transition="false"
					  @close="handleClose(tag)"
					  class="chooseTag"
					>
					{{tag}}
					</el-tag>	
				</div>
				
			</div>
			<div class="shareFooter">
				<el-button @click.native="shareSubmit" size="mini" :disabled="this.dynamicTags.length == 0" :loading="shareLoading"> 分 享 </el-button>
				<el-button @click.native="shareVisible = false" size="mini"> 取 消 </el-button>
			</div>
		</el-card>


		<!-- 提醒记事-->
		<el-card class="box-card warn" v-if="warnVisible">
			<el-checkbox v-model="warnBook.status" @change="changeStatus(warnBook)">{{warnBook.notetypename}}</el-checkbox>
			<!-- 分享的人 -->
			<template>
				<span v-show='warnBook.recipientname != undefined'>
					<!-- <template v-if="item.headiconpath == null"> -->
						<img src="/static/images/pho.png" class="avatar shareImg">
					<!-- </template> -->
					<!-- <template else-if> -->
						<!-- <img :src="'/img/'+item.headiconpath" class="avatar shareImg"> -->
					<!-- </template> -->
					<i class="shareName">{{ warnBook.recipientname }}</i>
				</span>
			</template>

			<!-- 记事本内容 -->
			<div class="msgcontent">{{ warnBook.memo }}</div>

			<!-- 图标 【时间】【地址】-->
			<div class="moreinfo" style="top:55px;">
				<span>{{ fmtdata.formatDate.format(new Date(warnBook.reminddate), 'MM-dd hh:mm') }}</span>
			 	<i class="iconfont icon-naozhong1-copy time" title="时间"></i>
			 	<span>{{ warnBook.address }}</span>
			 	<i class="iconfont icon-dizhi1 time" title="地址"></i>
			</div>
			<span class="setwin"><a class="iconfont icon-cha1 rotate" href="javascript:;" @click="warnVisible = false"></a></span>
		</el-card>

		<!-- 聊天页面 -->

	</section>
</template>

<style scoped>
  @import '/static/css/common.css';
  @import './css/contactsList.css';
  @import '/static/css/style.css';
</style>

<script>
	import util from '../../common/js/util';
	import '../../../static/js/jquery.nicescroll';
	import {getBookInfoList,addBookInfo,modifyBookInfo,changeBookInfo,getBookInfoListSelect,getEmpInfoList} from '../../api/api';

	    const typeOptions = ['全部', '会议', '工作', '任务','项目','生活'];
	 
	    export default {
	        data() {
	           return {
	           	fmtdata:util,
	           	activeName: 'second',//默认显示tab
	           	user:'',//当前用户信息
	           	sysUserName: '',//当前用户名
	           	sysUserid:'',//当前用户id
			sysUserAvatar: ''  ,//当前头像
			sysUserDeptid:'',//当前用户所属部门id
			signname:'',//个性签名
			timepickerVisible:false,//日期选择面板显示
			filtersVisible:false,//筛选面板显示
			addBookVisible:false,//添加记事面板
			editBookVisible:false,//编辑记事本面板
			shareVisible:false,//分享记事本面板
			warnVisible:false,//提醒记事本面板
			warnBook:[],//提醒记事本内容
			chooseDate:'',//选择的日期值value
			bookData:[],//记事本数据
			listLoading:false,//加载中...
			filterLoading:false,
			dateLoading:false,
			addLoading:false,
			editLoading:false,
			shareLoading:false,
			shareBookShow:'',//分享——当前点击的记事本数据
			empData:[],//好友列表
			empDataLoading:false,
			filterText:'',//好友列表搜索的内容
    		defaultProps: {// 好友列表
	          label: 'employeename',
	          children: 'employees'
			},
			dynamicTags: [],//选择标签
			chooseEmpData:[],//选择的员工信息
			addBook:{
				notetype:'3',//记事本类型
				system:'A',//系统
				memo:'',//内容
				reminddate:new Date(),//时间
				address:'万网会议室',//地址
			},
			editBook:{
				notetype:'',
				system:'',
				memo:'',
				reminddate:'',
				address:'',
			},
			
		        date: util.formatDate.format(new Date(), 'yyyy-MM-dd'),//悬浮日期框—日期默认今天

		        pickerOptions1: {//新增记事本 选择日期时间
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周后',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        },
		        pickerOptions2: {
			          shortcuts: [{
			            text: '最近一周',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			              picker.$emit('pick', [start, end]);
			            }
			          }, {
			            text: '最近一个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			              picker.$emit('pick', [start, end]);
			            }
			          }, {
			            text: '最近三个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			              picker.$emit('pick', [start, end]);
			            }
			          }]
			        },
		        notetypeOptions: [{
			          value: '1',
			          label: '全部'
			        }, {
			          value: '2',
			          label: '工作'
			        }, {
			          value: '3',
			          label: '会议'
			        }, {
			          value: '4',
			          label: '任务'
			        }, {
			          value: '5',
			          label: '项目'
			        }, {
			          value: '6',
			          label: '生活'
			        }],
			systemOptions: [{
			          value: 'A',
			          label: 'VAS'
			        }, {
			          value: 'B',
			          label: 'E车宝'
			        }, {
			          value: 'C',
			          label: 'UCHE'
			        }],

		        types:typeOptions,//筛选类型列表
		        checkboxGroupType:[],//选择的筛选类型组
		        filterStatus:'',//选择的筛选状态组
		        checkboxGroupDate:'',//时间
	           }
	        },
	        watch: {
		      filterText(val) {
		        this.$refs.tree.filter(val);
		      }
		},
	        methods:{
	        		// 获取已有记事
			getBooks:function(){
				this.listLoading = true;
				let para = {
					reminddate:this.date,
					// status:0,
				}
				getBookInfoList(para).then((res) => {
					this.listLoading = false;
					this.bookData = res.data.data.records;
				});
			},
			// 改变完成状态
			changeStatus:function(data){
				this.$confirm('确认更改该记事完成状态吗?', '提示', {
					type: 'warning'
				}).then(() => {//确认时
					let para = { 
						id: data.ID,
						status:data.status == false ? 0 : data.status == true ? 1 : '',
					};
					changeBookInfo(para).then((res) => {
						this.$message ({
							message : '更改状态成功！',
							type: 'success'
						});
						this.getBooks();
					});
				}).catch(() => {//取消时
				          this.$message({
					          type: 'info',
					          message: '取消更改'
				          });
				          this.warnBook.status = this.warnBook.status == false ? true : this.warnBook.status == true ? false : ''
				          this.getBooks();
				});
			},

	        		// 编辑记事页面显示
	        		handleEdit:function(data){
	        			this.editBookVisible = true;
	        			this.editBook = {
	        				id:data.ID,
	        				notetype:data.notetype,
					system:data.system,
					memo:data.memo,
					reminddate:data.reminddate,
					address:data.address,
	        			}
	        			if (data.reminddate == this.editBook.reminddate ) {//当没改日期时
	        				this.editBook.reminddate = new Date(data.reminddate);
	        			}
			},
			// 编辑记事
			editSubmit:function(){
				this.editLoading = true;
	        			let para = {
	        				id:this.editBook.id,
	        				notetype:this.editBook.notetype,
	        				system:this.editBook.system,
	        				memo:this.editBook.memo,
	        				reminddate:this.editBook.reminddate,
	        				address:this.editBook.address,
	        			}
	        			modifyBookInfo(para).then((res) => {
					this.$message ({
						message : '编辑记事成功',
						type: 'success'
					});
					this.editLoading = false;
					this.editBookVisible = false;
					this.getBooks();
				});
	        		},
	        		// 新增页面显示
	        		handleAdd:function(){
	        			this.addBookVisible = true;
	        			this.addBook = {
	        				notetype:'3',//记事本类型
					system:'A',//系统
					memo:'',//内容
					reminddate:new Date(),//时间
					address:'万网会议室',//地址
	        			}
	        		},
	        		// 新增记事
	        		addSubmit:function(){
	        			this.addLoading = true;
	        			let para = {
	        				notetype:this.addBook.notetype,
	        				system:this.addBook.system,
	        				memo:this.addBook.memo,
	        				reminddate:this.addBook.reminddate,
	        				address:this.addBook.address,
	        			}
	        			if (para.memo == '') {
	        				this.$message ({
						message : '请输入记事内容！',
						type: 'warning'
					});
	        				this.addLoading = false;
	        			}else{
	        				addBookInfo(para).then((res) => {
						this.$message ({
							message : '新增记事成功',
							type: 'success'
						});
						this.addLoading = false;
						this.addBookVisible = false;
						this.getBooks();
					});
	        			}
	        		},
	        		// 删除记事
	        		deleteBook:function(data){
	        			this.$confirm('确认删除该条记事吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = { 
						id: data.ID,
						isdelete:1,
					};
					changeBookInfo(para).then((res) => {
						this.$message ({
							message : '删除成功',
							type: 'success'
						});
						this.getBooks();
					});
				})
	        		},
	        		// 日期选择器值改变时
	        		saveDate:function(val){
	        			this.chooseDate = val;
	        		},
	        		// 选择日期查询记事
	        		editDate:function(){
	        			this.dateLoading = true;
	        			this.date = this.chooseDate;//页面显示当前选择的时间

	        			if (this.chooseDate == '') {//当未改变时间时
	        				this.chooseDate = util.formatDate.format(new Date(),'yyyy-MM-dd');
	        				this.date = this.chooseDate;
	        			}
	        			//调接口查询当前选择日期的记事
	        			let para = {
					reminddate:this.chooseDate,
				}
				getBookInfoList(para).then((res) => {
					this.bookData = res.data.data.records;
					this.dateLoading = false;
					this.timepickerVisible = false;
				});
	        		},
	        		//筛选重置
	        		reset:function(){
	        			this.checkboxGroupType = [];
	        			this.checkboxGroupDate = [];
	        			this.filterStatus = '';
	        		}, 
	        		// 筛选页面显示
	        		handleFilter:function(){
	        			this.filtersVisible = true;
	        			this.reset();//调用重置方法清空
	        		},
	        		//筛选提交
	        		filterBtn:function(){
	        			this.filterLoading = true;
	        			let para = {
	        				notetype:this.checkboxGroupType.join(','),
	        				status:this.filterStatus ? parseInt(this.filterStatus) : '',
	        				startTime:this.checkboxGroupDate ? (this.checkboxGroupDate[0] ? util.formatDate.format(new Date(this.checkboxGroupDate[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
	        				endTime:this.checkboxGroupDate ? (this.checkboxGroupDate[1] ? util.formatDate.format(new Date(this.checkboxGroupDate[1]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
	        			}
	  			getBookInfoListSelect(para).then((res) => {
					this.bookData = res.data.data.records;
					this.filterLoading = false;
					this.filtersVisible = false;
				});
	        		},

	        		// 分享记事页面显示
	        		shareBook:function(data){
	        			if (data.userid == data.recipient) {//当分享人的id 与 当前登录人ID 相同时
	        				this.shareVisible = true;
		        			this.shareBookShow = data;//存储当前记事本数据
		        			this.dynamicTags = [];//清空标签
		        			this.initEmpList();//调用查询好友接口
	        			}else{//不同时
	        				this.$message ({
						message : '只允许分享一次！不可再次分享！',
						type: 'warning'
					});
	        			}
	        			console.log(data)
	        			
	        		},
	        		// 关闭 标签时
	        		handleClose(tag) {
			        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
	        		// 查询好友列表
			initEmpList:function(){
				this.empDataLoading = true;
				//初始化所有父节点树
				getEmpInfoList().then((res) => {
					this.empData = res.data.data;
					this.empDataLoading = false;
				});
		    },
			// 好友搜索过滤
			filterNode(value, data) {
		        if (!value || !data.employeename) return true;
		        return data.employeename.indexOf(value) !== -1;
			},
			// 渲染树列表页面
			renderContent(h, { node, data, store }) {
				if (data.employees == undefined) {//子集时
					if (data.headiconpath == null) {//当没有头像时，显示默认头像
			      			return (<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"><span><img src='/static/images/pho.png' width='30' height='30' style='borderRadius:50%;marginRight:5px;' />{ data.employeename + '  (' + data.mobile + ')' }</span></span>);
			      		}else{//当有头像时
			      			return (<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"><span><img src={'/img/'+data.headiconpath} width='30' height='30' style='borderRadius:50%;marginRight:5px;' />{ data.employeename + '  (' + data.mobile + ')' }</span></span>);
			      		}
				}else{//第一级
					if (data.ID == this.sysUserDeptid) {//当 当前登陆用户部门id=渲染部门id时
						node.expanded = true;//展开当前部门树
					}
			      		return (<span><span>{ data.employeename }</span></span>);
				}
			},
			// 点击好友时
			chooseEmp:function(data,node,model){
				if (data.employees == undefined) {//当点击的子集时
					if (this.dynamicTags.length > 0) {//只能选择1个人
						this.$message ({
							message : '只能选择一人！',
							type: 'warning'
						});
					}else{
						let flag = true;
						// 循环遍历储存在标签里
						if(this.dynamicTags.length == 0){//未选择标签时
							this.chooseEmpData = [];//初始化选择的好友
							this.dynamicTags.push(data.employeename);//没数据时，push数据
							this.chooseEmpData.push({userid:data.userid,employeename:data.employeename,headiconpath:data.headiconpath});//将员工ID、员工名字、员工头像存入
						}
						this.dynamicTags.forEach( (item, index) => {//有数据时
							if (data.employeename == item){//当点击的数据=item时，不push，返回false
								flag = false;
							} 
						});

						if(flag){//当flag未为rue时
							this.chooseEmpData = [];//初始化选择的好友
							this.dynamicTags.push(data.employeename);
							this.chooseEmpData.push({userid:data.userid,employeename:data.employeename,headiconpath:data.headiconpath});//将员工ID、员工名字、员工头像存入
						}
					}
				}
			},
			// 点击好友分享按钮时
			shareSubmit:function(){
				this.shareLoading = true;
				if (this.dynamicTags.length != 1) {//当不止一人时
					this.$message ({
						message : '抱歉！暂支持分享单人！',
						type: 'warning'
					});
				}else{
					let para = {
						id:this.shareBookShow.ID,
						recipient:this.chooseEmpData[0].userid,
					}
					changeBookInfo(para).then((res) => {
						this.$message ({
							message : '分享成功！',
							type: 'success'
						});
						this.shareLoading = false;
						this.shareVisible = false;
						this.getBooks();
					});
				}
			},

			//webworkers方法
			startWorker:function(){
				let w;
				if(typeof(Worker) !== "undefined"){//当浏览器支持webworkers时
					if(typeof(w) == "undefined") {
				 		w = new Worker("/static/js/webworkers.js");
				  	}
				  	w.onmessage = (event) => {
				  		this.bookData.forEach( (item, index) => {
							if ((item.reminddate).toString().substring(0,10) == event.data.toString().substring(0,10)) {
								this.warnVisible = true;
								this.warnBook = item;
							}
						});
				  	}
				}else{//当浏览器不支持webworkers时
					console.log('当前浏览器不支持webworkers！')
				}
			},
	        		
	        		//签名 
	        		signName:function(val){
	        			this.signname = val.target.value;
	        		},
	        		// 点击 tab
	        		tabClick:function(tab,event){
	        			if (tab.index == '2' && tab.name == 'third') {//当点击记事本时
					// 加载记事本已有记事数据
					this.getBooks();
	        			}
			}
			
	        },

	        mounted() {
	        	/** 用户信息初始化start*/
	        		var user = JSON.parse(sessionStorage.getItem('user'));
			this.user = user;
			if (user) {
				// console.log(user)
				this.sysUserName = user.employeeInfo.employeename;
				this.sysUserid = user.employeeInfo.id;
				this.sysUserDeptid = user.employeeInfo.deptid;
				if(user.employeeInfo.headiconpath != undefined || user.employeeInfo.headiconpath != null){
					this.sysUserAvatar = "/img/"+user.employeeInfo.headiconpath;
				}else{
					this.sysUserAvatar = "default";
				}
				this.sysUserAvatar = user.employeeInfo.headiconpath;//保存当前用户头像
			}
		/** 用户信息初始化end*/	
		this.initEmpList();//加载好友列表

		this.startWorker();//调用webworkers
	        },
	        
	    }


</script>