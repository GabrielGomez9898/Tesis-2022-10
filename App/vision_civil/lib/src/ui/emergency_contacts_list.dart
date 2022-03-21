import 'package:flutter/material.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/models/emergency_contact.dart';

/*No borrar comentarios de ignore*/
// ignore: must_be_immutable
class EmergencyContactsPage extends StatefulWidget {
  EmergencyContactsPage(
      {Key? key, required this.emergencyContact, required this.idUser})
      : super(key: key);
  EmergencyContact emergencyContact;
  String idUser;
  @override
  EmergencyContactsPageState createState() => EmergencyContactsPageState();
}

class EmergencyContactsPageState extends State<EmergencyContactsPage> {
  List<Contact> contacts = [];

  Future<PermissionStatus> _getPermission() async {
    PermissionStatus status = await Permission.contacts.request();
    print(status.toString());

    if (status == PermissionStatus.granted) {
      return PermissionStatus.granted;
    } else {
      return PermissionStatus.denied;
    }
  }

  getAllContacts() async {
    final PermissionStatus permissionStatus = await _getPermission();
    if (permissionStatus == PermissionStatus.granted) {
      List<Contact> _contacts =
          (await ContactsService.getContacts(withThumbnails: false)).toList();
      setState(() {
        contacts = _contacts;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    getAllContacts();
  }

  @override
  Widget build(BuildContext context) {
    String? displayContactName;
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Contactos de emergencia"),
        ),
        body: ListView.builder(
          shrinkWrap: true,
          itemCount: contacts.length,
          itemBuilder: (context, index) {
            Contact contact = contacts[index];
            String phone = " ";
            var contactName = "Contacto desconocido";
            
            try {
              phone = contact.phones!.first.value.toString();
              contactName = contact.displayName!;
            } catch (e) {
              phone = " ";
              contactName = "Contacto desconocido";
            }
            return ListTile(
              title: Text(contactName),
              subtitle: phone != " " ? Text(phone) : Text("no phone"),
              onTap: () {
                
                if (widget.emergencyContact.uniqueid == " ") {
                  BlocProvider.of<ContactsblocBloc>(context).add(
                      AddContactEvent(
                          contactName, phone, widget.idUser));
                  Navigator.pop(context);
                } else {
                  BlocProvider.of<ContactsblocBloc>(context).add(
                      UpdateContactEvent(widget.emergencyContact.uniqueid,
                          contactName, phone));
                  Navigator.pop(context);
                }
              },
            );
          },
        ));
  }
}

showNewEmergencyContact(BuildContext context, name, phone) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.pop(context);
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text('Contacto de emrgencia agregado'),
    content: Text('Nombre: ' + name + '\n' + 'Celular: ' + phone),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}
