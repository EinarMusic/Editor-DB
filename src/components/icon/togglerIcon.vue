<script setup lang="ts">
defineProps({
    togglerSize: {
        type: String,
        default: '30px'
    },
    mode: {
        type: String,
        default: 'black'
    }
})
</script>

<template> 
    <svg 
        :width="togglerSize" 
        :height="togglerSize" 
        :fill="mode" 
        version="1.1" viewBox="0 0 750 550" xmlns="http://www.w3.org/2000/svg"
    >
        <path d="m350 163.33h140c12.902 0 23.332 10.453 23.332 23.332 0 12.879-10.43 23.332-23.332 23.332h-140c-12.879 0-23.332-10.453-23.332-23.332 0-12.879 10.453-23.332 23.332-23.332zm-46.668 186.67h186.67c12.902 0 23.332 10.43 23.332 23.332 0 12.902-10.43 23.332-23.332 23.332h-186.67c-12.879 0-23.332-10.43-23.332-23.332 0-12.902 10.453-23.332 23.332-23.332zm-93.332-93.332h280c12.902 0 23.332 10.453 23.332 23.332 0 12.902-10.43 23.332-23.332 23.332h-280c-12.879 0-23.332-10.43-23.332-23.332 0-12.879 10.453-23.332 23.332-23.332z"/>
    </svg>
</template>

<style scoped>
svg {
    height: 100%;
}
</style>
