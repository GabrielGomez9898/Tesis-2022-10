import 'package:flutter/material.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:permission_handler/permission_handler.dart';

class EmergencyContactsPage extends StatefulWidget {
  @override
  EmergencyContactsPageState createState() => EmergencyContactsPageState();
}

class EmergencyContactsPageState extends State<EmergencyContactsPage> {
  String _newEmerContactName = "";
  String _newEmerContactPhone = "";
  List<Contact> contacts = [];

  Future<PermissionStatus> _getPermission() async {
    print("entro a pedir permiso");
    PermissionStatus status = await Permission.contacts.request();
    print(status.toString());

    if (status == PermissionStatus.granted) {
      return PermissionStatus.granted;
    } else {
      return PermissionStatus.denied;
    }
  }

  getAllContacts() async {
    print("entro getAllContacts");
    final PermissionStatus permissionStatus = await _getPermission();
    if (permissionStatus == PermissionStatus.granted) {
      print("entro al permsio");
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
            try {
              phone = contact.phones!.first.value.toString();
            } catch (e) {
              phone = " ";
            }
            return ListTile(
              title: Text(contact.displayName!),
              subtitle: phone != " " ? Text(phone) : Text("no phone"),
              onTap: () {
                setState(() {
                  _newEmerContactName = contact.displayName!;
                  _newEmerContactPhone = phone;
                  showNewEmergencyContact(
                      context, _newEmerContactName, _newEmerContactPhone);
                });
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
