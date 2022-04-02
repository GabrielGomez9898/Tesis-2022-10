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
    return Container(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(40.0),
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
          minimumSize: Size(100, 47),
          primary: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
          textStyle: TextStyle(
              color: textColor, fontSize: 13, fontWeight: FontWeight.w500)),
    );
  }
}
