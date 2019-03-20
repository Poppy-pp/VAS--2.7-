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
		<!--列表 -->
		<el-table :max-height="windowOutHeight-185" border :data="listData" class="dftable" highlight-current-row v-loading="listLoading" style="width: 100%;">
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
		          	<el-input v-model="props.row.DISCIPLINE" @blur="disciplineBlur"></el-input>
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="价值观(5分)" align="center">
		           <template scope="props">
		          	<el-input v-model="props.row.PERSONALVALUE" @blur="personalvalueBlur"></el-input>
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="加分项" align="center">
		           <template scope="props">
		          	<el-input v-model="props.row.SCOREPLUS" @blur="scoreplusBlur"></el-input>
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="减分项" align="center">
		           <template scope="props">
		          	<span style="position:absolute;left:10px;top:16px;font-size:20px;">-</span>
		          	<el-input v-model="props.row.SCOREMINUS" @blur="scoreminusBlur"></el-input>
		          </template>
		        </el-table-column>
		    </el-table-column>
		    <el-table-column label="部门考评" align="center" v-if="(user.departmentInfo.id != 60) || (user.id == 239)">
		        <el-table-column
		          prop=""
		          label="业务技能(10分)" align="center">
		            <el-table-column
			          prop=""
			          label="出色完成工作任务，工作效率高，准确理解上级工作指令，并积极执行" align="center">
			          <template scope="props">
			          	<el-input @blur="businessskillBlur_1" class="businessskill_input1" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.BUSINESSSKILL_1"></el-input>
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="熟练掌握本岗位工作技能，具有独立处事能力" align="center">
			          <template scope="props">
			          	<el-input @blur="businessskillBlur_2" class="businessskill_input2" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.BUSINESSSKILL_2"></el-input>
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="正确理解工作内容，正确处理业务，制定适当工作计划，并保持良好业绩" align="center">
			          <template scope="props">
			          	<el-input @blur="businessskillBlur_3" class="businessskill_input3" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.BUSINESSSKILL_3"></el-input>
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
			          	<el-input @blur="workattitudeBlur_1" class="workattitude_input1" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.WORKATTITUDE_1"></el-input>
			          </template>
			        </el-table-column>
			        <el-table-column
			          prop=""
			          label="有效利用工作时间，踏实勤奋，以积极心态面试工作，具有强烈的责任心与集体意识" align="center">
			          <template scope="props">
			          	<el-input @blur="workattitudeBlur_2" class="workattitude_input2" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.WORKATTITUDE_2"></el-input>
			          </template>
			        </el-table-column>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="责任心(5分)" align="center">
		          <template scope="props">
		          	<el-input @blur="responsibilityBlur" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.RESPONSIBILITY"></el-input>
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="团队协作(5分)" align="center">
		          <template scope="props">
		          	<el-input @blur="teamworkBlur" :disabled="(props.row.DEPTID != 60 && user.id == 239)" v-model="props.row.TEAMWORK"></el-input>
		          </template>
		        </el-table-column>
		        <el-table-column
		          prop=""
		          label="直接上级考评总分(30分)" align="center" :formatter="totalscore">
		        </el-table-column>
		    </el-table-column>

		    <el-table-column prop="" label="总经办考评(10分)" align="center" v-if="user.departmentInfo.id == 4">
		     	<template scope="props">
		          	<el-input v-model="props.row.DAILYPERFORMANCE" @blur="dailyperformanceBlur"></el-input>
		        </template>
			</el-table-column>
			<el-table-column label="操作" width="100" align="center">
				<template scope="scope">
					<el-button type="primary" icon="el-icon-success" v-if="user.departmentInfo.id == 60 && user.id != 239" size="mini" @click.native="xzSubmit(scope.row,scope.$index)" :loading="addLoading">确认打分</el-button>
					<el-button type="primary" icon="el-icon-success" v-if="user.departmentInfo.id == 4" size="mini" @click.native="zjbSubmit(scope.row,scope.$index)" :loading="addLoading">确认打分</el-button>
					<el-button type="primary" icon="el-icon-success" v-if="(user.departmentInfo.id != 4 && user.departmentInfo.id != 60)" size="mini" @click.native="addSubmit(scope.row,scope.$index)" :loading="addLoading">确认打分</el-button>
					<el-button type="primary" icon="el-icon-success" v-if="user.id == 239" size="mini" @click.native="addYMSubmit(scope.row,scope.$index)" :loading="addLoading">确认打分</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" class="mt10" v-if="user.departmentInfo.id == 60 && user.id != 239" @click.native="xzMoreSubmit" :loading="addPLLoading">批量提交打分</el-button>
		<el-button type="primary" class="mt10" v-if="user.departmentInfo.id == 4" @click.native="zjbMoreSubmit" :loading="addPLLoading">批量提交打分</el-button>
		<el-button type="primary" class="mt10" v-if="(user.departmentInfo.id != 4 && user.departmentInfo.id != 60)" @click.native="addMoreSubmit" :loading="addPLLoading">批量提交打分</el-button>
		<el-button type="primary" class="mt10" v-if="user.id == 239" @click.native="addYMMoreSubmit" :loading="addPLLoading">批量提交打分</el-button>
	</section>
