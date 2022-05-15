class EmergencyContact {
  String uniqueid = " ";
  String contactName = " ";
  String contactPhone = " ";

  EmergencyContact(
      String _uniqueid, String _contactName, String _contactPhone) {
    this.uniqueid = _uniqueid;
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
