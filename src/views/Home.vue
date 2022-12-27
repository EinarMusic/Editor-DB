<script setup lang="ts">
import BaseButton from "../components/BaseButton.vue"

import { computed } from 'vue'
import { useStore } from 'vuex'

const { ipcRenderer } = require('electron');

const store = useStore()

const videopath = computed(() => store.state.videoPath)

const addVideo = () => {
  ipcRenderer.send('file-request')

  ipcRenderer.on('file', async (event, file) => {
    console.log(file)

    store.commit('addVideoPath', file) 
  });
}
</script>

<template>
    <div>
        <div class="wrap-home">
            <div class="brand">
                <div class="wrap-logo">
                    <div class="img-brand">
                        <img src="../assets/db-img.png" alt="">
                    </div>
                    <span>Editor</span>
                </div>
                <div class="video-file">
                    <span>{{  videopath?.split('/').slice(-1).join('') }}</span> 
                    <div class="btn-save">
                        <BaseButton 
                            @click="addVideo()"
                            borderColor="1px solid blue" 
                            backgroundColor="white" 
                            textColor="blue"
                        >
                            Add File
                        </BaseButton>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 100px 0;
}
.wrap-logo {
    display: flex;
    align-items: flex-end;
}
.img-brand {
    width: 100px;
    height: 100px;

    overflow: hidden;

    border-radius: 50%
}
.img-brand img {
    height: 100%;
    width: 100%;
}
.video-file {
    display: flex;
    align-items: center;
    margin-top: 80px;
}
.btn-save {
    margin-left: 20px;
}
</style>