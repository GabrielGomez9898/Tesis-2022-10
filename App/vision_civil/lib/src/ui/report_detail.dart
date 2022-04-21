import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';
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

  bool timeToReturn = false;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    Storage storage = new Storage();
    BlocProvider.of<ReportBloc>(context).add(GetReportInfoEvent(this.idReport));
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
          appBar: AppBar(
            centerTitle: true,
            title: Text("Detalles reporte"),
          ),
          backgroundColor: Colors.transparent,
          body: BlocBuilder<ReportBloc, ReportblocState>(
            builder: (context, state) {
              return ListView(
                padding: const EdgeInsets.all(30.0),
                children: [
                  SizedBox(height: size.height * 0.03),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Column(
                        children: [
                          Container(
                            child: Image.asset('assets/images/logo.jpg',
                                width: 100.0, height: 100.0, scale: 1.0),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Text("Información \ndel reporte",
                              style: TextStyle(
                                  fontSize: 35.0,
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500)),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: size.height * 0.05),
                  Container(
                    padding: const EdgeInsets.only(bottom: 15.0, top: 15.0),
                    decoration: new BoxDecoration(
                      color: Color.fromARGB(255, 255, 255, 255),
                      border: Border.all(
                          width: 6, color: Color.fromARGB(255, 0, 0, 0)),
                      borderRadius: BorderRadius.circular(40),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.only(
                          left: 20, bottom: 15.0, top: 15.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Tipo reporte:",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50),
                            child: Text(
                                state.report.tipoReporte.replaceAll("_", " "),
                                textAlign: TextAlign.end),
                          ),
                          SizedBox(height: size.height * 0.01),
                          Text("Estado del reporte: ",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50),
                            child: Text(state.report.estado),
                          ),
                          SizedBox(height: size.height * 0.01),
                          Text("Asunto:",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50, right: 4),
                            child: Text(state.report.asunto),
                          ),
                          SizedBox(height: size.height * 0.01),
                          Text("Descripcion: ",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50, right: 4),
                            child: Text(state.report.descripcion),
                          ),
                          SizedBox(height: size.height * 0.01),
                          Text("Fecha hora: ",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50),
                            child: Text(state.report.fechaHora),
                          ),
                          SizedBox(height: size.height * 0.01),
                          Text("Estado:",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50),
                            child: Text(state.report.estado),
                          ),
                          SizedBox(height: size.height * 0.01),
                          Text("Celular usuario: ",
                              style: TextStyle(
                                fontSize: 18.0,
                                color: Color.fromARGB(255, 0, 0, 0),
                                fontWeight: FontWeight.w500,
                                decoration: TextDecoration.underline,
                              )),
                          SizedBox(height: 4),
                          Padding(
                            padding: const EdgeInsets.only(left: 50),
                            child: Text(state.report.userPhone),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: size.height * 0.02,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
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
                          child: Container(
                              width: size.width * 0.2,
                              height: 30,
                              child: FittedBox(child: Text("Ubicación")))),
                      SizedBox(width: size.width * 0.09),
                      FutureBuilder(
                          future: storage.listVideoPath(
                              state.report.id, state.videoId),
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
                                    child: Container(
                                        width: size.width * 0.2,
                                        height: 30,
                                        child:
                                            FittedBox(child: Text("Videos"))));
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
                              return ElevatedButton(
                                  onPressed: () {
                                    noVideoAlert(context);
                                  },
                                  child: Container(
                                      width: size.width * 0.2,
                                      height: 30,
                                      child: FittedBox(child: Text("Videos"))));
                            }
                          }),
                    ],
                  ),
                  SizedBox(
                    height: size.height * 0.03,
                  ),
                  BlocBuilder<UserBloc, UserblocState>(
                    builder: (context, state) {
                      return BlocBuilder<ReportBloc, ReportblocState>(
                        builder: (context, reportstate) {
                          if (reportstate.report.estado == "PENDIENTE") {
                            return ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                    primary: Color.fromARGB(145, 8, 184, 55)),
                                onPressed: () {
                                  if (state.onService == false) {
                                    outOfService(context);
                                  } else if (state.available == false) {
                                    reportAlreadyInProcess(context);
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
                          } else if (reportstate.report.estado ==
                              "EN PROCESO") {
                            return Text(
                                "Este caso ya esta siendo atendido por otro policia",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                    fontSize: 15));
                          } else {
                            return Text("Este caso ya fue atendido",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                    fontSize: 15));
                          }
                        },
                      );
                    },
                  ),
                  SizedBox(
                    height: size.height * 0.03,
                  ),
                  BlocBuilder<ReportBloc, ReportblocState>(
                    builder: (context, state) {
                      return ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              primary: Color.fromARGB(145, 217, 17, 17)),
                          onPressed: () {
                            BlocProvider.of<ReportBloc>(context)
                                .add(DeleteReportEvent(state.report.id));
                            BlocProvider.of<ReportBloc>(context)
                                .add(GetReportsEvent());
                            reportDeleted(context);
                          },
                          child: Text("Eliminar reporte"));
                    },
                  ),
                  SizedBox(height: size.height * 0.04),
                  FutureBuilder(
                      future:
                          storage.downloadUrl(state.imagesIDs, state.report.id),
                      builder: (BuildContext context,
                          AsyncSnapshot<List<String>> snapshot) {
                        if (state.imagesIDs.length > 0) {
                          if (snapshot.connectionState ==
                                  ConnectionState.done &&
                              snapshot.hasData) {
                            return Column(
                              children: [
                                Text(
                                    "Imagenes adjuntas con el reporte, deslice para navegar entre ellas",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color:
                                            Color.fromARGB(255, 255, 255, 255),
                                        fontSize: 15)),
                                SizedBox(height: size.height * 0.02),
                                Container(
                                  height: 400,
                                  child: ListView.builder(
                                      itemCount: snapshot.data!.length,
                                      itemBuilder:
                                          (BuildContext context, int index) {
                                        return Image.network(
                                            snapshot.data![index]);
                                      }),
                                ),
                              ],
                            );
                          }
                          if (snapshot.connectionState ==
                                  ConnectionState.waiting ||
                              !snapshot.hasData) {
                            return Container(
                                width: 50,
                                height: 300,
                                child: CircularProgressIndicator());
                          }
                        } else {
                          return Text("El reporte no cueta con imagenes",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Color.fromARGB(255, 255, 255, 255),
                                  fontSize: 15));
                        }
                        return Text("El reporte no cueta con imagenes",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Color.fromARGB(255, 255, 255, 255),
                                fontSize: 15));
                      }),
                ],
              );
            },
          )),
    );
  }
}

alertAttendReport(BuildContext context) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).pop();
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("Caso en nombre suyo"),
    content: Text("Por favor dirijase al lugar del caso"),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}

reportAlreadyInProcess(BuildContext context) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).pop();
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("No se puede atender"),
    content: Text(
        "Usted ya tiene un caso en proceso, terminelo antes de atender otro caso"),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}

outOfService(BuildContext context) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).pop();
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("No se puede atender"),
    content: Text(
        "Usted se encuentra fuera de servicio, inicie su jornada para atender un caso"),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}

reportDeleted(BuildContext context) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).push(MaterialPageRoute(
        builder: (_) => MultiBlocProvider(providers: [
          BlocProvider.value(value: BlocProvider.of<UserBloc>(context)),
          BlocProvider.value(value: BlocProvider.of<ReportBloc>(context)),
        ], child: HomePage()),
      ));
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("Reporte eliminado"),
    content: Text("Este caso fue eliminado exitosamente"),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}

noVideoAlert(BuildContext context) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).pop();
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("El reporte no cuenta con videos adjuntos"),
    content: Text("presione OK para volver"),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}
