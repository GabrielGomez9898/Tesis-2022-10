import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class UserDB {
  final db = FirebaseFirestore.instance;
  final auth = FirebaseAuth.instance;

  Stream<QuerySnapshot> initStream() {
    return db.collection('users').snapshots();
  }

  Future<QueryDocumentSnapshot> createUser(
      String email,
      String password,
      String name,
      String gender,
      double phone,
      String birthDate,
      String document) async {
    await db.collection('users').add({
      'name': name,
      'email': email,
      'phone': phone,
      'birth_date': birthDate,
      'gender': gender,
      'role': "CIUDADANO",
      'document': document
    });
    auth.createUserWithEmailAndPassword(email: email, password: password);
    QuerySnapshot querySnap = await FirebaseFirestore.instance
        .collection('users')
        .where('email', isEqualTo: email)
        .get();
    QueryDocumentSnapshot doc = querySnap.docs[0];
    return doc;
  }

  Future<QueryDocumentSnapshot> signIn(email, password) async {
    QueryDocumentSnapshot userReturn;
    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      QuerySnapshot querySnap = await FirebaseFirestore.instance
          .collection('users')
          .where('email', isEqualTo: email)
          .get();
      userReturn = querySnap.docs[0];
      return userReturn;
    } on FirebaseAuthException catch (e) {
      print(e.toString());
      QuerySnapshot querySnap = await FirebaseFirestore.instance
          .collection('users')
          .where('email', isEqualTo: 'notexistinguser')
          .get();
      QueryDocumentSnapshot userReturn = querySnap.docs[0];
      return userReturn;
    }
  }

  void logOut() {
    auth.signOut();
  }

  Future<QueryDocumentSnapshot> updateUser(String email, String name,
      String gender, double phone, String birthDate) async {
    //Get user to update
    QuerySnapshot querySnap = await FirebaseFirestore.instance
        .collection('users')
        .where('email', isEqualTo: email)
        .get();
    QueryDocumentSnapshot doc = querySnap.docs[0];
    DocumentReference userUpdate = doc.reference;
    await userUpdate.update({
      'name': name,
      'phone': phone,
      'birth_date': birthDate,
      'gender': gender
    });

    //Get userupdated to refresh bloc states
    QuerySnapshot querySnapReturn = await FirebaseFirestore.instance
        .collection('users')
        .where('email', isEqualTo: email)
        .get();
    QueryDocumentSnapshot userReturn = querySnapReturn.docs[0];

    return userReturn;
  }
}

UserDB userdb = UserDB();
