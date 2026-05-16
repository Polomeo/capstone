from django.urls import path
from . import views

# API/ Routes
urlpatterns = [
    # Students
    path('students', views.students, name="students"),
    path('add_student', views.add_student, name="add_student"),
    # Exams
    path('exams', views.exams, name="exams"),

]