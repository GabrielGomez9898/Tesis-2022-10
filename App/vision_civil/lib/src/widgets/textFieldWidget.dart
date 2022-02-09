import 'package:flutter/material.dart';

class TextFieldFuntion extends StatelessWidget {
  final String _email = "";
  final String hintText;
  final IconData icon;
  final ValueChanged<String> onChanged;

  TextFieldFuntion({
    required this.hintText,
    this.icon = Icons.person,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 50, vertical: 10),
      child: TextField(
        keyboardType: TextInputType.emailAddress,
        decoration: InputDecoration(
          prefixIcon: Icon(
            icon,
            color: Colors.black,
          ),
          hintText: hintText,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(40.0),
            //hace falta poner color blanco
          ),
        ),
        onChanged: onChanged,
      ),
    );
  }
}
