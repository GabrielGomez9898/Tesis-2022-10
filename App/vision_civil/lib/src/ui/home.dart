import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:location/location.dart';
import 'package:permission_handler/permission_handler.dart' as perm;
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/models/report.dart';
import 'package:vision_civil/src/ui/contacts.dart';
import 'package:vision_civil/src/ui/create_report.dart';
import 'package:vision_civil/src/ui/profile.dart';
import 'package:vision_civil/src/ui/report_detail.dart';
import 'package:vision_civil/src/ui/report_in_process.dart';

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
    BlocProvider.of<ReportBloc>(context).add(GetReportsEvent());
    return BlocBuilder<UserBloc, UserblocState>(
      builder: (context, state) {
        if (state.userRole == "CIUDADANO") {
          return Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage("assets/images/fondo.jpg"),
                    fit: BoxFit.cover)),
            child: Scaffold(
                backgroundColor: Colors.transparent,
                appBar: AppBar(
                  title: Text("Home Visión Civil"),
                  centerTitle: true,
                  automaticallyImplyLeading: false,
                  actions: <Widget>[
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
                    return SingleChildScrollView(
                      child: Column(
                        children: [
                          Container(
                            child: Image.asset(
                                'assets/images/LogoConNombre.jpg',
                                width: 260.0,
                                height: 190.0,
                                scale: 1),
                          ),
                          SizedBox(height: 18),
                          Text("Seleccione la acción que quiera realizar",
                              style: TextStyle(
                                  fontSize: 16.0, color: Colors.grey)),
                          SizedBox(height: 25),
                          BlocBuilder<ContactsblocBloc, ContactsblocState>(
                            builder: (context, contactsstate) {
                              return Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  //aqui se debe construir el blocbuilder y retorner el vaino
                                  SizedBox.fromSize(
                                    size: Size(130, 120),
                                    child: Container(
                                      decoration: BoxDecoration(
                                        boxShadow: [
                                          BoxShadow(
                                            color: Colors.grey.withOpacity(0.4),
                                            spreadRadius: 0.5,
                                            blurRadius: 8,
                                            offset: Offset(
                                              0,
                                              1,
                                            ), // changes position of shadow
                                          ),
                                        ],
                                      ),
                                      child: ClipRRect(
                                        borderRadius:
                                            BorderRadius.circular(8.0),
                                        child: Material(
                                          color: Colors.orange.withOpacity(0.7),
                                          child: InkWell(
                                            splashColor: Colors.white,
                                            onTap: () async {
                                              var currentLocation =
                                                  await location.getLocation();
                                              String _latitude = currentLocation
                                                      .latitude
                                                      .toString(),
                                                  _longitude = currentLocation
                                                      .longitude
                                                      .toString();
                                              try {
                                                contactPhone1 = contactsstate
                                                    .emergencyUserContacts[0]
                                                    .contactPhone;
                                              } catch (e) {
                                                contactPhone1 = " ";
                                              }
                                              try {
                                                contactPhone2 = contactsstate
                                                    .emergencyUserContacts[1]
                                                    .contactPhone;
                                              } catch (e) {
                                                contactPhone2 = " ";
                                              }
                                              try {
                                                contactPhone3 = contactsstate
                                                    .emergencyUserContacts[2]
                                                    .contactPhone;
                                              } catch (e) {
                                                contactPhone3 = " ";
                                              }
                                              BlocProvider.of<ContactsblocBloc>(
                                                      context)
                                                  .add(SendEmergencyAlertEvent(
                                                      contactPhone1,
                                                      contactPhone2,
                                                      contactPhone3,
                                                      userstate.userName,
                                                      _latitude,
                                                      _longitude));
                                            },
                                            child: Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: <Widget>[
                                                ImageIcon(
                                                    AssetImage(
                                                        'assets/images/AlertarContactos.png'),
                                                    size: 80),
                                                Text("Alertar Contactos"),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  SizedBox(width: 30),
                                  SizedBox.fromSize(
                                      size: Size(130, 120),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          boxShadow: [
                                            BoxShadow(
                                              color:
                                                  Colors.grey.withOpacity(0.4),
                                              spreadRadius: 0.5,
                                              blurRadius: 8,
                                              offset: Offset(
                                                0,
                                                1,
                                              ), // changes position of shadow
                                            ),
                                          ],
                                        ),
                                        child: ClipRRect(
                                          borderRadius:
                                              BorderRadius.circular(8.0),
                                          child: Material(
                                            color: Colors.blueAccent
                                                .withOpacity(0.4),
                                            child: InkWell(
                                              splashColor: Colors.white,
                                              onTap: () async {
                                                Navigator.of(context)
                                                    .push(MaterialPageRoute(
                                                  builder: (_) =>
                                                      MultiBlocProvider(
                                                          providers: [
                                                        BlocProvider.value(
                                                            value: BlocProvider
                                                                .of<UserBloc>(
                                                                    context)),
                                                        BlocProvider(
                                                            create: (BuildContext
                                                                    context) =>
                                                                ReportBloc())
                                                      ],
                                                          child:
                                                              CreateReport()),
                                                ));
                                              },
                                              child: Column(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.center,
                                                children: <Widget>[
                                                  ImageIcon(
                                                      AssetImage(
                                                          'assets/images/GenerarReporte.png'),
                                                      size: 80),
                                                  Text("Generar Reporte"),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      )),
                                ],
                              );
                            },
                          ),
                          SizedBox(height: 30),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox.fromSize(
                                size: Size(130, 120),
                                child: Container(
                                  decoration: BoxDecoration(
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.grey.withOpacity(0.4),
                                        spreadRadius: 0.5,
                                        blurRadius: 8,
                                        offset: Offset(
                                          0,
                                          1,
                                        ), // changes position of shadow
                                      ),
                                    ],
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(8.0),
                                    child: Material(
                                      color:
                                          Colors.greenAccent.withOpacity(0.4),
                                      borderRadius: BorderRadius.circular(4.0),
                                      child: InkWell(
                                        splashColor: Colors.white,
                                        onTap: () {
                                          Navigator.of(context)
                                              .push(MaterialPageRoute(
                                            builder: (_) =>
                                                MultiBlocProvider(providers: [
                                              BlocProvider.value(
                                                  value:
                                                      BlocProvider.of<UserBloc>(
                                                          context)),
                                              BlocProvider.value(
                                                  value: BlocProvider.of<
                                                          ContactsblocBloc>(
                                                      context)),
                                            ], child: ContactsPage()),
                                          ));
                                        },
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: <Widget>[
                                            ImageIcon(
                                                AssetImage(
                                                    'assets/images/Contactos.png'),
                                                size: 80),
                                            Text("Mis Contactos"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(width: 30),
                              SizedBox.fromSize(
                                size: Size(130, 120),
                                child: Container(
                                  decoration: BoxDecoration(
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.grey.withOpacity(0.4),
                                        spreadRadius: 0.5,
                                        blurRadius: 8,
                                        offset: Offset(
                                          0,
                                          1,
                                        ), // changes position of shadow
                                      ),
                                    ],
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(8.0),
                                    child: Material(
                                      color: Color.fromARGB(131, 167, 68, 68),
                                      child: InkWell(
                                        splashColor: Colors.white,
                                        onTap: () async {
                                          Navigator.of(context)
                                              .push(MaterialPageRoute(
                                            builder: (_) => BlocProvider.value(
                                                value:
                                                    BlocProvider.of<UserBloc>(
                                                        context),
                                                child: Profile(
                                                    email: state.userEmail,
                                                    name: state.userName,
                                                    birthDate:
                                                        state.userBirthDate,
                                                    gender: state.userGender,
                                                    phone: state.userPhone)),
                                          ));
                                        },
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: <Widget>[
                                            ImageIcon(
                                                AssetImage(
                                                    'assets/images/MiPerfil.png'),
                                                size: 80),
                                            Text("Mi Perfil"),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                    );
                  },
                )),
          );
        } else {
          return Scaffold(
              appBar: AppBar(
                title: Text("Home Visión Civil Policias"),
                actions: <Widget>[
                  BlocBuilder<UserBloc, UserblocState>(
                    builder: (context, state) {
                      return IconButton(
                        icon: Icon(Icons.my_library_books),
                        onPressed: () {
                          Navigator.of(context).push(MaterialPageRoute(
                            builder: (_) => BlocProvider.value(
                                value: BlocProvider.of<ReportBloc>(context),
                                child:
                                    ProcessReport(idUserPolice: state.userID)),
                          ));
                        },
                      );
                    },
                  ),
                  BlocBuilder<UserBloc, UserblocState>(
                    builder: (context, state) {
                      return IconButton(
                        icon: Icon(Icons.accessibility),
                        onPressed: () async {
                          Navigator.of(context).push(MaterialPageRoute(
                            builder: (_) => BlocProvider.value(
                                value: BlocProvider.of<UserBloc>(context),
                                child: Profile(
                                    email: state.userEmail,
                                    name: state.userName,
                                    birthDate: state.userBirthDate,
                                    gender: state.userGender,
                                    phone: state.userPhone)),
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
              body: BlocBuilder<ReportBloc, ReportblocState>(
                builder: (context, state) {
                  return ListView.builder(
                    shrinkWrap: true,
                    itemCount: state.reports.length,
                    itemBuilder: (context, index) {
                      Report report = state.reports[index];

                      return ListTile(
                        title: Text(report.tipoReporte),
                        subtitle: Text(report.asunto),
                        trailing: BlocBuilder<UserBloc, UserblocState>(
                          builder: (context, state) {
                            return ElevatedButton(
                                onPressed: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                    builder: (_) => MultiBlocProvider(
                                        providers: [
                                          BlocProvider.value(
                                              value: BlocProvider.of<UserBloc>(
                                                  context)),
                                          BlocProvider.value(
                                              value:
                                                  BlocProvider.of<ReportBloc>(
                                                      context)),
                                        ],
                                        child: ReportDetail(
                                            idReport: report.id,
                                            idPoliceUser: state.userID)),
                                  ));
                                },
                                child: Text("Ver mas"));
                          },
                        ),
                        onTap: () {},
                      );
                    },
                  );
                },
              ));
        }
      },
    );
  }
}
