import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/blocs/reports_bloc/reports_bloc.dart';
import 'package:location/location.dart';
import 'package:vision_civil/src/blocs/user_bloc/user_bloc.dart';
import 'package:vision_civil/src/ui/report_message.dart';
import 'package:http/http.dart' as http;

class CreateReport extends StatefulWidget {
  @override
  CreateReportState createState() => CreateReportState();
}

class CreateReportState extends State<CreateReport> {
  Future<http.Response> sendNotification(String title) {
    return http.post(
      Uri.parse(
          'https://us-central1-miproyecto-5cf83.cloudfunctions.net/sendNotification'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'title': title,
      }),
    );
  }

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
  double _userPhone = 0;
  bool _checkbox = false;
  int count = 0;

  var imagePicker = new ImagePicker();
  var type;
  File _image = File("nullpath");
  List<File> _arrayImages = [];
  File _video = File("nullpathvideo");

  var location = new Location();
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    final _scrollController = ScrollController();
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
          title: Text("Crear reporte"),
          centerTitle: true,
        ),
        body: Scrollbar(
          isAlwaysShown: true,
          controller: _scrollController,
          child: SingleChildScrollView(
            controller: _scrollController,
            child: Container(
              padding: EdgeInsets.fromLTRB(15, 0, 15, 0),
              margin: const EdgeInsets.only(left: 5.0, right: 5.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: screenWidth * 0.15),
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
                          FittedBox(
                            child: Text("Completa el formulario",
                                style: TextStyle(
                                    fontSize: 17.0,
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500)),
                          ),
                          FittedBox(
                            child: Text(
                                "Los unicos campos \nobligatorios contienen  *",
                                style: TextStyle(
                                    fontSize: 15.0, color: Colors.grey)),
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 40),
                  Text("Seleccione el motivo de su reporte *",
                      style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Column(
                        children: [
                          ElevatedButton(
                              style: hurtoViviendaSelected == true
                                  ? ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 20))
                                  : ElevatedButton.styleFrom(
                                      primary: Colors.white,
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      fixedSize: const Size(90, 40)),
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
                              child: FittedBox(
                                child: Text(
                                  "Hurto Vivienda",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Colors.black, fontSize: 15),
                                ),
                              )),
                          SizedBox(width: 10),
                          ElevatedButton(
                              style: hurtoPersonaSelected == true
                                  ? ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 40))
                                  : ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.white,
                                      fixedSize: const Size(90, 40)),
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
                              child: FittedBox(
                                child: Text("Hurto Persona",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.black, fontSize: 15)),
                              )),
                          SizedBox(width: 10),
                          ElevatedButton(
                              style: hurtoVehiculoSelected == true
                                  ? ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 40))
                                  : ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.white,
                                      fixedSize: const Size(90, 40)),
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
                              child: FittedBox(
                                child: Text("Hurto Vehiculo",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                        color: Colors.black, fontSize: 15)),
                              )),
                        ],
                      ),
                      SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ElevatedButton(
                            style: vandalismoSelected == true
                                ? ElevatedButton.styleFrom(
                                    padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                    primary: Colors.green,
                                    fixedSize: const Size(90, 40))
                                : ElevatedButton.styleFrom(
                                    padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                    primary: Colors.white,
                                    fixedSize: const Size(90, 40)),
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
                            child: FittedBox(
                              child: Text("Vandalismo",
                                  style: TextStyle(
                                      color: Colors.black, fontSize: 15)),
                            ),
                          ),
                          SizedBox(width: 30),
                          ElevatedButton(
                              style: violacionSelected == true
                                  ? ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 40))
                                  : ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.white,
                                      fixedSize: const Size(90, 40)),
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
                              child: Container(
                                child: FittedBox(
                                  child: Text("Violación",
                                      style: TextStyle(
                                          color: Colors.black, fontSize: 15)),
                                ),
                              )),
                          SizedBox(width: 40),
                          ElevatedButton(
                              style: otroSelected == true
                                  ? ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 40))
                                  : ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.white,
                                      fixedSize: const Size(90, 40)),
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
                              child: FittedBox(
                                child: Text("Otro",
                                    style: TextStyle(
                                        color: Colors.black, fontSize: 15)),
                              )),
                        ],
                      ),
                      SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ElevatedButton(
                              style: homicidioSelected == true
                                  ? ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 40))
                                  : ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.white,
                                      fixedSize: const Size(90, 40)),
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
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.green,
                                      fixedSize: const Size(90, 40))
                                  : ElevatedButton.styleFrom(
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      primary: Colors.white,
                                      fixedSize: const Size(90, 40)),
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
                                  style: TextStyle(
                                      color: Colors.black, fontSize: 15))),
                        ],
                      )
                    ],
                  ),
                  SizedBox(height: 30),
                  Text("Nombre del reporte (OPCIONAL)",
                      style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                  SizedBox(height: 10),
                  Center(
                    child: Container(
                      height: maxLinesTitle * 24.0,
                      width: screenWidth * 0.85,
                      child: TextField(
                        maxLines: maxLinesTitle,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10.0)),
                            fillColor: Color.fromRGBO(255, 255, 255, 1),
                            filled: true,
                            hintStyle: TextStyle(
                                fontSize: 16.0,
                                color: Color.fromARGB(103, 0, 0, 0)),
                            hintText: 'Hombre fuertemente armado'),
                        onChanged: (value) {
                          setState(() {
                            _asunto = value.trim();
                          });
                        },
                      ),
                    ),
                  ),
                  SizedBox(height: 30),
                  Text("Escribe una breve descripcion de los hechos (OPCIONAL)",
                      style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                  SizedBox(height: 10),
                  Center(
                    child: Container(
                      height: maxLinesDescription * 24.0,
                      width: screenWidth * 0.85,
                      child: TextField(
                        maxLines: maxLinesDescription,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10.0)),
                            fillColor: Color.fromRGBO(255, 255, 255, 1),
                            filled: true,
                            hintStyle: TextStyle(
                                fontSize: 16.0,
                                color: Color.fromARGB(103, 0, 0, 0)),
                            hintText:
                                'Un sujeto alto, esta intentando disparar a alguien'),
                        onChanged: (value) {
                          setState(() {
                            _descripcion = value.trim();
                          });
                        },
                      ),
                    ),
                  ),
                  SizedBox(height: 5),
                  Row(
                    children: [
                      BlocBuilder<UserBloc, UserblocState>(
                        builder: (context, state) {
                          return Theme(
                            data: Theme.of(context).copyWith(
                              unselectedWidgetColor: Colors.grey,
                            ),
                            child: Checkbox(
                              value: _checkbox,
                              onChanged: (value) {
                                count++;
                                if (count % 2 == 0) {
                                  setState(() {
                                    _userPhone = 0;
                                    _checkbox = false;
                                    print(_userPhone);
                                  });
                                } else {
                                  setState(() {
                                    _userPhone = state.userPhone;
                                    _checkbox = true;
                                    print(_userPhone);
                                  });
                                }
                              },
                            ),
                          );
                        },
                      ),
                      Container(
                        child: FittedBox(
                          child: Text(
                            "¿ Deseo adjuntar mi numero celular ?",
                            style: TextStyle(color: Colors.grey),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 20),
                  Text(
                      "Presione los botones y cargue sus pruebas fotos o videos (OPCIONAL)",
                      style: TextStyle(fontSize: 16.0, color: Colors.grey)),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Column(
                        children: [
                          Text(
                            "Camara",
                            style: TextStyle(color: Colors.white),
                          ),
                          Container(
                              child: ElevatedButton(
                            onPressed: () {},
                            child: GestureDetector(
                              onTap: () async {
                                print("quiere tomar desde camara");
                                XFile? image = await imagePicker.pickImage(
                                    source: ImageSource.camera);
                                setState(() {
                                  _image = File(image!.path);
                                  _arrayImages.add(_image);
                                  print("camera image path: " + image.path);
                                });
                              },
                              child: Icon(
                                Icons.camera_alt_rounded,
                                color: Color.fromARGB(255, 0, 0, 0),
                              ),
                            ),
                          )),
                        ],
                      ),
                      SizedBox(width: 10),
                      Column(
                        children: [
                          Text(
                            "Imagen",
                            style: TextStyle(color: Colors.white),
                          ),
                          Container(
                              child: ElevatedButton(
                            onPressed: () {},
                            child: GestureDetector(
                              onTap: () async {
                                XFile? image = await imagePicker.pickImage(
                                    source: ImageSource.gallery);
                                setState(() {
                                  _image = File(image!.path);
                                  _arrayImages.add(_image);
                                  print("Image path: " + image.path);
                                });
                              },
                              child: Icon(
                                Icons.photo_album_outlined,
                                color: Colors.black,
                              ),
                            ),
                          )),
                        ],
                      ),
                      SizedBox(width: 10),
                      Column(
                        children: [
                          Text(
                            "Video",
                            style: TextStyle(color: Colors.white),
                          ),
                          ElevatedButton(
                            onPressed: () async {
                              XFile? fileVideo = await ImagePicker()
                                  .pickVideo(source: ImageSource.camera);

                              _video = File(fileVideo!.path);
                            },
                            child: Icon(
                              Icons.album_outlined,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 20),
                  Text(
                    "Sus fotos cargadas anteriormente",
                    style: TextStyle(color: Colors.grey),
                  ),
                  SizedBox(height: 10),
                  _arrayImages != null
                      ? Wrap(
                          children: _arrayImages.map((imageone) {
                            return Container(
                                child: Card(
                              child: Container(
                                height: 100,
                                width: 100,
                                child: Image.file(File(imageone.path)),
                              ),
                            ));
                          }).toList(),
                        )
                      : Container(),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                          style: ElevatedButton.styleFrom(primary: Colors.red),
                          onPressed: () async {
                            var currentLocation = await location.getLocation();
                            String _latitude =
                                    currentLocation.latitude.toString(),
                                _longitude =
                                    currentLocation.longitude.toString();

                            print("array list de imagenes");
                            print(_arrayImages.length);

                            BlocProvider.of<ReportBloc>(context).add(
                                CreateRepotEvent(
                                    _tipoReporte,
                                    _asunto,
                                    _descripcion,
                                    _fechaHora,
                                    _latitude,
                                    _longitude,
                                    _arrayImages,
                                    _video,
                                    _userPhone));
                            Navigator.of(context).push(MaterialPageRoute(
                              builder: (_) => BlocProvider.value(
                                  value: BlocProvider.of<UserBloc>(context),
                                  child: ReportMessage()),
                            ));
                            sendNotification(_tipoReporte);
                          },
                          child: Text(
                            "Generar reporte",
                            style: TextStyle(color: Colors.black),
                          )),
                    ],
                  ),
                  SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
