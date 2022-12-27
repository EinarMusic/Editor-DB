<script setup lang="ts">
import VideoHandler from './VideoHandler.vue'

import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex';

const store = useStore()

defineProps({
    controlsHidden: {
        type: Boolean,
        default: true
    }
})

defineEmits(['controlsHiddenEvent'])

const videoPath = computed(() => store.state.videoPath)

const mode = computed(() => store.state.darkMode.mode)

const mac = ref('file://')
// const filePath = ref('/Users/macbookpro2012/Desktop/test_two.mp4')

const video = ref(null)
let duration = ref(0)

const playVideo = () => video.value?.play();

const pauseVideo = () => video.value?.pause();

const changeCurrentTime = (time: any) => video.value.currentTime = time; 

const videoTimeUpdated = (event: any) => duration.value = video.value?.currentTime;

const videoSpeed = ref(1)

const setPlaySpeed = (speed: any) => {
    videoSpeed.value += speed;
    
    if (videoSpeed.value > 2) 
        videoSpeed.value = 1

    video.value.playbackRate = videoSpeed.value;
}

const takeUserCut = (start: any, end: any) => 
    store.commit('addCutToRecords', start, end)

// const recordForPlay = computed(() => store.state.recordsTable.playRecord)

// const playRecord = () => 
//     video.value.currentTime = recordForPlay

// watch(recordForPlay, playRecord)



</script> 

<template> 
    <div class="video-player" :style="{ background: mode ? 'black' : 'white' }">
        <div class="video-wrap">
            <!-- poster="" -->
            <video
                :style="{ width: store.state.screenSize ? '550px' : '100%' }" 
                @timeupdate="videoTimeUpdated" 
                controls 
                class="video-media" 
                ref="video" 
            >
            <!-- :controls="controlsHidden" -->
                <!-- <source :src="videoPath" type="video/mp4"> -->
                <source :src="mac + videoPath" type="video/mp4">
            </video>
        </div>
        <div class="handler" v-if="!controlsHidden">
            <VideoHandler 
                v-on:takeUserCut="takeUserCut"
                v-on:controlsHiddenEvent="$emit('controlsHiddenEvent')"
                v-on:playVideo="playVideo" 
                v-on:pauseVideo="pauseVideo" 
                v-on:changeCurrentTime="changeCurrentTime"
                v-on:setPlaySpeed="setPlaySpeed"
                :videoSpeed="videoSpeed"
                :duration="duration" 
                :video="video" 
            />
        </div>
    </div>
</template>

<style scoped>
.video-wrap {
    display: flex;
    justify-content: center;

    max-width: 100%;
}

video {
    display: inline-block;

    /* width: 100%;  */
    /* width: 550px;  */

    border-radius: 5px;
}
.handler {
    width: 100%;
}
</style>

  