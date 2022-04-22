import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/map.dart';
import 'package:vision_civil/src/ui/report_list.dart';
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
    Size size = MediaQuery.of(context).size;
    Storage storage = new Storage();
    BlocProvider.of<ReportBloc>(context)
        .add(GetPoliceProcessReport(this.idUserPolice));
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
          appBar: AppBar(
            centerTitle: true,
            title: Text("Mi reporte activo"),
          ),
          backgroundColor: Colors.transparent,
          body: BlocBuilder<ReportBloc, ReportblocState>(
            builder: (context, state) {
              if (state.report.id != " ") {
                return ListView(
                  padding: const EdgeInsets.all(35.0),
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
                            Text("Mi reporte\nactivo",
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
                              child: Text(state.report.tipoReporte,
                                  textAlign: TextAlign.end),
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
                              padding:
                                  const EdgeInsets.only(left: 50, right: 4),
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
                              padding:
                                  const EdgeInsets.only(left: 50, right: 4),
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
                                          child: FittedBox(
                                              child: Text("Videos"))));
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
                                        child:
                                            FittedBox(child: Text("Videos"))));
                              }
                            }),
                      ],
                    ),
                    SizedBox(
                      height: size.height * 0.03,
                    ),
                    BlocBuilder<ReportBloc, ReportblocState>(
                      builder: (context, state) {
                        return BlocBuilder<UserBloc, UserblocState>(
                          builder: (context, userstate) {
                            return ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                    primary: Color.fromARGB(145, 217, 17, 17)),
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
                                  endReport(context);

                                  setState(() {
                                    Navigator.of(context)
                                        .push(MaterialPageRoute(
                                      builder: (_) =>
                                          MultiBlocProvider(providers: [
                                        BlocProvider.value(
                                            value: BlocProvider.of<UserBloc>(
                                                context)),
                                        BlocProvider.value(
                                            value: BlocProvider.of<ReportBloc>(
                                                context)),
                                      ], child: ReportListPage()),
                                    ));
                                  });
                                },
                                child: Container(
                                    width: size.width * 0.2,
                                    height: 30,
                                    child: FittedBox(
                                        child: Text("Finalizar caso"))));
                          },
                        );
                      },
                    ),
                    SizedBox(height: size.height * 0.04),
                    FutureBuilder(
                        future: storage.downloadUrl(
                            state.imagesIDs, state.report.id),
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
                                          color: Color.fromARGB(
                                              255, 255, 255, 255),
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
              } else {
                return Column(
                  children: [
                    SizedBox(height: size.height * 0.09),
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
                            Text("Mi reporte\nactivo",
                                style: TextStyle(
                                    fontSize: 35.0,
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500)),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(height: size.height * 0.09),
                    Container(
                      height: size.height * 0.5,
                      width: size.width * 0.9,
                      child: Text(
                          "Usted no tiene ningun reporte en proceso. En esta pantalla aparecera el reporte en caso de que haya presionado el botón \"Atender caso\"  en un reporte.",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255),
                              fontSize: 15)),
                    )
                  ],
                );
              }
            },
          )),
    );
  }
}

noVideoAlert(BuildContext context) {
  // set up the button
  AlertDialog alert = AlertDialog(
    title: Text('No hay video disponible'),
    content: Text('el usuario no adjunto video a su reporte.'),
  );

  // show the dialog
  showDialog(
      context: context,
      builder: (context) {
        Future.delayed(Duration(seconds: 3), () {
          Navigator.of(context).pop(true);
        });
        return alert;
      });
}

endReport(BuildContext context) {
  // set up the button
  AlertDialog alert = AlertDialog(
    title: Text('Reporte Finalizado'),
    content: Text('Gracias por su ayuda.'),
  );

  // show the dialog
  showDialog(
      context: context,
      builder: (context) {
        Future.delayed(Duration(seconds: 3), () {
          Navigator.of(context).pop(true);
        });
        return alert;
      });
}
