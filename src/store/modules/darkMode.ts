const state = {
    mode: false
}

const mutations = {
    changeMode(state: any, bool: any) {
        state.mode = bool
    }
}

export default {
    namespaced: true,
    state,
    mutations
}