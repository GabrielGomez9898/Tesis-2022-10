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
                  Text("estado: "+state.report.estado),
                  Text("fecha hora: "+state.report.fechaHora),
                  Text("latitude: "+state.report.latitude),
                  Text("longitude: "+state.report.longitude),
                  Text("tipo reporte: "+state.report.tipoReporte),
                  Text("celular usuario: "+state.report.userPhone),
                  SizedBox(height: 30),
                  Text("Multimedia"),
                  SizedBox(height: 20),
                  Text("Fotos"),
                  SizedBox(height: 20),
                  Text("Video"),
                ],
              ),
            );
          },
        ));
  }
}
