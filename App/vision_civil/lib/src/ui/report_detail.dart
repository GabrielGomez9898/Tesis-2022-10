import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/ui/map.dart';
import 'package:vision_civil/storage_service.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;

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
                      if (snapshot.connectionState == ConnectionState.waiting ||
                          !snapshot.hasData) {
                        return Container(
                            width: 100,
                            height: 100,
                            child: CircularProgressIndicator());
                      }
                      return Text("data");
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
                ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => Map(latitude: state.report.latitude,longitude: state.report.longitude)),
                      );
                    },
                    child: Text("Ubicacion del caso"))
              ],
            );
          },
        ));
  }
}
