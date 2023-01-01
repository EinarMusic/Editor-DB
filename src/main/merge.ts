// merge only start and end for main video | tmp dir: /var/folders/v1/
import { ref } from 'vue'
import { ffmpegCutFormat, componentToShowResult } from './script'

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const tmp = require('tmp')

ffmpeg.setFfmpegPath(ffmpegPath);

const mergeResult: any = ref(componentToShowResult('loading'))

const ffmpegMergeVideo = (videoPath: any, cutInput: any, merge: any, outputName: any) => {
    const tmpDir = tmp.dirSync();
    const mainVideoPath = `${tmpDir.name}/tmp_video.mp4`
    
    const ffmpegMergeVideosWithMain = () => {
        ffmpeg()
        .input(merge.start)
        .input(mainVideoPath)
        .input(merge.end)
        .on('end', (err: any) => {
            if (!err) {
                mergeResult.value = componentToShowResult('success');
                console.log('merge ok!')
                tmpDir.removeCallback() 
            }
        })
        .on('error', (err: any) => { 
            mergeResult.value = componentToShowResult('error');
            console.log('merge error!', err) 
            tmpDir.removeCallback() 
        })
        .mergeToFile(outputName)
    }

    const ffmpegCutVideo = () => {
        const cut =  ffmpegCutFormat(cutInput)
    
        ffmpeg(videoPath)
            .videoFilters(cut.video)
            .audioFilters(cut.audio)
            .on("end", () => {
                ffmpegMergeVideosWithMain()
                console.log('cut: ok!')
            })
            .on("error", (err: any) => console.log('error cut:', err))
            .save(mainVideoPath) 
    }
    ffmpegCutVideo()
}

export { ffmpegMergeVideo, mergeResult };