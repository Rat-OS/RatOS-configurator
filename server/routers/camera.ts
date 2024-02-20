// TODO
// command: /home/pi/crowsnest/bin/camera-streamer/camera-streamer --http-port=8080 --camera-path=/dev/video0 --camera-format=RG10 --camera-height=2464 --camera-width=3280 --camera-video.height=1232 --camera-fps=30 --camera-auto_reconnect=1
// Libcamera: /home/pi/crowsnest/bin/camera-streamer/camera-streamer --http-port=8080 --camera-path=/base/soc/i2c0mux/i2c@1/imx219@10 --camera-type=libcamera --camera-snapshot.height=1080 --camera-width=1472 --camera-height=1088 --camera-fps=30 --camera-auto_reconnect=1 --camera-height=2464 --camera-width=3280 --camera-video.height=1232 --camera snapshot.height=1232 --camera-format=YUYV

// # VAOC Raspicam V2 out of the box ISP config
// [cam 1]
// mode: camera-streamer
// enable_rtsp: false
// rtsp_port: 8554
// port: 8080
// device: /dev/v4l/by-path/platform-fe801000.csi-video-index0
// resolution: 1472x1088
// max_fps: 30
// custom_flags: --camera-height=2464 --camera-width=3280 --camera-video.height=1232 --camera-snapshot.height=1232 --camera-format=RG10

// # VAOC Raspicam V2 libcamera config
// [cam 1]
// mode: camera-streamer
// enable_rtsp: false
// rtsp_port: 8554
// port: 8080
// device: /base/soc/i2c0mux/i2c@1/imx219@10
// resolution: 1472x1088
// max_fps: 30
// custom_flags: --camera-height=2464 --camera-width=3280 --camera-video.height=1232 --camera-snapshot.height=1232 --camera-format=YUYV
