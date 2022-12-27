<script setup lang="ts">
// import loadIcon from '../components/icon/loadIcon.vue';
// import successIcon from '../components/icon/successIcon.vue';
// import errorIcon from '../components/icon/errorIcon.vue';
import BaseButton from '../components/BaseButton.vue';

import { computed, defineComponent } from "vue"
import { useStore } from 'vuex'

import { editResult } from '../main/script'

const { shell } = require('electron')

const store = useStore()

const outputName = computed(() => store.state.outputName)
// const result = computed(() => editResult)
// const result = await editResult

const openNewFile = () => {
    shell.showItemInFolder(store.state.outputName)
}

const editResultComponent = defineComponent(editResult)

</script>

<template>
    <div>
        <div class="wrap-all">
            <div class="name-file">
                <span>{{ outputName.split(' ')[1] }}</span>
            </div>
            <div class="icon rotate" >
                <editResultComponent />
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