<script setup lang="ts">
import BreakVideo from "../components/BreakVideo.vue"
import RecordsOfCuts from "../components/RecordsOfCuts.vue"
import VideoPlayer from "../components/VideoPlayer.vue"
import ControlEditingStyle from "../components/ControlEditingStyle.vue"

import BaseInput from "../components/BaseInput.vue"
import BaseButton from "../components/BaseButton.vue"

import togglerIcon from '../components/icon/togglerIcon.vue'
import controlsIcon from '../components/icon/controlsIcon.vue'

import { ref, computed } from "vue"
import { useStore } from 'vuex'

const store = useStore()

let userStartCut = ref('')
let userEndCut = ref('')

const controlsHidden = ref(false)

const screenSize = () => store.commit('changeScreenSize', !store.state.screenSize)
const startDarkMode = () => store.commit('darkMode/changeMode', !store.state.darkMode.mode)
const mode = computed(() => store.state.darkMode.mode)
const colorMode = ref('white')

const userRecords = computed(() => store.state.records)

const takeUserCut = () => {
    store.commit('addCutToRecords', `${userStartCut.value} / ${userEndCut.value}`)

    userStartCut.value = ''
    userEndCut.value = ''
}

const playRecord = (time: any) => 
    store.commit('recordsTable/playOneRecord', time.split('/')[0])

const romeveCut = (cut: any) => 
    store.commit('removeCutFromRecords', cut)

</script>

<template>
    <div class="wrap-all" :style="{ background: mode ? 'black' : 'white'}">
        <div class="video-player">
            <div class="header-control-editing-style">
                <ControlEditingStyle
                    v-if="store.state.screenSize"
                    v-on:controlsHiddenEvent="controlsHidden = !controlsHidden"
                    v-on:screenSize="screenSize"
                    v-on:startDarkMode="startDarkMode"
                    spaceBetween="space-between"
                    togglerSize="45px"
                    controlSize="25px"
                />
            </div>
            <VideoPlayer 
                :controlsHidden="controlsHidden" 
                v-on:controlsHiddenEvent="controlsHidden = !controlsHidden" 
            />
        </div>
        <div class="wrap-editor">
            <div class="wrap-break-video" v-if="controlsHidden" >
                <span></span>
                <BreakVideo style="justify-content: center">
                    <template #first>
                        <BaseInput 
                            v-model:userInput="userStartCut" 
                            inputPlaceholder="1:30"
                            :mode="mode"
                        />
                    </template>

                    <template #second>
                        <BaseInput 
                            v-model:userInput="userEndCut"
                            inputPlaceholder="2:00"
                            :mode="mode"
                        />
                    </template>

                    <template #btn>
                        <BaseButton
                            @click="takeUserCut()"
                            :mode="mode"
                        >
                            Add Cut
                        </BaseButton>
                    </template>
                </BreakVideo>
                <div class="control-editing-style">
                    <ControlEditingStyle
                        v-if="!store.state.screenSize"
                        v-on:controlsHiddenEvent="controlsHidden = !controlsHidden"
                        v-on:screenSize="screenSize"
                        v-on:startDarkMode="startDarkMode"
                        :mode="mode"
                        :colorMode="colorMode"
                        togglerSize="40px"
                        controlSize="25px"
                    />
                </div>
            </div>
            <div class="records-content">
                <span 
                    class="label" 
                    :style="{ color: mode ? 'white' : 'black' }"
                >
                        Records of Cuts
                </span>
                <div class="records">
                    <RecordsOfCuts 
                        v-for="record in userRecords"
                        :key="record.id"
                        :record="record" 
                        v-on:romeveCut="romeveCut"
                        v-on:playRecord="playRecord"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrap-all {
    background: white;
}
.wrap-editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.wrap-break-video { 
    display: flex;
    align-items: center;
    justify-content: space-between;


    width: 100%;
    height: 57px;
}
.handler-style-control {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-right: 10px;
    text-align: end;
}
.records-content {
    margin-top: 18px;
}
.label {
    font-weight: 500;
}
.records {
    border: 1px solid #e7e7e9;
    border-radius: 12px;

    height: 150px;
    width: 515px;

    padding: 4px;
    margin: 10px 0;
    
    overflow: scroll;
}
.wrap-output {
    margin-top: 30px;
}
.output-file {
    margin-top: 10px;
}
.btn {
    text-align: end;

    margin-top: 10px;
}
.wrap-control-btn {
    margin-right: 15px;
}
.wrap-control-btn, .wrap-toggler-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    cursor: pointer;
}
.control-editing-style {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-control-editing-style {
    padding-right: 27px;
}
</style>