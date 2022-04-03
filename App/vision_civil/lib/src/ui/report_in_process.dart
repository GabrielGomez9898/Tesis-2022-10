import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/map.dart';
import 'package:vision_civil/src/ui/report_video.dart';
import 'package:vision_civil/storage_service.dart';

class ProcessReport extends StatefulWidget {
  const ProcessReport({Key? key, required this.idUserPolice}) : super(key: key);

  final String idUserPolice;
  @override
  State<ProcessReport> createState() => _ProcessReportState(idUserPolice);
}

class _ProcessReportState extends State<ProcessReport> {
  String idUserPolice = "";

  _ProcessReportState(String idUserPolice) {
    this.idUserPolice = idUserPolice;
  }
  @override
  Widget build(BuildContext context) {
    Storage storage = new Storage();
    BlocProvider.of<ReportBloc>(context)
        .add(GetPoliceProcessReport(this.idUserPolice));
    return Scaffold(
        appBar: AppBar(
          title: Text("Mi reporte activo"),
        ),
        body: BlocBuilder<ReportBloc, ReportblocState>(
          builder: (context, state) {
            if (state.report.id != " ") {
              return ListView(
                children: [
                  Text("Informacion del reporte"),
                  FutureBuilder(
                      future:
                          storage.downloadUrl(state.imagesIDs, state.report.id),
                      builder: (BuildContext context,
                          AsyncSnapshot<List<String>> snapshot) {
                        if (state.imagesIDs.length > 0) {
                          if (snapshot.connectionState ==
                                  ConnectionState.done &&
                              snapshot.hasData) {
                            return Container(
                              height: 200,
                              width: 200,
                              child: ListView.builder(
                                  itemCount: snapshot.data!.length,
                                  itemBuilder:
                                      (BuildContext context, int index) {
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
                      future:
                          storage.listVideoPath(state.report.id, state.videoId),
                      builder: (BuildContext context,
                          AsyncSnapshot<String> snapshot) {
                        if (state.videoId != " ") {
                          if (snapshot.connectionState ==
                                  ConnectionState.done &&
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
                  BlocBuilder<ReportBloc, ReportblocState>(
                    builder: (context, state) {
                      return BlocBuilder<UserBloc, UserblocState>(
                        builder: (context, userstate) {
                          return ElevatedButton(
                              onPressed: () {
                                BlocProvider.of<UserBloc>(context).add(
                                    UpdateUserState(
                                        userstate.userID,
                                        userstate.userEmail,
                                        userstate.userName,
                                        userstate.userPhone,
                                        userstate.userGender,
                                        userstate.userBirthDate,
                                        userstate.userRole,
                                        userstate.userDocument,
                                        userstate.idPolice,
                                        true,
                                        userstate.onService,
                                        userstate.loginAchieved));
                                BlocProvider.of<ReportBloc>(context).add(
                                    FinishReportEvent(
                                        this.idUserPolice, state.report.id));
                              },
                              child: Text("Finalizar caso"));
                        },
                      );
                    },
                  )
                ],
              );
            } else {
              return Text("Usted no tiene ningun reporte en proceso");
            }
          },
        ));
  }
}
