import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/models/report.dart';
import 'package:vision_civil/src/repository/crimeReportRepository/crimeReportsRepository.dart';

part 'reports_event.dart';
part 'reports_state.dart';

class ReportBloc extends Bloc<ReportblocEvent, ReportblocState> {
  ReportBloc() : super(ReportblocState(reports: [])) {
    on<ReportblocEvent>((event, emit) async{
      if (event is CreateRepotEvent) {
        reportdb.createReport(
            event.tipoReporte,
            event.asunto,
            event.descripcion,
            event.fechaHora,
            event.lat,
            event.lon,
            event.images,
            event.video,
            event.userPhone);
      } else if(event is GetReportsEvent){
        List <Report> reports = [];
        Future<QuerySnapshot> getReports = reportdb.getReports();
        await getReports.then((QuerySnapshot querySnapshot){
          querySnapshot.docs.forEach((doc) { 
            reports.add(Report(doc.id, doc["asunto"], doc["descripcion"], doc["estado"], doc["fecha_hora"], doc["latitude"], doc["longitude"], doc["tipo_reporte"], doc["user_phone"].toString()));
          });
        });
        emit(ReportblocState(reports: reports));
      }
    });
  }
}
