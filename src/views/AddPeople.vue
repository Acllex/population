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
      <el-form-item label="小区">
        <el-select v-model="newform.estate" placeholder="选择所属小区">
          <el-option
            v-for="(item, index) in newestate"
            :key="index"
            :label="item.estate"
            :value="item.estate"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form label-position="right" label-width="80px" :model="information">
      <el-form-item label="姓名">
        <el-input v-model="information.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="information.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="information.age"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="information.idcard"></el-input>
      </el-form-item>
      <el-form-item label="健康状态">
        <el-input v-model="information.health_status"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="information.address"></el-input>
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
import { queryEstate } from "@/api/estate";
import { saveInformation } from "@/api/information";

export default {
  name: "addpeople",
  data() {
    return {
      form: null,
      newform: {},
      newarea: [],
      newestate: [],
      information: {}
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
      console.log(this.newform.estate);
      this.information.estate = this.newform.estate;
      let res = await saveInformation(this.information);
      let { code } = res.data;
      if (code == 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
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
    },
    "newform.area": {
      async handler(newVal) {
        if (!newVal) {
          return;
        }
        console.log(newVal);
        let res = await queryEstate({ area: newVal });
        this.newestate = res.data.data;
      },
      deep: true
    }
  }
};
</script>