from django.urls import path
from . import views

#urlConf
urlpatterns = [
    path("hello/", views.getHelloWorld),
    path("reports/", views.getFilteredReports)
]