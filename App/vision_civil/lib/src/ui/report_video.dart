import 'package:video_player/video_player.dart';
import 'package:flutter/material.dart';


class ReportVideo extends StatefulWidget {
  ReportVideo({Key? key, required this.videoPath})
  : super(key: key);
  final String videoPath;
  @override
  _ReportVideoState createState() => _ReportVideoState(videoPath);
}

class _ReportVideoState extends State<ReportVideo> {
  String videoPath = "";
  _ReportVideoState(String videoPath){
    this.videoPath = videoPath;
  }
  VideoPlayerController ?_controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.network(
        this.videoPath)
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Video Demo',
      home: Scaffold(
        body: Center(
          child: _controller!.value.isInitialized
              ? AspectRatio(
                  aspectRatio: _controller!.value.aspectRatio,
                  child: VideoPlayer(_controller!),
                )
              : Container(),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              _controller!.value.isPlaying
                  ? _controller!.pause()
                  : _controller!.play();
            });
          },
          child: Icon(
            _controller!.value.isPlaying ? Icons.pause : Icons.play_arrow,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller!.dispose();
  }
}