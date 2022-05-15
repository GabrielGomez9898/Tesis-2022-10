import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';
import 'package:vision_civil/src/ui/register.dart';
import 'package:vision_civil/src/widgets/buttonHyperlink.dart';
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
    double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      decoration: BoxDecoration(
          //mirar resolucion porque se desaparece logo
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: true,
          title: Text("¡Bienvenido!"),
          automaticallyImplyLeading: false,
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: screenWidth * 0.24),
              Container(
                child: Image.asset('assets/images/LogoConNombre.jpg',
                    width: 260.0, height: 110.0, scale: 1),
              ),
              SizedBox(height: screenWidth * 0.2),
              TextFieldFuntion(
                hintText: 'Correo electrónico',
                onChanged: (String value) {
                  setState(() {
                    _email = value.trim();
                  });
                },
                icon: Icons.account_circle,
                tipo: TextInputType.emailAddress,
                obsText: false,
              ),
              SizedBox(height: screenWidth * 0.03),
              TextFieldFuntion(
                hintText: 'Contraseña',
                onChanged: (value) {
                  setState(() {
                    _password = value.trim();
                  });
                },
                icon: Icons.password,
                tipo: TextInputType.visiblePassword,
                obsText: true,
              ),
              SizedBox(
                height: screenWidth * 0.09,
              ),
              ButtoWidget(
                  text: "Ingresar",
                  textColor: Colors.black,
                  press: () async {
                    setState(() {
                      _loginText = "Validando usuario...";
                    });
                    try {
                      await FirebaseAuth.instance.signInWithEmailAndPassword(
                        email: _email,
                        password: _password,
                      );
                      print("usuario valido");
                      BlocProvider.of<UserBloc>(context)
                          .add(LoginEvent(_email, _password));
                      Navigator.of(context).push(MaterialPageRoute(
                        builder: (_) => MultiBlocProvider(providers: [
                          BlocProvider.value(
                              value: BlocProvider.of<UserBloc>(context)),
                          BlocProvider(
                              create: (BuildContext context) => ReportBloc()),
                          BlocProvider(
                              create: (BuildContext context) =>
                                  ContactsblocBloc())
                        ], child: HomePage()),
                      ));
                    } on FirebaseAuthException catch (e) {
                      invalidUserAlert(context);
                      print(e.toString());
                      print("usuario no valido");
                      setState(() {
                        _loginText = "Ingrese sus credenciales nuevamente";
                      });
                    }
                  }),
              SizedBox(height: screenWidth * 0.08),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "¿No tienes cuenta?  |",
                    style: TextStyle(color: Colors.white),
                  ),
                  SizedBox(
                    width: 110,
                    height: 30,
                    child: ButtonHyperlink(
                        text: "Regístrate",
                        press: () {
                          Navigator.of(context).push(MaterialPageRoute(
                            builder: (_) => BlocProvider.value(
                                value: BlocProvider.of<UserBloc>(context),
                                child: Register()),
                          ));
                        }),
                  ),
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Text(
                _loginText,
                style: TextStyle(color: Colors.white),
              )
            ],
          ),
        ),
      ),
    );
  }
}

//se puede usar para el usuario o contraseña incorrectos
invalidUserAlert(BuildContext context) {
  // set up the button
  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text('Error al iniciar'),
    content: Text('Puede que su correo o contraseña esten mal.'),
  );

  // show the dialog
  showDialog(
      context: context,
      builder: (context) {
        Future.delayed(Duration(seconds: 2), () {
          Navigator.of(context).pop(true);
        });
        return alert;
      });
}
