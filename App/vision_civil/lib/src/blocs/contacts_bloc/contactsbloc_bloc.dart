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
      if (event is GetUserContacts) {
        List<EmergencyContact> emergencyContacts = [];
        Future<QuerySnapshot> contacts =
            contactsdb.getEmergencyContacts("NAOQ8aZt3atviCaFaJXi");
        await contacts.then((QuerySnapshot querySnapshot) {
          querySnapshot.docs.forEach((doc) {
            emergencyContacts.add(EmergencyContact(doc.id, doc['contact'],
                doc["contact_name"], doc["contact_phone"]));
            print(doc.id);
            print(doc['contact']);
            print(doc["contact_name"]);
            print(doc["contact_phone"]);
            print(doc['id_user']);
            emit(ContactsblocState(emergencyUserContacts: emergencyContacts));
          });
        });
      }
    });
  }
}
