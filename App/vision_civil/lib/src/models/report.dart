class Report{
  String id = " ";
  String asunto = " ";
  String descripcion = " ";
  String estado = " ";
  String fechaHora = " ";
  String latitude = " ";
  String longitude = " ";
  String tipoReporte = " ";
  String userPhone = " "; 

  Report(String _id,String _asunto,String _descripcion,String _estado,String _fechaHora,String _latitude,String _longitude,String _tipoReporte,String _userPhone){
    this.id = _id;
    this.asunto = _asunto;
    this.descripcion = _descripcion;
    this.estado = _estado;
    this.fechaHora = _fechaHora;
    this.latitude = _latitude;
    this.longitude = _longitude;
    this.tipoReporte = _tipoReporte;
    this.userPhone = _userPhone;
  }

  void setId(String id){
    this.id = id;
  }
  String getId(){
    return this.id;
  }
  void setAsunto(String asunto){
    this.asunto = asunto;
  }
  String getAsunto(){
    return this.asunto;
  }
  void setDescripcion(String descripcion){
    this.descripcion = descripcion;
  }
  String getDescripcion(){
    return this.descripcion;
  }
  void setEstado(String estado){
    this.estado = estado;
  }
  String getEstado(){
    return this.estado;
  }
  void setFechaHora(String fechaHora){
    this.fechaHora = fechaHora;
  }
  String getFechaHora(){
    return this.fechaHora;
  }
  void setLatitude(String latitude){
    this.latitude = latitude;
  }
  String getLatitude(){
    return this.latitude;
  }
  void setLongitude(String longitude){
    this.longitude = longitude;
  }
  String getLongitude(){
    return this.longitude;
  }
  void setTipoReporte(String tipoReporte){
    this.tipoReporte = tipoReporte;
  }
  String getTipoReporte(){
    return this.tipoReporte;
  }
  void setUserphone(String userPhone){
    this.userPhone = userPhone;
  }
  String getUserPhone(){
    return this.userPhone;
  }
}
