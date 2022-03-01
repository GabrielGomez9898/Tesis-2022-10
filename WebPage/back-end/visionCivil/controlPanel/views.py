from pickle import NONE
import re
from tokenize import String
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from firestoreSettings import db , bucket
import datetime as dt
import numpy as np

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
    i = 0
    for doc in docs:
        fotos = []
        report = doc.to_dict()
        report["id"] = i
        i += 1
        keys = report.keys()
        if('images_ids' in keys):
            images = [str(x) for x in doc.get('images_ids').split(',') if x.strip()]
            for item in images:
                blob = bucket.blob("reports/"+doc.id +"/media/images/"+item)
                #print(blob.generate_signed_url(dt.timedelta(seconds=300), method='GET'))
                fotos.append(blob.generate_signed_url(dt.timedelta(seconds=300), method='GET')) 
        report["fotos"] = fotos
        reports.append(report)    
        print(report.get('fotos'))
        
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