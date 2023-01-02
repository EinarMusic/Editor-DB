<script setup lang="ts">
import playIcon from './icon/playIcon.vue'
import pauseIcon from './icon/pauseIcon.vue'
import avanceIcon from './icon/avanceIcon.vue'
import regressIcon from './icon/regressIcon.vue'
import cutIcon from './icon/cutIcon.vue'
import speedIcon from './icon/speedIcon.vue'

import ControlEditingStyle from './ControlEditingStyle.vue'

import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const prop = defineProps({
    video: { 
        type: Object, 
    },
    duration: {
        type: Number,
        default: 0
    },
    videoSpeed: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits([
    "playVideo", "pauseVideo", "changeCurrentTime", 
    "setPlaySpeed", "takeUserCut", "controlsHiddenEvent"
])

const screenSize = () => store.commit('changeScreenSize', !store.state.screenSize)

const startDarkMode = () => store.commit('darkMode/changeMode', !store.state.darkMode.mode)
const mode = computed(() => store.state.darkMode.mode)
const colorMode = ref('white')


const toHHMMSS = (time: any) => {
    if (time)
        return new Date(time * 1000).toISOString().substring(11, 19)
}

const startCut = ref('')
const endCut = ref('')

const takeUserCut = () => {

    emit('pauseVideo')

    if (startCut.value.length != 0 && endCut.value.length != 0) {
        store.commit('addCutToRecords', `${ startCut.value} / ${endCut.value}`) 

        startCut.value = ''
        endCut.value = ''
    } else if (startCut.value.length == 0) {
        startCut.value = toHHMMSS(prop.duration)
    } else {
        endCut.value = toHHMMSS(prop.duration)
    }

    console.log('from video handler')
}

document.addEventListener('keyup', (event) => {

  switch (event.code) {
    case 'ArrowLeft':
        emit('changeCurrentTime', prop.duration - 5)
        break;
    case 'ArrowRight':
        emit('changeCurrentTime', prop.duration + 5)
        break;
    case 'KeyS':
        emit('setPlaySpeed', .25)
        break;
    case 'KeyC':
        takeUserCut()
        break;
    case 'KeyD':
        prop.video.paused ? emit('playVideo') : emit('pauseVideo')
        break;
  }

}, false);
</script>

<template>
    <div class="wrap-all" :class="mode ? 'dark-mode' : ''">
        <div class="video-handler" >

            <div class="video-time" >
                <span>
                    {{ toHHMMSS(duration) || '00:00:00' }}
                </span>

                <span style="padding: 0 5px;">/</span>

                <span>
                    {{ toHHMMSS(video?.duration) || '00:00:00' }}
                </span>
            </div>

            <!-- class="console-video" -->
            <div :class="mode ? 'dark-console-video' : 'console-video' ">
                <div class="speed">
                    <span>{{ videoSpeed }}</span>
                    <speedIcon 
                        @click="$emit('setPlaySpeed', .25)" 
                        :mode="mode ? colorMode : 'black'"
                    />
                </div>
                <div class="main-handler">

                    <regressIcon 
                        @click="$emit('changeCurrentTime', duration - 5)" 
                        :mode="mode ? colorMode : 'black'"
                    />
                    <div class="play-video">
                        <playIcon 
                            @click="$emit('playVideo')"
                            v-if="video?.paused"
                            :mode="mode ? colorMode : 'black'"
                        />
                        <pauseIcon
                            @click="$emit('pauseVideo')"
                            v-else
                            :mode="mode ? colorMode : 'black'"
                        />
                    </div>
                    <avanceIcon  
                        @click="$emit('changeCurrentTime', duration + 5)"
                        :mode="mode ? colorMode : 'black'"
                    />

                </div>
                <div class="cut">
                    <cutIcon 
                        :makeCut="startCut.length != 0 && endCut.length != 0" 
                        @click="takeUserCut()" 
                        :mode="mode ? colorMode : 'black'"
                    />
                </div>
            </div>

            <div class="wrap-cut">
                <div class="cut-time" v-if="startCut.length != 0">
                    <span>
                        {{ startCut }}
                    </span>

                    <span style="padding: 0 5px;">/</span>

                    <span>
                        {{ endCut }}
                    </span>
                </div>
            </div>
            <div class="control-editing-style">
                <ControlEditingStyle v-if="!store.state.screenSize"
                v-on:controlsHiddenEvent="$emit('controlsHiddenEvent')"
                v-on:screenSize="screenSize"
                v-on:startDarkMode="startDarkMode"
                :mode="mode"
                :colorMode="colorMode"
                togglerSize="40px"
                controlSize="25px"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.video-handler {
    display: grid;
    grid-template-columns: auto 400px auto 50px;
    column-gap: 10px;
    justify-items: end;

    width: 100%;
}
.video-time, .console-video, .wrap-cut {
    width: 100%;
}
.video-time {
    display: flex;
    justify-content: end;
    align-items: center;
}

.console-video {
    display: flex;

    padding: 0 10px;
    /* margin: 0 10px; */

    /* width: 100%; */
    /* width: 400px; */
    height: 55px;

    border-radius: 10px;

    border: 1px solid #9498a4;

}
.wrap-cut {
    display: flex;
    justify-content: start;
    align-items: center;

    /* min-width: 200px; */
}
.speed, .play-video, .main-handler  {
    display: flex;
    justify-content: center;
    align-items: center;
}
.speed span {
    display: inline-block;

    width: 25px;

    text-align: center;
    font-size: 14px;
}
.main-handler {
    flex: 1;
}
.cut {
    display: flex;
    align-items: center;
}
/* .wrap-cut {
    min-width: 200px;
} */
.cut-time {
    display: flex;
    align-items: center;
}
.cut-time span {
    color: rgb(187, 19, 19);
}

.control-editing-style {
    display: flex;
    justify-content: end;
    align-items: center;

    margin-top: 1px;
}

/*  dark */

.dark-mode {
    color: white;
}

.dark-console-video {
    display: flex;

    padding: 0 10px;
    
    height: 55px;
    width: 100%;

    border-radius: 10px;
    border: 1px solid white;

}
</style>