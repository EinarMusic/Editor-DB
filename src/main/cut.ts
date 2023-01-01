import { ref } from 'vue'
import { ffmpegCutFormat, componentToShowResult } from './script'

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const cutResult: any = ref(componentToShowResult('loading'))

const ffmpegCutVideo = (videoPath: any, cutInput: any, outputName: any) => {
    const cut =  ffmpegCutFormat(cutInput)
    
    ffmpeg(videoPath)
        .videoFilters(cut.video)
        .audioFilters(cut.audio)
        .on("end", () => cutResult.value = componentToShowResult('success'))
        .on("error", () => cutResult.value = componentToShowResult('error'))
        .save(outputName)
}

export { ffmpegCutVideo, cutResult }