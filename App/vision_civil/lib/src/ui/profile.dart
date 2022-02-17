import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/widgets/buttonWidget.dart';
import 'package:vision_civil/src/widgets/textFieldWidget.dart';

class Profile extends StatefulWidget {
  @override
  ProfileState createState() => ProfileState();
}

class ProfileState extends State<Profile> {
  String _listView = "Seleccione su género", _dateView = "Fecha de nacimiento";

  var _genders = ["Masculino", "Femenino", "Otro"];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Container(
        margin: const EdgeInsets.only(left: 13.0, right: 13.0),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          body: BlocBuilder<UserBloc, UserblocState>(
            builder: (context, state) {
              String _email = state.userEmail,
                  _name = state.userName,
                  _birthDate = state.userBirthDate,
                  _gender = state.userGender;
              double _phone = state.userPhone;

              return SingleChildScrollView(
                child: Column(
                  children: [
                    SizedBox(height: size.height * 0.09),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          child: Image.asset('assets/images/logo.jpg',
                              width: 100.0, height: 100.0, scale: 1.0),
                        ),
                        Text("Mi perfil",
                            style: TextStyle(
                                fontSize: 35.0,
                                color: Colors.white,
                                fontWeight: FontWeight.w600)),
                      ],
                    ),
                    SizedBox(height: size.height * 0.07),
                    Text(
                        "Solo puedes modificar los Nombre, Celular, Fecha de nacimiento y Genero",
                        style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                    SizedBox(height: size.height * 0.02),
                    TextFieldFuntion(
                        hintText: state.userName,
                        onChanged: (value) {
                          _name = value.trim();
                        },
                        tipo: TextInputType.emailAddress,
                        obsText: false),
                    TextFieldFuntion(
                      hintText: state.userDocument,
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
                    TextFieldFuntion(
                        hintText: state.userPhone.toString(),
                        onChanged: (value) {
                          _phone = double.parse(value.trim());
                        },
                        tipo: TextInputType.number,
                        icon: Icons.aod,
                        obsText: false),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text("Rol del Usuario: ",
                            style: TextStyle(
                                fontSize: 18.0,
                                color: Colors.white,
                                fontWeight: FontWeight.w500)),
                        Text(state.userRole,
                            style: TextStyle(
                                fontSize: 16.0,
                                color: Colors.white,
                                fontWeight: FontWeight.w500)),
                      ],
                    ),
                    TextButton(
                        onPressed: () {
                          DatePicker.showDatePicker(context,
                              showTitleActions: true,
                              minTime: DateTime(1930, 3, 5),
                              maxTime: DateTime(2019, 6, 7),
                              onChanged: (date) {}, onConfirm: (date) {
                            _birthDate = date.toString();
                            showDateAlertDialog(
                                context, state.userBirthDate, _birthDate);
                          },
                              currentTime: DateTime.now(),
                              locale: LocaleType.es);
                        },
                        child: Text(_dateView)),
                    DropdownButton(
                      items: _genders.map((String gender) {
                        return DropdownMenuItem(
                            child: Text(gender), value: gender);
                      }).toList(),
                      onChanged: (_value) {
                        _gender = _value.toString();
                        showGenderAlertDialog(
                            context, state.userGender, _gender);
                      },
                      hint: Text(_listView),
                    ),
                    ButtoWidget(
                      text: 'Actualizar datos',
                      textColor: Colors.black,
                      press: () {
                        BlocProvider.of<UserBloc>(context).add(UpdateUserEvent(
                            _email, _name, _birthDate, _gender, _phone));
                      },
                    ),
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
