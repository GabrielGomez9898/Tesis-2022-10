import 'package:flutter/material.dart';

class ButtonHyperlink extends StatelessWidget {
  final String text;
  final VoidCallback press;

  const ButtonHyperlink({
    required this.text,
    required this.press,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      child: ClipRRect(
        child: buttonAction(),
      ),
    );
  }

  Widget buttonAction() {
    return ElevatedButton(
      child: Text(
        text,
      ),
      onPressed: press,
      style: ElevatedButton.styleFrom(
          primary: Color.fromRGBO(0, 40, 54, 1),
          padding: EdgeInsets.symmetric(horizontal: 5, vertical: 1),
          textStyle: TextStyle(
              decoration: TextDecoration.underline,
              color: Colors.white,
              fontSize: 14,
              fontWeight: FontWeight.w400)),
    );
  }
}
