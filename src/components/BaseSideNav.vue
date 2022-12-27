<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const videoPath = computed(() => store.state.videoPath)

</script>

<template>
    <div>
        <div class="nav-wrap">
            <div class="side-nav">
                <div class="menu-list">
                    <p @click="router.push('/')">Home</p>
                    <p @click="router.push('/editor')">Cut</p>
                    <p @click="router.push('/merge')">Merge</p>
                </div>
                <div class="footer">
                    <span class="tag" v-if="videoPath.length != 0">Editing </span> 
                    <span>{{  videoPath.split('/').slice(-1).join('') }}</span> 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.side-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #e7e7e9;

    padding-top: 25px;
    
    width: 200px;
    height: 80vh;
}
.side-nav .menu-list {
    display: block;
    width: 100%;

    text-align: center;
    flex: 1;
}
.side-nav p {
    padding: 10px 0;
    margin: 5px 0;

    font-weight: bold;

    cursor: pointer;
}
.side-nav p:hover {
    background: #e7e7e9;
}

.footer {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
    width: 190px; 

    text-align: center;
}

.tag {
    font-weight: 500;
}
</style>