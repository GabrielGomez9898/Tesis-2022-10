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
    return Scaffold(
      appBar: AppBar(
        title: Text("Mi Servicio"),
      ),
      body: Center(
        child: Column(
          children: [
            SizedBox(
              height: 80,
            ),
            Text("Estado"),
            SizedBox(
              height: 150,
            ),
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
                        BlocProvider.of<UserBloc>(context).add(UpdatePoliceService(state.userID, status));
                        BlocProvider.of<UserBloc>(context).add(UpdateUserState(state.userID, state.userEmail, state.userName, state.userPhone, state.userGender, state.userBirthDate, state.userRole, state.userDocument, state.idPolice, state.available, status, state.loginAchieved));
                      });
                    });
              },
            )
          ],
        ),
      ),
    );
  }
}
