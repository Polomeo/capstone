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

    # Constants
    MIN_CHAR : int = 2
    MAX_CHAR : int = 30

    if request.method != 'POST':
        return JsonResponse({"error" : "POST request required."})
    
    # Create Student and save
    data = json.loads(request.body)

    student = data.get("studentData")
    errors = {}

    # Validate the data sent by frontend
    if len(student.firstName) < MIN_CHAR or len(student.firstName) > MAX_CHAR:
        errors["errFirstName"] = f"First name must be betweeen {MIN_CHAR} and {MAX_CHAR} characters."

    ## TO COMPLETE WITH REST OF THE FIELTS


    # Check if errors, else create student and return success
    if len(errors) > 0:
        return JsonResponse({"errors" : errors}, status = 406) # Not Acceptable

    else:
        new_student = Student(
            first_name = student.firstName,
            last_name = student.lastName,
            personal_id_number = student.personalIdNumber,
            enroll_year = student.enrollYear,
            enroll_id = student.enrollId,
        )

        new_student.save()

        return JsonResponse({"success" : "Student created succesfully"}, status=201) # Created
    
