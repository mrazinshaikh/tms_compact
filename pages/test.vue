<template>
  <div>
    <pre>{{ allData }}</pre>
  </div>
</template>

<script setup>
const allData = ref({});

onMounted(async () => {
    await nextTick();
  console.log("%cMounted", "color: #00ff00;font-size: 20px;");
  allData.value = await getAlldata();
  console.log(allData);
});
async function getAlldata() {
  return await useFetch("/api/tasks/?test=true");
}
</script>
