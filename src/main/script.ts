import loadIcon from '../components/icon/loadIcon.vue';
import successIcon from '../components/icon/successIcon.vue';
import errorIcon from '../components/icon/errorIcon.vue';

const componentToShowResult = (result: any) => {
  if ('loading' === result) return loadIcon;
  else if ('success' === result) return successIcon;
  else if ('error' === result) return errorIcon;
}

const ffmpegCutFormat = (cutInput: any) => {

  const inputTimeToSeconds = (time: any) => {
    if (time.split(':').length == 3)
      return (Number(time.split(':')[0] * 3600)) + Number(time.split(':')[1] * 60) + Number(time.split(':')[2]);
    return (Number(time.split(':')[0] * 60)) + Number(time.split(':')[1])  
  }

  const iterableSeconds = () => {
    const seconds: number[][] = []
    
    cutInput.forEach((v: any) => {
      seconds.push( 
        v.split('/').map((time: any) => {
          return inputTimeToSeconds(time)
        })
      )
    })
    return seconds
  }

  const generateCutFormat = () => {
    let timeFormat = ''
    const cut: any = iterableSeconds()

    cut.forEach((time: any, index: any) => {
      timeFormat += `between(t, ${time[0]}, ${time[1]})`

      if (cut.length - 1 != index) timeFormat += '+'
    })

    return {
      video: `select='${timeFormat}', setpts=N/FRAME_RATE/TB`, 
      audio: `aselect='${timeFormat}', asetpts=N/SR/TB`
    }
  }

  return generateCutFormat();

}

export { ffmpegCutFormat, componentToShowResult }
