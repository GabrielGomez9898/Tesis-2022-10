import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/repository/userRepository/userRepository.dart';

part 'registerbloc_event.dart';
part 'registerbloc_state.dart';

class RegisterblocBloc extends Bloc<RegisterblocEvent, RegisterState> {
  RegisterblocBloc() : super(RegisterState(userID: " ")) {
    on<RegisterblocEvent>((event, emit) async {
      if (event is RegisterEvent) {
        String id = await userdb.createUser(event.email, event.password,
            event.name, event.gender, event.phone, event.birthDate);
        emit(RegisterState(userID: id));
      }
    });
  }
}
