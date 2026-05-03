from django.urls import path
from . import views

urlpatterns = [
    # API Routes
    path('students', views.students, name="students"),
]