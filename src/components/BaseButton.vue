<script setup lang="ts">
defineProps({
    borderColor: { type: String, default: 'none' },
    backgroundColor: { type: String, default: 'black' },
    textColor: { type: String, default: 'white' },
    hoverText: { type: String, default: '' },
    hoverBackground: { type: String, default: '' },
})

</script>

<template>
    <div>
        <div class="btn" :style="{ background: backgroundColor, border: borderColor }">
            <span :style="{ color: textColor }"><slot/></span>
        </div>
    </div>
</template>

<style scoped>
.btn {
    display: inline-block;

    padding: 12px 18px;
    
    background: black;
    border-radius: 10px;
    cursor: pointer;
}

span {
    font-size: 14px;
    font-weight: 500;
    color: white;
}
</style>