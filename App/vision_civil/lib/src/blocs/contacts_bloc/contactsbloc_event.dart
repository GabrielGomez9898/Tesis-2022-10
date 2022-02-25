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
