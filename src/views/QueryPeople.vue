<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="name"></el-option>
          <el-option label="性别" value="sex"></el-option>
          <el-option label="年龄" value="age"></el-option>
          <el-option label="身份证号" value="idcard"></el-option>
          <el-option label="健康状态" value="health_status"></el-option>
          <el-option label="地址" value="address"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchs()"></el-button>
      </el-input>
    </div>
    <div>
      <el-table v-show="show" :data="people" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="idcard" label="身份证号"></el-table-column>
        <el-table-column prop="health_status" label="健康状态"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="delPeople(index)">
              <el-button slot="reference" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="form.idcard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="健康状态" :label-width="formLabelWidth">
          <el-input v-model="form.health_status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryInformation, upInformation, delInformation } from "@/api/information";
export default {
  name: "QueryPeople",
  data() {
    return {
      select: "",
      search: "",
      people: [],
      show: false,
      dialogFormVisible: false,
      visible: false,
      formLabelWidth: "120px",
      index: "",
      form: {
        name: "",
        sex: "",
        age: "",
        idcard: "",
        health_status: "",
        address: ""
      }
    };
  },
  methods: {
    async searchs() {
      if (!this.select) {
        this.$message({
          message: "请选择搜索关键字"
        });
        return;
      }
      if (!this.search) {
        this.$message({
          message: "请输入搜索内容"
        });
        return;
      }
      let obj = {};
      obj[this.select] = this.search;
      let res = await queryInformation(obj);
      let { data, code } = res.data;
      if (code === 200) {
        this.show = true;
        this.people = data;
      }
    },
    async onSubmit() {
      let res = await upInformation(this.form);
      console.log(res);
      if (res.data.code === 200) {
        this.$set(this.people, this.index, this.form);
        this.dialogFormVisible = false;
      }
    },
    async handleEdit(i, row) {
      console.log(i, row);
      this.index = i;
      this.form = {
        _id: row._id,
        name: row.name,
        sex: row.sex,
        age: row.age,
        idcard: row.idcard,
        health_status: row.health_status,
        address: row.address
      };
      this.dialogFormVisible = true;
    },
    async handleDelete(i) {
      this.index = i;
    },
    async delPeople(index) {
      console.log(index);
      let res = await delInformation(this.people[index]._id);
      if(res.data.code===200){
        this.visible = false;
      }
    }
  },
  mounted() {}
};
</script>