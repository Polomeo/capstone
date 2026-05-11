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

    # Student data
    last_name = data.get("lastName")
    first_name = data.get("firstName")
    personal_id_number = data.get("personalIdNumber")
    enroll_year = data.get("enrollYear")
    enroll_id = data.get("enrollId")
    
    errors = {}

    # Validate the data sent by frontend
    if len(last_name) < MIN_CHAR or len(last_name) > MAX_CHAR:
        errors["errLastName"] = f"Last name must be betweeen {MIN_CHAR} and {MAX_CHAR} characters."

    ## TO COMPLETE WITH REST OF THE FIELDS


    # Check if errors, else create student and return success
    if len(errors) > 0:
        return JsonResponse({"errors" : errors}, status = 406) # Not Acceptable

    else:
        new_student = Student(
            first_name = first_name,
            last_name = last_name,
            personal_id_number = personal_id_number,
            enroll_year = enroll_year,
            enroll_id = enroll_id,
        )

        new_student.save()

        return JsonResponse({"success" : "Student created succesfully"}, status=201) # Created
    
