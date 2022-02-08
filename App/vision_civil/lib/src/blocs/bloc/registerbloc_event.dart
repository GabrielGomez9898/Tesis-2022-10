part of 'registerbloc_bloc.dart';

abstract class RegisterblocEvent extends Equatable {
  const RegisterblocEvent();
  @override
  List<Object> get props => [];
}

/*No borrar estos comentarios*/
// ignore: must_be_immutable
class RegisterEvent extends RegisterblocEvent {
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
