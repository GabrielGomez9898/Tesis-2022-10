from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from firestoreSettings import db

# Create your views here.
def getHelloWorld(request):
    return HttpResponse("Hello World")

def getFilteredReports(request):
    result = db.collection("reports").document("EEB28GMGLvvh2qJnPep7").get()
    return JsonResponse(result.to_dict()) if result.exists else JsonResponse({})