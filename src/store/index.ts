import { createStore } from 'vuex'

import darkMode from './modules/darkMode'
import mergeVideo from './modules/mergeVideo'
import recordsTable from './modules/recordsTable'

export default createStore({
    strict: true,
    modules: {
        darkMode,
        mergeVideo,
        recordsTable
    },
    state: {
        videoPath: '',
        records: [],
        outputName: '',
        //
        screenSize: true
    },
    mutations: {
        addVideoPath(state: any, path: any) {
            state.videoPath = path
        },
        addCutToRecords(state: any, cuts: any) {
            state.records.push(cuts)
        },
        removeCutFromRecords(state: any, cut: any) {
            state.records.splice(
                state.records.findIndex((val: any) => val == cut), 1
            )
        },
        nameOfOutput(state: any, name: any) {
            state.outputName = name
        },
        //
        changeScreenSize(state: any, bool: any) {
            state.screenSize = bool
        }
    }
})