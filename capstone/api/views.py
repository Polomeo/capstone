import json
from datetime import datetime
from django.http import JsonResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Student

# Create your views here.
def students(request):
    students = Student.objects.all().order_by('last_name')

    return JsonResponse({"students" : [student.serialize() for student in students]})

@csrf_exempt
def add_student(request):

    # Constants for validation
    current_year = datetime.today().year

    MIN_CHAR : int = 2
    MAX_CHAR : int = 30
    MIN_PID : int = 1000000
    MAX_PID : int = 99999999
    MIN_ENROLL_YEAR : int = current_year - 5
    MAX_ENROLL_YEAR : int = current_year + 1

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
    
    # Posible errors
    errors = {}

#region STUDENT DATA VALIDATION
    # VALIDATION -> Last Name
    if len(last_name) < MIN_CHAR or len(last_name) > MAX_CHAR:
        errors["errLastName"] = f"Last name must be betweeen {MIN_CHAR} and {MAX_CHAR} characters."

    # VALIDATION -> First Name
    if len(first_name) < MIN_CHAR or len(first_name) > MAX_CHAR:
        errors["errFirstName"] = f"First name must be betweeen {MIN_CHAR} and {MAX_CHAR} characters."
    
    # VALIDATION -> Numbers
    try:
        personal_id_number = int(personal_id_number)
        enroll_year = int(enroll_year)
        enroll_id = int(enroll_id)

        if not isinstance(personal_id_number, int) or (personal_id_number < MIN_PID or personal_id_number > MAX_PID):
            errors["errPID"] = f"Personal ID Number must be a number between {MIN_PID} and {MAX_PID}."
    
        # VALIDATION -> Enroll Year
        if not isinstance(enroll_year, int) or (enroll_year < MIN_ENROLL_YEAR or enroll_year > MAX_ENROLL_YEAR):
            errors["errEnrollYear"] = f"Enroll year must be between {MIN_ENROLL_YEAR} and {MAX_ENROLL_YEAR}."
        
        # VALIDATION -> Enroll ID
        if not isinstance(enroll_id, int) or enroll_id <= 0:
            errors["errEnrollId"] = f"Eroll ID number cannot be blank or negative."

    except ValueError:
        errors["errInvalidNumber"] = f'Personal ID number, Enroll Year and Enroll ID must be integer numbers.'

    

#endregion


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
    
