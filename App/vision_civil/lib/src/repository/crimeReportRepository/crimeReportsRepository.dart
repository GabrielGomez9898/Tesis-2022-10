import 'dart:async';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';

import 'package:uuid/uuid.dart';
import 'package:vision_civil/src/models/report.dart';

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
      File video,
      double userPhone) async {
    print("entro a guardar reporte");
    if (images.length > 0) {
      var documentReference = await db.collection('reports').add({
        'asunto': asunto,
        'descripcion': descripcion,
        'estado': 'PENDIENTE',
        'fecha_hora': fechaHora,
        'latitude': lat,
        'longitude': lon,
        'tipo_reporte': tipoReporte,
        'user_phone': userPhone
      });

      String idReport = documentReference.id;

      var folderPath = "/reports/$idReport/media";

      await documentReference.update({'folder_path': folderPath});
      // se guardan las fotos junto con sus ids para el facil acceso en web
      String imagesids = "";
      for (var i = 0; i < images.length; i++) {
        var imageID = Uuid().v1();
        imagesids += imageID + ",";
        var imagePath = "/reports/$idReport/media/images/$imageID";
        final Reference storageReference =
            FirebaseStorage.instance.ref().child(imagePath);
        storageReference.putFile(images[i]);
      }
      await documentReference.update({'images_ids': imagesids});

      // se guarda el video
      String videoIDSave = "";
      var videoID = Uuid().v1();
      videoIDSave = videoID;
      var videoPath = "/reports/$idReport/media/video/$videoID";
      final Reference storageReference =
          FirebaseStorage.instance.ref().child(videoPath);
      storageReference.putFile(video);

      await documentReference.update({'video_id': videoIDSave});
    } else {
      await db.collection('reports').add({
        'asunto': asunto,
        'descripcion': descripcion,
        'estado': 'PENDIENTE',
        'fecha_hora': fechaHora,
        'latitude': lat,
        'longitude': lon,
        'tipo_reporte': tipoReporte,
        'user_phone': userPhone
      });
    }
  }

  Future<QuerySnapshot> getReports() {
    Future<QuerySnapshot> docs =
        FirebaseFirestore.instance.collection('reports').get();
    return docs;
  }

  void asignReport(String idPoliceUser, String idReport) async {
    var police = FirebaseFirestore.instance.collection('users');
    police.doc(idPoliceUser) 
        .update({'disponible':false,'id_report': idReport}) 
        .catchError((error) => print('Update failed: $error'));
    var report = FirebaseFirestore.instance.collection('reports');
    report.doc(idReport) 
        .update({'estado': 'EN PROCESO'}) 
        .catchError((error) => print('Update failed: $error'));
    print("Vinculo el reporte: "+idReport+" al policia: "+idPoliceUser);
  }

    Future<QuerySnapshot> getUsers() {
    Future<QuerySnapshot> docs =
        FirebaseFirestore.instance.collection('users').get();
    return docs;
  }
}

ReportDB reportdb = ReportDB();
