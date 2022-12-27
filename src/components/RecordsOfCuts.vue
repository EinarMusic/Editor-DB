<script setup lang="ts">
import closeIcon from './icon/closeIcon.vue';

defineProps({ record: { type: String } })
defineEmits(['romeveCut', 'playRecord'])
</script>

<template>
        <div class="wrap-record" >
            <span 
                class="time" 
                @click="$emit('playRecord' ,record)"
            >
                {{ record }}
            </span>
            <span 
                class="btn" 
                @click="$emit('romeveCut', record)"
            >
                <closeIcon/>
            </span>
        </div>
</template>

<style scoped>
.wrap-record {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 160px;
    height: 40px;

    margin: 3px;
    

    border: 1px solid #e7e7e9;
    border-radius: 10px;

    cursor: default;
}

.time {
    font-size: 14px;
    color: #5e5e5f;
}
.btn {
    margin: 4px 0 0 7px;
    cursor: pointer;

    font-size: 18px;
    color: #454546;
}
</style>