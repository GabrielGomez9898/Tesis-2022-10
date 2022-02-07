import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/repository/userRepository/userDB.dart';
import 'dart:async';

part 'registerbloc_event.dart';
part 'registerbloc_state.dart';

class RegisterEvents {}

class RegisterRequest extends RegisterEvents {
  String email = "", name = "", birthDate = "", gender = "", password = "";
  double phone = 0;

  RegisterRequest(String _email, String _name, String _birthDate,
      String _gender, String _password, double phone) {
    this.email = _email;
    this.name = _name;
    this.birthDate = _birthDate;
    this.gender = _gender;
    this.password = _password;
    this.phone = phone;
  }
}

class RegisterblocBloc extends Bloc {
  RegisterblocBloc() : super(RegisterState()) {
    _input.stream.listen(_onEvent);
    on<RegisterblocEvent>((event, emit) {});
  }

  String id = "";

  StreamController<RegisterEvents> _input = StreamController();
  StreamController<bool> _output = StreamController();

  Stream<bool> get registerStream => _output.stream;
  StreamSink<RegisterEvents> get sendEvent => _input.sink;

  void dispose() {
    _input.close();
    _output.close();
  }

  void _onEvent(RegisterEvents event) {
    if (event is RegisterRequest) {
      createUser(event.email, event.password, event.name, event.gender,
          event.phone, event.birthDate);
    }
  }

  //Functions that the events will trigger when they are called
  void createUser(String email, String password, String name, String gender,
      double phone, String birthDate) async {
    String id = await userdb.createUser(
        email, password, name, gender, phone, birthDate);
    this.id = id;
  }
}
