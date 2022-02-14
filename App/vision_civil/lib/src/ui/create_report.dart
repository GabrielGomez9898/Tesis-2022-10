import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';

class CreateReport extends StatefulWidget {
  @override
  CreateReportState createState() => CreateReportState();
}

class CreateReportState extends State<CreateReport> {
  bool hurtoViviendaSelected = false;
  bool hurtoPersonaSelected = false;
  bool hurtoVehiculoSelected = false;
  bool vandalismoSelected = false;
  bool violacionSelected = false;
  bool agresionSelected = false;
  bool homicidioSelected = false;
  bool otroSelected = false;
  DateTime now = DateTime.now();

  String _tipoReporte = " ",
      _asunto = " ",
      _descripcion = " ",
      _fechaHora = " ";

  @override
  Widget build(BuildContext context) {
    _fechaHora = now.year.toString() +
        '/' +
        now.month.toString() +
        '/' +
        now.day.toString() +
        ' ' +
        ' | ' +
        now.hour.toString() +
        ':' +
        now.minute.toString();
    return Scaffold(
      appBar: AppBar(
        title: Text("Crear Reporte"),
      ),
      body: Column(
        children: [
          Text("Completa el formulario"),
          Text("Seleccione el motivo de su reporte"),
          Row(
            children: [
              ElevatedButton(
                  style: hurtoViviendaSelected == true
                      ? ElevatedButton.styleFrom(primary: Colors.green)
                      : ElevatedButton.styleFrom(primary: Colors.grey),
                  onPressed: () {
                    setState(() {
                      hurtoViviendaSelected = true;
                      hurtoPersonaSelected = false;
                      hurtoVehiculoSelected = false;
                      vandalismoSelected = false;
                      violacionSelected = false;
                      agresionSelected = false;
                      homicidioSelected = false;
                      otroSelected = false;
                      _tipoReporte = "HURTO_VIVIENDA";
                    });
                  },
                  child: Text("Hurto Vivienda")),
              SizedBox(width: 10),
              ElevatedButton(
                  style: hurtoPersonaSelected == true
                      ? ElevatedButton.styleFrom(primary: Colors.green)
                      : ElevatedButton.styleFrom(primary: Colors.grey),
                  onPressed: () {
                    setState(() {
                      hurtoViviendaSelected = false;
                      hurtoPersonaSelected = true;
                      hurtoVehiculoSelected = false;
                      vandalismoSelected = false;
                      violacionSelected = false;
                      agresionSelected = false;
                      homicidioSelected = false;
                      otroSelected = false;
                      _tipoReporte = "HURTO_PERSONA";
                    });
                  },
                  child: Text("Hurto Persona")),
              SizedBox(width: 10),
              ElevatedButton(
                  style: hurtoVehiculoSelected == true
                      ? ElevatedButton.styleFrom(primary: Colors.green)
                      : ElevatedButton.styleFrom(primary: Colors.grey),
                  onPressed: () {
                    setState(() {
                      hurtoViviendaSelected = false;
                      hurtoPersonaSelected = false;
                      hurtoVehiculoSelected = true;
                      vandalismoSelected = false;
                      violacionSelected = false;
                      agresionSelected = false;
                      homicidioSelected = false;
                      otroSelected = false;
                      _tipoReporte = "HURTO_VEHICULO";
                    });
                  },
                  child: Text("Hurto Vehiculo")),
            ],
          ),
          Row(
            children: [
              ElevatedButton(
                  style: vandalismoSelected == true
                      ? ElevatedButton.styleFrom(primary: Colors.green)
                      : ElevatedButton.styleFrom(primary: Colors.grey),
                  onPressed: () {
                    setState(() {
                      hurtoViviendaSelected = false;
                      hurtoPersonaSelected = false;
                      hurtoVehiculoSelected = false;
                      vandalismoSelected = true;
                      violacionSelected = false;
                      agresionSelected = false;
                      homicidioSelected = false;
                      otroSelected = false;
                      _tipoReporte = "VANDALISMO";
                    });
                  },
                  child: Text("Vandalismo")),
              SizedBox(width: 30),
              ElevatedButton(
                  style: violacionSelected == true
                      ? ElevatedButton.styleFrom(primary: Colors.green)
                      : ElevatedButton.styleFrom(primary: Colors.grey),
                  onPressed: () {
                    setState(() {
                      hurtoViviendaSelected = false;
                      hurtoPersonaSelected = false;
                      hurtoVehiculoSelected = false;
                      vandalismoSelected = false;
                      violacionSelected = true;
                      agresionSelected = false;
                      homicidioSelected = false;
                      otroSelected = false;
                      _tipoReporte = "VIOLACION";
                    });
                  },
                  child: Text("Violación")),
              SizedBox(width: 40),
              ElevatedButton(
                  style: agresionSelected == true
                      ? ElevatedButton.styleFrom(primary: Colors.green)
                      : ElevatedButton.styleFrom(primary: Colors.grey),
                  onPressed: () {
                    setState(() {
                      hurtoViviendaSelected = false;
                      hurtoPersonaSelected = false;
                      hurtoVehiculoSelected = false;
                      vandalismoSelected = false;
                      violacionSelected = false;
                      agresionSelected = true;
                      homicidioSelected = false;
                      otroSelected = false;
                      _tipoReporte = "AGRESION";
                    });
                  },
                  child: Text("Agresión")),
            ],
          ),
          Row(children: [
            ElevatedButton(
                style: homicidioSelected == true
                    ? ElevatedButton.styleFrom(primary: Colors.green)
                    : ElevatedButton.styleFrom(primary: Colors.grey),
                onPressed: () {
                  setState(() {
                    hurtoViviendaSelected = false;
                    hurtoPersonaSelected = false;
                    hurtoVehiculoSelected = false;
                    vandalismoSelected = false;
                    violacionSelected = false;
                    agresionSelected = false;
                    homicidioSelected = true;
                    otroSelected = false;
                    _tipoReporte = "HOMICIDIO";
                  });
                },
                child: Text("Homicidio")),
            SizedBox(width: 40),
            ElevatedButton(
                style: otroSelected == true
                    ? ElevatedButton.styleFrom(primary: Colors.green)
                    : ElevatedButton.styleFrom(primary: Colors.grey),
                onPressed: () {
                  setState(() {
                    hurtoViviendaSelected = false;
                    hurtoPersonaSelected = false;
                    hurtoVehiculoSelected = false;
                    vandalismoSelected = false;
                    violacionSelected = false;
                    agresionSelected = false;
                    homicidioSelected = false;
                    otroSelected = true;
                    _tipoReporte = "OTRO";
                  });
                },
                child: Text("Otro")),
          ]),
          TextField(
            decoration: InputDecoration(hintText: 'Asunto'),
            onChanged: (value) {
              setState(() {
                _asunto = value.trim();
              });
            },
          ),
          TextField(
            decoration: InputDecoration(hintText: 'Descripción'),
            onChanged: (value) {
              setState(() {
                _descripcion = value.trim();
              });
            },
          ),
          TextFormField(
            initialValue: _fechaHora,
            enabled: false,
          ),
          ElevatedButton(
              onPressed: () {
                BlocProvider.of<ReportBloc>(context).add(CreateRepotEvent(
                    _tipoReporte,
                    _asunto,
                    _descripcion,
                    _fechaHora,
                    "_lat",
                    "_lon"));
              },
              child: Text("Generar reporte"))
        ],
      ),
    );
  }
}
