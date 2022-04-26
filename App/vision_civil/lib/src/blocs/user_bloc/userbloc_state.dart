part of 'user_bloc.dart';

class UserblocState {
  String userID;
  String userEmail;
  String userName;
  double userPhone;
  String userGender;
  String userBirthDate;
  String userRole;
  String userDocument;

  String idPolice;
  bool available;
  bool onService;

  bool loginAchieved;

  UserblocState(
      {required this.userID,
      required this.loginAchieved,
      required this.userEmail,
      required this.userName,
      required this.userPhone,
      required this.userGender,
      required this.userBirthDate,
      required this.userRole,
      required this.userDocument,
      required this.idPolice,
      required this.available,
      required this.onService});
}
