import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:vision_civil/src/app.dart';
//import 'package:google_fonts/google_fonts.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(App());
}
