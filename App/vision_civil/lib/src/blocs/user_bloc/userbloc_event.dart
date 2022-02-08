part of 'user_bloc.dart';

abstract class UserblocEvent extends Equatable {
  const UserblocEvent();
  @override
  List<Object> get props => [];
}

/*No borrar estos comentarios*/
// ignore: must_be_immutable
class RegisterEvent extends UserblocEvent {
  String email = "", name = "", birthDate = "", gender = "", password = "";
  double phone = 0;

  RegisterEvent(String _email, String _name, String _birthDate, String _gender,
      String _password, double phone) {
    this.email = _email;
    this.name = _name;
    this.birthDate = _birthDate;
    this.gender = _gender;
    this.password = _password;
    this.phone = phone;
  }
}
