import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ReportDB {
  final db = FirebaseFirestore.instance;
  final firbaseInstance = FirebaseAuth.instance;

  Stream<QuerySnapshot> initStream() {
    return db.collection('users').snapshots();
  }

  void createReport(String tipoReporte, String asunto, String descripcion,
      String fechaHora, String lat, String lon) async {
    await db.collection('reports').add({
      'asunto': asunto,
      'descripcion': descripcion,
      'estado': 'PENDIENTE',
      'fecha_hora': fechaHora,
      'latitude': "lat269",
      'longitude': "lon753",
      'tipo_reporte': tipoReporte
    });
  }
}

ReportDB reportdb = ReportDB();
