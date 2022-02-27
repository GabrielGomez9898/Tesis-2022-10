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
  EmergencyContact emergencyContact1 =
      new EmergencyContact(" ", "Cargando...", " ");
  EmergencyContact emergencyContact2 =
      new EmergencyContact(" ", "Cargando... ", " ");
  EmergencyContact emergencyContact3 =
      new EmergencyContact(" ", "Cargando... ", " ");
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
                      emergencyContact1
                          .setUniqueId(state.emergencyUserContacts[0].uniqueid);
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
                      emergencyContact2
                          .setUniqueId(state.emergencyUserContacts[1].uniqueid);
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
                      emergencyContact3
                          .setUniqueId(state.emergencyUserContacts[2].uniqueid);
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
                child: Column(
                  children: [
                    Text("Mis contactos"),
                    Row(
                      children: [
                        SizedBox(width: 50),
                        Text(emergencyContact1.contactName),
                        SizedBox(width: 50),
                        BlocBuilder<UserBloc, UserblocState>(
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
                                              value: BlocProvider.of<
                                                  ContactsblocBloc>(context))
                                        ],
                                        child: EmergencyContactsPage(
                                            emergencyContact: emergencyContact1,
                                            idUser: state.userID)),
                                  ));
                                },
                                child: Text("Cambiar contacto"));
                          },
                        )
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(width: 50),
                        Text(emergencyContact2.contactName),
                        SizedBox(width: 50),
                        BlocBuilder<UserBloc, UserblocState>(
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
                                              value: BlocProvider.of<
                                                  ContactsblocBloc>(context))
                                        ],
                                        child: EmergencyContactsPage(
                                            emergencyContact: emergencyContact2,
                                            idUser: state.userID)),
                                  ));
                                },
                                child: Text("Cambiar contacto"));
                          },
                        )
                      ],
                    ),
                    Row(
                      children: [
                        SizedBox(width: 50),
                        Text(emergencyContact3.contactName),
                        SizedBox(width: 50),
                        BlocBuilder<UserBloc, UserblocState>(
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
                                              value: BlocProvider.of<
                                                  ContactsblocBloc>(context))
                                        ],
                                        child: EmergencyContactsPage(
                                            emergencyContact: emergencyContact3,
                                            idUser: state.userID)),
                                  ));
                                },
                                child: Text("Cambiar contacto"));
                          },
                        )
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
