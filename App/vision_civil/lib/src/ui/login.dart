import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
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
    Size size = MediaQuery.of(context).size;
    return BlocListener<UserBloc, UserblocState>(
      listener: (context, state) {
        switch (state.loginAchieved) {
          case true:
            Navigator.of(context).push(MaterialPageRoute(
              builder: (_) => MultiBlocProvider(providers: [
                BlocProvider.value(value: BlocProvider.of<UserBloc>(context)),
                BlocProvider(
                    create: (BuildContext context) => ContactsblocBloc())
              ], child: HomePage()),
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
            //mirar resolucion porque se desaparece logo
            image: DecorationImage(
                image: AssetImage("assets/images/fondo.jpg"),
                fit: BoxFit.cover)),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: true,
            title: Text("¡Bienvenidos!"),
            automaticallyImplyLeading: false,
          ),
          body: SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  child: Image.asset('assets/images/LogoConNombre.jpg',
                      width: 260.0, height: 190.0, scale: 1),
                ),
                SizedBox(height: size.height * 0.1),
                TextFieldFuntion(
                  hintText: 'Correo electronico',
                  onChanged: (String value) {
                    setState(() {
                      _email = value.trim();
                    });
                  },
                  icon: Icons.account_circle,
                  tipo: TextInputType.emailAddress,
                  obsText: false,
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
                  obsText: true,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    SizedBox(
                      width: 230,
                      height: 20,
                      child: ButtonHyperlink(
                          text: "¿Olvidaste tu contraseña?", press: () => true),
                    ),
                  ],
                ),
                SizedBox(
                  height: size.height * 0.09,
                ),
                ButtoWidget(
                    text: "Ingresar",
                    textColor: Colors.black,
                    press: () {
                      setState(() {
                        _loginText = "Validando usuario...";
                      });
                      BlocProvider.of<UserBloc>(context)
                          .add(LoginEvent(_email, _password));
                    }),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "¿No tienes cuenta?    |",
                      style: TextStyle(color: Colors.white),
                    ),
                    SizedBox(
                      width: 100,
                      height: 20,
                      child: ButtonHyperlink(
                          text: "Registrarse",
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
                Text(_loginText)
              ],
            ),
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
