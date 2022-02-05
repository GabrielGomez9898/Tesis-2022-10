import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/ui/home.dart';

class Profile extends StatefulWidget {
  Profile({Key? key, required this.currentUser}) : super(key: key);
  final String currentUser;

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
          Container(
            height: 700,
            padding: const EdgeInsets.symmetric(vertical: 20),
            child: StreamBuilder<QuerySnapshot>(
                stream: queryusers,
                builder: (BuildContext context,
                    AsyncSnapshot<QuerySnapshot> snapshot) {
                  if (snapshot.hasError) {
                    return Text("Error");
                  }
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Text("Esperando");
                  }

                  final data = snapshot.requireData;

                  return ListView.builder(
                    itemCount: data.size,
                    itemBuilder: (context, index) {
                      if (data.docs[index]['email'] == widget.currentUser) {
                        _iduser = data.docs[index].id;
                        _name = data.docs[index]['name'];
                        _phone = data.docs[index]['phone'];
                        _birthDate = data.docs[index]['birth_date'];
                        _gender = data.docs[index]['gender'];
                        return Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text("Modifica tu datos"),
                            ),
                            Text(
                                "NOTA: No puedes modificar tu email ni tu rol"),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                enabled: false,
                                initialValue: data.docs[index]['role'],
                                onChanged: (value) {},
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                initialValue: data.docs[index]['name'],
                                keyboardType: TextInputType.name,
                                onChanged: (value) {
                                  _name = value.trim();
                                  print(_name);
                                },
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                enabled: false,
                                initialValue: data.docs[index]['email'],
                                onChanged: (value) {},
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextFormField(
                                initialValue:
                                    data.docs[index]['phone'].toString(),
                                keyboardType: TextInputType.phone,
                                onChanged: (value) {
                                  _phone = double.parse(value.trim());
                                },
                              ),
                            ),
                            Text("Fecha actual: " +
                                data.docs[index]['birth_date']),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextButton(
                                  onPressed: () {
                                    DatePicker.showDatePicker(context,
                                        showTitleActions: true,
                                        minTime: DateTime(1930, 3, 5),
                                        maxTime: DateTime(2019, 6, 7),
                                        onChanged: (date) {},
                                        onConfirm: (date) {
                                      _dateView = date.toString();
                                      _birthDate = _dateView;
                                      showDateAlertDialog(
                                          context,
                                          data.docs[index]['birth_date'],
                                          _birthDate);
                                    },
                                        currentTime: DateTime.now(),
                                        locale: LocaleType.es);
                                  },
                                  child: Text(_dateView)),
                            ),
                            Text(
                                "Género actual: " + data.docs[index]['gender']),
                            DropdownButton(
                              items: _genders.map((String gender) {
                                return DropdownMenuItem(
                                    child: Text(gender), value: gender);
                              }).toList(),
                              onChanged: (_value) {
                                _gender = _value.toString();
                                _listView = _gender;
                                showGenderAlertDialog(context,
                                    data.docs[index]['gender'], _gender);
                              },
                              hint: Text(_listView),
                            ),
                            ElevatedButton(
                                child: Text("Actualizar datos"),
                                onPressed: () {
                                  print(_name);
                                  print(_phone);
                                  users
                                      .doc(_iduser)
                                      .update({
                                        'name': _name,
                                        'phone': _phone,
                                        'birth_date': _birthDate,
                                        'gender': _gender
                                      })
                                      .then((value) => print("User updated"))
                                      .catchError((error) =>
                                          print("Failed to update user"));
                                  Navigator.of(context).pushReplacement(
                                      MaterialPageRoute(
                                          builder: (context) => HomePage(
                                              currentUser:
                                                  widget.currentUser)));
                                }),
                            ElevatedButton(
                                child: Text('Atrás'),
                                onPressed: () {
                                  Navigator.of(context).pushReplacement(
                                      MaterialPageRoute(
                                          builder: (context) => HomePage(
                                              currentUser:
                                                  widget.currentUser)));
                                }),
                          ],
                        );
                      }

                      return Text("");
                    },
                  );
                }),
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
