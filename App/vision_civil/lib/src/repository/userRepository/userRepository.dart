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
    DocumentReference user = await db.collection('users').add({
      'name': name,
      'email': email,
      'phone': phone,
      'birth_date': birthDate,
      'gender': gender,
      'role': "CIUDADANO"
    });
    auth.createUserWithEmailAndPassword(email: email, password: password);

    print("ID de usuario: " + user.id);
    return user.id;
  }

  Future<String> signIn(email, password) async {
    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      QuerySnapshot querySnap = await FirebaseFirestore.instance
          .collection('users')
          .where('email', isEqualTo: email)
          .get();
      QueryDocumentSnapshot doc = querySnap.docs[
          0]; // Assumption: the query returns only one document, THE doc you are looking for.
      DocumentReference user = doc.reference;
      return user.id;
    } on FirebaseAuthException catch (e) {
      return "null";
    }
  }
}

UserDB userdb = UserDB();