<script setup lang="ts">

defineProps({
    mode: {
        type: String,
        default: 'black'
    },
    controlSize: {
        type: String,
        default: '25px'
    },
})
</script>

<template>
    <svg 
        :fill="mode" 
        :width="controlSize" 
        :height="controlSize"  
        version="1.1" viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <path d="m595 262.5h-175c0-28.875-23.625-52.5-52.5-52.5h-35c-28.875 0-52.5 23.625-52.5 52.5h-175c-9.625 0-17.5 7.875-17.5 17.5s7.875 17.5 17.5 17.5h175c0 28.875 23.625 52.5 52.5 52.5h35c28.875 0 52.5-23.625 52.5-52.5h175c9.625 0 17.5-7.875 17.5-17.5s-7.875-17.5-17.5-17.5z"/>
            <path d="m595 455h-297.5v-8.75c0-24.148-19.602-43.75-43.75-43.75h-52.5c-24.148 0-43.75 19.602-43.75 43.75v8.75h-52.5c-9.625 0-17.5 7.875-17.5 17.5s7.875 17.5 17.5 17.5h52.5v8.75c0 24.148 19.602 43.75 43.75 43.75h52.5c24.148 0 43.75-19.602 43.75-43.75v-8.75h297.5c9.625 0 17.5-7.875 17.5-17.5s-7.875-17.5-17.5-17.5z"/>
            <path d="m105 105h297.5c0 28.875 23.625 52.5 52.5 52.5h35c28.875 0 52.5-23.625 52.5-52.5h52.5c9.625 0 17.5-7.875 17.5-17.5s-7.875-17.5-17.5-17.5h-52.5c0-28.875-23.625-52.5-52.5-52.5h-35c-28.875 0-52.5 23.625-52.5 52.5h-297.5c-9.625 0-17.5 7.875-17.5 17.5s7.875 17.5 17.5 17.5z"/>
        </g>
    </svg>
</template>
