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

  void updatePoliceService(String idPoliceUser, bool onService) async {
    var police = FirebaseFirestore.instance.collection('users');
    police.doc(idPoliceUser).update({'enServicio': onService}).catchError(
        (error) => print('Update failed: $error'));
  }

  void updateTokenPhone(String user, String token) async {
    var police = FirebaseFirestore.instance.collection('users');
    police.doc(user).update({'phoneToken': token}).catchError(
        (error) => print('Update failed: $error'));
  }

  Future<QueryDocumentSnapshot> updateUserBlocState(String userEmail) async {
    //Get userupdated to refresh bloc states
    QuerySnapshot querySnapReturn = await FirebaseFirestore.instance
        .collection('users')
        .where('email', isEqualTo: userEmail)
        .get();
    QueryDocumentSnapshot userReturn = querySnapReturn.docs[0];

    return userReturn;
  }

  void updatePassword(
      String userEmail, String currentPassword, String newPassword) async {
    final user = await FirebaseAuth.instance.currentUser;
    print("repo: email usuario: " + userEmail);
    print("repo: contraseña actual: " + currentPassword);
    print("repo: contraseña nueva: " + newPassword);
    final cred = EmailAuthProvider.credential(
        email: userEmail, password: currentPassword);

    user!.reauthenticateWithCredential(cred).then((value) {
      user.updatePassword(newPassword).then((value) {
        print("Se acualizó la contraseña");
      });
    });
  }
}

UserDB userdb = UserDB();
