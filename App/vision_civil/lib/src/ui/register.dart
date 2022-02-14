import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/login.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/widgets/textFieldWidget.dart';
import 'package:vision_civil/src/widgets/buttonWidget.dart';

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  String _email = "",
      _name = "",
      _birthDate = "",
      _gender = "",
      _password = "",
      _listView = "Masculino",
      _dateView = "1999-06-16";
  double _phone = 0;

  var _genders = ["Masculino", "Femenino", "Otro"];

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          //mirar resolucion porque se desaparece logo
          image: DecorationImage(
              image: AssetImage("assets/images/vision_civil.jpg"),
              fit: BoxFit.cover)),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: true,
          title: Text("Registrate"),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 140,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Container(
                    padding: EdgeInsets.fromLTRB(35, 20, 20, 0),
                    child: Text(
                      "Ingresa tu datos:",
                      style: TextStyle(color: Colors.white, fontSize: 17),
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 5,
              ),
              TextFieldFuntion(
                  hintText: "Nombre",
                  onChanged: (value) {
                    setState(() {
                      _name = value.trim();
                    });
                  },
                  tipo: TextInputType.name,
                  obsText: false),
              TextFieldFuntion(
                  hintText: "Correo electronico",
                  onChanged: (value) {
                    setState(() {
                      _email = value.trim();
                    });
                  },
                  tipo: TextInputType.emailAddress,
                  obsText: false),
              TextFieldFuntion(
                  hintText: "Numero telefónico",
                  onChanged: (value) {
                    setState(() {
                      _phone = double.parse(value.trim());
                    });
                  },
                  tipo: TextInputType.phone,
                  obsText: false),
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                    child: Text(
                      "Fecha de nacimento:",
                      style: TextStyle(color: Colors.white, fontSize: 14),
                    ),
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
                ],
              ),
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                    child: Text(
                      "Género: ",
                      style: TextStyle(color: Colors.white, fontSize: 14),
                    ),
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
                ],
              ),
              TextFieldFuntion(
                  hintText: "Contraseña",
                  onChanged: (value) {
                    setState(() {
                      _password = value.trim();
                    });
                  },
                  tipo: TextInputType.visiblePassword,
                  obsText: true),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ButtoWidget(
                      text: "Cancelar",
                      press: () {
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (_) => BlocProvider.value(
                              value: BlocProvider.of<UserBloc>(context),
                              child: Login()),
                        ));
                      }),
                  SizedBox(width: 10),
                  ButtoWidget(
                      text: "Registrarse",
                      press: () {
                        BlocProvider.of<UserBloc>(context).add(RegisterEvent(
                            _email,
                            _name,
                            _birthDate,
                            _gender,
                            _password,
                            _phone));
                      })
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
