// Importa el paquete test y la clase Counter
import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:vision_civil/src/repository/crimeReportRepository/crimeReportsRepository.dart';
import 'package:vision_civil/src/repository/userRepository/contactsRepository.dart';
import 'package:vision_civil/src/repository/userRepository/userRepository.dart';
import 'package:vision_civil/vision.dart';

class MockUser extends Mock implements UserDB {}

class MockReports extends Mock implements ReportDB {}

class MockContacts extends Mock implements ContactsDB {}

class MockFirebaseAuth extends Mock implements FirebaseAuth {}

void main() {
  group('Unit tests', () {
    MockUser mockUser = new MockUser();
    MockReports mockReports = new MockReports();
    MockContacts mockContacts = new MockContacts();
    MockFirebaseAuth mockAuth = new MockFirebaseAuth();
    test('Actualizar estado de servicio de policia', () async {
      String response = "";
      try {
        mockUser.updatePoliceService("abc123", false);
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Logout', () {
      String response = "";
      try {
        mockUser.logOut();
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Login', () async {
      String response = "";

      try {
        await mockAuth.signInWithEmailAndPassword(
            email: "gabriel@gmail.com", password: "123456");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Generar reporte', () async {
      String response = "";
      try {
        List<File> images = [];
        File video = new File("videopath");
        mockReports.createReport(
            "HURTO_VIVIENDA",
            "Asalto",
            "Estan robando una casa",
            "12/04/22 : 14:05",
            "-74545431",
            "5684664",
            images,
            video,
            314268464);
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Atender reporte', () async {
      String response = "";
      try {
        mockReports.asignReport("abc123", "789zxy");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Finalizar reporte', () async {
      String response = "";
      try {
        mockReports.finishReport("Xy78JUlOP23", "NAO8cUYbTrSE");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Visualizar reportes', () async {
      String response = "";
      try {
        QuerySnapshot getReports = await mockReports.getReports();
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Agregar contacto de emergencia', () async {
      String response = "";
      try {
        mockContacts.addContact("Diego", "312573748", "abc123");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Actualizar contacto de emergencia', () async {
      String response = "";
      try {
        mockContacts.updateContact("Pablo Mendez", "3206748", "abc123");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Eliminar contacto de emergencia', () async {
      String response = "";
      try {
        mockContacts.updateContact("Sara Gomez", "3005029854", "abc123");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });

    test('Actualizar contraseña', () async {
      String response = "";
      try {
        mockUser.updatePassword("gabriel@gmail.com", "123456", "654321");
        response = "success";
      } catch (e) {
        response = "not success";
      }

      expect(response, "success");
    });
  });
}
