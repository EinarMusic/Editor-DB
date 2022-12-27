import { ref } from 'vue'
import loadIcon from '../components/icon/loadIcon.vue';
import successIcon from '../components/icon/successIcon.vue';
import errorIcon from '../components/icon/errorIcon.vue';

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const inputTimeToSeconds = (time: any) => {
  if (time.split(':').length == 3)
      return (Number(time.split(':')[0] * 3600)) + Number(time.split(':')[1] * 60) + Number(time.split(':')[2]);
  return (Number(time.split(':')[0] * 60)) + Number(time.split(':')[1])  
}

const iterableSeconds = (userCut: any) => {
    const seconds: number[][] = []
    
    userCut.forEach((v: any) => {
        seconds.push( 
            v.split('/').map((time: any) => {
                // return (Number(time.split(':')[0] * 60)) + Number(time.split(':')[1])  
                return inputTimeToSeconds(time)
            })
        )
    })
    return seconds
}

const generateCutFormat = (cut: any) => {
    let result = ''
    
    cut.forEach((time: any, index: any) => {
        result += `between(t, ${time[0]}, ${time[1]})`

        if (cut.length - 1 != index) result += '+'
    })
    return result
}

const editResult: any = ref(loadIcon)
const generateFormat = (videoPath: any, cutInput: any, outputName: any) => {

  const ffmpegCutFormat =  generateCutFormat(iterableSeconds(cutInput)) 

  const cutVideo = `select='${ffmpegCutFormat}', setpts=N/FRAME_RATE/TB`;
  const cutAudio = `aselect='${ffmpegCutFormat}', asetpts=N/SR/TB`;

  ffmpeg(videoPath)
    .videoFilters(cutVideo)
    .audioFilters(cutAudio)
    .on("end", (err: any) => {
      if (!err) {
        editResult.value = successIcon;
        console.log(`filter done`);
      }
    })
    .on("error", (err: any) => {
      editResult.value = errorIcon;
      console.log("error:", err, "--------------------")
    })
    .save(outputName)

}

export { generateFormat, editResult }
