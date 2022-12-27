const state = {
    playRecord: ''
}

const mutations = {
    playOneRecord(state: any, record: any) {
        state.playRecord = record
    }
}

export default {
    namespaced: true,
    state,
    mutations
}