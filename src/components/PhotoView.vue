<template>
  <n-upload
    ref="uploadRef"
    action="https://3facc2d6-6d1a-4eda-aed1-0ceeb19b18fd.mock.pstmn.io/photo2"
    :default-file-list="fileList"
    list-type="image-card"
    :default-upload="false"
    :disabled="aftersale.phone_number?.length != 11 || fileList.length >= 3"
    multiple
    @change="handleChange"
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
import type { UploadFileInfo, UploadInst } from "naive-ui";
import { useAfterSale } from "@/stores/shouhou";

const aftersale = useAfterSale();

const fileListLength = ref(0);
const uploadRef = ref<UploadInst | null>(null);
const fileList = ref<UploadFileInfo[]>([]);
const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  fileList.value = options.fileList;
  fileListLength.value = options.fileList.length;
};
const handleClick = () => {
  console.log(uploadRef);
  console.log(uploadRef.value);
  uploadRef.value?.submit();
};
</script>

<style scoped></style>
