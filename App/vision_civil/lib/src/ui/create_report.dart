import 'package:flutter/material.dart';

class CreateReport extends StatefulWidget {
  @override
  CreateReportState createState() => CreateReportState();
}

class CreateReportState extends State<CreateReport> {
  @override
  Widget build(BuildContext context) {
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
                  onPressed: () {
                    print("Selecciono hurto vivienda");
                  },
                  child: Text("Hurto Vivienda")),
              SizedBox(width: 10),
              ElevatedButton(
                  onPressed: () {
                    print("Selecciono hurto persona");
                  },
                  child: Text("Hurto Persona")),
            ],
          ),
          ElevatedButton(
              onPressed: () {
                print("Selecciono hurto vehiculo");
              },
              child: Text("Hurto Vehiculo")),
          ElevatedButton(
              onPressed: () {
                print("Selecciono vandalismo");
              },
              child: Text("Vandalismo")),
          ElevatedButton(
              onPressed: () {
                print("Selecciono violación");
              },
              child: Text("Violación")),
        ],
      ),
    );
  }
}