</template>

<script>
	import { getEmpScoreList,adminScore,managerScore,deptInScore,adminMoreScore,managerMoreScore,deptInMoreScore } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					EMPLOYEENAME: ''
				},
				user:'',
				addLoading:false,
				listData: [],
				addPLLoading:false,
				index:{},
				currflag:false,
				listLoading: false
			}
		},
		methods: {
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
				    businessskill_1 = (row.BUSINESSSKILL_1&&$.trim(row.BUSINESSSKILL_1) != "")?eval(row.BUSINESSSKILL_1):0;
					businessskill_2 = (row.BUSINESSSKILL_2&&$.trim(row.BUSINESSSKILL_2) != "")?eval(row.BUSINESSSKILL_2):0;
					businessskill_3 = (row.BUSINESSSKILL_3&&$.trim(row.BUSINESSSKILL_3) != "")?eval(row.BUSINESSSKILL_3):0;
					workattitude_1 = (row.WORKATTITUDE_1&&$.trim(row.WORKATTITUDE_1) != "")?eval(row.WORKATTITUDE_1):0;
					workattitude_2 = (row.WORKATTITUDE_2&&$.trim(row.WORKATTITUDE_2) != "")?eval(row.WORKATTITUDE_2):0;
					responsibility = (row.RESPONSIBILITY&&$.trim(row.RESPONSIBILITY) != "")?eval(row.RESPONSIBILITY):0;
					teamwork = (row.TEAMWORK&&$.trim(row.TEAMWORK) != "")?eval(row.TEAMWORK):0;
				}catch(err){
				}
				totalscore = businessskill_1+businessskill_2+businessskill_3+workattitude_1+workattitude_2+responsibility+teamwork;
				return (totalscore == 0?'':totalscore);
			},
			//验证打分格式 是否正确
			numberInt(e,value,maxVal){
				var reg = /[^\d]/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					$(e.target).css({background:'transparent'});
					$("input.cureed").prop("disabled",false).css({background:'transparent'}).removeClass('cureed');
					return;
				}
				if(flag || value < 0 || value > maxVal) {
					$(e.target).css({background:'rgba(255,0,0,0.5)'});
					$(e.target).parents("div.dftable").find("input.el-input__inner").not($(e.target)).not($("input[disabled='disabled']")).prop("disabled",true).addClass("cureed").css({background:'#f5f5f5'});
				}else{
					$(e.target).css({background:'transparent'});
					$("input.cureed").prop("disabled",false).css({background:'transparent'}).removeClass('cureed');
				}
				this.currflag = (flag || value < 0 || value > maxVal);
			},
			//业务技能 验证打分格式 是否正确
			numberIntYwJN(e,value,bi1,bi2,bi3,bval1,bval2,bval3){
				var reg = /[^\d]/g,
					flag = reg.test(value),
					maxVal = 0;
				if($.trim(value) == '') {
					$("input.bredclass").css({background:'transparent'});
					$("input.cureed").prop("disabled",false).css({background:'transparent'}).removeClass('cureed');
					return;
				}
				if(flag || value < 0) {
					$(e.target).addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
					$(e.target).parents("div.dftable").find("input.el-input__inner").not($(e.target)).not($("input[disabled='disabled']")).prop("disabled",true).addClass("cureed").css({background:'#f5f5f5'});
				}else{
					let bval12 = (bval1&&$.trim(bval1) != "")?eval(bval1):0,
	 				bval22 = (bval2&&$.trim(bval2) != "")?eval(bval2):0,
	 				bval32 = (bval3&&$.trim(bval3) != "")?eval(bval3):0;
	 				maxVal = (bval12+bval22+bval32);
					if(maxVal > 10){
						bi1.addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
						bi2.addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
						bi3.addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
						if(bi1.prop("disabled"))
							bi1.prop("disabled",false);
						if(bi2.prop("disabled"))
							bi2.prop("disabled",false);
						if(bi3.prop("disabled"))
							bi3.prop("disabled",false);
						$(e.target).parents("div.dftable").find("input.el-input__inner").not(bi1).not(bi2).not(bi3).not($("input[disabled='disabled']")).prop("disabled",true).addClass("cureed").css({background:'#f5f5f5'});
					}else{
						$("input.bredclass").css({background:'transparent'});
						$("input.cureed").prop("disabled",false).css({background:'transparent'}).removeClass('cureed');
					}
				}
				this.currflag = (flag || value < 0 || maxVal > 10);
			},
			//工作态度 验证打分格式 是否正确
			numberIntGZTD(e,value,bi1,bi2,bval1,bval2){
				var reg = /[^\d]/g,
					flag = reg.test(value),
					maxVal = 0;
				if($.trim(value) == '') {
					$("input.bredclass").css({background:'transparent'});
					$("input.cureed").prop("disabled",false).css({background:'transparent'}).removeClass('cureed');
					return;
				}
				if(flag || value < 0) {
					$(e.target).addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
					$(e.target).parents("div.dftable").find("input.el-input__inner").not($(e.target)).not($("input[disabled='disabled']")).prop("disabled",true).addClass("cureed").css({background:'#f5f5f5'});
				}else{
					let bval12 = (bval1&&$.trim(bval1) != "")?eval(bval1):0,
	 				bval22 = (bval2&&$.trim(bval2) != "")?eval(bval2):0;
	 				maxVal = (bval12+bval22);
					if(maxVal > 10){
						bi1.addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
						bi2.addClass("bredclass").css({background:'rgba(255,0,0,0.5)'});
						if(bi1.prop("disabled"))
							bi1.prop("disabled",false);
						if(bi2.prop("disabled"))
							bi2.prop("disabled",false);
						$(e.target).parents("div.dftable").find("input.el-input__inner").not(bi1).not(bi2).not($("input[disabled='disabled']")).prop("disabled",true).addClass("cureed").css({background:'#f5f5f5'});
					}else{
						$("input.bredclass").css({background:'transparent'});
						$("input.cureed").prop("disabled",false).css({background:'transparent'}).removeClass('cureed');
					}
				}
				this.currflag = (flag || value < 0 || maxVal > 10);
			},
			//行政纪律性打分
			disciplineBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,5);
			},
			//行政价值观打分验证
			personalvalueBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,5);
			},
			//行政加分项打分验证
			scoreplusBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,10);
			},
			//行政减分项打分验证
			scoreminusBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,10);
			},
			//部门验证
			businessskillBlur_1(e){
				let p = $(e.target).parents("tr.current-row"),
				value = $(e.target).val(),
				bi1 = p.find("div.businessskill_input1").children(),
				bi2 = p.find("div.businessskill_input2").children(),
				bi3 = p.find("div.businessskill_input3").children(),
				bval1 = bi1.val(),
				bval2 = bi2.val(),
				bval3 = bi3.val();
				this.numberIntYwJN(e,value,bi1,bi2,bi3,bval1,bval2,bval3);
			},
			businessskillBlur_2(e){
				let p = $(e.target).parents("tr.current-row"),
				value = $(e.target).val(),
				bi1 = p.find("div.businessskill_input1").children(),
				bi2 = p.find("div.businessskill_input2").children(),
				bi3 = p.find("div.businessskill_input3").children(),
				bval1 = bi1.val(),
				bval2 = bi2.val(),
				bval3 = bi3.val();
				this.numberIntYwJN(e,value,bi1,bi2,bi3,bval1,bval2,bval3);
			},
			businessskillBlur_3(e){
				let p = $(e.target).parents("tr.current-row"),
				value = $(e.target).val(),
				bi1 = p.find("div.businessskill_input1").children(),
				bi2 = p.find("div.businessskill_input2").children(),
				bi3 = p.find("div.businessskill_input3").children(),
				bval1 = bi1.val(),
				bval2 = bi2.val(),
				bval3 = bi3.val();
				this.numberIntYwJN(e,value,bi1,bi2,bi3,bval1,bval2,bval3);
			},
			workattitudeBlur_1(e){
				let p = $(e.target).parents("tr.current-row"),
				value = $(e.target).val(),
				bi1 = p.find("div.workattitude_input1").children(),
				bi2 = p.find("div.workattitude_input2").children(),
				bval1 = bi1.val(),
				bval2 = bi2.val();
				this.numberIntGZTD(e,value,bi1,bi2,bval1,bval2);
			},
			workattitudeBlur_2(e){
				let p = $(e.target).parents("tr.current-row"),
				value = $(e.target).val(),
				bi1 = p.find("div.workattitude_input1").children(),
				bi2 = p.find("div.workattitude_input2").children(),
				bval1 = bi1.val(),
				bval2 = bi2.val();
				this.numberIntGZTD(e,value,bi1,bi2,bval1,bval2);
			},
			responsibilityBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,5);
			},
			
			teamworkBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,5);
			},
			// 总经办输入打分验证
			dailyperformanceBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,10);
			},
			//批量杨梅 同时打 部门和 行政考评分数
			addYMMoreSubmit(){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				this.addPLLoading = true;
				adminMoreScore(this.listData).then((res) => {
					if(res.data.result.code == 0){
						deptInMoreScore(this.listData).then((res) => {
							this.addPLLoading = false;
							if(res.data.result.code == 0){
								this.$message({
									message: '打分成功！',
									type: 'success'
								});
								this.handleQuery();
							}
						});	
					}else{
						this.addPLLoading = false;
					}
				});
			},
			//批量行政打分
			xzMoreSubmit(){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				this.addPLLoading = true;
				adminMoreScore(this.listData).then((res) => {
					this.addPLLoading = false;
					if(res.data.result.code == 0){
						this.$message({
							message: '打分成功！',
							type: 'success'
						});
						this.handleQuery();
					}
				});
			},
			//批量总经办打分
			zjbMoreSubmit(){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				this.addPLLoading = true;
				managerMoreScore(this.listData).then((res) => {
					this.addPLLoading = false;
					if(res.data.result.code == 0){
						deptInMoreScore(this.listData).then((res) => {
							this.addPLLoading = false;
							if(res.data.result.code == 0){
								this.$message({
									message: '打分成功！',
									type: 'success'
								});
								this.handleQuery();
							}
						});	
					}else{
						this.addPLLoading = false;
					}
				});
			},
			//批量部门领导确认打分
			addMoreSubmit(){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				this.addPLLoading = true;
				deptInMoreScore(this.listData).then((res) => {
					this.addPLLoading = false;
					if(res.data.result.code == 0){
						this.$message({
							message: '打分成功！',
							type: 'success'
						});
						this.handleQuery();
					}
				});
			},
			//杨梅特殊权限 可同时操作 部门行政 考评
			addYMSubmit(row,index){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				let para1 = {
					EMPLOYEEID:row.EMPLOYEEID,
					DISCIPLINE:row.DISCIPLINE,
					PERSONALVALUE:row.PERSONALVALUE,
					SCOREPLUS:row.SCOREPLUS,
					SCOREMINUS:row.SCOREMINUS
				}
				adminScore(para1).then((res) => {
					if(res.data.result.code == 0){
						let para2 = {
							EMPLOYEEID:row.EMPLOYEEID,
							BUSINESSSKILL_1:row.BUSINESSSKILL_1,
							BUSINESSSKILL_2:row.BUSINESSSKILL_2,
							BUSINESSSKILL_3:row.BUSINESSSKILL_3,
							WORKATTITUDE_1:row.WORKATTITUDE_1,
							WORKATTITUDE_2:row.WORKATTITUDE_2,
							TEAMWORK:row.TEAMWORK,
							RESPONSIBILITY:row.RESPONSIBILITY
						}
						deptInScore(para2).then((res) => {
							if(res.data.result.code == 0){
								this.$message({
									message: '打分成功！',
									type: 'success'
								});
								this.handleQuery();
							}
						});
					}
				});
				
			},
			//行政打分
			xzSubmit(row,index){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				let para = {
						EMPLOYEEID:row.EMPLOYEEID,
						DISCIPLINE:row.DISCIPLINE,
						PERSONALVALUE:row.PERSONALVALUE,
						SCOREPLUS:row.SCOREPLUS,
						SCOREMINUS:row.SCOREMINUS
					}
					adminScore(para).then((res) => {
						if(res.data.result.code == 0){
							this.$message({
								message: '打分成功！',
								type: 'success'
							});
							this.handleQuery();
						}
					});
			},
			//总经办打分
			zjbSubmit(row,index){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				let para = {
					EMPLOYEEID:row.EMPLOYEEID,
					DAILYPERFORMANCE:row.DAILYPERFORMANCE
				}
				managerScore(para).then((res) => {
					if(res.data.result.code == 0){
						let para2 = {
							EMPLOYEEID:row.EMPLOYEEID,
							BUSINESSSKILL_1:row.BUSINESSSKILL_1,
							BUSINESSSKILL_2:row.BUSINESSSKILL_2,
							BUSINESSSKILL_3:row.BUSINESSSKILL_3,
							WORKATTITUDE_1:row.WORKATTITUDE_1,
							WORKATTITUDE_2:row.WORKATTITUDE_2,
							TEAMWORK:row.TEAMWORK,
							RESPONSIBILITY:row.RESPONSIBILITY
						}
						deptInScore(para2).then((res) => {
							if(res.data.result.code == 0){
								this.$message({
									message: '打分成功！',
									type: 'success'
								});
								this.handleQuery();
							}
						});
					}
				});
			},
			//部门领导确认打分
			addSubmit(row,index){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				let para = {
					EMPLOYEEID:row.EMPLOYEEID,
					BUSINESSSKILL_1:row.BUSINESSSKILL_1,
					BUSINESSSKILL_2:row.BUSINESSSKILL_2,
					BUSINESSSKILL_3:row.BUSINESSSKILL_3,
					WORKATTITUDE_1:row.WORKATTITUDE_1,
					WORKATTITUDE_2:row.WORKATTITUDE_2,
					TEAMWORK:row.TEAMWORK,
					RESPONSIBILITY:row.RESPONSIBILITY
				}
				deptInScore(para).then((res) => {
					if(res.data.result.code == 0){
						this.$message({
							message: '打分成功！',
							type: 'success'
						});
						this.handleQuery();
					}
				});
			},
			//获取保单列表 
			handleQuery() {
				
				let para = {
					showCount:150,
					EMPLOYEENAME:this.filters.EMPLOYEENAME
				}
				if((this.user.departmentInfo.id != 4 && this.user.departmentInfo.id != 60)){
					para.DEPTID = this.user.departmentInfo.id;
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
			this.user = this.$store.getters.userInfo;
			this.handleQuery();
		},
	}
</script>