from django.urls import path
from . import views

#urlConf
urlpatterns = [
    path("report", views.getReportById),
    path("reports/", views.getAllReports),
    path("filteredReports", views.getFilteredReports)
]