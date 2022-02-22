part of 'reports_bloc.dart';

abstract class ReportblocEvent extends Equatable {
  const ReportblocEvent();

  @override
  List<Object> get props => [];
}

/*No borrar comentarios de ignore*/
// ignore: must_be_immutable
class CreateRepotEvent extends ReportblocEvent {
  String tipoReporte = "",
      asunto = "",
      descripcion = "",
      fechaHora = "",
      lat = "",
      lon = "";
  List<File> images = [];
  File video = File("nullpathvideo");
  double userPhone = 0;

  CreateRepotEvent(
      String _tipoReporte,
      String _asunto,
      String _descripcion,
      String _fechaHora,
      String _lat,
      String _lon,
      List<File> _images,
      File video,
      double _userPhone) {
    this.tipoReporte = _tipoReporte;
    this.asunto = _asunto;
    this.descripcion = _descripcion;
    this.fechaHora = _fechaHora;
    this.lat = _lat;
    this.lon = _lon;
    this.images = _images;
    this.video = video;
    this.userPhone = _userPhone;
  }
}
