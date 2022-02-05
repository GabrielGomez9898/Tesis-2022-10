import 'package:flutter/material.dart';
import 'package:vision_civil/src/blocs/register_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';
import 'package:vision_civil/src/ui/login.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  RegisterBloc bloc = RegisterBloc();
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
      appBar: AppBar(
        title: Text("Registrate"),
      ),
      body: Column(
        children: [
          Text("Ingresa tu datos"),
          TextField(
            keyboardType: TextInputType.name,
            decoration: InputDecoration(hintText: 'Nombre'),
            onChanged: (value) {
              setState(() {
                _name = value.trim();
              });
            },
          ),
          TextField(
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(hintText: 'Email'),
            onChanged: (value) {
              setState(() {
                _email = value.trim();
              });
            },
          ),
          TextField(
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(hintText: 'Celular'),
            onChanged: (value) {
              setState(() {
                _phone = double.parse(value.trim());
              });
            },
          ),
          TextButton(
              onPressed: () {
                DatePicker.showDatePicker(context,
                    showTitleActions: true,
                    minTime: DateTime(1930, 3, 5),
                    maxTime: DateTime(2019, 6, 7),
                    onChanged: (date) {}, onConfirm: (date) {
                  setState(() {
                    _dateView = date.toString();
                    _birthDate = _dateView;
                  });
                }, currentTime: DateTime.now(), locale: LocaleType.es);
              },
              child: Text(_dateView)),
          DropdownButton(
            items: _genders.map((String gender) {
              return DropdownMenuItem(child: Text(gender), value: gender);
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
            decoration: InputDecoration(hintText: 'Contraseña'),
            onChanged: (value) {
              setState(() {
                _password = value.trim();
              });
            },
          ),
          ElevatedButton(
              child: Text('Registrarme'),
              onPressed: () {
                bloc.createUser(
                    _email, _password, _name, _gender, _phone, _birthDate);

                Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (context) => HomePage(currentUser: _email)));
              }),
          ElevatedButton(
              child: Text('Cancelar'),
              onPressed: () {
                Navigator.of(context).pushReplacement(
                    MaterialPageRoute(builder: (context) => Login()));
              }),
        ],
      ),
    );
  }
}
