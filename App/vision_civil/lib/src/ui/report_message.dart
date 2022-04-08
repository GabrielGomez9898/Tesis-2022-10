import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/contacts_bloc/contactsbloc_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/home.dart';

class ReportMessage extends StatefulWidget {
  const ReportMessage({Key? key}) : super(key: key);

  @override
  State<ReportMessage> createState() => _ReportMessageState();
}

class _ReportMessageState extends State<ReportMessage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Reporte generado"),
        automaticallyImplyLeading: false,
      ),
      body: Column(
        children: [
          SizedBox(
            width: 200,
            height: 180,
            child: Card(
              color: Colors.yellowAccent,
              child: Text(
                  "Reporte generado, las autoridades ya recibieron su llamado y pronto será atendido"),
            ),
          ),
          SizedBox(height: 100),
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (_) => MultiBlocProvider(providers: [
                    BlocProvider.value(
                        value: BlocProvider.of<UserBloc>(context)),
                    BlocProvider(
                        create: (BuildContext context) => ReportBloc()),
                    BlocProvider(
                        create: (BuildContext context) => ContactsblocBloc())
                  ], child: HomePage()),
                ));
              },
              child: Text("Volver al Menú"))
        ],
      ),
    );
  }
}
