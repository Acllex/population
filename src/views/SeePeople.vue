<template>
  <div>
    <el-table :data="city" style="width: 100%;margin-bottom: 20px;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.children">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.children">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-table :data="props.row.children">
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="sex" label="性别"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="idcard" label="身份证号"></el-table-column>
                        <el-table-column prop="health_status" label="健康状态"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column prop="estate" label="小区"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="area" label="区域"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="create_time" label="时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryCity } from "@/api/city";
import { queryArea } from "@/api/area";
import { queryEstate } from "@/api/estate";
import { queryInformation } from "@/api/information";

export default {
  name: "seepeople",
  data() {
    return {
      city: null
    };
  },
  methods: {
    async getCity() {
      let res = await queryCity();
      let { code, data } = res.data;
      if (code === 200) {
        this.city = data;
        this.city.forEach(async (ele, i) => {
          let res = await queryArea({ city: ele.city });
          let { data } = res.data;
          this.city[i].children = data;
          data.forEach(async (ele1, j) => {
            let res = await queryEstate({ area: ele1.area });
            let { data } = res.data;
            this.city[i].children[j].children = data;
            data.forEach(async (ele2, x) => {
              let res = await queryInformation({ estate: ele2.estate });
              let { data } = res.data;
              this.city[i].children[j].children[x].children = data;
            });
          });
        });
      }
    }
  },
  mounted() {
    this.getCity();
  }
};
</script>