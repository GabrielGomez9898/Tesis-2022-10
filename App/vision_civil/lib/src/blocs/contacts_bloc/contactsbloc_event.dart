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
