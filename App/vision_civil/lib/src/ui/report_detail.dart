import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:video_player/video_player.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/ui/map.dart';
import 'package:vision_civil/src/ui/report_video.dart';
import 'package:vision_civil/storage_service.dart';

class ReportDetail extends StatefulWidget {
  const ReportDetail({Key? key, required this.idReport}) : super(key: key);

  final String idReport;
  @override
  State<ReportDetail> createState() => _ReportDetailState(idReport);
}

class _ReportDetailState extends State<ReportDetail> {
  VideoPlayerController? _controller;
  String idReport = "";
  _ReportDetailState(String idReport) {
    this.idReport = idReport;
  }

  @override
  void initState() {
    super.initState();

    _controller = VideoPlayerController.network(
        'https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4')
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    Storage storage = new Storage();
    BlocProvider.of<ReportBloc>(context).add(GetReportInfoEvent(this.idReport));
    return Scaffold(
        appBar: AppBar(
          title: Text("Detalles reporte"),
        ),
        body: BlocBuilder<ReportBloc, ReportblocState>(
          builder: (context, state) {
            return ListView(
              children: [
                Text("Informacion del reporte"),
                FutureBuilder(
                    future: storage.downloadUrl(state.imagesIDs, idReport),
                    builder: (BuildContext context,
                        AsyncSnapshot<List<String>> snapshot) {
                      if (state.imagesIDs.length > 0) {
                        if (snapshot.connectionState == ConnectionState.done &&
                            snapshot.hasData) {
                          return Container(
                            height: 200,
                            width: 200,
                            child: ListView.builder(
                                itemCount: snapshot.data!.length,
                                itemBuilder: (BuildContext context, int index) {
                                  return Image.network(snapshot.data![index]);
                                }),
                          );
                        }
                        if (snapshot.connectionState ==
                                ConnectionState.waiting ||
                            !snapshot.hasData) {
                          return Container(
                              width: 100,
                              height: 100,
                              child: CircularProgressIndicator());
                        }
                      } else {
                        return Text("No tiene imagenes");
                      }
                      return Text("No tiene imagenes");
                    }),
                Text("ID reporte: " + state.report.id),
                Text("Tipo reporte: " + state.report.tipoReporte),
                Text("Asunto: " + state.report.asunto),
                Text("Descripcion: " + state.report.descripcion),
                Text("Fecha hora: " + state.report.fechaHora),
                Text("Estado: " + state.report.estado),
                Text("latitude: " + state.report.latitude),
                Text("longitude: " + state.report.longitude),
                Text("celular usuario: " + state.report.userPhone),
                Text("video id: " + state.videoId),
                ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => Map(
                                latitude: state.report.latitude,
                                longitude: state.report.longitude)),
                      );
                    },
                    child: Text("Ubicacion del caso")),
                FutureBuilder(
                    future: storage.listVideoPath(idReport, state.videoId),
                    builder:
                        (BuildContext context, AsyncSnapshot<String> snapshot) {
                      if (state.videoId != " ") {
                        if (snapshot.connectionState == ConnectionState.done &&
                            snapshot.hasData) {
                          return ElevatedButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => ReportVideo(
                                          videoPath: snapshot.data!)),
                                );
                              },
                              child: Text("Ver video"));
                        }
                        if (snapshot.connectionState ==
                                ConnectionState.waiting ||
                            !snapshot.hasData) {
                          return Container(
                              width: 100,
                              height: 100,
                              child: CircularProgressIndicator());
                        }
                        return Text("data");
                      } else {
                        return Text("No tiene video");
                      }
                    })
              ],
            );
          },
        ));
  }

  @override
  void dispose() {
    super.dispose();
    _controller?.dispose();
  }

  VideoPlayerController upDateVideoUrl(String videoPath) {
    VideoPlayerController controller = VideoPlayerController.network(videoPath)
      ..initialize().then((_) {});

    return controller;
  }
}
