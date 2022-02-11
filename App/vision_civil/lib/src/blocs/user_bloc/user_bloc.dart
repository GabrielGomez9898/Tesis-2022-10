import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/repository/userRepository/userRepository.dart';

part 'userbloc_event.dart';
part 'userbloc_state.dart';

class UserBloc extends Bloc<UserblocEvent, UserblocState> {
  StreamController<String> _outPut = StreamController();
  Stream<String> get userBlocStream => _outPut.stream;

  UserBloc()
      : super(UserblocState(
            userID: " ",
            loginAchieved: false,
            userEmail: " ",
            userName: " ",
            userPhone: 0,
            userGender: " ",
            userBirthDate: " ",
            userRole: " ")) {
    on<UserblocEvent>((event, emit) async {
      if (event is RegisterEvent) {
        QueryDocumentSnapshot user = await userdb.createUser(
            event.email,
            event.password,
            event.name,
            event.gender,
            event.phone,
            event.birthDate);
        _outPut.add(user.id);
        emit(UserblocState(
            userID: user.id,
            loginAchieved: true,
            userEmail: user.get('email'),
            userName: user.get('name'),
            userPhone: user.get('phone'),
            userGender: user.get('gender'),
            userBirthDate: user.get('birth_date'),
            userRole: user.get('role')));
      } else if (event is LoginEvent) {
        QueryDocumentSnapshot user =
            await userdb.signIn(event.email, event.password);
        //conseguir id del usuario que hizo login
        if (user.get('email') != 'notexistinguser') {
          emit(UserblocState(
              userID: user.id,
              loginAchieved: true,
              userEmail: user.get('email'),
              userName: user.get('name'),
              userPhone: user.get('phone'),
              userGender: user.get('gender'),
              userBirthDate: user.get('birth_date'),
              userRole: user.get('role')));
        } else {
          emit(UserblocState(
              userID: " ",
              loginAchieved: false,
              userEmail: " ",
              userName: " ",
              userPhone: 0,
              userGender: " ",
              userBirthDate: " ",
              userRole: " "));
        }
      } else if (event is LogoutEvent) {
        userdb.logOut();
        emit(UserblocState(
            userID: " ",
            loginAchieved: false,
            userEmail: " ",
            userName: " ",
            userPhone: 0,
            userGender: " ",
            userBirthDate: " ",
            userRole: " "));
      } else if (event is UpdateUserEvent) {
        QueryDocumentSnapshot user = await userdb.updateUser(event.email,
            event.name, event.gender, event.phone, event.birthDate);
        emit(UserblocState(
            userID: user.id,
            loginAchieved: true,
            userEmail: user.get('email'),
            userName: user.get('name'),
            userPhone: user.get('phone'),
            userGender: user.get('gender'),
            userBirthDate: user.get('birth_date'),
            userRole: user.get('role')));
      }
    });
  }
  void dispose() {
    _outPut.close();
  }
}
