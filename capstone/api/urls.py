from django.urls import path
from . import views

# API/ Routes
urlpatterns = [
    # Auth
    path('login_status', views.api_user_is_logged_in, name='is_logged_in'),
    path('login', views.api_login_view, name="login"),
    path('logout', views.api_logout, name="logout"),
    # Students
    path('students', views.students, name="students"),
    path('add_student', views.add_student, name="add_student"),
    path('edit_student', views.edit_student, name="edit_student"),
    # Exams
    path('exams', views.exams, name="exams"),
    path('create_exam_form_info', views.create_exam_form_info, name="create_exam_form_info"),
    path('add_exam', views.add_exam, name="add_exam"),
    path('delete_exam', views.delete_exam, name='delete_exam'),
    # Grading
    path('grading_info/<int:exam_id>', views.grading_info, name="grading_info"),
    path('students_exam_info/<int:exam_id>', views.students_to_add_to_exam, name="students_to_add"),
    path('update_gradings', views.update_gradings, name="update_gradings"),
    path('add_students_to_exam', views.add_students_to_exam, name="add_students_to_exam"),
    # Profile
    path('profile_info/<int:student_id>', views.profile_info, name="profile_info"),
]