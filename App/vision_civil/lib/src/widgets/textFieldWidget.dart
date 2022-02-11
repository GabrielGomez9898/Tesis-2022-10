import 'package:flutter/material.dart';

class TextFieldFuntion extends StatelessWidget {
  final String _email = "";
  final String hintText;
  final IconData icon;
  final ValueChanged<String> onChanged;
  final TextInputType tipo;

  TextFieldFuntion({
    required this.hintText,
    this.icon = Icons.person,
    required this.onChanged,
    required this.tipo,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 50, vertical: 10),
      child: TextField(
        keyboardType: tipo,
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
              color: Colors.red,
            ),
            //hace falta poner color blanco
          ),
        ),
        onChanged: onChanged,
      ),
    );
  }
}
