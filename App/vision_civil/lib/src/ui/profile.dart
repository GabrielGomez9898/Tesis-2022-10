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
        margin: const EdgeInsets.only(left: 13.0, right: 13.0),
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
                          setState(() {
                            this.name = value.trim();
                          });
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
                          setState(() {
                            this.phone = double.parse(value.trim());
                          });
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
                            setState(() {
                              this.birthDate = date.toString();
                            });
                          },
                              currentTime: DateTime.now(),
                              locale: LocaleType.es);
                        },
                        child: Text(this.birthDate)),
                    DropdownButton(
                      items: _genders.map((String gender) {
                        return DropdownMenuItem(
                            child: Text(gender), value: gender);
                      }).toList(),
                      onChanged: (_value) {
                        setState(() {
                          this.gender = _value.toString();
                        });
                      },
                      hint: Text(this.gender),
                    ),
                    ButtoWidget(
                      text: 'Actualizar datos',
                      textColor: Colors.black,
                      press: () {
                        print(this.email);
                        print(this.name);
                        print(this.birthDate);
                        print(this.gender);
                        print(this.phone);
                        BlocProvider.of<UserBloc>(context).add(UpdateUserEvent(
                            this.email,
                            this.name,
                            this.birthDate,
                            this.gender,
                            this.phone));
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
