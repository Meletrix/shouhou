<template>
  <n-cascader
    v-model:value="aftersale.order_type"
    placeholder="请选择您的售后类型及物件"
    :expand-trigger="hoverTrigger ? 'hover' : 'click'"
    :options="options"
    :cascade="cascade"
    :check-strategy="'child'"
    :show-path="true"
    :filterable="false"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAfterSale } from "../stores/shouhou";
const aftersale = useAfterSale();

const hoverTrigger = ref(false);
const cascade = ref(true);
const options = [
  {
    label: "换货",
    value: "huanhuo",
    children: [
      {
        label: "外观",
        value: "huanhuo_waiguan",
        children: [
          {
            label: "面壳",
            value: "huanhuo_WJ001_1",
          },
          {
            label: "底壳",
            value: "huanhuo_WJ001_2",
          },
          {
            label: "内配重",
            value: "huanhuo_WJ001_3",
          },
          {
            label: "外配重",
            value: "huanhuo_WJ001_4",
          },
          {
            label: "背板",
            value: "huanhuo_WJ001_5",
          },
          {
            label: "旋钮",
            value: "huanhuo_WJ001_6",
          },
        ],
      },
      {
        label: "硬件",
        value: "huanhuo_yingjian",
        children: [
          {
            label: "PCB",
            value: "huanhuo_PCB001_1",
          },
          {
            label: "子板",
            value: "huanhuo_PCB001_2",
          },
          {
            label: "编码器",
            value: "huanhuo_PCB001_3",
          },
        ],
      },
      {
        label: "配件",
        value: "huanhuo_peijian",
        children: [
          {
            label: "电池",
            value: "huanhuo_DC001_1",
          },
          {
            label: "卫星轴",
            value: "huanhuo_weixingzhou",
            children: [
              {
                label: "包胶2U钢丝",
                value: "huanhuo_JM001_1",
              },
              {
                label: "包胶6.25U钢丝",
                value: "huanhuo_JM001_2",
              },
              {
                label: "卫星轴假轴",
                value: "huanhuo_JM001_3",
              },
              {
                label: "卫星轴外壳",
                value: "huanhuo_JM001_4",
              },
              {
                label: "卫星轴螺丝",
                value: "huanhuo_JM001_5",
              },
              {
                label: "卫星轴螺丝垫片",
                value: "huanhuo_JM001_6",
              },
            ],
          },
          {
            label: "螺丝",
            value: "huanhuoluosi",
            children: [
              {
                label: "上下壳体螺丝",
                value: "huanhuo_WJ001_10",
              },
              {
                label: "定位板PCB螺丝",
                value: "huanhuo_WJ001_11",
              },
              {
                label: "定位板PCB铜柱",
                value: "huanhuo_WJ001_12",
              },
              {
                label: "子板螺丝",
                value: "huanhuo_WJ001_13",
              },
              {
                label: "支架螺丝",
                value: "huanhuo_WJ001_14",
              },
              {
                label: "外配重螺丝",
                value: "huanhuo_WJ001_15",
              },
              {
                label: "内配重螺丝",
                value: "huanhuo_WJ001_16",
              },
              {
                label: "旋钮机米螺丝",
                value: "huanhuo_WJ001_16",
              },
            ],
          },
          {
            label: "扳手",
            value: "huanhuo_banshou",
            children: [
              {
                label: "旋钮螺丝扳手",
                value: "huanhuo_WJ001_8",
              },
              {
                label: "外壳螺丝扳手",
                value: "huanhuo_WJ001_9",
              },
            ],
          },

          {
            label: "定位板",
            value: "huanhuo_dingweiban",
            children: [
              {
                label: "PC",
                value: "huanhuo_WJ001_pc",
              },
              {
                label: "POM",
                value: "huanhuo_WJ001_pom",
              },
              {
                label: "FR4",
                value: "huanhuo_WJ001_fr4",
              },
              {
                label: "碳纤维",
                value: "huanhuo_WJ001_tanxianwei",
              },
              {
                label: "铝定位板",
                value: "huanhuo_WJ001_lv",
              },

              {
                label: "铜定位板",
                value: "huanhuo_WJ001_tong",
              },
            ],
          },
          {
            label: "其他",
            value: "huanhuo_qita",
            children: [
              {
                label: "USB-C数据线",
                value: "huanhuo_SL001_1",
              },
              {
                label: "仿鹿皮键盘包",
                value: "huanhuo_SL001_2",
              },
              {
                label: "脚垫",
                value: "huanhuo_SL001_3",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "退货",
    value: "tuihuo",
    children: [
      {
        label: "不想要了",
        value: "buxiangyaole",
      },
      {
        label: "外观瑕疵",
        value: "waiguanxiaci",
      },
      {
        label: "更喜欢别家的",
        value: "gengxihuanbiejiade",
      },
      {
        label: "无法使用",
        value: "wufashiyong",
      },
    ],
  },
  {
    label: "缺货",
    value: "quehuo",
    children: [
      {
        label: "外观",
        value: "quehuo_waiguan",
        children: [
          {
            label: "面壳",
            value: "quehuo_WJ001_1",
          },
          {
            label: "底壳",
            value: "quehuo_WJ001_2",
          },
          {
            label: "内配重",
            value: "quehuo_WJ001_3",
          },
          {
            label: "外配重",
            value: "quehuo_WJ001_4",
          },
          {
            label: "背板",
            value: "quehuo_WJ001_5",
          },
          {
            label: "旋钮",
            value: "quehuo_WJ001_6",
          },
          {
            label: "定位板",
            value: "quehuo_WJ001_7",
          },
        ],
      },
      {
        label: "硬件",
        value: "quehuo_yingjian",
        children: [
          {
            label: "PCB",
            value: "quehuo_PCB001_1",
          },
          {
            label: "子板",
            value: "quehuo_PCB001_2",
          },
          {
            label: "编码器",
            value: "quehuo_PCB001_3",
          },
        ],
      },
      {
        label: "配件",
        value: "quehuo_peijian",
        children: [
          {
            label: "电池",
            value: "quehuo_DC001_1",
          },
          {
            label: "卫星轴",
            value: "quehuo_weixingzhou",
            children: [
              {
                label: "包胶2U钢丝",
                value: "quehuo_JM001_1",
              },
              {
                label: "包胶6.25U钢丝",
                value: "quehuo_JM001_2",
              },
              {
                label: "卫星轴假轴",
                value: "quehuo_JM001_3",
              },
              {
                label: "卫星轴外壳",
                value: "quehuo_JM001_4",
              },
              {
                label: "卫星轴螺丝",
                value: "quehuo_JM001_5",
              },
              {
                label: "卫星轴螺丝垫片",
                value: "quehuo_JM001_6",
              },
            ],
          },
          {
            label: "螺丝",
            value: "quehuo_luosi",
            children: [
              {
                label: "上下壳体螺丝",
                value: "quehuo_WJ001_10",
              },
              {
                label: "定位板PCB螺丝",
                value: "quehuo_WJ001_11",
              },
              {
                label: "定位板PCB铜柱",
                value: "quehuo_WJ001_12",
              },
              {
                label: "子板螺丝",
                value: "quehuo_WJ001_13",
              },
              {
                label: "支架螺丝",
                value: "quehuo_WJ001_14",
              },
              {
                label: "外配重螺丝",
                value: "quehuo_WJ001_15",
              },
              {
                label: "内配重螺丝",
                value: "quehuo_WJ001_16",
              },
              {
                label: "旋钮机米螺丝",
                value: "quehuo_WJ001_16",
              },
            ],
          },
          {
            label: "扳手",
            value: "quehuo_banshou",
            children: [
              {
                label: "旋钮螺丝扳手",
                value: "quehuo_WJ001_8",
              },
              {
                label: "外壳螺丝扳手",
                value: "quehuo_WJ001_9",
              },
            ],
          },
          {
            label: "定位板",
            value: "quehuo_dingweiban",
            children: [
              {
                label: "PC",
                value: "quehuo_WJ001_pc",
              },
              {
                label: "POM",
                value: "quehuo_WJ001_pom",
              },
              {
                label: "FR4",
                value: "quehuo_WJ001_fr4",
              },
              {
                label: "碳纤维",
                value: "que huoWJ001_tanxianwei",
              },
              {
                label: "铝定位板",
                value: "quehuo_WJ001_lv",
              },

              {
                label: "铜定位板",
                value: "quehuo_WJ001_tong",
              },
            ],
          },
          {
            label: "其他",
            value: "quehuo_qita",
            children: [
              {
                label: "USB-C数据线",
                value: "quehuo_SL001_1",
              },
              {
                label: "仿鹿皮键盘包",
                value: "quehuo_SL001_2",
              },
              {
                label: "脚垫",
                value: "quehuo_SL001_3",
              },
            ],
          },
        ],
      },
      {
        label: "赠品",
        value: "zengpin",
      },
    ],
  },
  {
    label: "维修",
    value: "weixiiu",
    children: [
      {
        label: "人为故障",
        value: "renwei",
        children: [
          {
            label: "轴座",
            value: "renwei_zhouzuo",
          },
          {
            label: "充电IC",
            value: "renwei_chongdianic",
          },
          {
            label: "主控IC",
            value: "renwei_zhukongic",
          },
          {
            label: "蓝牙模块",
            value: "renwei_lanya",
          },
          {
            label: "2Pin/4Pin插座",
            value: "renwei_chazuo",
          },
          {
            label: "type-c小板",
            value: "renwei_xiaoban",
          },
          {
            label: "type-c排线",
            value: "renwei_paixian",
          },
          {
            label: "未知故障",
            value: "renwei_weizhi",
          },
        ],
      },
      {
        label: "非人为故障",
        value: "feirenwei",
        children: [
          {
            label: "轴座",
            value: "feirenwei_zhouzuo",
          },
          {
            label: "充电IC",
            value: "feirenwei_chongdianic",
          },
          {
            label: "主控IC",
            value: "feirenwei_zhukongic",
          },
          {
            label: "蓝牙模块",
            value: "feirenwei_lanya",
          },
          {
            label: "2Pin/4Pin插座",
            value: "feirenwei_chazuo",
          },
          {
            label: "type-c小板",
            value: "feirenwei_xiaoban",
          },
          {
            label: "type-c排线",
            value: "feirenwei_paixian",
          },
          {
            label: "未知故障",
            value: "feirenwei_weizhi",
          },
        ],
      },
    ],
  },
];
</script>

<style scoped></style>
