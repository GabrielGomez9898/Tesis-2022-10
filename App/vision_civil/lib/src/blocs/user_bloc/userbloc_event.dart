part of 'user_bloc.dart';

abstract class UserblocEvent extends Equatable {
  const UserblocEvent();
  @override
  List<Object> get props => [];
}

/*No borrar comentarios de ignore*/
// ignore: must_be_immutable
class RegisterEvent extends UserblocEvent {
  String email = "",
      document = "",
      name = "",
      birthDate = "",
      gender = "",
      password = "";
  double phone = 0;

  RegisterEvent(String _email, String _name, String _birthDate, String _gender,
      String _password, double _phone, String _document) {
    this.email = _email;
    this.name = _name;
    this.birthDate = _birthDate;
    this.gender = _gender;
    this.password = _password;
    this.phone = _phone;
    this.document = _document;
  }
}

// ignore: must_be_immutable
class LoginEvent extends UserblocEvent {
  String email = "", password = "";

  LoginEvent(String _email, String _password) {
    this.email = _email;
    this.password = _password;
  }
}

class LogoutEvent extends UserblocEvent {}

// ignore: must_be_immutable
class UpdateUserEvent extends UserblocEvent {
  String email = "", name = "", birthDate = "", gender = "";
  double phone = 0;

  UpdateUserEvent(String _email, String _name, String _birthDate,
      String _gender, double phone) {
    this.email = _email;
    this.name = _name;
    this.birthDate = _birthDate;
    this.gender = _gender;
    this.phone = phone;
  }
}

// ignore: must_be_immutable
class UpdateUserState extends UserblocEvent {
  String userID = "";
  String userEmail = "";
  String userName = "";
  double userPhone = 0;
  String userGender = "";
  String userBirthDate = "";
  String userRole = "";
  String userDocument = "";

  String idPolice = "";
  bool available = false;
  bool onService = false;

  bool loginAchieved = false;

  UpdateUserState(
      String userID,
      String userEmail,
      String userName,
      double userPhone,
      String userGender,
      String userBirthDate,
      String userRole,
      String userDocument,
      String idPolice,
      bool available,
      bool onService,
      bool loginAchieved) {
    this.userID = userID;
    this.userEmail = userEmail;
    this.userName = userName;
    this.userPhone = userPhone;
    this.userGender = userGender;
    this.userBirthDate = userBirthDate;
    this.userRole = userRole;
    this.userDocument = userDocument;
    this.idPolice = idPolice;
    this.available = available;
    this.onService = onService;
    this.loginAchieved = loginAchieved;
  }
}

// ignore: must_be_immutable
class UpdatePoliceService extends UserblocEvent {
  String userID = "";
  bool onService = false;

  UpdatePoliceService(String userID, bool onService) {
    this.userID = userID;
    this.onService = onService;
  }
}

// ignore: must_be_immutable
class AddPhoneToken extends UserblocEvent {
  String user = "";
  String token = "";

  AddPhoneToken(String user, String token) {
    this.user = user;
    this.token = token;
  }
}
