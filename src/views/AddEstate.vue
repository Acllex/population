<template>
  <div>
    <el-form :inline="true" :model="newform" class="demo-form-inline">
      <el-form-item label="城市">
        <el-select v-model="newform.city" placeholder="选择所属城市">
          <el-option
            v-for="(item, index) in form"
            :key="index"
            :label="item.city"
            :value="item.city"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城区">
        <el-select v-model="newform.area" placeholder="选择所属区域">
          <el-option
            v-for="(item, index) in newarea"
            :key="index"
            :label="item.area"
            :value="item.area"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form label-position="right" :model="newestate">
      <el-form-item label="小区">
        <el-input v-model="newestate.estate"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryCity } from "@/api/city";
import { queryArea } from "@/api/area";
import { queryEstate, saveEstate } from "@/api/estate";

export default {
  name: "addpeople",
  data() {
    return {
      form: null,
      newform: {},
      newarea: [],
      newestate: {}
    };
  },
  methods: {
    async getData() {
      let res = await queryCity();
      let { code, data } = res.data;
      if (code === 200) {
        this.form = data;
      }
    },
    async onSubmit() {
      console.log(this.newform.area);
      let oldres = await queryEstate();
      let { data } = oldres.data;
      let bool = data.every(ele=>ele.estate === this.newestate.estate);
      console.log(bool);
      
      if (!bool) {
        this.$message({
          message: "重复的小区名字"
        });
        return;
      }
      this.newestate.area = this.newform.area;
      let res = await saveEstate(this.newestate);
      let { code } = res.data;
      if (code == 200) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
      }
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    "newform.city": {
      async handler(newVal) {
        if (!newVal) {
          return;
        }
        let res = await queryArea({ city: newVal });
        this.newarea = res.data.data;
      },
      deep: true
    }
  }
};
</script>
