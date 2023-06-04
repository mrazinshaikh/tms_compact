<template>
    <div class="relative">
        <div class="fixed z-30 inset-0 bg-black/50">
            <div class="bg-white w-11/12 h-full border border-red-500 mx-auto">
                
            </div>
        </div>
        Show Logs
    </div>
</template>

<script setup>
defineProps({
  task_logs: {
    type: Object,
    default: {},
  },
});
</script>
