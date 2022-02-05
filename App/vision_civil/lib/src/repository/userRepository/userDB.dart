import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class UserDB {
  final db = FirebaseFirestore.instance;
  final auth = FirebaseAuth.instance;

  Stream<QuerySnapshot> initStream() {
    return db.collection('users').snapshots();
  }

  Future<String> createUser(String email, String password, String name,
      String gender, double phone, String birthDate) async {
    auth.createUserWithEmailAndPassword(email: email, password: password);
    DocumentReference user = await db.collection('users').add({
      'name': name,
      'email': email,
      'phone': phone,
      'birth_date': birthDate,
      'gender': gender,
      'role': "CIUDADANO"
    });
    print("ID de usuario: " + user.id);
    return user.id;
  }
}

UserDB userdb = UserDB();
