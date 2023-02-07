<template>
  <!--  
    " -->
  <n-upload
    ref="uploadRef"
    :headers="{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization',
    }"
    action="https://120.79.0.147:9999/api/aftersales/meletrix"
    :data="{ phone: aftersale.phone_number, id: temp_id }"
    list-type="image-card"
    @change="handleChange"
    @remove="onRemove"
    @before-upload="beforeUpload"
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import type { UploadFileInfo, UploadInst } from "naive-ui";
import { useAfterSale } from "@/stores/shouhou";
import axios from "axios";
const message = useMessage();
const aftersale = useAfterSale();

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

const onRemove = async (options: {
  file: UploadFileInfo;
  fileList: Array<UploadFileInfo>;
}) => {
  const temp_data = { phone: aftersale.phone_number, id: options.file.id };
  try {
    await axios.post(
      "https://120.79.0.147:9999/api/aftersales/delect",
      temp_data,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e: any) {
    message.error("删除失败: " + e.response!.data.message);
  }
};
</script>

<style scoped></style>
