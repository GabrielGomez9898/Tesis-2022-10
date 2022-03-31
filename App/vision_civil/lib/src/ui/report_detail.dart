import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';

class ReportDetail extends StatefulWidget {
  const ReportDetail({Key? key, required this.idReport}) : super(key: key);

  final String idReport;
  @override
  State<ReportDetail> createState() => _ReportDetailState(idReport);
}

class _ReportDetailState extends State<ReportDetail> {
  String idReport = "";
  _ReportDetailState(String idReport) {
    this.idReport = idReport;
  }
  @override
  Widget build(BuildContext context) {
    String url = "";
    BlocProvider.of<ReportBloc>(context).add(GetReportInfoEvent(this.idReport));
    return Scaffold(
        appBar: AppBar(
          title: Text("Detalles reporte"),
        ),
        body: BlocBuilder<ReportBloc, ReportblocState>(
          builder: (context, state) {
            return Container(
              child: Column(
                children: [
                  Text("id reporte: " + state.report.id),
                  Text("asunto: " + state.report.asunto),
                  Text("descripcion: " + state.report.descripcion),
                  Text("estado: " + state.report.estado),
                  Text("fecha hora: " + state.report.fechaHora),
                  Text("latitude: " + state.report.latitude),
                  Text("longitude: " + state.report.longitude),
                  Text("tipo reporte: " + state.report.tipoReporte),
                  Text("celular usuario: " + state.report.userPhone),
                  SizedBox(height: 30),
                  Text("Multimedia"),
                  SizedBox(height: 20),
                  Text("Fotos"),
                  Text("ids: " + state.imagesIDs.length.toString()),
                  SizedBox(
                      height: 100,
                      width: 100,
                      child: Container(
                        child: FutureBuilder(
                          builder: (context, snapshot) {
                              if (snapshot.connectionState ==
                                  ConnectionState.done) {
                                return Container(
                                  width:
                                      MediaQuery.of(context).size.width / 1.2,
                                  height:
                                      MediaQuery.of(context).size.width / 1.2,
                                  child: snapshot.data as Widget,
                                );
                              }

                              if (snapshot.connectionState ==
                                  ConnectionState.waiting) {
                                return Container(
                                  width:
                                      MediaQuery.of(context).size.width / 1.2,
                                  height:
                                      MediaQuery.of(context).size.width / 1.2,
                                  child: CircularProgressIndicator(),
                                );
                              }

                              return Container();
                            },
                            future: _getImage(context, "/reports/2sR0ALtFAqNqRTlWWbUm/media/images/75d99850-a95d-11ec-b051-d553d0c61748"),
                            )
                      )),
                  SizedBox(height: 20),
                  Text("Video"),
                ],
              ),
            );
          },
        ));
  }

  Future<Widget> _getImage(BuildContext context, String imageName) async {
    Image image = Image.network("null");
    await FireStorageService.loadImage(context, imageName).then((value) {
      image = Image.network(value.toString(), fit: BoxFit.scaleDown);
    });
    return image;
  }
}

class FireStorageService extends ChangeNotifier {
  FireStorageService();
  static Future<dynamic> loadImage(BuildContext context, String Image) async {
    return await FirebaseStorage.instance.ref().child(Image).getDownloadURL();
  }
}

