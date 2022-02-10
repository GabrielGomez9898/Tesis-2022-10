import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/repository/userRepository/userRepository.dart';

part 'userbloc_event.dart';
part 'userbloc_state.dart';

class UserBloc extends Bloc<UserblocEvent, UserblocState> {
  StreamController<String> _outPut = StreamController();
  Stream<String> get userBlocStream => _outPut.stream;

  UserBloc() : super(UserblocState(userID: " ", loginAchieved: false)) {
    on<UserblocEvent>((event, emit) async {
      if (event is RegisterEvent) {
        String id = await userdb.createUser(event.email, event.password,
            event.name, event.gender, event.phone, event.birthDate);
        _outPut.add(id);
        emit(UserblocState(userID: id, loginAchieved: true));
      } else if (event is LoginEvent) {
        String loginUserID = await userdb.signIn(event.email, event.password);
        //conseguir id del usuario que hizo login
        if (loginUserID != "null") {
          emit(UserblocState(userID: loginUserID, loginAchieved: true));
        } else {
          emit(UserblocState(userID: " ", loginAchieved: false));
        }
        print(loginUserID);
      } else if (event is LogoutEvent) {
        userdb.logOut();
        emit(UserblocState(userID: " ", loginAchieved: false));
      }
    });
  }
  void dispose() {
    _outPut.close();
  }
}
