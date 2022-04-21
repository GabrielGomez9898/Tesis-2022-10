import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';

class PoliceService extends StatefulWidget {
  const PoliceService({Key? key}) : super(key: key);

  @override
  State<PoliceService> createState() => _PoliceServiceState();
}

class _PoliceServiceState extends State<PoliceService> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Mi Servicio"),
        ),
        backgroundColor: Colors.transparent,
        body: Center(
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
                      Text("Mi Estado\ndel Servicio",
                          style: TextStyle(
                              fontSize: 35.0,
                              color: Colors.white,
                              fontWeight: FontWeight.w500)),
                    ],
                  ),
                ],
              ),
              SizedBox(height: size.height * 0.12),
              Padding(
                padding: const EdgeInsets.all(6.0),
                child: Text(
                    "Toque el deslizador para cambiar el estado de mi servicio en el que me encuentro. Al estar en \"On\" puede atender reportes y recibir notificaciones.",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Color.fromARGB(255, 255, 255, 255),
                        fontSize: 15)),
              ),
              SizedBox(height: size.height * 0.12),
              BlocBuilder<UserBloc, UserblocState>(
                builder: (context, state) {
                  bool status = state.onService;
                  return FlutterSwitch(
                      width: 125.0,
                      height: 55.0,
                      valueFontSize: 25.0,
                      toggleSize: 45.0,
                      value: status,
                      borderRadius: 30.0,
                      padding: 8.0,
                      showOnOff: true,
                      onToggle: (value) {
                        setState(() {
                          status = value;
                          BlocProvider.of<UserBloc>(context)
                              .add(UpdatePoliceService(state.userID, status));
                          BlocProvider.of<UserBloc>(context).add(
                              UpdateUserState(
                                  state.userID,
                                  state.userEmail,
                                  state.userName,
                                  state.userPhone,
                                  state.userGender,
                                  state.userBirthDate,
                                  state.userRole,
                                  state.userDocument,
                                  state.idPolice,
                                  state.available,
                                  status,
                                  state.loginAchieved));
                        });
                      });
                },
              ),
              SizedBox(height: size.height * 0.09),
              Container(
                child: Image.asset('assets/images/LogoAlcaldia.jpg',
                    width: 130.0, height: 90.0, scale: 1),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
