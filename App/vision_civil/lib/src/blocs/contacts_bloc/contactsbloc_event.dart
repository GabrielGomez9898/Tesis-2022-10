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
  int contact = 0;
  String contactName = " ";
  String contactPhone = " ";

  UpdateContactEvent(String _uniqueID, int _contact, String _contactName,
      String _contactPhone) {
    this.uniqueID = _uniqueID;
    this.contact = _contact;
    this.contactName = _contactName;
    this.contactPhone = _contactPhone;
  }
}
