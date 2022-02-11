part of 'user_bloc.dart';

class UserblocState {
  String userID;
  String userEmail;
  String userName;
  double userPhone;
  String userGender;
  String userBirthDate;
  String userRole;

  bool loginAchieved;

  UserblocState(
      {required this.userID,
      required this.loginAchieved,
      required this.userEmail,
      required this.userName,
      required this.userPhone,
      required this.userGender,
      required this.userBirthDate,
      required this.userRole});
}
