<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue';

import { computed, defineComponent } from "vue"
import { useStore } from 'vuex'

import { cutResult } from '../main/cut'
import { mergeResult } from '../main/merge'

const { shell } = require('electron')

const store = useStore()

const outputName = computed(() => store.state.outputName)

const openNewFile = () => {
    shell.showItemInFolder(store.state.outputName)
}

const editResult = 
    store.state.mergeVideo.mergeVideos?.start == undefined || store.state.mergeVideo.mergeVideos?.end == undefined
    ? defineComponent(cutResult) 
    : defineComponent(mergeResult)

</script>

<template>
    <div>
        <div class="wrap-all">
            <div class="name-file">
                <span>{{ outputName.split(' ')[1] }}</span>
            </div>
            <div class="icon rotate" >
                <editResult />
            </div>
            <BaseButton 
                
                @click="openNewFile()"
                borderColor="1px solid blue" 
                backgroundColor="white" 
                textColor="blue"
            >
                <span style="font-weight: bold;">Show Folder</span>
            </BaseButton>
        </div>
    </div>
</template>

<style scoped>
.wrap-all {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 100px 0;
}
.icon {
    margin-bottom: 20px;
}

</style>