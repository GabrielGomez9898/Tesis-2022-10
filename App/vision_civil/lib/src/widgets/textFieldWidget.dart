import 'package:flutter/material.dart';

class TextFieldFuntion extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final ValueChanged<String> onChanged;
  final TextInputType tipo;
  final bool obsText;
  bool? enablded = true;

  TextFieldFuntion(
      {required this.hintText,
      this.icon = Icons.person,
      required this.onChanged,
      required this.tipo,
      required this.obsText,
      this.enablded});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 30, vertical: 10),
      child: TextField(
        keyboardType: tipo,
        obscureText: obsText,
        enabled: enablded,
        decoration: InputDecoration(
          prefixIcon: Icon(
            icon,
            color: Colors.white,
          ),
          fillColor: Color.fromRGBO(255, 255, 255, 0.4),
          filled: true,
          hintText: hintText,
          hintStyle: TextStyle(fontSize: 16.0, color: Colors.white),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(40.0),
            borderSide: BorderSide(
              color: Colors.white,
            ),
            //hace falta poner color blanco
          ),
        ),
        style: TextStyle(
          height: 0.7,
        ),
        onChanged: onChanged,
      ),
    );
  }
}
