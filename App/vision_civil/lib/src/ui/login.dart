import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';
import 'package:vision_civil/src/ui/register.dart';
import 'package:vision_civil/src/widgets/textFieldWidget.dart';

class Login extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<Login> {
  String _email = "", _password = "", _loginText = "";
  final auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return BlocListener<UserBloc, UserblocState>(
      listener: (context, state) {
        switch (state.loginAchieved) {
          case true:
            Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => BlocProvider.value(
                  value: BlocProvider.of<UserBloc>(context), child: HomePage()),
            ));
            break;
          case false:

            //pendiente de mostrar un mensaje de mala autenticacion
            Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => BlocProvider.value(
                  value: BlocProvider.of<UserBloc>(context), child: Login()),
            ));
            break;
          default:
        }
      },
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Login"),
        ),
        body: Column(
          children: [
            SizedBox(height: 100),
            TextFieldFuntion(
              hintText: 'Correo electronico',
              onChanged: (String value) {
                setState(() {
                  _email = value.trim();
                });
              },
              icon: Icons.account_circle,
            ),
            SizedBox(height: 3),
            TextFieldFuntion(
              hintText: 'Contraseña',
              onChanged: (value) {
                setState(() {
                  _password = value.trim();
                });
              },
              icon: Icons.password,
            ),
            SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                    child: Text('Iniciar Sesión'),
                    onPressed: () {
                      setState(() {
                        _loginText = "Validando usuario...";
                      });

                      //signIn(auth, _email, _password, context);
                      BlocProvider.of<UserBloc>(context)
                          .add(LoginEvent(_email, _password));

                      //sleep(const Duration(seconds: 2));
                    }),
                ElevatedButton(
                    child: Text('Crear cuenta'),
                    onPressed: () {
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (_) => BlocProvider.value(
                            value: BlocProvider.of<UserBloc>(context),
                            child: Register()),
                      ));
                    })
              ],
            ),
            Text(_loginText)
          ],
        ),
      ),
    );
  }
}

showAlertDialog(BuildContext context) {
  // set up the button
  Widget okButton = TextButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.pop(context);
    },
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("Usuario no encontrado"),
    content: Text('El usuario o contraseña puede estar mal escrito'),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}
