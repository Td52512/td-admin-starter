<template>
  <div class="box">
    <div class="tableBar">
      <!-- 输入框 -->
      <el-input
        style="max-width: 200px; margin: 0 10px 0 10px"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        clearable
        size="small"
        v-model="requestParam.keyword"
        @clear="init"
      ></el-input>
      <el-button type="success" size="small">查询</el-button>
      <el-button type="primary" size="small" @click="add">新增</el-button>
      <el-button type="danger" size="small">批量删除</el-button>
    </div>

    <div class="bodyData" :class="bodyData.length == 0 ? 'flex' : ''">
      <el-empty description="暂无数据" v-if="bodyData.length == 0"></el-empty>

      <el-table
        :data="bodyData"
        stripe
        class="tableBox"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="25"></el-table-column>
        <el-table-column prop="name" label="用户名称"></el-table-column>
        <!-- <el-table-column prop="image" label="图片" align="center">
          <template slot-scope="{ row }">
            <el-image
              style="width: auto; height: 40px; border: none; cursor: pointer"
              :src="getImage(row.image)"
              :preview-src-list="[`/common/download?name=${row.image}`]"
            >
              <div slot="error" class="image-slot">
                <img
                  src="../../images/noImg.png"
                  style="width: auto; height: 40px; border: none"
                />
              </div>
            </el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="categoryName" label="菜品分类"></el-table-column>
        <el-table-column label="售价">
          <template slot-scope="scope">
            <span style="margin-right: 10px"
              >￥{{ scope.row.price / 100 }}</span
            >
          </template>
        </el-table-column>

        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{
              scope.row.status == "0" ? "停售" : "启售"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后操作时间">
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="blueBug"
              @click="addFoodtype(scope.row.id)"
            >
              修改
            </el-button>
            <el-button
              type="text"
              size="small"
              class="blueBug"
              @click="statusHandle(scope.row)"
            >
              {{ scope.row.status == "0" ? "启售" : "停售" }}
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="deleteHandle('单删', scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        class="pageList"
        :page-sizes="[6, 10, 20, 40]"
        :page-size="requestParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="requestParam.counts"
        @size-change="handleSizeChange"
        :current-page.sync="requestParam.page"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <DialogOfSave ref="dialogOfSave"></DialogOfSave>
  </div>
</template>

<script>
import DialogOfSave from "@/views/system/user/components/DialogOfSave.vue";
export default {
  data() {
    return {
      requestParam: {
        page: 1,
        pageSize: 6,
        counts: 0,
        keyword: "",
      },
      bodyData: [],
    };
  },
  components: {
    DialogOfSave,
  },
  methods: {
    init() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };

      let res = {
        code: 200,
        msg: "success",
        data: {
          records: [
            {
              id: "1397861683434139649",
              name: "清蒸河鲜海鲜",
              categoryId: "1397844391040167938",
              price: 38800.0,
              code: "1234567876543213456",
              image: "1405081e-f545-42e1-86a2-f7559ae2e276.jpeg",
              description:
                "新鲜的海鲜，清蒸是最好的处理方式。鲜，体会为什么叫海鲜。清蒸是广州最经典的烹饪手法，过去岭南地区由于峻山大岭阻隔，交通不便，经济发展起步慢，自家打的鱼放在锅里煮了就吃，没有太多的讲究，但却发现这清淡的煮法能使鱼的鲜甜跃然舌尖。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:26:11",
              updateTime: "2023-01-02 20:44:07",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1609540134646558722",
              name: "宫保鸡丁",
              categoryId: "1397844303408574465",
              price: 12300.0,
              code: "",
              image: "c0d4c00e-1db2-44e1-9c55-a6e6dff466d0.jpg",
              description: "这是宫保鸡丁",
              status: 1,
              sort: 0,
              createTime: "2023-01-01 21:20:47",
              updateTime: "2023-01-02 14:20:17",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1413384757047271425",
              name: "王老吉",
              categoryId: "1413341197421846529",
              price: 500.0,
              code: "",
              image: "00874a5e-0df2-446b-8f69-a30eb7d88ee8.png",
              description: "",
              status: 1,
              sort: 0,
              createTime: "2021-07-09 14:29:20",
              updateTime: "2023-01-02 14:20:15",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "饮品",
              copies: null,
            },
            {
              id: "1413385247889891330",
              name: "米饭",
              categoryId: "1413384954989060097",
              price: 200.0,
              code: "",
              image: "ee04a05a-1230-46b6-8ad5-1a95b140fff3.png",
              description: "",
              status: 1,
              sort: 0,
              createTime: "2021-07-09 14:31:17",
              updateTime: "2023-01-02 10:20:05",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "主食",
              copies: null,
            },
            {
              id: "1413342036832100354",
              name: "北冰洋",
              categoryId: "1413341197421846529",
              price: 500.0,
              code: "",
              image: "c99e0aab-3cb7-4eaa-80fd-f47d4ffea694.png",
              description: "",
              status: 1,
              sort: 0,
              createTime: "2021-07-09 11:39:35",
              updateTime: "2023-01-02 10:20:05",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "饮品",
              copies: null,
            },
            {
              id: "1397862477831122945",
              name: "上汤焗龙虾",
              categoryId: "1397844391040167938",
              price: 108800.0,
              code: "1234567865432",
              image: "5b8d2da3-3744-4bb3-acdc-329056b8259d.jpeg",
              description:
                "上汤焗龙虾是一道色香味俱全的传统名菜，属于粤菜系。此菜以龙虾为主料，配以高汤制成的一道海鲜美食。本品肉质洁白细嫩，味道鲜美，蛋白质含量高，脂肪含量低，营养丰富。是色香味俱全的传统名菜。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:29:20",
              updateTime: "2023-01-02 10:20:05",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1397862198033297410",
              name: "老火靓汤",
              categoryId: "1397844391040167938",
              price: 49800.0,
              code: "123456786532455",
              image: "583df4b7-a159-4cfc-9543-4f666120b25f.jpeg",
              description:
                "老火靓汤又称广府汤，是广府人传承数千年的食补养生秘方，慢火煲煮的中华老火靓汤，火候足，时间长，既取药补之效，又取入口之甘甜。 广府老火汤种类繁多，可以用各种汤料和烹调方法，烹制出各种不同口味、不同功效的汤来。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:28:14",
              updateTime: "2023-01-02 10:20:05",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1397860963880316929",
              name: "脆皮乳鸽",
              categoryId: "1397844391040167938",
              price: 10800.0,
              code: "1234563212345",
              image: "3fabb83a-1c09-4fd9-892b-4ef7457daafa.jpeg",
              description:
                "“脆皮乳鸽”是广东菜中的一道传统名菜，属于粤菜系，具有皮脆肉嫩、色泽红亮、鲜香味美的特点，常吃可使身体强健，清肺顺气。随着菜品制作工艺的不断发展，逐渐形成了熟炸法、生炸法和烤制法三种制作方法。无论那种制作方法，都是在鸽子经过一系列的加工，挂脆皮水后再加工而成，正宗的“脆皮乳鸽皮脆肉嫩、色泽红亮、鲜香味美、香气馥郁。这三种方法的制作过程都不算复杂，但想达到理想的效果并不容易。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:23:19",
              updateTime: "2021-05-27 10:23:19",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1397860792492666881",
              name: "烤乳猪",
              categoryId: "1397844391040167938",
              price: 38800.0,
              code: "213456432123456",
              image: "2e96a7e3-affb-438e-b7c3-e1430df425c9.jpeg",
              description:
                "广式烧乳猪主料是小乳猪，辅料是蒜，调料是五香粉、芝麻酱、八角粉等，本菜品主要通过将食材放入炭火中烧烤而成。烤乳猪是广州最著名的特色菜，并且是“满汉全席”中的主打菜肴之一。烤乳猪也是许多年来广东人祭祖的祭品之一，是家家都少不了的应节之物，用乳猪祭完先人后，亲戚们再聚餐食用。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:22:39",
              updateTime: "2021-05-27 10:22:39",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1397860578738352129",
              name: "白切鸡",
              categoryId: "1397844391040167938",
              price: 6600.0,
              code: "12345678654",
              image: "9ec6fc2d-50d2-422e-b954-de87dcd04198.jpeg",
              description:
                "白切鸡是一道色香味俱全的特色传统名肴，又叫白斩鸡，是粤菜系鸡肴中的一种，始于清代的民间。白切鸡通常选用细骨农家鸡与沙姜、蒜茸等食材，慢火煮浸白切鸡皮爽肉滑，清淡鲜美。著名的泮溪酒家白切鸡，曾获商业部优质产品金鼎奖。湛江白切鸡更是驰名粤港澳。粤菜厨坛中，鸡的菜式有200余款之多，而最为人常食不厌的正是白切鸡，深受食家青睐。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:21:48",
              updateTime: "2021-05-27 10:21:48",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1397860242057375745",
              name: "脆皮烧鹅",
              categoryId: "1397844391040167938",
              price: 12800.0,
              code: "123456786543213456",
              image: "e476f679-5c15-436b-87fa-8c4e9644bf33.jpeg",
              description:
                "“广东烤鸭美而香，却胜烧鹅说古冈（今新会），燕瘦环肥各佳妙，君休偏重便宜坊”，可见烧鹅与烧鸭在粤菜之中已早负盛名。作为广州最普遍和最受欢迎的烧烤肉食，以它的“色泽金红，皮脆肉嫩，味香可口”的特色，在省城各大街小巷的烧卤店随处可见。",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 10:20:27",
              updateTime: "2021-05-27 10:20:27",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "粤菜",
              copies: null,
            },
            {
              id: "1397854865672679425",
              name: "鱼香炒鸡蛋",
              categoryId: "1397844303408574465",
              price: 2000.0,
              code: "23456431·23456",
              image: "0f252364-a561-4e8d-8065-9a6797a6b1d3.jpg",
              description: "鱼香菜也是川味的特色。里面没有鱼却鱼香味",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:59:06",
              updateTime: "2021-05-27 09:59:06",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1397854652581064706",
              name: "麻辣水煮鱼",
              categoryId: "1397844303408574465",
              price: 14800.0,
              code: "2345312·345321",
              image: "1fdbfbf3-1d86-4b29-a3fc-46345852f2f8.jpg",
              description: "鱼片是买的切好的鱼片，放几个虾，增加味道",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:58:15",
              updateTime: "2021-05-27 09:58:15",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1397853890262118402",
              name: "鱼香肉丝",
              categoryId: "1397844303408574465",
              price: 3800.0,
              code: "1234212321234",
              image: "8dcfda14-5712-4d28-82f7-ae905b3c2308.jpg",
              description:
                "鱼香肉丝简直就是我们童年回忆的一道经典菜，上学的时候点个鱼香肉丝盖饭坐在宿舍床上看着肥皂剧，绝了！现在完美复刻一下上学的时候感觉",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:55:13",
              updateTime: "2021-05-27 09:55:13",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1397853709101740034",
              name: "蒜泥白肉",
              categoryId: "1397844303408574465",
              price: 9800.0,
              code: "1234321234321",
              image: "d2f61d70-ac85-4529-9b74-6d9a2255c6d7.jpg",
              description: "多么的有食欲啊",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:54:30",
              updateTime: "2021-05-27 09:54:30",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1397853183287013378",
              name: "麻辣兔头",
              categoryId: "1397844303408574465",
              price: 19800.0,
              code: "123456787654321",
              image: "2a2e9d66-b41d-4645-87bd-95f2cfeed218.jpg",
              description: "麻辣兔头的详细制作，麻辣鲜香，色泽红润，回味悠长",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:52:24",
              updateTime: "2021-05-27 09:52:24",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1397852391150759938",
              name: "辣子鸡丁",
              categoryId: "1397844303408574465",
              price: 8800.0,
              code: "2346812468",
              image: "ef2b73f2-75d1-4d3a-beea-22da0e1421bd.jpg",
              description: "辣子鸡丁，辣子鸡丁，永远的魂",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:49:16",
              updateTime: "2021-05-27 09:49:16",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "川菜",
              copies: null,
            },
            {
              id: "1397851668262465537",
              name: "口味蛇",
              categoryId: "1397844263642378242",
              price: 16800.0,
              code: "1234567812345678",
              image: "0f4bd884-dc9c-4cf9-b59e-7d5958fec3dd.jpg",
              description: "爬行界的扛把子，东兴-口味蛇，让你欲罢不能",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:46:23",
              updateTime: "2021-05-27 09:46:23",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "湘菜",
              copies: null,
            },
            {
              id: "1397851370462687234",
              name: "邵阳猪血丸子",
              categoryId: "1397844263642378242",
              price: 13800.0,
              code: "1246812345678",
              image: "2a50628e-7758-4c51-9fbb-d37c61cdacad.jpg",
              description: "看，美味不？来嘛来嘛，这才是最爱吖",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:45:12",
              updateTime: "2021-05-27 09:45:12",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "湘菜",
              copies: null,
            },
            {
              id: "1397851099502260226",
              name: "全家福",
              categoryId: "1397844263642378242",
              price: 11800.0,
              code: "23412341234",
              image: "a53a4e6a-3b83-4044-87f9-9d49b30a8fdc.jpg",
              description: "别光吃肉啦，来份全家福吧，让你长寿又美味",
              status: 1,
              sort: 0,
              createTime: "2021-05-27 09:44:08",
              updateTime: "2021-05-27 09:44:08",
              createUser: "1",
              updateUser: "1",
              isDeleted: 0,
              flavors: [],
              categoryName: "湘菜",
              copies: null,
            },
          ],
          total: 24,
          size: 6,
          current: 1,
        },
      };

      console.log("---获取页面数据---");
      this.bodyData = res.data.records;
      this.requestParam.counts = res.data.total;
      this.requestParam.pageSize = res.data.size;
      this.requestParam.page = res.data.current;

      console.log(this.requestParam);
    },
    //处理页码
    handleCurrentChange(val) {
      this.requestParam.page = val;

      this.init();
    },
    //处理每页显示条数
    handleSizeChange(val) {
      this.requestParam.pageSize = val;
      this.init();
    },
    //处理多选框
    handleSelectionChange(val) {
      console.log(val);
    },
    //新增
    add() {
      this.$refs.dialogOfSave.open();
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
}

.bodyData {
  min-height: calc(100vh - 200px - 25px);
  max-height: calc(100vh - 200px - 25px);
  margin: 20px 0 20px 0;
  overflow-y: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
