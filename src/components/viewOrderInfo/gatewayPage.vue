<!--* 
* @description: 门户单页面显示 
* @author: 王鹏 
* @update: 王鹏 (2017-05-27) 
*-->
<template>
	<section class="gateway">
		<header>
			<div class="tilq_left">
				<img class="dy_logo" src="/static/images/dy_logo.png" />
				<p>成都中升之星汽车销售服务有限公司</p>
			</div>
			<span class="tilq_right iconfont icon-zhankai"></span>
		</header>
		<aside>
			<el-col :span="24">
				<el-carousel :interval="5000" arrow="always" height="12rem" class="nesli1">
					<el-carousel-item>
						<img src="../../assets/images/g2.png" width="100%" />
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</aside>
		<el-row>
			<el-col :span="24" class="pt10">
				<div class="dy_title">
					<span class="iconfont icon-gongsi"></span>
					<p>公司简介</p>
				</div>
				<div class="content">
					中升集团控股（00881.HK）有限公司是中国领先的全国性汽车经销商集团之一，专注于经营豪华和中高档品牌组合，包括梅赛德斯-奔驰雷克萨斯及奥迪等豪华车汽车品牌，丰田、本田、日产等中高端汽车品牌。丰田、本田、日产等中高端汽车品牌。
				</div>
			</el-col>
			<el-col :span="24" class="fltableflex pt10">
				<div class="content dy_fw_detail">
					中升集团控股（00881.HK）有限公司是中国领先的全国性汽车经销商集团之一，专注于经营豪华和中高档品牌组合，包括梅赛德斯-奔驰雷克萨斯及奥迪等豪华车汽车品牌，丰田、本田、日产等中高端汽车品牌。丰田、本田、日产等中高端汽车品牌。
				</div>
				<div class="dy_fw">
					<img src="/static/images/dy_fww.png">
					<span>经营范围</span>
				</div>
			</el-col>

			<el-col :span="24" class="pt10">
				<div class="dy_title">
					<span class="iconfont icon-fengongsixinwen"></span>
					<p>公司新闻</p>
				</div>
				<div class="content">
					<div class="gif_row">
						<div class="tp_dy_c flex152">
							<img src="/static/images/dy1.png" height="170px">
							<div class="shoaw_back">
								<span>
                      中升集团控股有限公司是中国领先的全国性汽车经销商集团之一
                    </span>
								<img src="/static/images/dy_new.png">
							</div>
						</div>
						<div class="flex1">
							<div class="flimage tp_dy_c ww">
								<img src="/static/images/dy2.png" height="70px">
								<div class="shoaw_back">
									<span>
                        与华来企业合作成功
                      </span>
									<img src="/static/images/dy_new.png">
								</div>
							</div>
							<div class="flimage tp_dy_c ww">
								<img src="/static/images/dy3.png" height="90px">
								<div class="shoaw_back">
									<span>
                        策划明年的新项目—上门服务
                      </span>
									<img src="/static/images/dy_new.png">
								</div>
							</div>
						</div>
					</div>
					<div class="dy_more">
						<a href="javascript:void(0);">更多</a>
					</div>
				</div>
			</el-col>

			<el-col :span="24" class="pt10 pt0">
				<div class="dy_title">
					<span class="iconfont icon-liwu"></span>
					<p>公司活动</p>
				</div>
				<div class="content">
					<ul class="dy_tss">
						<li>
							<img src="/static/images/dy_c1.png">
							<img class="icon_active" src="/static/images/dy_active.png">
						</li>
						<li>
							<img src="/static/images/dy_c2.png">
							<img class="icon_active" src="/static/images/dy_active.png">
						</li>
					</ul>
					<div class="dy_more">
						<a href="javascript:void(0);">更多</a>
					</div>
				</div>
			</el-col>

			<el-col :span="24" class="pt10 pt0">
				<div class="dy_title">
					<span class="iconfont icon-lianxi"></span>
					<p>联系我们</p>
				</div>
				<div class="content lianxi">
					<p>公司地址:四川省成都市高新区天府大道89号</p>
					<p>联系我们:081-223816</p>
				</div>
			</el-col>
		</el-row>

	</section>
</template>
<style type="text/css">
	@import '/static/css/common.css';
	@import './css/dy.css';
</style>
<script>
	import {} from '../../api/api';
	export default {
		data() {
			return {

			};
		},
		created() {

		},
		mounted() {

		}
	}
</script>