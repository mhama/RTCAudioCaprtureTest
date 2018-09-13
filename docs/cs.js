window.addEventListener("ready", (msg) => {
    if (msg.ready) {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab', 'audio'], sender.tab, streamId => {
            chrome.tabs.sendMessage(sender.tab.id, { streamId });
        });
    }
});

window.sendMessage("ready", { ready: true });
window.addEventListener("msg", msg => {
    if (msg.streamId) {
        gUM(msg.streamId);
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
