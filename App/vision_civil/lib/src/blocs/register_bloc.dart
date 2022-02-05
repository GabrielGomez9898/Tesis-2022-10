import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/repository/userRepository/userDB.dart';

class RegisterBloc implements BlocBase {
  RegisterBloc() {
    //init stream
    userdb.initStream().listen((data) {
      _inFirestore.add(data);
    });
  }

  String id = "";
  final _idController = StreamController<String>();
  Stream<String> get outId => _idController.stream;
  Sink<String> get _inId => _idController.sink;

  final _firestoreController = StreamController<QuerySnapshot>();
  Stream<QuerySnapshot> get outFirestore => _firestoreController.stream;
  Sink<QuerySnapshot> get _inFirestore => _firestoreController.sink;

  //@override
  void dispose() {
    _idController.close();
    _firestoreController.close();
  }

  // Logic functions
  void readData() async {}
  void createUser(String email, String password, String name, String gender,
      double phone, String birthDate) async {
    String id = await userdb.createUser(
        email, password, name, gender, phone, birthDate);
    this.id = id;
    _inId.add(id);
  }

  void updateUser(DocumentSnapshot doc) async {
    // await db.updateUser(doc);
  }
  void deleteUser(DocumentSnapshot doc) async {
    // await db.deleteUser(doc);
  }

  @override
  void addError(Object error, [StackTrace? stackTrace]) {}

  @override
  Future<void> close() {
    _idController.close();
    _firestoreController.close();
    throw UnimplementedError();
  }

  @override
  void emit(state) {}

  @override
  bool get isClosed => throw UnimplementedError();

  @override
  void onChange(Change change) {}

  @override
  void onError(Object error, StackTrace stackTrace) {}

  @override
  get state => throw UnimplementedError();

  @override
  Stream get stream => throw UnimplementedError();
}
