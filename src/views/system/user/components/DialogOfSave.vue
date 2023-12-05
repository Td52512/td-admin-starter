<template>
  <el-dialog title="新增员工" :visible.sync="dialogFormVisible">
    <el-form :model="bodyData">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="bodyData.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      bodyData: {
        name: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    open(bodyData) {
      if (bodyData) this.bodyData = bodyData;
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style lang="less"></style>
