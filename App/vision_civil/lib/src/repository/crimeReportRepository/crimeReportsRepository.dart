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

  void createReport(
      String tipoReporte,
      String asunto,
      String descripcion,
      String fechaHora,
      String lat,
      String lon,
      List<File> images,
      File video) async {
    if (images[0].path != "nullpath1") {
      var documentReference = await db.collection('reports').add({
        'asunto': asunto,
        'descripcion': descripcion,
        'estado': 'PENDIENTE',
        'fecha_hora': fechaHora,
        'latitude': lat,
        'longitude': lon,
        'tipo_reporte': tipoReporte,
      });

      String idReport = documentReference.id;

      var folderPath = "/reports/$idReport/images";

      await documentReference.update({'folder_path': folderPath});
      // se guardan las fotos
      for (var i = 0; i < images.length; i++) {
        var imageID = Uuid().v1();
        var imagePath = "/reports/$idReport/images/$imageID";
        final Reference storageReference =
            FirebaseStorage.instance.ref().child(imagePath);
        storageReference.putFile(images[i]);
      }

      // se guarda el video
      var videoID = Uuid().v1();
      var videoPath = "/reports/$idReport/video/$videoID";
      final Reference storageReference =
          FirebaseStorage.instance.ref().child(videoPath);
      storageReference.putFile(video);
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
