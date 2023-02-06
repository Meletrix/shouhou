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
        <n-form-item path="order_photo" label="请添加与您售后相关的图片">
          <Photo />
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
            @click="signinClick"
            style="margin: 4px 2px; padding: 20px 50px"
          >
            Notify me
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
import axios from "axios";
import Cascader from "./CascaderView.vue";
import Photo from "./PhotoView.vue";

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const aftersale = useAfterSale();
const hoverable = ref(true);

const signinClick = (e: MouseEvent) => {
  console.log(aftersale.$state);
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
</script>

<style scoped></style>
