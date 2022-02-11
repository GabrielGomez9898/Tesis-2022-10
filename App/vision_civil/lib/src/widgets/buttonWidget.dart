import 'package:flutter/material.dart';

class ButtoWidget extends StatelessWidget {
  final String text;
  final VoidCallback press;
  final Color textColor;

  const ButtoWidget({
    required this.text,
    required this.press,
    this.textColor = Colors.black,
  });

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(40),
        child: buttonAction(),
      ),
    );
  }

  Widget buttonAction() {
    return ElevatedButton(
      child: Text(
        text,
        style: TextStyle(color: textColor),
      ),
      onPressed: press,
      style: ElevatedButton.styleFrom(
          primary: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 30, vertical: 17),
          textStyle: TextStyle(
              color: textColor, fontSize: 14, fontWeight: FontWeight.w500)),
    );
  }
}
