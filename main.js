const fs = require('fs');
const youtubedl = require('youtube-dl');

//Download the youtube video
const video = youtubedl("https://www.youtube.com/watch?v=yjS0Y6CX4m4",
    ["--format=18"], { cwd: __dirname });

//will be called when the download starts
let title = "";
video.on("info", (info) => {
    console.log("Download started");
    console.log(`Title: ${info.title}`);
    console.log(`Size: ${info.size}`);
    title = info.title;
});

/*video.on('complete', (info)=>{
    fs.rename("video.mp4", info.title + ".mp4", ()=>{
        console.log("Renamed as " + info.title + ".mp4");
    })
});*/

video.on('end', ()=>{
    fs.rename("video.mp4", title + ".mp4", ()=>{
        console.log("Renamed as " + title + ".mp4");
    })
});

video.pipe(fs.createWriteStream("video.mp4"));

// Format Code  Extension  Resolution                   Note 
// 139          m4a        audio only DASH audio   50k  m4a_dash container, mp4a.40.5@ 48k (22050Hz)
// 140          m4a        audio only DASH audio  130k  m4a_dash container, mp4a.40.2@128k (44100Hz)
// 251          webm       audio only DASH audio  144k  webm_dash container, opus @160k (48000Hz)
// 278          webm       256x144    DASH video   95k  webm_dash container, vp9, 24fps, video only
// 160          mp4        256x144    DASH video  108k  mp4_dash container, avc1.4d400b, 24fps, video only
// 134          mp4        640x360    DASH video  127k  mp4_dash container, avc1.4d401e, 24fps, video only
// 242          webm       426x240    DASH video  220k  webm_dash container, vp9, 24fps, video only
// 133          mp4        426x240    DASH video  242k  mp4_dash container, avc1.4d400c, 24fps, video only
// 243          webm       640x360    DASH video  405k  webm_dash container, vp9, 24fps, video only
// 244          webm       854x480    DASH video  752k  webm_dash container, vp9, 24fps, video only
// 135          mp4        854x480    DASH video 1155k  mp4_dash container, avc1.4d4014, 24fps, video only
// 137          mp4        1920x1080  DASH video 1293k  mp4_dash container, avc1.640028, 24fps, video only
// 247          webm       1280x720   DASH video 1505k  webm_dash container, vp9, 24fps, video only
// 136          mp4        1280x720   DASH video 2310k  mp4_dash container, avc1.4d4016, 24fps, video only
// 248          webm       1920x1080  DASH video 2646k  webm_dash container, vp9, 24fps, video only
// 43           webm       640x360    360p , vp8.0      vorbis@128k, 10.83MiB
// 18           mp4        640x360    360p  152k        avc1.42001E, mp4a.40.2@ 96k (44100Hz), 9.59MiB
// 22           mp4        1280x720   720p  301k        avc1.64001F, mp4a.40.2@192k (44100Hz) (best)