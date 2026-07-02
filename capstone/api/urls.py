from django.urls import path
from . import views

# API/ Routes
urlpatterns = [
    # Students
    path('students', views.students, name="students"),
    path('add_student', views.add_student, name="add_student"),
    # Exams
    path('exams', views.exams, name="exams"),
    path('create_exam_form_info', views.create_exam_form_info, name="create_exam_form_info"),
    path('add_exam', views.add_exam, name="add_exam"),
    # Grading
    path('grading_info/<int:exam_id>', views.grading_info, name="grading_info"),
    path('students_exam_info/<int:exam_id>', views.students_to_add_to_exam, name="students_to_add"),
    path('update_gradings', views.update_gradings, name="update_gradings"),
]