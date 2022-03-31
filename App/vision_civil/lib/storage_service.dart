import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;


class Storage {
  final firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;

  Future<firebase_storage.ListResult> listFiles()async{
    firebase_storage.ListResult results  = await storage.ref("reports/9qtfhe3qLJgjJGYWvSPd/media/images").listAll();
    results.items.forEach((firebase_storage.Reference ref){
      print("file: $ref");
     });
    return results;
  }

  Future<String> downloadUrl(List<String> imagesIds)async{
    print("entro al download function");
    for(var i = 0; i<imagesIds.length;i++){
      print(imagesIds[i]);
    }
    String downloadURL = await storage.ref("reports/9qtfhe3qLJgjJGYWvSPd/media/images/"+imagesIds[1]).getDownloadURL();
    print(downloadURL);
    return downloadURL;
  }
}
