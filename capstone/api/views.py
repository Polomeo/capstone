import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Student

# Create your views here.
def students(request):
    students = Student.objects.all().order_by('last_name')

    return JsonResponse({"students" : [student.serialize() for student in students]})

@csrf_exempt
def add_student(request):
    if request.method != 'POST':
        return JsonResponse({"error" : "POST request required."})
    
    # Create Student and save
    data = json.loads(request.body)

    student_data = data.get("studentData")

    new_student = Student(
        first_name = student_data.firstName,
        last_name = student_data.lastName,
        personal_id_number = student_data.personalIdNumber,
        enroll_year = student_data.enrollYear,
        enroll_id = student_data.enrollId,
    )

    new_student.save()

    return JsonResponse({"message" : "Student created succesfully"}, status=201)
    
