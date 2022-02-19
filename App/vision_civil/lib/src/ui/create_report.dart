import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:location/location.dart';

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
  final maxLinesDescription = 5;
  final maxLinesTitle = 3;
  DateTime now = DateTime.now();

  String _tipoReporte = " ",
      _asunto = " ",
      _descripcion = " ",
      _fechaHora = " ";

  var imagePicker = new ImagePicker();
  var type;
  File _image = File("nullpath");

  var location = new Location();
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
    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          title: Text("Crear Reporte"),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          child: Container(
            margin: const EdgeInsets.only(left: 5.0, right: 5.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 30),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      child: Image.asset('assets/images/logo.jpg',
                          width: 100.0, height: 100.0, scale: 1.0),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Completa el formulario",
                            style: TextStyle(
                                fontSize: 18.0,
                                color: Colors.white,
                                fontWeight: FontWeight.w500)),
                        Text("Los unicos campos \nobligatorios contienen  *",
                            style:
                                TextStyle(fontSize: 16.0, color: Colors.grey)),
                      ],
                    ),
                  ],
                ),
                SizedBox(height: 40),
                Text("Seleccione el motivo de su reporte  *",
                    style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                SizedBox(height: 10),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Column(
                      children: [
                        ElevatedButton(
                            style: hurtoViviendaSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 20))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text(
                              "Hurto Vivienda",
                              style: TextStyle(color: Colors.black),
                            )),
                        SizedBox(width: 10),
                        ElevatedButton(
                            style: hurtoPersonaSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Hurto Persona",
                                style: TextStyle(color: Colors.black))),
                        SizedBox(width: 10),
                        ElevatedButton(
                            style: hurtoVehiculoSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Hurto Vehiculo",
                                style: TextStyle(color: Colors.black))),
                      ],
                    ),
                    SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ElevatedButton(
                            style: vandalismoSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Vandalismo",
                                style: TextStyle(color: Colors.black))),
                        SizedBox(width: 30),
                        ElevatedButton(
                            style: violacionSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Violación",
                                style: TextStyle(color: Colors.black))),
                        SizedBox(width: 40),
                        ElevatedButton(
                            style: otroSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Otro",
                                style: TextStyle(color: Colors.black))),
                      ],
                    ),
                    SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ElevatedButton(
                            style: homicidioSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Homicidio",
                                style: TextStyle(color: Colors.black))),
                        SizedBox(width: 40),
                        ElevatedButton(
                            style: agresionSelected == true
                                ? ElevatedButton.styleFrom(
                                    primary: Colors.green,
                                    fixedSize: const Size(110, 40))
                                : ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    fixedSize: const Size(110, 40)),
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
                            child: Text("Agresión",
                                style: TextStyle(color: Colors.black))),
                      ],
                    )
                  ],
                ),
                SizedBox(height: 30),
                Text("Nombre del reporte (opcional)",
                    style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                SizedBox(height: 10),
                Container(
                  height: maxLinesTitle * 24.0,
                  child: TextField(
                    maxLines: maxLinesTitle,
                    decoration: InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10.0)),
                        fillColor: Color.fromRGBO(255, 255, 255, 1),
                        filled: true,
                        hintStyle:
                            TextStyle(fontSize: 16.0, color: Colors.black),
                        hintText: 'Hombre fuertemente armado'),
                    onChanged: (value) {
                      setState(() {
                        _asunto = value.trim();
                      });
                    },
                  ),
                ),
                SizedBox(height: 30),
                Text("Escribe una breve descripcion de los hechos (opcional)",
                    style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                SizedBox(height: 10),
                Container(
                  height: maxLinesDescription * 24.0,
                  child: TextField(
                    maxLines: maxLinesDescription,
                    decoration: InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10.0)),
                        fillColor: Color.fromRGBO(255, 255, 255, 1),
                        filled: true,
                        hintStyle:
                            TextStyle(fontSize: 16.0, color: Colors.black),
                        hintText:
                            'Un sujeto alto, esta intentando disparar a alguien'),
                    onChanged: (value) {
                      setState(() {
                        _descripcion = value.trim();
                      });
                    },
                  ),
                ),
                SizedBox(height: 30),
                Text("Cargue sus pruebas fotos o videos (opcional)",
                    style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Column(
                      children: [
                        Container(
                            child: ElevatedButton(
                          onPressed: () {},
                          child: GestureDetector(
                            onTap: () async {
                              XFile? image = await imagePicker.pickImage(
                                  source: ImageSource.camera);
                              setState(() {
                                _image = File(image!.path);
                              });
                            },
                            child: Icon(
                              Icons.camera_alt_rounded,
                              color: Colors.black,
                            ),
                          ),
                        )),
                        Container(
                          width: 30,
                          height: 30,
                          child: _image != null
                              ? Image.file(
                                  _image,
                                  width: 100.0,
                                  height: 100.0,
                                  fit: BoxFit.fitHeight,
                                )
                              : Container(
                                  decoration: BoxDecoration(),
                                ),
                        ),
                      ],
                    ),
                    SizedBox(width: 10),
                    Column(
                      children: [
                        Container(
                            child: ElevatedButton(
                          onPressed: () {},
                          child: GestureDetector(
                            onTap: () async {
                              XFile? image = await imagePicker.pickImage(
                                  source: ImageSource.gallery);
                              setState(() {
                                _image = File(image!.path);
                              });
                            },
                            child: Icon(
                              Icons.photo_album_outlined,
                              color: Colors.black,
                            ),
                          ),
                        )),
                        Container(
                          width: 30,
                          height: 30,
                          child: _image != null
                              ? Image.file(
                                  _image,
                                  width: 100.0,
                                  height: 100.0,
                                  fit: BoxFit.fitHeight,
                                )
                              : Container(
                                  decoration: BoxDecoration(),
                                ),
                        ),
                      ],
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                        style: ElevatedButton.styleFrom(primary: Colors.red),
                        onPressed: () async {
                          var currentLocation = await location.getLocation();
                          String _latitude =
                                  currentLocation.latitude.toString(),
                              _longitude = currentLocation.longitude.toString();

                          BlocProvider.of<ReportBloc>(context).add(
                              CreateRepotEvent(
                                  _tipoReporte,
                                  _asunto,
                                  _descripcion,
                                  _fechaHora,
                                  _latitude,
                                  _longitude,
                                  _image));
                        },
                        child: Text(
                          "Generar reporte",
                          style: TextStyle(color: Colors.black),
                        ))
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
