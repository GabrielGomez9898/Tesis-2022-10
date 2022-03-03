import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/services.dart';

class ContactsDB {
  final db = FirebaseFirestore.instance;
  final auth = FirebaseAuth.instance;
  static const MethodChannel _channel = const MethodChannel('smsker');

  Stream<QuerySnapshot> initStream() {
    return db.collection('emergency_contacts').snapshots();
  }

  Future<QuerySnapshot> getEmergencyContacts(String idUser) async {
    Future<QuerySnapshot> docs = FirebaseFirestore.instance
        .collection('emergency_contacts')
        .where('id_user', isEqualTo: idUser)
        .get();
    return docs;
  }

  void updateContact(
      String _uniqueID, String _contactName, String _contactPhone) async {
    await FirebaseFirestore.instance
        .collection('emergency_contacts')
        .doc(_uniqueID)
        .update({'contact_name': _contactName, 'contact_phone': _contactPhone});
  }

  void addContact(
      String _contactName, String _contactPhone, String _idUser) async {
    await db.collection('emergency_contacts').add({
      'contact_name': _contactName,
      'contact_phone': _contactPhone,
      'id_user': _idUser
    });
  }

  void deleteContact(String _uniqueID) async {
    await db.collection('emergency_contacts').doc(_uniqueID).delete();
  }

  void sendMessageToContacts(
      String _contactPhone1,
      String _contactPhone2,
      String _contactPhone3,
      String _userInEmergency,
      String _latitude,
      String _longitude) async {
    String message = _userInEmergency +
        " se siente inseguro y requiere que estes pendiente de el/ella su ubicacion: https://www.google.com/maps/search/?api=1&query=" +
        _latitude +
        "," +
        _longitude;
    if (_contactPhone1 != " ") {
      await _channel.invokeMethod(
          'sendSms', {'phone': _contactPhone1, 'message': message});
      print("envio sms a: " + _contactPhone1);
    }
    if (_contactPhone2 != " ") {
      await _channel.invokeMethod(
          'sendSms', {'phone': _contactPhone2, 'message': message});
      print("envio sms a: " + _contactPhone2);
    }
    if (_contactPhone3 != " ") {
      await _channel.invokeMethod(
          'sendSms', {'phone': _contactPhone3, 'message': message});
      print("envio sms a: " + _contactPhone3);
    }
  }
}

ContactsDB contactsdb = ContactsDB();
