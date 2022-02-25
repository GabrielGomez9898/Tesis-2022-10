import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ContactsDB {
  final db = FirebaseFirestore.instance;
  final auth = FirebaseAuth.instance;

  Stream<QuerySnapshot> initStream() {
    return db.collection('emergency_contacts').snapshots();
  }

  Future<QuerySnapshot> getEmergencyContacts(String idUser) async {
    await FirebaseFirestore.instance
        .collection('emergency_contacts')
        .where('id_user', isEqualTo: idUser)
        .get()
        .then((QuerySnapshot querySnapshot) {
      querySnapshot.docs.forEach((doc) {
        /*
        print(doc.id);
        print(doc['contact']);
        print(doc["contact_name"]);
        print(doc["contact_phone"]);
        print(doc['id_user']);*/
      });
    });
    /*
    QuerySnapshot querySnap = await FirebaseFirestore.instance
        .collection('emergency_contacts')
        .where('id_user', isEqualTo: idUser)
        .get();*/
    Future<QuerySnapshot> docs = FirebaseFirestore.instance
        .collection('emergency_contacts')
        .where('id_user', isEqualTo: idUser)
        .get();
    return docs;
  }
}

ContactsDB contactsdb = ContactsDB();
