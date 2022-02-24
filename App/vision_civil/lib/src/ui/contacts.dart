import 'package:flutter/material.dart';
import 'package:vision_civil/src/ui/emergency_contacts_list.dart';

class ContactsPage extends StatefulWidget {
  @override
  ContactsPageState createState() => ContactsPageState();
}

class ContactsPageState extends State<ContactsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Contactos de emergencia"),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Text("Mis contactos"),
              Row(
                children: [
                  SizedBox(width: 50),
                  Text("Gabriel Gomez"),
                  SizedBox(width: 50),
                  ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => EmergencyContactsPage()),
                        );
                      },
                      child: Text("Cambiar contacto"))
                ],
              ),
              Row(
                children: [
                  SizedBox(width: 50),
                  Text("Diego Burgos"),
                  SizedBox(width: 50),
                  ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => EmergencyContactsPage()),
                        );
                      },
                      child: Text("Cambiar contacto"))
                ],
              ),
              Row(
                children: [
                  SizedBox(width: 50),
                  Text("Juan Pablo Mendez"),
                  SizedBox(width: 50),
                  ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => EmergencyContactsPage()),
                        );
                      },
                      child: Text("Cambiar contacto"))
                ],
              ),
            ],
          ),
        ));
  }
}
