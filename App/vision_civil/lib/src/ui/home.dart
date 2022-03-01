import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/contacts.dart';
import 'package:vision_civil/src/ui/create_report.dart';
import 'package:vision_civil/src/ui/profile.dart';

class HomePage extends StatefulWidget {
  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<HomePage> {
  final auth = FirebaseAuth.instance;

  @override
  void initState() {
    super.initState();
    _getSMSPermission();
  }

  Future<PermissionStatus> _getPermission() async {
    PermissionStatus status = await Permission.sms.request();
    print(status.toString());

    if (status == PermissionStatus.granted) {
      return PermissionStatus.granted;
    } else {
      return PermissionStatus.denied;
    }
  }

  void _getSMSPermission() async {
    final PermissionStatus permissionStatus = await _getPermission();
    if (permissionStatus == PermissionStatus.granted) {}
  }

  static const MethodChannel _channel = const MethodChannel('smsker');

  static Future<String> _sendMessageToContacts() async {
    final String phoneSent = await _channel.invokeMethod('sendSms',
        {'phone': "+573057162569", 'message': "Emergencia necesito tu ayuda"});
    return phoneSent;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Home Visión Civil"),
          leading: IconButton(
            icon: Icon(Icons.contacts),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (_) => MultiBlocProvider(providers: [
                  BlocProvider.value(value: BlocProvider.of<UserBloc>(context)),
                  BlocProvider(
                      create: (BuildContext context) => ContactsblocBloc())
                ], child: ContactsPage()),
              ));
            },
          ),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.accessibility),
              onPressed: () async {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (_) => BlocProvider.value(
                      value: BlocProvider.of<UserBloc>(context),
                      child: Profile()),
                ));
              },
            ),
            BlocBuilder<UserBloc, UserblocState>(
              builder: (context, state) {
                return IconButton(
                  icon: Icon(Icons.create),
                  onPressed: () async {
                    Navigator.of(context).push(MaterialPageRoute(
                      builder: (_) => MultiBlocProvider(providers: [
                        BlocProvider.value(
                            value: BlocProvider.of<UserBloc>(context)),
                        BlocProvider(
                            create: (BuildContext context) => ReportBloc())
                      ], child: CreateReport()),
                    ));
                  },
                );
              },
            ),
            IconButton(
              icon: Icon(Icons.logout),
              onPressed: () {
                BlocProvider.of<UserBloc>(context).add(LogoutEvent());
              },
            )
          ],
        ),
        body: BlocBuilder<UserBloc, UserblocState>(
          builder: (context, state) {
            return Column(
              children: [
                Text('id user: ' +
                    state.userID +
                    ' ' +
                    state.loginAchieved.toString() +
                    ' ' +
                    state.userEmail +
                    ' ' +
                    state.userName +
                    ' ' +
                    state.userGender +
                    ' ' +
                    state.userBirthDate +
                    ' ' +
                    state.userPhone.toString() +
                    ' ' +
                    state.userRole +
                    ' ' +
                    state.userDocument),
                SizedBox(height: 50),
                ElevatedButton(
                    onPressed: () {
                      _sendMessageToContacts();
                    },
                    child: Text("Alertar a mis contactos"))
              ],
            );
          },
        ));
  }
}
