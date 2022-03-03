import 'package:bloc/bloc.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:equatable/equatable.dart';
import 'package:vision_civil/src/models/emergency_contact.dart';
import 'package:vision_civil/src/repository/userRepository/contactsRepository.dart';

part 'contactsbloc_event.dart';
part 'contactsbloc_state.dart';

class ContactsblocBloc extends Bloc<ContactsblocEvent, ContactsblocState> {
  ContactsblocBloc() : super(ContactsblocState(emergencyUserContacts: [])) {
    on<ContactsblocEvent>((event, emit) async {
      if (event is GetUserContactsEvent) {
        List<EmergencyContact> emergencyContacts = [];
        Future<QuerySnapshot> contacts =
            contactsdb.getEmergencyContacts(event.userID);
        await contacts.then((QuerySnapshot querySnapshot) {
          querySnapshot.docs.forEach((doc) {
            emergencyContacts.add(EmergencyContact(
                doc.id, doc["contact_name"], doc["contact_phone"]));
            emit(ContactsblocState(emergencyUserContacts: emergencyContacts));
          });
        });
      } else if (event is UpdateContactEvent) {
        contactsdb.updateContact(
            event.uniqueID, event.contactName, event.contactPhone);
      } else if (event is AddContactEvent) {
        contactsdb.addContact(
            event.contactName, event.contactPhone, event.idUser);
      } else if (event is DeleteContactEvent) {
        contactsdb.deleteContact(event.uniqueID);
      } else if (event is SendEmergencyAlertEvent) {
        print("quiere alertar a sus contactos");

        contactsdb.sendMessageToContacts(
            event.contactPhone1,
            event.contactPhone2,
            event.contactPhone3,
            event.userInEmergency,
            event.latitude,
            event.longitude);
      }
    });
  }
}
