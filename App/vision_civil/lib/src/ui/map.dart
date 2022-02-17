import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Map extends StatefulWidget {
  @override
  MapState createState() => MapState();
}

class MapState extends State<Map> {
  CameraPosition _initialPosition =
      CameraPosition(target: LatLng(26.8206, 30.8025));
  Completer<GoogleMapController> _controller = Completer();

  void _onMapCreated(GoogleMapController controller) {
    _controller.complete(controller);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Maps in Flutter'),
          centerTitle: true,
        ),
        body: Stack(
          children: <Widget>[
            GoogleMap(
              onMapCreated: _onMapCreated,
              myLocationEnabled: true,
              myLocationButtonEnabled: true,
              initialCameraPosition: _initialPosition,
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
