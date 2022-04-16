import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';

import '../widgets/buttonWidget.dart';

class ReportMessage extends StatefulWidget {
  const ReportMessage({Key? key}) : super(key: key);

  @override
  State<ReportMessage> createState() => _ReportMessageState();
}

class _ReportMessageState extends State<ReportMessage> {
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Reporte generado"),
          automaticallyImplyLeading: false,
        ),
        backgroundColor: Colors.transparent,
        body: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  child: Column(
                    children: [
                      Container(
                        width: screenWidth * 0.7,
                        height: screenheight * 0.35,
                        decoration: new BoxDecoration(
                          color: Color.fromARGB(255, 255, 255, 255),
                          border: Border.all(
                              width: 5, color: Color.fromARGB(199, 0, 20, 55)),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Column(
                          children: [
                            SizedBox(height: screenheight * 0.02),
                            Container(
                              child: Image.asset('assets/images/logoPNG.png',
                                  width: 100.0, height: 100.0, scale: 1.0),
                            ),
                            SizedBox(height: screenheight * 0.02),
                            Text(
                              "Reporte generado exitosamente!! Las autoridades ya recibieron su solicitud y pronto será atendido.",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  fontSize: 17.0,
                                  color: Color.fromARGB(255, 1, 11, 37),
                                  fontWeight: FontWeight.w500),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: screenheight * 0.06),
                ElevatedButton(
                    onPressed: () {
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
                    },
                    child: Text("Volver al Menú"))
              ],
            ),
          ],
        ),
      ),
    );
  }
}
