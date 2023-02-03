<template>
  <div style="display: flex">
    <n-card
      title="Wuque Studio售后申请"
      size="large"
      hoverable="true"
      :bordered="false"
      style="margin: calc(2vh) calc(15vw) 0px calc(15vw)"
    >
      <n-form ref="formRef" :model="info" :rules="rules">
        <n-form-item path="name" label="请输入您购买渠道的订单编号">
          <n-input
            v-model:value="info.name"
            @keydown.enter.prevent
            placeholder="(官网/抖店/其他)"
          />
        </n-form-item>

        <n-form-item path="discord" label="请输入您的售后类型">
          <n-input
            v-model:value="info.discord"
            @keydown.enter.prevent
            placeholder="(售后类型不同，寄回地址会有变化，请谨慎选择)"
          />
        </n-form-item>

        <n-form-item path="email" label="售后对接小助理名称">
          <n-input
            v-model:value="info.email"
            type="email"
            placeholder="请将其他渠道的联系人方式填写在底部备注栏"
            @keydown.enter.prevent
          />
        </n-form-item>

        <n-form-item path="country" label="请输入您与小助理确认后的售后编码">
          <n-input
            v-model:value="info.country"
            @keydown.enter.prevent
            placeholder="售后编码请于小助理确认后填写"
          />
        </n-form-item>

        <div style="text-align: center">
          <n-button
            :disabled="
              info.name === '' ||
              info.country === '' ||
              info.discord === '' ||
              info.email === '' ||
              info.name === null ||
              info.country === null ||
              info.discord === null ||
              info.email === null ||
              !info.email.includes('@')
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
import { useInfoStore } from "@/stores/info";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { ref } from "vue";
import axios from "axios";

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const info = useInfoStore();

const signinClick = (e: MouseEvent) => {
  console.log(info.$state);

  e.preventDefault();
  formRef.value?.validate(async () => {
    try {
      await axios
        .post("https://120.79.0.147/api/notify", info.$state, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          message.success("Success");
        });
    } catch (e: any) {
      message.error("Fail: " + e.response!.data.message);
    }
  });
};

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("empty name");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  discord: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("empty discord");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  country: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("empty country");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value.includes("@")) {
          return new Error("incorrect email");
        }
        return true;
      },
      trigger: "input",
    },
  ],
};
</script>

<style scoped></style>
