import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:equatable/equatable.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:vision_civil/src/models/report.dart';
import 'package:vision_civil/src/repository/crimeReportRepository/crimeReportsRepository.dart';

part 'reports_event.dart';
part 'reports_state.dart';

class ReportBloc extends Bloc<ReportblocEvent, ReportblocState> {
  
  ReportBloc()
      : super(ReportblocState(
            reports: [],
            report: new Report("", "", "", "", "", "", "", "", ""),
            imagesIDs: [],
            videoId: "")) {
    on<ReportblocEvent>((event, emit) async {
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
      } else if (event is GetReportsEvent) {
        List<Report> reports = [];
        Future<QuerySnapshot> getReports = reportdb.getReports();
        await getReports.then((QuerySnapshot querySnapshot) {
          querySnapshot.docs.forEach((doc) {
            reports.add(Report(
                doc.id,
                doc["asunto"],
                doc["descripcion"],
                doc["estado"],
                doc["fecha_hora"],
                doc["latitude"],
                doc["longitude"],
                doc["tipo_reporte"],
                doc["user_phone"].toString()));
          });
        });
        emit(ReportblocState(
            reports: reports,
            report: new Report(" ", " ", " ", " ", " ", " ", " ", " ", " "),
            imagesIDs: [],
            videoId: ""));
      } else if (event is GetReportInfoEvent) {
         List<Report> reports = [];
        Report reportSave = new Report("", "", "", "", "", "", "", "", "");
        Future<QuerySnapshot> report = reportdb.getReports();
        await report.then((QuerySnapshot querySnapshot) {
          querySnapshot.docs.forEach((doc) {
            reports.add(Report(
                doc.id,
                doc["asunto"],
                doc["descripcion"],
                doc["estado"],
                doc["fecha_hora"],
                doc["latitude"],
                doc["longitude"],
                doc["tipo_reporte"],
                doc["user_phone"].toString()));
            if (doc.id == event.idReport) {
              reportSave.setId(doc.id);
              reportSave.setAsunto(doc["asunto"]);
              reportSave.setDescripcion(doc["descripcion"]);
              reportSave.setEstado(doc["estado"]);
              reportSave.setFechaHora(doc["fecha_hora"]);
              reportSave.setLatitude(doc["latitude"]);
              reportSave.setLongitude(doc["longitude"]);
              reportSave.setTipoReporte(doc["tipo_reporte"]);
              reportSave.setUserphone(doc["user_phone"].toString());
            }
          });
        });


        emit(ReportblocState(
            reports: reports,
            report: reportSave,
            imagesIDs: [],
            videoId: ""));

        //String imgurl =  await getImageUrl("/reports/"+event.idReport+"/media/images/75d99850-a95d-11ec-b051-d553d0c61748");
        //String imgurl =  await getImageUrl("/reports/2sR0ALtFAqNqRTlWWbUm/media/images/75d99850-a95d-11ec-b051-d553d0c61748");
        //guardar en estado
      }
    });
  }
}

Future<String> getImageUrl(String id) async {
  final ref = FirebaseStorage.instance.ref().child(id);
  // no need of the file extension, the name will do fine.
  var url = await ref.getDownloadURL();
  print("image url dentro de funcion: " + url);
  return url;
}
