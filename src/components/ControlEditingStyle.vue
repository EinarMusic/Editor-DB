<script setup lang="ts">
import togglerIcon from './icon/togglerIcon.vue'
import controlsIcon from './icon/controlsIcon.vue'

defineEmits(['controlsHiddenEvent', 'screenSize', 'startDarkMode'])
const prop = defineProps({
    mode: {
        type: Boolean,
        default: false
    },
    togglerSize: {
        type: String,
        default: '30px'
    },
    controlSize: {
        type: String,
        default: '25px'
    },
    colorMode: {
        type: String,
    },
    spaceBetween: { 
        type: String,
        default: 'center'
    }
})

const theme = { spaceBetween: prop.spaceBetween }

</script>

<template>
    <div>
        <div class="nav-toggler">
            <div @click="$emit('screenSize'), $emit('startDarkMode')">
                <togglerIcon
                    :mode="mode ? colorMode : 'black'" 
                    :togglerSize="togglerSize" 
                />
            </div>
            <div @click="$emit('controlsHiddenEvent')">
                <controlsIcon 
                    :mode="mode ? colorMode : 'black'" 
                    :controlSize="controlSize"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-toggler {
    display: flex;
    align-items: center;
    justify-content: v-bind('theme.spaceBetween');

    width: 100%;
}
.nav-toggler div {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 45px;
    width: 45px;

    border-radius: 50%;
    cursor: pointer;

    margin-left: 10px;
}
</style>