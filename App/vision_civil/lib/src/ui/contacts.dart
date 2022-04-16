import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/models/emergency_contact.dart';
import 'package:vision_civil/src/ui/emergency_contacts_list.dart';

class ContactsPage extends StatefulWidget {
  @override
  ContactsPageState createState() => ContactsPageState();
}

class ContactsPageState extends State<ContactsPage> {
  EmergencyContact emergencyContact1 = new EmergencyContact(" ", "...", " ");
  EmergencyContact emergencyContact2 = new EmergencyContact(" ", "... ", " ");
  EmergencyContact emergencyContact3 = new EmergencyContact(" ", "... ", " ");
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: true,
            title: Text("Contactos de emergencia"),
          ),
          body: BlocBuilder<UserBloc, UserblocState>(
            builder: (context, state) {
              BlocProvider.of<ContactsblocBloc>(context)
                  .add(GetUserContactsEvent(state.userID));
              return SingleChildScrollView(
                child: BlocListener<ContactsblocBloc, ContactsblocState>(
                  listener: (context, state) {
                    setState(() {
                      try {
                        emergencyContact1.setUniqueId(
                            state.emergencyUserContacts[0].uniqueid);
                        emergencyContact1.setContactName(
                            state.emergencyUserContacts[0].contactName);
                        emergencyContact1.setContactPhone(
                            state.emergencyUserContacts[0].contactPhone);
                      } catch (e) {
                        emergencyContact1.setUniqueId(" ");
                        emergencyContact1.setContactName(" ");
                        emergencyContact1.setContactPhone(" ");
                      }
                      try {
                        emergencyContact2.setUniqueId(
                            state.emergencyUserContacts[1].uniqueid);
                        emergencyContact2.setContactName(
                            state.emergencyUserContacts[1].contactName);
                        emergencyContact2.setContactPhone(
                            state.emergencyUserContacts[1].contactPhone);
                      } catch (e) {
                        emergencyContact2.setUniqueId(" ");
                        emergencyContact2.setContactName(" ");
                        emergencyContact2.setContactPhone(" ");
                      }
                      try {
                        emergencyContact3.setUniqueId(
                            state.emergencyUserContacts[2].uniqueid);
                        emergencyContact3.setContactName(
                            state.emergencyUserContacts[2].contactName);
                        emergencyContact3.setContactPhone(
                            state.emergencyUserContacts[2].contactPhone);
                      } catch (e) {
                        emergencyContact3.setUniqueId(" ");
                        emergencyContact3.setContactName(" ");
                        emergencyContact3.setContactPhone(" ");
                      }
                    });
                  },
                  child: BlocBuilder<UserBloc, UserblocState>(
                    builder: (context, state) {
                      return Column(
                        children: [
                          SizedBox(height: screenWidth * 0.18),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                child: Image.asset('assets/images/logo.jpg',
                                    width: 100.0, height: 100.0, scale: 1.0),
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text("Mis contactos \nde emergencia",
                                      style: TextStyle(
                                          fontSize: 28.0,
                                          color: Colors.white,
                                          fontWeight: FontWeight.w500)),
                                ],
                              ),
                            ],
                          ),
                          SizedBox(height: screenWidth * 0.12),
                          Container(
                            padding: EdgeInsets.fromLTRB(17, 0, 17, 0),
                            child: Text(
                                "Puede editar y eliminar sus contactos de confianza. En caso de estar en peligro a estos les llegara una notificación con su ubicación",
                                style: TextStyle(
                                    fontSize: 14.0, color: Colors.grey)),
                          ),
                          SizedBox(height: screenWidth * 0.05),
                          Container(
                            width: screenWidth * 0.9,
                            height: screenheight * 0.18,
                            decoration: new BoxDecoration(
                              color: Color.fromARGB(255, 97, 102, 119),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: FittedBox(
                              child: Column(
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      Column(
                                        children: [
                                          Container(
                                            width: 190,
                                            height: 40,
                                            child: FittedBox(
                                                child: Text(emergencyContact1
                                                    .contactName)),
                                          ),
                                        ],
                                      ),
                                      Column(
                                        children: [
                                          Row(
                                            children: [
                                              ElevatedButton(
                                                  onPressed: () {
                                                    Navigator.of(context)
                                                        .push(MaterialPageRoute(
                                                      builder: (_) => MultiBlocProvider(
                                                          providers: [
                                                            BlocProvider.value(
                                                                value: BlocProvider
                                                                    .of<UserBloc>(
                                                                        context)),
                                                            BlocProvider.value(
                                                                value: BlocProvider
                                                                    .of<ContactsblocBloc>(
                                                                        context))
                                                          ],
                                                          child: EmergencyContactsPage(
                                                              emergencyContact:
                                                                  emergencyContact1,
                                                              idUser: state
                                                                  .userID)),
                                                    ));
                                                  },
                                                  child: Icon(Icons.edit)),
                                              SizedBox(width: 10),
                                              ElevatedButton(
                                                  onPressed: () {
                                                    BlocProvider.of<
                                                                ContactsblocBloc>(
                                                            context)
                                                        .add(DeleteContactEvent(
                                                            emergencyContact1
                                                                .uniqueid));
                                                  },
                                                  child: Icon(Icons.delete))
                                            ],
                                          )
                                        ],
                                      ),
                                    ],
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      Column(
                                        children: [
                                          Container(
                                            width: 190,
                                            height: 40,
                                            child: FittedBox(
                                                child: Text(emergencyContact2
                                                    .contactName)),
                                          ),
                                        ],
                                      ),
                                      Column(
                                        children: [
                                          Row(
                                            children: [
                                              ElevatedButton(
                                                  onPressed: () {
                                                    Navigator.of(context)
                                                        .push(MaterialPageRoute(
                                                      builder: (_) => MultiBlocProvider(
                                                          providers: [
                                                            BlocProvider.value(
                                                                value: BlocProvider
                                                                    .of<UserBloc>(
                                                                        context)),
                                                            BlocProvider.value(
                                                                value: BlocProvider
                                                                    .of<ContactsblocBloc>(
                                                                        context))
                                                          ],
                                                          child: EmergencyContactsPage(
                                                              emergencyContact:
                                                                  emergencyContact2,
                                                              idUser: state
                                                                  .userID)),
                                                    ));
                                                  },
                                                  child: Icon(Icons.edit)),
                                              SizedBox(width: 10),
                                              ElevatedButton(
                                                  onPressed: () {
                                                    BlocProvider.of<
                                                                ContactsblocBloc>(
                                                            context)
                                                        .add(DeleteContactEvent(
                                                            emergencyContact2
                                                                .uniqueid));
                                                  },
                                                  child: Icon(Icons.delete))
                                            ],
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      Column(
                                        children: [
                                          Container(
                                            width: 190,
                                            height: 40,
                                            child: FittedBox(
                                                child: Text(emergencyContact3
                                                    .contactName)),
                                          ),
                                        ],
                                      ),
                                      Column(
                                        children: [
                                          Row(
                                            children: [
                                              ElevatedButton(
                                                  onPressed: () {
                                                    Navigator.of(context)
                                                        .push(MaterialPageRoute(
                                                      builder: (_) => MultiBlocProvider(
                                                          providers: [
                                                            BlocProvider.value(
                                                                value: BlocProvider
                                                                    .of<UserBloc>(
                                                                        context)),
                                                            BlocProvider.value(
                                                                value: BlocProvider
                                                                    .of<ContactsblocBloc>(
                                                                        context))
                                                          ],
                                                          child: EmergencyContactsPage(
                                                              emergencyContact:
                                                                  emergencyContact3,
                                                              idUser: state
                                                                  .userID)),
                                                    ));
                                                  },
                                                  child: Icon(Icons.edit)),
                                              SizedBox(width: 10),
                                              ElevatedButton(
                                                  onPressed: () {
                                                    BlocProvider.of<
                                                                ContactsblocBloc>(
                                                            context)
                                                        .add(DeleteContactEvent(
                                                            emergencyContact3
                                                                .uniqueid));
                                                  },
                                                  child: Icon(Icons.delete)),
                                            ],
                                          )
                                        ],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ),
              );
            },
          )),
    );
  }
}
