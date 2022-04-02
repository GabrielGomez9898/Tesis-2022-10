import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Map extends StatefulWidget {
  Map({Key? key, required this.latitude, required this.longitude})
  : super(key: key);
  final String latitude;
  final String longitude;
  @override
  MapState createState() => MapState(latitude,longitude);
}

class MapState extends State<Map> {
  String latitude = "";
  String longitude = "";

  MapState(String latitude,String longitude){
    this.latitude = latitude;
    this.longitude = longitude;
  }
  CameraPosition getPosition(String lat, String lon){
    CameraPosition _initialPosition =
      CameraPosition(target: LatLng(double.parse(lat), double.parse(lon)));
      return _initialPosition;
  }

  
  Completer<GoogleMapController> _controller = Completer();

  void _onMapCreated(GoogleMapController controller) {
    _controller.complete(controller);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Ubicación del caso'),
          centerTitle: true,
        ),
        body: Stack(
          children: <Widget>[
            GoogleMap(
              onMapCreated: _onMapCreated,
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              initialCameraPosition: getPosition(this.latitude, this.longitude),
              markers: _createMarkers(),
            ),
          ],
        ));
  }

  Set<Marker> _createMarkers() {
    var tmp = Set<Marker>();

    tmp.add(Marker(
        markerId: MarkerId("fromPont"),
        position: LatLng(4.7061038, -74.0693329)));
    return tmp;
  }
}
