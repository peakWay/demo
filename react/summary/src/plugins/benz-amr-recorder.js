
const BenzAMRRecorder = require('benz-amr-recorder');

let app = document.querySelector('#app');
let audio = document.createElement('audio');
let url = "https://nim-nosdn.netease.im/MTAzMDE2Ng==/bmltYV8xMzExNTU0MTU2MV8xNjM5MDE2NTMwMjU2X2U2NDY4YzYyLTQxZTMtNDY0Ni05NDdiLWQ2MDVjMWZiODQ2MA==?createTime=1639539442021"
audio.src = url
audio.controls = true
app.append(audio)

let button = document.querySelector('#button');
button.addEventListener('click', () => {
    console.log(1212)
    play();
})

var amr = new BenzAMRRecorder();
amr.initWithUrl(url).then(function() {

})

amr.onPlay(function () {
    console.log('Event: play');
    button.textContent = '播放';
});
amr.onStop(function () {
    console.log('Event: stop');
});
amr.onPause(function () {
    console.log('Event: pause');
});
amr.onResume(function () {
    console.log('Event: resume');
});
amr.onEnded(function () {
    console.log('Event: ended');
});


function play() {
    console.log(amr)
    amr.play();
}


