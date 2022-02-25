import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ContactsDB {
  final db = FirebaseFirestore.instance;
  final auth = FirebaseAuth.instance;

  Stream<QuerySnapshot> initStream() {
    return db.collection('emergency_contacts').snapshots();
  }

  Future<QuerySnapshot> getEmergencyContacts(String idUser) async {
    Future<QuerySnapshot> docs = FirebaseFirestore.instance
        .collection('emergency_contacts')
        .where('id_user', isEqualTo: idUser)
        .get();
    return docs;
  }
}

ContactsDB contactsdb = ContactsDB();
