import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/bloc/registerbloc_bloc.dart';
import 'package:vision_civil/src/ui/login.dart';

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
        centerTitle: true,
        title: Text("Home Visión Civil"),
        leading: IconButton(
          icon: Icon(Icons.menu),
          onPressed: () {},
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.accessibility),
            onPressed: () {
              //Navigator.of(context).pushReplacement(MaterialPageRoute(
              // builder: (context) =>
              //   Profile(currentUser: widget.currentUser)));
            },
          ),
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              auth.signOut();
              Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => Login()));
            },
          )
        ],
      ),
      body: BlocBuilder<RegisterblocBloc, RegisterState>(
        builder: (context, state) {
          return Column(
            children: [
              Text("Bienvenido a Visión Civil"),
              Text("Current ID USER: " + state.userID),
            ],
          );
        },
      ),
    );
  }
}
