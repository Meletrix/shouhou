<template>
  <n-grid :cols="14">
    <n-gi :span="2"></n-gi>
    <n-gi :span="10">
      <n-card
        title="Meletrix售后申请"
        size="large"
        :hoverable="hoverable"
        :bordered="false"
      >
        <template v-if="screenwidth" #cover>
          <img src="@/assets/imgs/meletrix.png" />
        </template>
        <n-form ref="formRef" :model="aftersale" :rules="rules">
          <n-form-item path="order_number" label="请输入您购买渠道的订单编号">
            <n-input
              v-model:value="aftersale.order_number"
              :disabled="active"
              @keydown.enter.prevent
              placeholder="(官网/抖店/其他)"
            />
          </n-form-item>

          <n-form-item path="order_type" label="请输入您的售后类型">
            <n-cascader
              v-model:value="aftersale.order_type"
              placeholder="请选择您的售后类型及物件"
              :expand-trigger="hoverTrigger ? 'hover' : 'click'"
              :options="options"
              :cascade="cascade"
              :check-strategy="'child'"
              :show-path="true"
              :filterable="false"
              :disabled="active"
            />
          </n-form-item>

          <n-form-item path="order_phone" label="手机号联系方式">
            <n-input
              v-model:value="aftersale.phone_number"
              placeholder="请填入您的手机号"
              @keydown.enter.prevent
              :disabled="active"
            />
          </n-form-item>
          <n-form-item
            path="order_photo"
            label="请添加与您售后相关的图片(请先填写其他信息并提交信息后再上传图片)"
          >
            <n-upload
              ref="uploadRef"
              :headers="{
                'Access-Control-Allow-Origin': '*',
              }"
              action="https://120.79.0.147:6666/api/aftersales/meletrix"
              :data="{ phone: aftersale.phone_number, id: temp_id }"
              list-type="image-card"
              @change="handleChange"
              @remove="onRemove"
              @before-upload="beforeUpload"
              @finish="finish"
              :max="3"
              accept="image/png, image/jpeg"
              :disabled="
                aftersale.phone_number?.length != 11 ||
                aftersale.order_number == null ||
                aftersale.order_type == null ||
                !active
              "
            >
              +
            </n-upload>
          </n-form-item>
          <div style="text-align: center">
            <n-button
              :disabled="
                aftersale.order_number === '' ||
                aftersale.order_type === '' ||
                aftersale.order_number === null ||
                aftersale.order_type === null ||
                aftersale.phone_number === null ||
                aftersale.phone_number.length != 11
              "
              round
              type="primary"
              size="large"
              attr-type="submit"
              @click="doClick"
              style="margin: 4px 2px; padding: 20px 50px"
            >
              提交
            </n-button>
          </div>
        </n-form>
      </n-card>
    </n-gi>
    <n-gi :span="2"></n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { useAfterSale } from "@/stores/shouhou";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { ref } from "vue";
import type { UploadFileInfo, UploadInst } from "naive-ui";
import axios from "axios";

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const aftersale = useAfterSale();
const hoverable = ref(true);
const active = ref(false);
const screenwidth = ref(window.screen.width < 640 ? true : false);

const doClick = async () => {
  active.value = true;
  try {
    await axios.post(
      "https://120.79.0.147:6666/api/aftersales/meletrix/submit",
      aftersale.$state,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    message.success("提交成功");
  } catch (e: any) {
    console.log(e.response!.data.message);

    message.error("提交失败" + e.response!.data.message);
  }
};

const rules: FormRules = {
  order_number: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("订单号不能为空");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  order_type: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("售后类型不能为空");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  order_phone: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (
          aftersale.phone_number != null &&
          aftersale.phone_number.length != 11
        ) {
          return new Error("请填写正确的手机号");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const fileListLength = ref(0);
const uploadRef = ref<UploadInst | null>(null);
const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  fileListLength.value = options.fileList.length;
};
const temp_id = ref("");

const beforeUpload = (options: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  temp_id.value = options.file.id;
};
const finish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
  message.success("文件: " + options.file.name + "上传成功");
};
const onRemove = async (options: {
  file: UploadFileInfo;
  fileList: Array<UploadFileInfo>;
}) => {
  const temp_data = { phone: aftersale.phone_number, id: options.file.id };
  try {
    await axios.post(
      "https://120.79.0.147:6666/api/aftersales/meletrix/delect",
      temp_data,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    message.success("文件: " + options.file.name + "删除成功");
  } catch (e: any) {
    message.error("删除失败: " + e.response!.data.message);
  }
};

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

<style scoped>
@media (max-width: 640px) {
  .n-card {
    margin-top: calc(6vh);
  }
}
.n-card {
  margin-top: calc(14vh);
}
</style>
l
