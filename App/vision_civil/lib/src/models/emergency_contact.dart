class EmergencyContact {
  String uniqueid = " ";
  int contact = 0;
  String contactName = " ";
  String contactPhone = " ";

  EmergencyContact(String _uniqueid, int _contact, String _contactName,
      String _contactPhone) {
    this.uniqueid = _uniqueid;
    this.contact = _contact;
    this.contactName = _contactName;
    this.contactPhone = _contactPhone;
  }

  void setUniqueId(String uniqueid) {
    this.uniqueid = uniqueid;
  }

  //String get getId => uniqueid;
  String getId() {
    return this.uniqueid;
  }

  void setContact(int contact) {
    this.contact = contact;
  }

  int getContact() {
    return this.contact;
  }

  void setContactName(String contactName) {
    this.contactName = contactName;
  }

  String getContactName() {
    return this.contactName;
  }

  void setContactPhone(String contactPhone) {
    this.contactPhone = contactPhone;
  }

  String getContactPhone() {
    return this.contactPhone;
  }
}
