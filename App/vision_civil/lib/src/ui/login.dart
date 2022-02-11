import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';
import 'package:vision_civil/src/ui/register.dart';
import 'package:vision_civil/src/widgets/textFieldWidget.dart';
import 'package:vision_civil/src/widgets/buttonWidget.dart';

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
      child: Container(
        decoration: BoxDecoration(
            image: DecorationImage(
                image: AssetImage("assets/images/vision_civil.jpg"),
                fit: BoxFit.cover)),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: true,
            title: Text("Login"),
          ),
          body: Column(
            children: [
              SizedBox(height: 150),
              TextFieldFuntion(
                hintText: 'Correo electronico',
                onChanged: (String value) {
                  setState(() {
                    _email = value.trim();
                  });
                },
                icon: Icons.account_circle,
                tipo: TextInputType.emailAddress,
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
                tipo: TextInputType.visiblePassword,
              ),
              SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  ButtoWidget(
                      text: "Iniciar sesión",
                      textColor: Colors.black,
                      press: () {
                        setState(() {
                          _loginText = "Validando usuario...";
                        });
                        BlocProvider.of<UserBloc>(context)
                            .add(LoginEvent(_email, _password));
                      }),
                  ButtoWidget(
                      text: "Crear cuenta",
                      textColor: Colors.black,
                      press: () {
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (_) => BlocProvider.value(
                              value: BlocProvider.of<UserBloc>(context),
                              child: Register()),
                        ));
                      }),
                ],
              ),
              Text(_loginText)
            ],
          ),
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
