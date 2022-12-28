<script setup lang="ts">
import { computed } from 'vue'

const prop = defineProps({
    userInput: {type: String},
    inputWidth: { type: String, default: '90px' },
    inputPlaceholder: { type: String, default: '1:30' },
    inputTextAlign: { type: String, default: 'center' },
    inputPadding: { type: String, default: '0px' },
    videoType: { type: Boolean, default: false },
    mode: { type: Boolean, default: false },
})
defineEmits(['update:userInput'])

// bind in css and in tag.
const placeholderAndColorText = computed(() => prop.mode ? 'white' : '#5e5e5f')
</script>

<template>
    <div>
        <div class="wrap-input" :style="{display: videoType ? 'flex' : 'block'}">
            <div class="input" 
                :style="{ 
                    width: inputWidth, 
                    'border-top-right-radius': videoType ? '0' : '',
                    'border-bottom-right-radius': videoType ? '0' : '' }">
                <input 
                    type="text" 
                    :value="userInput"
                    @input="$emit('update:userInput', $event.target.value)"
                    :placeholder="inputPlaceholder"
                    :style="{
                        color: placeholderAndColorText,
                        background: mode ? 'black' : 'white',
                        'text-align': inputTextAlign, 
                        padding: inputPadding
                    }"
                />
            </div>
            <div class="video-type" v-if="videoType">
                <span>.mp4</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

.input {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    height: 45px;

    border: 1px solid #5e5e5f;
    border-radius: 10px;

    overflow: hidden;

}
input {
    border: none;
    outline: none;

    font-size: 16px;

    width: 100%;
    height: 100%;
}
::placeholder {
    color: v-bind(placeholderAndColorText)
}
.video-type {
    display: flex;
    justify-content: center;
    align-items: center;

    color: #5e5e5f;

    border-top: 1px solid #5e5e5f;
    border-bottom: 1px solid #5e5e5f;
    border-right: 1px solid #5e5e5f;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    height: 45px;
    width: 55px;

    cursor: default;
}
</style>