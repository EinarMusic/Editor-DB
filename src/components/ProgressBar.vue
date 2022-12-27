<script setup lang="ts">
import PointerIcon from './icon/pointerIcon.vue'
import { computed } from 'vue'

defineProps({
    currentTime: {
        type: Number
    },
    duration: {
        type: Number,
        default: 0
    }
})

const timeForProgresBar = computed(() => {
    const result = []

    for (let i = 0; i <= 16; i++) {
        result.push(i)
        for (let m = 1; m <= 9; m++) {
            result.push(`${i}.${m}`)
        }
    }

    return result;
})

</script>

<template>
    <div class="wrap-all">
        <div class="bar">
            <div class="progress" >
                <!-- <span class="wrap-time" v-for="time in Math.round(duration)"> -->
                <span class="wrap-time" v-for="time in timeForProgresBar">
                    <span class="time" :style="{ height: time % 2 == 0 ? '60px' : '45px' }"></span>
                    <span class="show-time">{{ time }}</span>
                </span>
            </div>
        </div>
        <div class="pointer-time">
            <pointerIcon />
        </div>
    </div>
</template>

<style scoped>
.wrap-all {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.bar {
    display: flex;;

    width: 800px;
    overflow: scroll;

    border: 1px solid red;
}

.progress {
    display: flex;

    padding: 5px;

    margin: 0 385.5px;
}

.wrap-time {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
}
.progress .time {
    display: inline-block;

    margin: 0 10px;

    width: 3px;
    background: red;
}
.show-time {
    font-size: 10px;
}

::-webkit-scrollbar {
    display: none;
}
</style>