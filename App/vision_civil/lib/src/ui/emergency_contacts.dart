import 'package:flutter/material.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:permission_handler/permission_handler.dart';

class ContactsPage extends StatefulWidget {
  @override
  ContactsPageState createState() => ContactsPageState();
}

class ContactsPageState extends State<ContactsPage> {
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
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Column(
          children: <Widget>[
            Text("Contactos"),
            TextFormField(
              initialValue: "Gabriel",
            ),
            TextFormField(
              initialValue: "Juan",
            ),
            TextFormField(
              initialValue: "Diego",
            ),
            ListView.builder(
              shrinkWrap: true,
              itemCount: contacts.length,
              itemBuilder: (context, index) {
                Contact contact = contacts[index];
                String phone = " ";
                try {
                  phone = contact.phones!.first.value.toString();
                  print(phone);
                } catch (e) {
                  print(e.toString());
                  phone = " ";
                }
                return ListTile(
                  title: Text(contact.displayName!),
                  subtitle: phone != " " ? Text(phone) : Text("no phone"),
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
