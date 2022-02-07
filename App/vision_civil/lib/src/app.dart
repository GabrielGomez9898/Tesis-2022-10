import 'package:flutter/material.dart';
import 'package:vision_civil/src/ui/login.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Scaffold(body: Login()),
    );
  }
}
