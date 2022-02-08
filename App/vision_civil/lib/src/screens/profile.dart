import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/screens/home.dart';

class Profile extends StatefulWidget {
  Profile({Key? key, required this.currentUser}) : super(key: key);
  final String currentUser;
  @override
  ProfileState createState() => ProfileState();
}

class ProfileState extends State<Profile> {
  final auth = FirebaseAuth.instance;
  CollectionReference users = FirebaseFirestore.instance.collection('users');
  final Stream<QuerySnapshot> Queryusers =
      FirebaseFirestore.instance.collection("users").snapshots();

  String _email = "",
      _name = "",
      _birthDate = "",
      _gender = "",
      _password = "",
      _listView = "Seleccione su género",
      _dateView = "Fecha de nacimiento";
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
                stream: Queryusers,
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
                        return Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text("Modifica tu datos"),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextField(
                                keyboardType: TextInputType.name,
                                decoration: InputDecoration(
                                    hintText: data.docs[index]['name']),
                                onChanged: (value) {
                                  setState(() {
                                    _name = value.trim();
                                    print(_name);
                                  });
                                },
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextField(
                                keyboardType: TextInputType.emailAddress,
                                decoration: InputDecoration(
                                    hintText: data.docs[index]['email']),
                                onChanged: (value) {
                                  setState(() {
                                    _email = value.trim();
                                    print(_email);
                                  });
                                },
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: TextField(
                                keyboardType: TextInputType.phone,
                                decoration: InputDecoration(
                                    hintText:
                                        data.docs[index]['phone'].toString()),
                                onChanged: (value) {
                                  setState(() {
                                    _phone = double.parse(value.trim());
                                    print(_phone);
                                  });
                                },
                              ),
                            ),
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
                                      setState(() {
                                        _dateView = date.toString();
                                        _birthDate = _dateView;
                                        print(_birthDate);
                                      });
                                    },
                                        currentTime: DateTime.now(),
                                        locale: LocaleType.es);
                                  },
                                  child: Text(_dateView)),
                            ),
                            DropdownButton(
                              items: _genders.map((String gender) {
                                return DropdownMenuItem(
                                    child: Text(gender), value: gender);
                              }).toList(),
                              onChanged: (_value) {
                                setState(() {
                                  _gender = _value.toString();
                                  _listView = _gender;
                                });
                              },
                              hint: Text(_listView),
                            ),
                            TextField(
                              obscureText: true,
                              decoration:
                                  InputDecoration(hintText: 'Contraseña'),
                              onChanged: (value) {
                                setState(() {
                                  _password = value.trim();
                                });
                              },
                            ),
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
