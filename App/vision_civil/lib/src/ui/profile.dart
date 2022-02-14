import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';

class Profile extends StatefulWidget {
  @override
  ProfileState createState() => ProfileState();
}

class ProfileState extends State<Profile> {
  String _listView = "Seleccione su género", _dateView = "Fecha de nacimiento";

  var _genders = ["Masculino", "Femenino", "Otro"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(centerTitle: true, title: Text("Mi perfil")),
      body: BlocBuilder<UserBloc, UserblocState>(
        builder: (context, state) {
          String _email = state.userEmail,
              _name = state.userName,
              _birthDate = state.userBirthDate,
              _gender = state.userGender;
          double _phone = state.userPhone;
          return Scaffold(
            body: Column(
              children: [
                Text("Modifica tus datos"),
                TextFormField(
                  initialValue: state.userName,
                  onChanged: (value) {
                    _name = value.trim();
                  },
                ),
                TextFormField(
                  enabled: false,
                  decoration: InputDecoration(hintText: state.userDocument),
                  onChanged: (value) {},
                ),
                TextFormField(
                  enabled: false,
                  keyboardType: TextInputType.emailAddress,
                  decoration: InputDecoration(hintText: state.userEmail),
                  onChanged: (value) {},
                ),
                TextFormField(
                  initialValue: state.userPhone.toString(),
                  keyboardType: TextInputType.phone,
                  onChanged: (value) {
                    _phone = double.parse(value.trim());
                  },
                ),
                TextFormField(
                  enabled: false,
                  decoration: InputDecoration(hintText: state.userRole),
                  onChanged: (value) {},
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
                      }, currentTime: DateTime.now(), locale: LocaleType.es);
                    },
                    child: Text(_dateView)),
                DropdownButton(
                  items: _genders.map((String gender) {
                    return DropdownMenuItem(child: Text(gender), value: gender);
                  }).toList(),
                  onChanged: (_value) {
                    _gender = _value.toString();
                    showGenderAlertDialog(context, state.userGender, _gender);
                  },
                  hint: Text(_listView),
                ),
                ElevatedButton(
                    child: Text('Actualizar datos'),
                    onPressed: () {
                      BlocProvider.of<UserBloc>(context).add(UpdateUserEvent(
                          _email, _name, _birthDate, _gender, _phone));
                    }),
              ],
            ),
          );
        },
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
