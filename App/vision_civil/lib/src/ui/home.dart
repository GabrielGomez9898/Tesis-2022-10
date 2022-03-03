import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:location/location.dart';
import 'package:permission_handler/permission_handler.dart' as perm;
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

  Future<perm.PermissionStatus> _getPermission() async {
    perm.PermissionStatus status = await perm.Permission.sms.request();
    print(status.toString());

    if (status == PermissionStatus.granted) {
      return perm.PermissionStatus.granted;
    } else {
      return perm.PermissionStatus.denied;
    }
  }

  void _getSMSPermission() async {
    await _getPermission();
  }

  String contactPhone1 = "", contactPhone2 = "", contactPhone3 = "";
  var location = new Location();

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
                  BlocProvider.value(
                      value: BlocProvider.of<ContactsblocBloc>(context)),
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
          builder: (context, userstate) {
            BlocProvider.of<ContactsblocBloc>(context)
                .add(GetUserContactsEvent(userstate.userID));
            return Column(
              children: [
                Text('id user: ' +
                    userstate.userID +
                    ' ' +
                    userstate.loginAchieved.toString() +
                    ' ' +
                    userstate.userEmail +
                    ' ' +
                    userstate.userName +
                    ' ' +
                    userstate.userGender +
                    ' ' +
                    userstate.userBirthDate +
                    ' ' +
                    userstate.userPhone.toString() +
                    ' ' +
                    userstate.userRole +
                    ' ' +
                    userstate.userDocument),
                SizedBox(height: 50),
                BlocBuilder<ContactsblocBloc, ContactsblocState>(
                  builder: (context, contactsstate) {
                    return ElevatedButton(
                        onPressed: () async {
                          var currentLocation = await location.getLocation();
                          String _latitude =
                                  currentLocation.latitude.toString(),
                              _longitude = currentLocation.longitude.toString();
                          try {
                            contactPhone1 = contactsstate
                                .emergencyUserContacts[0].contactPhone;
                          } catch (e) {
                            contactPhone1 = " ";
                          }
                          try {
                            contactPhone2 = contactsstate
                                .emergencyUserContacts[1].contactPhone;
                          } catch (e) {
                            contactPhone2 = " ";
                          }
                          try {
                            contactPhone3 = contactsstate
                                .emergencyUserContacts[2].contactPhone;
                          } catch (e) {
                            contactPhone3 = " ";
                          }
                          BlocProvider.of<ContactsblocBloc>(context).add(
                              SendEmergencyAlertEvent(
                                  contactPhone1,
                                  contactPhone2,
                                  contactPhone3,
                                  userstate.userName,
                                  _latitude,
                                  _longitude));
                        },
                        child: Text("Alertar a mis contactos"));
                  },
                )
              ],
            );
          },
        ));
  }
}
