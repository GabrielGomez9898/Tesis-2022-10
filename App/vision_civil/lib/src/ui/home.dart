import 'package:cloud_functions/cloud_functions.dart';
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
import 'package:vision_civil/src/ui/login.dart';
import 'package:vision_civil/src/ui/profile.dart';
import 'package:vision_civil/src/ui/report_detail.dart';
import 'package:vision_civil/src/ui/report_in_process.dart';
import 'package:vision_civil/src/ui/report_list.dart';
import 'package:vision_civil/src/ui/servicio_policia.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<HomePage> {
  final auth = FirebaseAuth.instance;
  final functions = FirebaseFunctions.instance;
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

  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  void _getTokenPhone(String userID) async {
    var token =
        await _firebaseMessaging.getToken(); //persistir en la bd el token
    BlocProvider.of<UserBloc>(context)
        .add(AddPhoneToken(userID, token.toString()));
    print("EN EL LOGIN: $token");
  }

  String contactPhone1 = "", contactPhone2 = "", contactPhone3 = "";
  var location = new Location();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    BlocProvider.of<ReportBloc>(context).add(GetReportsEvent());
    return BlocBuilder<UserBloc, UserblocState>(
      builder: (context, state) {
        if (state.userRole == "CIUDADANO") {
          _getTokenPhone(state.userID);
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
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (_) => MultiBlocProvider(providers: [
                            BlocProvider(
                                create: (BuildContext context) => UserBloc()),
                          ], child: Login()),
                        ));
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
                          Container(
                            width: size.width * 0.9,
                            child: Text(
                                "Seleccione la acción que quiera realizar",
                                style: TextStyle(
                                    fontSize: 16.0, color: Colors.grey)),
                          ),
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
                                                FittedBox(
                                                    child: Text(
                                                        "Alertar Contactos")),
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
                                                  FittedBox(
                                                      child: Text(
                                                          "Generar Reporte")),
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
        } else if (state.userRole == "POLICIA") {
          _getTokenPhone(state.userID);
          return Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage("assets/images/fondo.jpg"),
                    fit: BoxFit.cover)),
            child: Scaffold(
                backgroundColor: Colors.transparent,
                appBar: AppBar(
                  title: Text("Home Policía"),
                  centerTitle: true,
                  automaticallyImplyLeading: false,
                  actions: <Widget>[
                    IconButton(
                      icon: Icon(Icons.logout),
                      onPressed: () {
                        BlocProvider.of<UserBloc>(context).add(LogoutEvent());
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (_) => MultiBlocProvider(providers: [
                            BlocProvider(
                                create: (BuildContext context) => UserBloc()),
                          ], child: Login()),
                        ));
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
                          Container(
                            width: size.width * 0.9,
                            child: Text(
                                "Seleccione la acción como policía que quiere realizar",
                                style: TextStyle(
                                    fontSize: 16.0, color: Colors.grey)),
                          ),
                          SizedBox(height: 25),
                          BlocBuilder<ContactsblocBloc, ContactsblocState>(
                            builder: (context, contactsstate) {
                              return Row(
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
                                            ),
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
                                              //funcion que permite cambiar el estado del servicio del policia
                                              Navigator.of(context)
                                                  .push(MaterialPageRoute(
                                                builder: (_) =>
                                                    BlocProvider.value(
                                                        value: BlocProvider.of<
                                                            UserBloc>(context),
                                                        child: PoliceService()),
                                              ));
                                            },
                                            child: Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: <Widget>[
                                                ImageIcon(
                                                    AssetImage(
                                                        'assets/images/estado de mi servicio.png'),
                                                    size: 80),
                                                FittedBox(
                                                    child: Text(
                                                        "Estado de mi Servicio")),
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
                                                // aqui va la funcion de ver mi reporte
                                                Navigator.of(context)
                                                    .push(MaterialPageRoute(
                                                  builder: (_) =>
                                                      MultiBlocProvider(
                                                          providers: [
                                                        BlocProvider.value(
                                                            value: BlocProvider
                                                                .of<UserBloc>(
                                                                    context)),
                                                        BlocProvider.value(
                                                            value: BlocProvider
                                                                .of<ReportBloc>(
                                                                    context))
                                                      ],
                                                          child: ProcessReport(
                                                              idUserPolice:
                                                                  state
                                                                      .userID)),
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
                                                  FittedBox(
                                                      child: Text(
                                                          "Mi Reporte Activo")),
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
                                        ),
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
                                              BlocProvider(
                                                  create:
                                                      (BuildContext context) =>
                                                          ReportBloc()),
                                              BlocProvider(
                                                  create:
                                                      (BuildContext context) =>
                                                          ContactsblocBloc())
                                            ], child: ReportListPage()),
                                          ));
                                        },
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: <Widget>[
                                            ImageIcon(
                                                AssetImage(
                                                    'assets/images/Lista reportes.png'),
                                                size: 80),
                                            Text("Lista de Reportes"),
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
              title: Text("Vision Civil"),
            ),
            body: Center(
              child: Column(
                children: [
                  SizedBox(
                    height: size.height * 0.3,
                  ),
                  Container(
                      width: 100,
                      height: 100,
                      child: CircularProgressIndicator()),
                  SizedBox(height: size.height * 0.03),
                  Text("Cargando... por favor espere")
                ],
              ),
            ),
          );
        }
      },
    );
  }
}
