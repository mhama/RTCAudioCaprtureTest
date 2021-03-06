/*window.addEventListener("message", (msg) => {
    if (msg.data == "ready") {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab', 'audio'], sender.tab, streamId => {
            window.postMessage(streamId, "*");
        });
    }
});

window.postMessage("ready", "*");
window.addEventListener("message", msg => {
    if (msg.data != "ready") {
        gUM(msg.data);
    }
});
*/

async function gUM() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                mandatory: {
                    chromeMediaSource: 'screen',
                    //chromeMediaSourceId: streamId
                }
            },
            /*video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    //chromeMediaSourceId: streamId
                }
            },*/
        });
        // オーディオだけほしい場合は、videoトラックを削除
        // stream.getVideoTracks().forEach(track => {
        //     stream.removeTrack(track);
        // });
        vid.srcObject = stream;
    } catch (err) {
        console.log(err);
    }
}

  document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");  
    gUM();
  });

