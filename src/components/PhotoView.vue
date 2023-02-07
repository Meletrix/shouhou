<template>
  <!--  :disabled="
      aftersale.phone_number?.length != 11 ||
      aftersale.order_number == null ||
      aftersale.order_type == null
    " -->
  <n-upload
    ref="uploadRef"
    :file-list="fileList"
    :headers="{
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded',
    }"
    action="https://3facc2d6-6d1a-4eda-aed1-0ceeb19b18fd.mock.pstmn.io/photo2"
    :data="fileList.forEach((element) => element.file?.arrayBuffer())"
    list-type="image-card"
    :default-upload="false"
    multiple
    @change="handleChange"
    :max="3"
    accept="image/png, image/jpeg"
  >
    +
  </n-upload>
  <n-button
    :disabled="!fileListLength"
    style="margin-bottom: 12px"
    @click="handleClick"
  >
    上传文件
  </n-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import type { UploadFileInfo, UploadInst } from "naive-ui";
import { useAfterSale } from "@/stores/shouhou";
const message = useMessage();
const aftersale = useAfterSale();

const fileListLength = ref(0);
const uploadRef = ref<UploadInst | null>(null);
const fileList = ref<UploadFileInfo[]>([]);
const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  fileListLength.value = options.fileList.length;
  fileList.value = options.fileList;
};
const handleClick = () => {
  console.log();
  uploadRef.value?.submit();

  message.info("上传文件");
};
</script>

<style scoped></style>
