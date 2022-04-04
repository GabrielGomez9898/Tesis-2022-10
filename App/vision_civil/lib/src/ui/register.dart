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
      _document = "",
      _name = "",
      _birthDate = "",
      _gender = "",
      _password = "",
      _listView = "Masculino",
      _dateView = "1999-06-16";
  double _phone = 0;

  var _genders = ["Masculino", "Femenino", "Otro"];
  final _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;
    return Container(
      decoration: BoxDecoration(
          //mirar resolucion porque se desaparece logo
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: true,
          title: Text("¡Regístrate!"),
        ),
        body: Scrollbar(
          isAlwaysShown: true,
          controller: _scrollController,
          child: SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                SizedBox(height: screenWidth * 0.2),
                Container(
                  child: Image.asset('assets/images/LogoConNombre.jpg',
                      width: 260.0, height: 110.0, scale: 1),
                ),
                SizedBox(height: screenWidth * 0.01),
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
                SizedBox(height: screenWidth * 0.01),
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
                    hintText: "Documento de identidad",
                    onChanged: (value) {
                      setState(() {
                        _document = value.trim();
                      });
                    },
                    icon: Icons.assignment,
                    tipo: TextInputType.name,
                    obsText: false),
                TextFieldFuntion(
                    hintText: "Numero telefónico",
                    onChanged: (value) {
                      setState(() {
                        _phone = double.parse(value.trim());
                      });
                    },
                    icon: Icons.aod,
                    tipo: TextInputType.phone,
                    obsText: false),
                TextFieldFuntion(
                    hintText: "Correo electronico",
                    onChanged: (value) {
                      setState(() {
                        _email = value.trim();
                      });
                    },
                    icon: Icons.email,
                    tipo: TextInputType.emailAddress,
                    obsText: false),
                TextFieldFuntion(
                    hintText: "Contraseña",
                    onChanged: (value) {
                      setState(() {
                        _password = value.trim();
                      });
                    },
                    icon: Icons.password,
                    tipo: TextInputType.visiblePassword,
                    obsText: true),
                SizedBox(height: screenWidth * 0.03),
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                      child: Text(
                        "Fecha de nacimento: \n(presione la fecha para cambiar)",
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 15),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    //Container(padding: EdgeInsets.fromLTRB(42, 0, 0, 0)),
                    TextButton(
                        onPressed: () {
                          DatePicker.showDatePicker(context,
                              showTitleActions: true,
                              minTime: DateTime(1930, 3, 5),
                              maxTime: DateTime(2019, 6, 7),
                              onChanged: (date) {}, onConfirm: (date) {
                            setState(() {
                              _dateView = DateTime.parse(date.toString())
                                      .year
                                      .toString() +
                                  "-" +
                                  DateTime.parse(date.toString())
                                      .month
                                      .toString() +
                                  "-" +
                                  DateTime.parse(date.toString())
                                      .day
                                      .toString();
                              _birthDate = _dateView;
                            });
                          },
                              currentTime: DateTime.now(),
                              locale: LocaleType.es);
                        },
                        child: Container(
                            height: 50,
                            width: 200,
                            decoration: BoxDecoration(
                                border: Border.all(
                                  color: Colors.white,
                                ),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20))),
                            child: Center(
                              child: Text(
                                _dateView,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Color.fromARGB(125, 255, 255, 255),
                                    fontSize: 15),
                              ),
                            ))),
                  ],
                ),
                SizedBox(height: 20),
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                      child: Text(
                        "Género: \n(presione la fecha para cambiar)",
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 15),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      padding: EdgeInsets.fromLTRB(25, 0, 0, 0),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton(
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
                          hint: Container(
                            height: 50,
                            width: 200,
                            decoration: BoxDecoration(
                                border: Border.all(
                                  color: Colors.white,
                                ),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20))),
                            child: Text(
                              _listView,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Color.fromARGB(125, 255, 255, 255),
                                  fontSize: 15),
                            ),
                          ),
                        ),
                      ),
                    )
                  ],
                ),
                SizedBox(height: screenWidth * 0.1),
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
                              _phone,
                              _document));
                        })
                  ],
                ),
                SizedBox(height: screenWidth * 0.09),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
