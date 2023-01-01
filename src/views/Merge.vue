<script setup lang="ts">
import BaseInput from "../components/BaseInput.vue"

import { useStore } from 'vuex'
const { ipcRenderer } = require('electron');

const store = useStore()

const addStartVideo = () => {
  ipcRenderer.send('file-request')

  ipcRenderer.on('file', async (event, file) => {
    store.commit('mergeVideo/addStartVideoPath', file) 
  });
}

const addEndVideo = () => {
  ipcRenderer.send('file-request')

  ipcRenderer.on('file', async (event, file) => {
    store.commit('mergeVideo/addEndVideoPath', file) 
  });
}
</script>

<template>
    <div class="wrap-all">
        <div class="wrap-merge">
            <span class="label">Merge</span>
            <div class="merge">
                <div class="merge-start">
                    <BaseInput 
                        inputWidth="170px" 
                        inputPlaceholder="video name.mp4" 
                        inputTextAlign="start" 
                        inputPadding="0 0 0 20px"
                        :videoType="true"
                    />
                    <span @click="addStartVideo()">Start</span>...
                </div>
                <div class="merge-end">
                    <BaseInput 
                        inputWidth="170px" 
                        inputPlaceholder="video name.mp4" 
                        inputTextAlign="start" 
                        inputPadding="0 0 0 20px"
                        :videoType="true"
                    />
                    <span @click="addEndVideo()">End</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrap-all {
    margin-top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;

}

.label {
    font-weight: 500;
}
.merge {
    /* display: flex;
    justify-content: space-around; */

    margin: 10px 0 20px 0;
}
.merge-start {
    margin-right: 20px;
}
.btn {
    text-align: end;
}
.merge-start span {
    margin-top: 30px;
}

.merge-end {
    margin: 30px 0;
}
</style>