const state = {
    mergeVideos: {},
}

const mutations = {
    addStartVideoPath(state: any, path: any) {
        state.mergeVideos.start = path
    },
    addEndVideoPath(state: any, path: any) {
        state.mergeVideos.end = path
    }
}

export default {
    namespaced: true,
    state,
    mutations
}