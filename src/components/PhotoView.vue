<template>
  <!--  :disabled="
      aftersale.phone_number?.length != 11 ||
      aftersale.order_number == null ||
      aftersale.order_type == null
    " -->
  <n-upload
    :file-list="fileList"
    action="https://3facc2d6-6d1a-4eda-aed1-0ceeb19b18fd.mock.pstmn.io/photo2"
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
import type { UploadFileInfo, UploadInst } from "naive-ui";
import { useAfterSale } from "@/stores/shouhou";

const aftersale = useAfterSale();

const fileListLength = ref(0);
const uploadRef = ref<UploadInst | null>(null);
const fileList = ref<UploadFileInfo[]>([]);
const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  fileListLength.value = options.fileList.length;
  fileList.value = options.fileList;
};
const handleClick = () => {
  console.log(fileList.value);
  uploadRef.value?.submit();
};
</script>

<style scoped></style>
