<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-form :model="queryTable" class="demo-form-inline" size="mini" label-width="80px">
        <el-col :span="24">
          <el-col :span="6">
            <el-form-item label="环境分组">
              <el-input v-model="queryTable.environmentGroup"  @keyup.native.enter="queryTableBtn"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="配置项">
              <el-input v-model="queryTable.propertyKey" @keyup.native.enter="queryTableBtn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配置值">
              <el-input v-model="queryTable.propertyValue" @keyup.native.enter="queryTableBtn"></el-input>
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="4">
            <el-form-item>
              <el-button @click="clearQueryParamsBtn">清除</el-button>
              <el-button type="primary" @click="queryTableBtn">查询</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>

    </el-row>

    <el-table :data="articleTable" height="680" size="mini" style="margin-top: 10px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form class="demo-table-expand" size="mini" label-width="120px">
            <el-form-item label="配置分组">
              <span>{{ props.row.environmentGroup }}</span>
            </el-form-item>
            <el-form-item label="配置项">
              <span>{{ props.row.propertyKey }}</span>
            </el-form-item>
            <el-form-item label="配置项描述">
              <span>{{ props.row.propertyDesc }}</span>
            </el-form-item>
            <el-form-item label="配置值">
              <span style="color: #409EFF;">{{ props.row.propertyValue }}</span>
            </el-form-item>
            <el-form-item label="生效值">
              <span style="color: #409EFF;">{{ props.row.efficientValue }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="environmentGroup" label="配置分组" width="320"></el-table-column>
      <el-table-column label="是否生效" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isEfficient" style="color: #409EFF;">{{scope.row.isEfficient}}</span>
          <span v-else style="color: #FF5722;">{{scope.row.isEfficient}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="propertyKey" label="配置项" min-width="200" align="left"></el-table-column>

      <el-table-column label="配置值" min-width="260">
        <template slot-scope="scope">
          <span style="color: #409EFF;">{{scope.row.propertyValue.slice(0,350)}}</span>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                   :page-sizes="[10,20,50,100]" :page-size="20"
                   layout="total, sizes, prev, pager, next, jumper" :total="tableTotal">
    </el-pagination>


  </div>
</template>

<script>

import {getEnvironmentPageApi} from "@/api/environmentApi";


export default {
  data() {
    return {
      queryTable: {
      },
      articleTable: [],
      currentPage: 1,
      currentPageSize: 20,
      tableTotal: 0
    }
  },
  created() {

  },
  mounted() {
    this.queryTablePage()
  },
  methods: {
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.queryTablePage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryTablePage();
    },
    clearQueryParamsBtn(){
      this.currentPage = 1
      this.queryTable.environmentGroup = ''
      this.queryTable.propertyKey = ''
      this.queryTable.propertyValue=''
      this.queryTablePage()
    },
    queryTableBtn(){
      this.currentPage = 1
      this.queryTablePage()
    },
    queryTablePage() {
      this.queryTable.pageNum = this.currentPage;
      this.queryTable.pageSize = this.currentPageSize;
      getEnvironmentPageApi(this.queryTable).then(rsp => {
        this.articleTable = rsp.data.list;
        this.tableTotal = rsp.data.total;
      }).catch(err => {
        this.$message.error(err)
      })
    }


  }
}
</script>
