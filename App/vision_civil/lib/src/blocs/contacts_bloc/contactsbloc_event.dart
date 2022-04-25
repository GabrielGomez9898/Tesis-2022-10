part of 'contactsbloc_bloc.dart';

abstract class ContactsblocEvent extends Equatable {
  const ContactsblocEvent();

  @override
  List<Object> get props => [];
}

/*No borrar comentarios de ignore*/
// ignore: must_be_immutable
class GetUserContactsEvent extends ContactsblocEvent {
  String userID = " ";

  GetUserContactsEvent(String _userID) {
    this.userID = _userID;
  }
}

// ignore: must_be_immutable
class UpdateContactEvent extends ContactsblocEvent {
  String uniqueID = " ";
  String contactName = " ";
  String contactPhone = " ";

  UpdateContactEvent(
      String _uniqueID, String _contactName, String _contactPhone) {
    this.uniqueID = _uniqueID;
    this.contactName = _contactName;
    this.contactPhone = _contactPhone;
  }
}

// ignore: must_be_immutable
class AddContactEvent extends ContactsblocEvent {
  String contactName = " ";
  String contactPhone = " ";
  String idUser = " ";

  AddContactEvent(String _contactName, String _contactPhone, String _idUser) {
    this.contactName = _contactName;
    this.contactPhone = _contactPhone;
    this.idUser = _idUser;
  }
}

// ignore: must_be_immutable
class DeleteContactEvent extends ContactsblocEvent {
  String uniqueID = " ";
  String idUser = " ";

  DeleteContactEvent(String _uniqueID, String _idUser) {
    this.uniqueID = _uniqueID;
    this.idUser = _idUser;
  }
}

// ignore: must_be_immutable
class SendEmergencyAlertEvent extends ContactsblocEvent {
  String contactPhone1 = " ";
  String contactPhone2 = " ";
  String contactPhone3 = " ";
  String userInEmergency = " ";
  String latitude = " ";
  String longitude = " ";

  SendEmergencyAlertEvent(
      String _contactPhone1,
      String _contactPhone2,
      String _contactPhone3,
      String _userInEmergency,
      String _latitude,
      String _longitude) {
    this.contactPhone1 = _contactPhone1;
    this.contactPhone2 = _contactPhone2;
    this.contactPhone3 = _contactPhone3;
    this.userInEmergency = _userInEmergency;
    this.latitude = _latitude;
    this.longitude = _longitude;
  }
}
