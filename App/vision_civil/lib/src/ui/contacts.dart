import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/emergency_contacts_list.dart';

class ContactsPage extends StatefulWidget {
  @override
  ContactsPageState createState() => ContactsPageState();
}

class ContactsPageState extends State<ContactsPage> {
  String uniqueContact1 = " ",
      contactName1 = "Cargando...",
      contactPhone1 = " ";
  String uniqueContact2 = " ",
      contactName2 = "Cargando...",
      contactPhone2 = " ";
  String uniqueContact3 = " ",
      contactName3 = "Cargando...",
      contactPhone3 = " ";
  int contactID1 = 0, contactID2 = 0, contactID3 = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                      uniqueContact1 = state.emergencyUserContacts[0].id;
                      contactID1 = state.emergencyUserContacts[0].contact;
                      contactName1 = state.emergencyUserContacts[0].contactName;
                      contactPhone1 =
                          state.emergencyUserContacts[0].contactPhone;
                    } catch (e) {
                      uniqueContact1 = " ";
                      contactName1 = " ";
                    }
                    try {
                      uniqueContact2 = state.emergencyUserContacts[1].id;
                      contactID2 = state.emergencyUserContacts[1].contact;
                      contactName2 = state.emergencyUserContacts[1].contactName;
                      contactPhone2 =
                          state.emergencyUserContacts[1].contactPhone;
                    } catch (e) {
                      uniqueContact2 = " ";
                      contactName2 = " ";
                    }
                    try {
                      uniqueContact3 = state.emergencyUserContacts[2].id;
                      contactID3 = state.emergencyUserContacts[2].contact;
                      contactName3 = state.emergencyUserContacts[2].contactName;
                      contactPhone3 =
                          state.emergencyUserContacts[2].contactPhone;
                    } catch (e) {
                      uniqueContact3 = " ";
                      contactName3 = " ";
                    }
                  });
                },
                child: Column(
                  children: [
                    Text("Mis contactos"),
                    Row(
                      children: [
                        SizedBox(width: 50),
                        Text(contactName1),
                        SizedBox(width: 50),
                        ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (_) => MultiBlocProvider(
                                    providers: [
                                      BlocProvider.value(
                                          value: BlocProvider.of<UserBloc>(
                                              context)),
                                      BlocProvider.value(
                                          value:
                                              BlocProvider.of<ContactsblocBloc>(
                                                  context))
                                    ],
                                    child: EmergencyContactsPage(
                                        uniqueIDContact: uniqueContact1)),
                              ));
                            },
                            child: Text("Cambiar contacto"))
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(width: 50),
                        Text(contactName2),
                        SizedBox(width: 50),
                        ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (_) => MultiBlocProvider(
                                    providers: [
                                      BlocProvider.value(
                                          value: BlocProvider.of<UserBloc>(
                                              context)),
                                      BlocProvider.value(
                                          value:
                                              BlocProvider.of<ContactsblocBloc>(
                                                  context))
                                    ],
                                    child: EmergencyContactsPage(
                                        uniqueIDContact: uniqueContact2)),
                              ));
                            },
                            child: Text("Cambiar contacto"))
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(width: 50),
                        Text(contactName3),
                        SizedBox(width: 50),
                        ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (_) => MultiBlocProvider(
                                    providers: [
                                      BlocProvider.value(
                                          value: BlocProvider.of<UserBloc>(
                                              context)),
                                      BlocProvider.value(
                                          value:
                                              BlocProvider.of<ContactsblocBloc>(
                                                  context))
                                    ],
                                    child: EmergencyContactsPage(
                                        uniqueIDContact: uniqueContact3)),
                              ));
                            },
                            child: Text("Cambiar contacto"))
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        ));
  }
}
