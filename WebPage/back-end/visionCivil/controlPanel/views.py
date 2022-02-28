import re
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from firestoreSettings import db
import datetime as dt

def getReportById(request):
    if (request.method != "GET"):
        return
    
    report = db.collection("reports").document(request.GET.get("reportId")).get()
    return JsonResponse(report.to_dict()) if report.exists else JsonResponse({})

def getAllReports(request):
    if (request.method != "GET"):
        return

    docs = db.collection("reports").get()
    
    reports = []
    for doc in docs:
        reports.append(doc.to_dict())

    return JsonResponse(reports, safe = False)

def getFilteredReports(request):
    if (request.method != "GET") or ("period" not in request.GET) or ("reportType" not in request.GET):
        return

    period = request.GET.get("period")
    reportType = request.GET.get("reportType")

    docs = None
    if(reportType != "ALL"):
        docs = db.collection("reports").where("tipo_reporte", "==", reportType).get()
    else:
        docs = db.collection("reports").get()

    lowerDateTime = dt.datetime.now()
    todayDateTime = lowerDateTime

    if(period == "LAST_WEEK"):
        lowerDateTime -= dt.timedelta(7)
    elif(period == "LAST_MONTH"):
        lowerDateTime -= dt.timedelta(30)
    elif(period == "LAST_TRIMESTER"):
        lowerDateTime -= dt.timedelta(90)
    elif(period == "LAST_SEMESTER"):
        lowerDateTime -= dt.timedelta(180)
    elif(period == "LAST_YEAR"):
        lowerDateTime -= dt.timedelta(360)

    reports = []
    for doc in docs:
        report = doc.to_dict()
        reportDateTimeList = report["fecha_hora"].split("/", 2)
        reportDateTimeList[2] = reportDateTimeList[2].split(" | ")[0]
        year = reportDateTimeList[0]
        month = reportDateTimeList[1]
        day = reportDateTimeList[2]
        reportDateTime = dt.date(int(year), int(month), int(day))
        if(reportDateTime >= lowerDateTime.date() and reportDateTime <= todayDateTime.date()):
            reports.append(doc.to_dict())

    return JsonResponse(reports, safe = False)

def getMapData(request):
    if(request.method != "GET") or ("lowerDate" not in request.GET) or ("upperDate" not in request.GET) or ("reportType" not in request.GET):
        return
    
    lowerDate = request.GET["lowerDate"].replace("-", "/")
    upperDate = request.GET["upperDate"].replace("-", "/")
    reportType = request.GET["reportType"]

    docs = None
    if(reportType != "TODOS"):
        docs = db.collection("reports").where("tipo_reporte", "==", reportType).get()
    else:
        docs = db.collection("reports").get()

    lowerDateList =  lowerDate.split("/", 2)
    year = int(lowerDateList[0])
    month = int(lowerDateList[1])
    day = int(lowerDateList[2])
    lowerDateTime = dt.date(year, month, day)

    upperDateList = upperDate.split("/", 2)
    year = int(upperDateList[0])
    month = int(upperDateList[1])
    day = int(upperDateList[2])
    upperDateTime = dt.date(year, month, day)

    coordinates = []
    for doc in docs:
        report = doc.to_dict()
        reportDateList = report["fecha_hora"].split("/", 2)
        reportDateList[2] = reportDateList[2].split(" | ")[0]
        year = int(reportDateList[0])
        month = int(reportDateList[1])
        day = int(reportDateList[2])
        reportDateTime = dt.date(year, month, day)
        if(reportDateTime >= lowerDateTime and reportDateTime <= upperDateTime):
            coordinates.append({"lat":report["latitude"], "lng":report["longitude"], "reportType":report["tipo_reporte"]})

    return JsonResponse(coordinates, safe = False)