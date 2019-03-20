<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.EMPLOYEENAME" @keyup.native.enter="handleQuery" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表 :max-height="windowOutHeight-165"-->
		<el-table :max-height="windowOutHeight-140" stripe border :data="listData" class="dftable" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="DEPTNAME" label="部门" align="center">
			</el-table-column>
			<el-table-column prop="EMPLOYEECODE" label="工号" align="center">
			</el-table-column>
			<el-table-column prop="EMPLOYEENAME" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="KPIAVG" label="KPI月平均分(100分)" align="center" :formatter="kpiavgFixed">
			</el-table-column>
			<el-table-column label="行政考评" align="center">
		        <el-table-column
		          prop=""
		          label="纪律性(5分)" align="center">
		          <template scope="props">
		          	{{ props.row.DISCIPLINE }}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="价值观(5分)" align="center">
		           <template scope="props">
		          	 {{ props.row.PERSONALVALUE }}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="加分项" align="center">
		           <template scope="props">
		            	{{ props.row.SCOREPLUS }}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="减分项" align="center">
		           	<template scope="props">
			          	<span style="font-size:20px;">-</span>
			          	<span>{{ props.row.SCOREMINUS }}</span>
			        </template>
		        </el-table-column>
		    </el-table-column>
		    <el-table-column label="部门考评" align="center">
		        <el-table-column
		          prop="CROSSDEPTSCORE"
		          label="跨部门考评得分(100分)" align="center" :formatter="crossdeptscoreFixed">
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="业务技能(10分)" align="center">
		            <el-table-column
			          prop=""
			          label="出色完成工作任务，工作效率高，准确理解上级工作指令，并积极执行" align="center">
			          <template scope="props">
			          	{{ props.row.BUSINESSSKILL_1 }}
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="熟练掌握本岗位工作技能，具有独立处事能力" align="center">
			          <template scope="props">
			          	{{ props.row.BUSINESSSKILL_2 }}
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="正确理解工作内容，正确处理业务，制定适当工作计划，并保持良好业绩" align="center">
			          <template scope="props">
			          	{{ props.row.BUSINESSSKILL_3 }}
			          </template>
			        </el-table-column>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="工作态度(10分)" align="center">
		          <el-table-column
			          prop=""
			          label="服从公司及上级工作任务安排，不推诿，不抱怨，全力以赴" align="center">
			          <template scope="props">
			          	{{ props.row.WORKATTITUDE_1 }}
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="有效利用工作时间，踏实勤奋，以积极心态面试工作，具有强烈的责任心与集体意识" align="center">
			          <template scope="props">
			          {{ props.row.WORKATTITUDE_2 }}
			          </template>
			        </el-table-column>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="责任心(5分)" align="center">
		          <template scope="props">
		          {{ props.row.RESPONSIBILITY }}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="团队协作(5分)" align="center">
		          <template scope="props">
		          {{ props.row.TEAMWORK }}
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="直接上级考评总分(30分)" align="center" :formatter="totalscore">
		        </el-table-column>
		    </el-table-column>
		    <el-table-column prop="DAILYPERFORMANCE" label="总经办考评(10分)" align="center">
			</el-table-column>
			<el-table-column prop="TOTALSCORE" label="最终绩效得分" align="center" :formatter="totalscoreFixed">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import { getEmpScoreList } from '../../api/api';
	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					EMPLOYEENAME: ''
				},
				listData: [],
				listLoading: false
			}
		},
		methods: {
			//最终绩效得分 格式化保留两位小数
			totalscoreFixed(row,col,ceval){
				if(row.TOTALSCORE){
					if(row.TOTALSCORE.toString().indexOf(".") != -1){
						return row.TOTALSCORE.toFixed(2);
					}else{
						return row.TOTALSCORE;
					}
				}
			},
			//跨部门得分 格式化保留两位小数
			crossdeptscoreFixed(row,col,ceval){
				if(row.CROSSDEPTSCORE){
					if(row.CROSSDEPTSCORE.toString().indexOf(".") != -1){
						return row.CROSSDEPTSCORE.toFixed(2);
					}else{
						return row.CROSSDEPTSCORE;
					}
				}
			},
			//平均分得分 格式化保留两位小数
			kpiavgFixed(row,col,ceval){
				if(row.KPIAVG){
					if(row.KPIAVG.toString().indexOf(".") != -1){
						return row.KPIAVG.toFixed(2);
					}else{
						return row.KPIAVG;
					}
				}
			},
			//内部门打分总分计算
			totalscore(row,col,ceval){
				 let businessskill_1 = '',
					businessskill_2 = '',
					businessskill_3 = '',
					workattitude_1 = '',
					workattitude_2 = '',
					responsibility = '',
					teamwork = '',
					totalscore = '';
				try {
				    businessskill_1 = row.BUSINESSSKILL_1?eval(row.BUSINESSSKILL_1):0;
					businessskill_2 = row.BUSINESSSKILL_2?eval(row.BUSINESSSKILL_2):0;
					businessskill_3 = row.BUSINESSSKILL_3?eval(row.BUSINESSSKILL_3):0;
					workattitude_1 = row.WORKATTITUDE_1?eval(row.WORKATTITUDE_1):0;
					workattitude_2 = row.WORKATTITUDE_2?eval(row.WORKATTITUDE_2):0;
					responsibility = row.RESPONSIBILITY?eval(row.RESPONSIBILITY):0;
					teamwork = row.TEAMWORK?eval(row.TEAMWORK):0;
				}catch(err){
				}
				totalscore = businessskill_1+businessskill_2+businessskill_3+workattitude_1+workattitude_2+responsibility+teamwork;
				return (totalscore == 0?'':totalscore);
			},
			//获取保单列表 
			handleQuery() {
				let para = {
					showCount:150,
					EMPLOYEENAME:this.filters.EMPLOYEENAME
				}
				this.listLoading = true;
				getEmpScoreList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.listData = res.data.data.records;
					}
				});
			}
		},
		created() {
			this.handleQuery();
		},
	}
</script>