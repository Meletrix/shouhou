<template>
  <div style="display: flex">
    <n-card
      title="Meletrix售后申请"
      size="large"
      :hoverable="hoverable"
      :bordered="false"
      style="margin: calc(2vh) calc(15vw) 0px calc(15vw)"
    >
      <n-form ref="formRef" :model="aftersale" :rules="rules">
        <n-form-item path="order_number" label="请输入您购买渠道的订单编号">
          <n-input
            v-model:value="aftersale.order_number"
            @keydown.enter.prevent
            placeholder="(官网/抖店/其他)"
          />
        </n-form-item>

        <n-form-item path="order_type" label="请输入您的售后类型">
          <Cascader />
        </n-form-item>

        <n-form-item path="order_phone" label="手机号联系方式">
          <n-input
            v-model:value="aftersale.phone_number"
            placeholder="请填入您的手机号"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          path="order_photo"
          label="请添加与您售后相关的图片(请先填写其他信息)"
        >
          <n-upload
            ref="uploadRef"
            :headers="{
              'Access-Control-Allow-Origin': '*',
            }"
            action="https://120.79.0.147:6666/api/aftersales/meletrix"
            :data="{ phone: aftersale.phone_number, id: temp_id }"
            :default-upload="false"
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
              aftersale.order_type == null
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
  </div>
</template>

<script setup lang="ts">
import { useAfterSale } from "@/stores/shouhou";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { ref } from "vue";
import Cascader from "./CascaderView.vue";
import type { UploadFileInfo, UploadInst } from "naive-ui";
import axios from "axios";

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const aftersale = useAfterSale();
const hoverable = ref(true);

const doClick = () => {
  uploadRef.value?.submit;
  console.log(aftersale.$state);
  message.success("提交成功");
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
</script>

<style scoped></style>
