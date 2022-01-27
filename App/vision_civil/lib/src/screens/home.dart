import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:vision_civil/src/screens/login.dart';

class HomePage extends StatefulWidget {
  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<HomePage> {
  final auth = FirebaseAuth.instance;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home Visión Civil"),
      ),
      body: Column(
        children: [
          Text("Bienvenido a Visión Civil"),
          ElevatedButton(
              child: Text("Cerrar Sesión"),
              onPressed: () {
                auth.signOut();
                Navigator.of(context).pushReplacement(
                    MaterialPageRoute(builder: (context) => Login()));
              })
        ],
      ),
    );
  }
}
