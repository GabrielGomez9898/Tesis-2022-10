import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/repository/crimeReportRepository/crimeReportsRepository.dart';

part 'reports_event.dart';
part 'reports_state.dart';

class ReportBloc extends Bloc<ReportblocEvent, ReportblocState> {
  ReportBloc() : super(ReportblocState()) {
    on<ReportblocEvent>((event, emit) {
      if (event is CreateRepotEvent) {
        reportdb.createReport(
            event.tipoReporte,
            event.asunto,
            event.descripcion,
            event.fechaHora,
            event.lat,
            event.lon,
            event.images,
            event.video);
      }
    });
  }
}
