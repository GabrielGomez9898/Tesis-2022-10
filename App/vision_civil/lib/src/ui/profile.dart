import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/widgets/buttonWidget.dart';
import 'package:vision_civil/src/widgets/textFieldWidget.dart';

class Profile extends StatefulWidget {
  const Profile(
      {Key? key,
      required this.email,
      required this.name,
      required this.birthDate,
      required this.gender,
      required this.phone})
      : super(key: key);
  final String email, name, birthDate, gender;
  final double phone;

  @override
  ProfileState createState() => ProfileState(
      this.email, this.name, this.birthDate, this.gender, this.phone);
}

class ProfileState extends State<Profile> {
  String email = " ", name = " ", birthDate = " ", gender = " ";
  double phone = 0;
  ProfileState(String widgetEmail, String widgetName, String widgetBirthDate,
      String widgetGender, double widgetPhone) {
    this.email = widgetEmail;
    this.name = widgetName;
    this.birthDate = widgetBirthDate;
    this.gender = widgetGender;
    this.phone = widgetPhone;
  }

  var _genders = ["Masculino", "Femenino", "Otro"];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Container(
        child: Scaffold(
          appBar: AppBar(
            centerTitle: true,
            title: Text("Mi perfil"),
          ),
          backgroundColor: Colors.transparent,
          body: BlocBuilder<UserBloc, UserblocState>(
            builder: (context, state) {
              return SingleChildScrollView(
                child: Column(
                  children: [
                    SizedBox(height: size.height * 0.09),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Column(
                          children: [
                            Container(
                              child: Image.asset('assets/images/logo.jpg',
                                  width: 100.0, height: 100.0, scale: 1.0),
                            ),
                          ],
                        ),
                        Column(
                          children: [
                            Text("Mi perfil",
                                style: TextStyle(
                                    fontSize: 35.0,
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500)),
                            Text("Rol: " + state.userRole,
                                style: TextStyle(
                                    fontSize: 15.0,
                                    color: Colors.grey,
                                    fontWeight: FontWeight.w400)),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(height: size.height * 0.07),
                    state.userRole == "CIUDADANO"
                        ? Container(
                            width: size.width * 0.9,
                            child: Text(
                                "Solo puedes modificar los campos: Nombre, Celular, Fecha de nacimiento y Genero",
                                style: TextStyle(
                                    fontSize: 16.0, color: Colors.grey)),
                          )
                        : Container(
                            width: size.width * 0.9,
                            child: Text(
                                "Usted como policia no puede modificar sus datos, en caso de cambio de informacion ponerse en contacto con la Alcaldia de Sibate",
                                style: TextStyle(
                                    fontSize: 16.0, color: Colors.grey)),
                          ),
                    SizedBox(height: size.height * 0.02),
                    state.userRole == "CIUDADANO"
                        ? TextFieldFuntion(
                            hintText: state.userName,
                            onChanged: (value) {
                              setState(() {
                                this.name = value.trim();
                              });
                            },
                            tipo: TextInputType.emailAddress,
                            obsText: false)
                        : TextFieldFuntion(
                            hintText: state.userName,
                            enablded: false,
                            onChanged: (value) {},
                            tipo: TextInputType.emailAddress,
                            obsText: false),
                    state.userRole == "CIUDADANO"
                        ? TextFieldFuntion(
                            hintText: state.userDocument,
                            onChanged: (value) {},
                            tipo: TextInputType.name,
                            obsText: false,
                            icon: Icons.assignment,
                            enablded: false,
                          )
                        : TextFieldFuntion(
                            hintText: state.idPolice,
                            onChanged: (value) {},
                            tipo: TextInputType.name,
                            obsText: false,
                            icon: Icons.assignment,
                            enablded: false,
                          ),
                    TextFieldFuntion(
                      hintText: state.userEmail,
                      onChanged: (value) {},
                      tipo: TextInputType.name,
                      obsText: false,
                      icon: Icons.email,
                      enablded: false,
                    ),
                    state.userRole == "CIUDADANO"
                        ? TextFieldFuntion(
                            hintText: state.userPhone.toString(),
                            onChanged: (value) {
                              setState(() {
                                this.phone = double.parse(value.trim());
                              });
                            },
                            tipo: TextInputType.number,
                            icon: Icons.aod,
                            obsText: false)
                        : TextFieldFuntion(
                            hintText: state.userPhone.toString(),
                            enablded: false,
                            onChanged: (value) {},
                            tipo: TextInputType.number,
                            icon: Icons.aod,
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
                      ],
                    ),
                    state.userRole == "CIUDADANO"
                        ? TextButton(
                            onPressed: () {
                              DatePicker.showDatePicker(context,
                                  showTitleActions: true,
                                  minTime: DateTime(1930, 3, 5),
                                  maxTime: DateTime(2019, 6, 7),
                                  onChanged: (date) {}, onConfirm: (date) {
                                setState(() {
                                  this.birthDate =
                                      DateTime.parse(date.toString())
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
                                    this.birthDate,
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color:
                                            Color.fromARGB(125, 255, 255, 255),
                                        fontSize: 15),
                                  ),
                                )))
                        : Container(
                            padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                            child: Text(
                              state.userBirthDate,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 14),
                            ),
                          ),
                    SizedBox(height: 20),
                    Row(
                      children: [
                        Container(
                          padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                          child: Text(
                            "Género: ",
                            style: TextStyle(color: Colors.white, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                    state.userRole == "CIUDADANO"
                        ? Container(
                            padding: EdgeInsets.fromLTRB(25, 0, 0, 0),
                            child: DropdownButtonHideUnderline(
                              child: DropdownButton(
                                items: _genders.map((String gender) {
                                  return DropdownMenuItem(
                                      child: Text(gender), value: gender);
                                }).toList(),
                                onChanged: (_value) {
                                  setState(() {
                                    this.gender = _value.toString();
                                  });
                                },
                                hint: Container(
                                  height: 50,
                                  width: 200,
                                  decoration: BoxDecoration(
                                      border: Border.all(
                                        color: Colors.white,
                                      ),
                                      borderRadius: BorderRadius.all(
                                          Radius.circular(20))),
                                  child: Text(
                                    this.gender,
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color:
                                            Color.fromARGB(125, 255, 255, 255),
                                        fontSize: 15),
                                  ),
                                ),
                              ),
                            ),
                          )
                        : Container(
                            padding: EdgeInsets.fromLTRB(35, 0, 0, 0),
                            child: Text(
                              state.userGender,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 14),
                            ),
                          ),
                    SizedBox(height: size.height * 0.05),
                    state.userRole == "CIUDADANO"
                        ? ButtoWidget(
                            text: 'Actualizar datos',
                            textColor: Colors.black,
                            press: () {
                              upDateInfoAlert(context);
                              BlocProvider.of<UserBloc>(context).add(
                                  UpdateUserEvent(this.email, this.name,
                                      this.birthDate, this.gender, this.phone));
                            },
                          )
                        : Container(
                            width: size.width * 0.9,
                            child: Text(
                                "Informacion gestionada por la Alacaldia de Sibate, por favor pongase en contacto",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                    fontSize: 15)),
                          ),
                    SizedBox(height: size.height * 0.05),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}

upDateInfoAlert(BuildContext context) {
  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("¡Datos actualizados!"),
    content: Text(""),
  );

  // show the dialog
  showDialog(
      context: context,
      builder: (context) {
        Future.delayed(Duration(seconds: 2), () {
          Navigator.of(context).pop(true);
        });
        return alert;
      });
}
