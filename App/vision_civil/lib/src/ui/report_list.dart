import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vision_civil/src/ui/report_detail.dart';

import '../blocs/reports_bloc/reports_bloc.dart';
import '../blocs/user_bloc/user_bloc.dart';
import '../models/report.dart';

class ReportListPage extends StatefulWidget {
  const ReportListPage({Key? key}) : super(key: key);

  @override
  ReportListState createState() => ReportListState();
}

class ReportListState extends State<ReportListPage> {
  String _tipoReporteFiltro = "", _estadoReporteFiltro = "";

  ReportListState() {
    this._tipoReporteFiltro = "Todos";
    this._estadoReporteFiltro = "Todos";
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    BlocProvider.of<ReportBloc>(context).add(
        FilterReportsEvent(this._tipoReporteFiltro, this._estadoReporteFiltro));
    var _tiposReporte = [
      "Todos",
      "HURTO_VIVIENDA",
      "VANDALISMO",
      "HOMICIDIO",
      "HURTO_PERSONA",
      "VIOLACION",
      "AGRESION",
      "HURTO_VEHICULO",
      "OTRO"
    ];
    var _estadosReporte = ["Todos", "PENDIENTE", "EN PROCESO", "FINALIZADO"];

    return Container(
      decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage("assets/images/fondo.jpg"), fit: BoxFit.cover)),
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Reportes ciudadanos"),
        ),
        backgroundColor: Colors.transparent,
        body: BlocBuilder<ReportBloc, ReportblocState>(
          builder: (context, state) {
            return Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(7.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Filtro tipo de reporte: ",
                          style: TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255),
                              fontSize: 15,
                              fontWeight: FontWeight.w500)),
                      SizedBox(height: size.height * 0.01),
                      Container(
                        padding: EdgeInsets.fromLTRB(25, 0, 0, 0),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton(
                            items: _tiposReporte.map((String tipoReporte) {
                              return DropdownMenuItem(
                                  child: Text(tipoReporte), value: tipoReporte);
                            }).toList(),
                            onChanged: (_value) {
                              setState(() {
                                this._tipoReporteFiltro = _value.toString();
                                BlocProvider.of<ReportBloc>(context).add(
                                    FilterReportsEvent(this._tipoReporteFiltro,
                                        this._estadoReporteFiltro));
                              });
                            },
                            hint: Container(
                              height: 50,
                              width: 200,
                              decoration: BoxDecoration(
                                  border: Border.all(
                                    color: Colors.white,
                                  ),
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(20))),
                              child: Text(
                                this._tipoReporteFiltro,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                    fontSize: 15),
                              ),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: 20),
                      Text("Filtro estado reporte: ",
                          style: TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255),
                              fontSize: 15,
                              fontWeight: FontWeight.w500)),
                      Container(
                        padding: EdgeInsets.fromLTRB(25, 0, 0, 0),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton(
                            items: _estadosReporte.map((String estadoReporte) {
                              return DropdownMenuItem(
                                  child: Text(estadoReporte),
                                  value: estadoReporte);
                            }).toList(),
                            onChanged: (_value) {
                              setState(() {
                                this._estadoReporteFiltro = _value.toString();
                                BlocProvider.of<ReportBloc>(context).add(
                                    FilterReportsEvent(this._tipoReporteFiltro,
                                        this._estadoReporteFiltro));
                              });
                            },
                            hint: Container(
                              height: 50,
                              width: 200,
                              decoration: BoxDecoration(
                                  border: Border.all(
                                    color: Colors.white,
                                  ),
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(20))),
                              child: Text(
                                this._estadoReporteFiltro,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Color.fromARGB(255, 255, 255, 255),
                                    fontSize: 15),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: size.height * 0.02),
                Material(
                  elevation: 0,
                  child: BlocListener<ReportBloc, ReportblocState>(
                    listener: (context, state) {},
                    child: Container(
                      height: size.height * 0.6,
                      width: size.width * 0.95,
                      decoration: new BoxDecoration(
                          border: Border.all(
                              width: 3, color: Color.fromARGB(255, 0, 0, 0)),
                          borderRadius: BorderRadius.circular(0),
                          boxShadow: [
                            BoxShadow(
                              color: Color.fromARGB(255, 193, 192, 192)
                                  .withOpacity(0.3),
                              spreadRadius: 3,
                              blurRadius: 5,
                              offset:
                                  Offset(0, 0), // changes position of shadow
                            ),
                          ]),
                      padding: const EdgeInsets.only(left: 1),
                      child: ListView.builder(
                        shrinkWrap: true,
                        itemCount: state.reports.length,
                        itemBuilder: (context, index) {
                          Report report = state.reports[index];

                          return Container(
                            decoration: new BoxDecoration(
                              color: Color.fromARGB(6, 0, 0, 0),
                              border: Border(
                                bottom: BorderSide(
                                  color: Color.fromARGB(88, 0, 0, 0),
                                  width: 1.0,
                                ),
                              ),
                            ),
                            child: ListTile(
                              title: Text(report.tipoReporte),
                              subtitle: Text(report.asunto),
                              trailing: BlocBuilder<UserBloc, UserblocState>(
                                builder: (context, state) {
                                  return ElevatedButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .push(MaterialPageRoute(
                                          builder: (_) => MultiBlocProvider(
                                              providers: [
                                                BlocProvider.value(
                                                    value: BlocProvider.of<
                                                        UserBloc>(context)),
                                                BlocProvider.value(
                                                    value: BlocProvider.of<
                                                        ReportBloc>(context)),
                                              ],
                                              child: ReportDetail(
                                                  idReport: report.id,
                                                  idPoliceUser: state.userID)),
                                        ));
                                      },
                                      child: Text("Ver más"));
                                },
                              ),
                              onTap: () {},
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
