import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/map.dart';
import 'package:vision_civil/src/ui/report_video.dart';
import 'package:vision_civil/storage_service.dart';

class ReportDetail extends StatefulWidget {
  const ReportDetail(
      {Key? key, required this.idReport, required this.idPoliceUser})
      : super(key: key);

  final String idPoliceUser;
  final String idReport;
  @override
  State<ReportDetail> createState() =>
      _ReportDetailState(idReport, idPoliceUser);
}

class _ReportDetailState extends State<ReportDetail> {
  String idReport = "";
  String idPoliceUser = "";
  _ReportDetailState(String idReport, String idPoliceUser) {
    this.idReport = idReport;
    this.idPoliceUser = idPoliceUser;
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
                    }),
                BlocBuilder<UserBloc, UserblocState>(
                  builder: (context, state) {
                    return BlocBuilder<ReportBloc, ReportblocState>(
                      builder: (context, reportstate) {
                        if (reportstate.report.estado == "PENDIENTE") {
                          return ElevatedButton(
                              onPressed: () {
                                if (state.onService == false) {
                                  //mostrar alert de la situacion
                                  print(
                                      "No puede atender el caso, usted esta fuera de servicio");
                                } else if (state.available == false) {
                                  //mostrar alert de la situacion
                                  print(
                                      "No puede atender el caso, usted tiene otro en proceso");
                                } else {
                                  BlocProvider.of<UserBloc>(context).add(
                                      UpdateUserState(
                                          state.userID,
                                          state.userEmail,
                                          state.userName,
                                          state.userPhone,
                                          state.userGender,
                                          state.userBirthDate,
                                          state.userRole,
                                          state.userDocument,
                                          state.idPolice,
                                          false,
                                          state.onService,
                                          state.loginAchieved));
                                  BlocProvider.of<ReportBloc>(context).add(
                                      AsignPoliceReport(
                                          this.idPoliceUser, this.idReport));
                                }
                              },
                              child: Text("Atender caso"));
                        } else if(reportstate.report.estado == "EN PROCESO"){
                          return Text("Este caso ya esta en proceso por otro policia");
                        }else{
                          return Text("Este caso ya fue atendido");
                        }
                      },
                    );
                  },
                )
              ],
            );
          },
        ));
  }
}
