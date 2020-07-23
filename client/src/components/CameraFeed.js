import React, { Component } from 'react';

//ref link https://codesandbox.io/s/react-camera-api-image-capture-jw3gf?file=/src/index.js:571-592

export default class CameraFeed extends Component {

    constructor(props){
        super(props)
        this.IntervalId=false
    }
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }
    /*
        on unmount stop intervar
    */
    async componentWillUnmount() {
        clearInterval(this.IntervalId);
    }
    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    //take picture at every second
    takePhoto = () => {
        //first time post pic at click
        const { sendFile } = this.props;
            const context = this.canvas.getContext('2d');
            context.drawImage(this.videoPlayer, 0, 0, 680, 360);
            this.canvas.toBlob(sendFile);

         this.IntervalId= setInterval(() => {
            const { sendFile } = this.props;
            const context = this.canvas.getContext('2d');
            context.drawImage(this.videoPlayer, 0, 0, 680, 360);
            this.canvas.toBlob(sendFile);
            console.log("uploaded success fully")
          }, 30000);
    }
    render() {
        return (
            <div className="c-camera-feed">
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" />
                </div>
                <button onClick={this.takePhoto}>Start Taking photo!</button>
                <div className="c-camera-feed__stage">
                    <canvas width="680" height="360" ref={ref => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}
