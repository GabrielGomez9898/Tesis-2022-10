import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'contactsbloc_event.dart';
part 'contactsbloc_state.dart';

class ContactsblocBloc extends Bloc<ContactsblocEvent, ContactsblocState> {
  ContactsblocBloc() : super(ContactsblocState()) {
    on<ContactsblocEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
