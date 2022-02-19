import 'dart:async';
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:uuid/uuid.dart';

class ReportDB {
  final db = FirebaseFirestore.instance;
  final firbaseInstance = FirebaseAuth.instance;

  Stream<QuerySnapshot> initStream() {
    return db.collection('users').snapshots();
  }

  void createReport(String tipoReporte, String asunto, String descripcion,
      String fechaHora, String lat, String lon, File image) async {
    if (image.path != "nullpath") {
      var imageID = Uuid().v1();
      var imagePath = "/reports/images/$imageID.jpg";

      final Reference storageReference =
          FirebaseStorage.instance.ref().child(imagePath);
      storageReference.putFile(image);
      //final StreamSubscription<StorageEvent> streamSubscription = uploadTask.asStream():
      await db.collection('reports').add({
        'asunto': asunto,
        'descripcion': descripcion,
        'estado': 'PENDIENTE',
        'fecha_hora': fechaHora,
        'latitude': lat,
        'longitude': lon,
        'tipo_reporte': tipoReporte,
        'image_path': imagePath
      });
    } else {
      await db.collection('reports').add({
        'asunto': asunto,
        'descripcion': descripcion,
        'estado': 'PENDIENTE',
        'fecha_hora': fechaHora,
        'latitude': lat,
        'longitude': lon,
        'tipo_reporte': tipoReporte
      });
    }
  }
}

ReportDB reportdb = ReportDB();
