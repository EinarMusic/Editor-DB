<script setup lang="ts">
import BaseButton from "../components/BaseButton.vue"

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { generateFormat } from '../main/script' 

const { ipcRenderer } = require('electron');

defineProps({ videopath: { type: String } })

const store = useStore()
const router = useRouter()

const userRecords = computed(() => store.state.records)

const outputName = ref('')

const editVideo = (path: any, records: any, output: any) => 
    generateFormat(path, records, output) 

const getOutputNameAndStartEdition = () => {
  ipcRenderer.send('application:download')

  ipcRenderer.on('path', (event, file) => {
    outputName.value = file.filePath + '.mp4'

    if (outputName.value.length != 0) {
        editVideo(store.state.videoPath, userRecords.value, outputName.value)
        store.commit('nameOfOutput', outputName.value)
        router.push('/editing')
    }
  });
}

</script>

<template>
    <div class="wrap-nav">

        <div class="add-file">
            <div class="wrap-logo">
                <div class="img-brand">
                    <img src="../assets/db-img.png" alt="">
                </div>
                <h3>Editor</h3>
            </div>
            <div class="main-nav-content">
                <BaseButton 
                    @click="getOutputNameAndStartEdition()"
                    borderColor="1px solid blue" 
                    backgroundColor="white" 
                    textColor="blue"
                    hoverBackground="blue"
                    hoverText="white"
                >
                    Start Edition
                </BaseButton>
            </div>
        </div>

    </div>
</template>

<style scoped>
.wrap-nav {
    padding: 20px 40px;
}
.add-file {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrap-logo {
    display: flex;
    align-items: flex-end;
}
.img-brand {
    width: 50px;
    height: 50px;

    margin-right: 5px;

    overflow: hidden;

    border-radius: 50%;
    border: 2px solid gray;
}
.img-brand img {
    height: 100%;
    width: 100%;

}
.main-nav-content {
    cursor: pointer;
}
</style>