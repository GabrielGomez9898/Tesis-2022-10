import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/login.dart';
import 'package:vision_civil/src/ui/profile.dart';

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
              onPressed: () async {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (_) => BlocProvider.value(
                      value: BlocProvider.of<UserBloc>(context),
                      child: Profile()),
                ));
              },
            ),
            IconButton(
              icon: Icon(Icons.logout),
              onPressed: () {
                auth.signOut();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (_) => BlocProvider.value(
                      value: BlocProvider.of<UserBloc>(context),
                      child: Login()),
                ));
              },
            )
          ],
        ),
        body: BlocBuilder<UserBloc, UserblocState>(
          builder: (context, state) {
            return Text('id user: ' +
                state.userID +
                ' ' +
                state.loginAchieved.toString());
          },
        ));
  }
}
