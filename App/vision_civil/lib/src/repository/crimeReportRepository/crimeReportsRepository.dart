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
      String fechaHora, String lat, String lon, List<File> images) async {
    print("entro a create report");
    print(images);
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
      print("ya va a empezar a guardar las fotos en " + folderPath);
      for (var i = 0; i < images.length; i++) {
        print("entro");
        var imageID = Uuid().v1();
        var imagePath = "/reports/$idReport/images/$imageID";
        final Reference storageReference =
            FirebaseStorage.instance.ref().child(imagePath);
        storageReference.putFile(images[i]);
      }
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
