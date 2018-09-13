window.addEventListener("ready", (msg) => {
    //if (msg.ready) {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab', 'audio'], sender.tab, streamId => {
            window.postMessage("stream", streamId);
        });
    //}
});

window.postMessage("ready", { ready: true });
window.addEventListener("stream", msg => {
    if (msg.data) {
        gUM(msg.data);
    }
});

async function gUM(streamId) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: streamId
                }
            },
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: streamId
                }
            },
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
