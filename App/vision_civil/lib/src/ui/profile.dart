import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';

class Profile extends StatefulWidget {
  //Profile({Key? key, required this.currentUser}) : super(key: key);
  //final String currentUser;

  @override
  ProfileState createState() => ProfileState();
}

class ProfileState extends State<Profile> {
  final auth = FirebaseAuth.instance;
  CollectionReference users = FirebaseFirestore.instance.collection('users');
  final Stream<QuerySnapshot> queryusers =
      FirebaseFirestore.instance.collection("users").snapshots();

  String _name = "",
      _birthDate = "",
      _gender = "",
      _listView = "Seleccione su género",
      _dateView = "Fecha de nacimiento",
      _iduser = "";
  double _phone = 0;

  var _genders = ["Masculino", "Femenino"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(centerTitle: true, title: Text("Mi perfil")),
      body: Column(
        children: [
          BlocBuilder<UserBloc, UserblocState>(
            builder: (context, state) {
              return Container(
                  height: 700,
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  child: Text('id user: ' + state.userID));
            },
          ),
        ],
      ),
    );
  }
}

showDateAlertDialog(BuildContext context, currentDate, updateDate) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.pop(context);
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text('Se actualizará su fecha de nacimiento'),
    content: Text('Fecha a actualizar: ' +
        updateDate +
        '\n' +
        'Fecha actual: ' +
        currentDate),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}

showGenderAlertDialog(BuildContext context, currentGender, updateGender) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.pop(context);
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text('Se actualizará su género'),
    content: Text('Género a actualizar: ' +
        updateGender +
        '\n' +
        'Género actual: ' +
        currentGender),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}
