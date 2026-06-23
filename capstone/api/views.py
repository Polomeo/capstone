import json
from datetime import datetime, date
from django.http import JsonResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Student, Subject, Exam, Grade

#region STUDENT VIEWS
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
        # Try converting the input data to INT
        personal_id_number = int(personal_id_number)
        enroll_year = int(enroll_year)
        enroll_id = int(enroll_id)

        # VALIDATION -> Personal ID Number
        if personal_id_number < MIN_PID or personal_id_number > MAX_PID:
            errors["errPID"] = f"Personal ID Number must be a number between {MIN_PID} and {MAX_PID}."
    
        # VALIDATION -> Enroll Year
        if enroll_year < MIN_ENROLL_YEAR or enroll_year > MAX_ENROLL_YEAR:
            errors["errEnrollYear"] = f"Enroll year must be between {MIN_ENROLL_YEAR} and {MAX_ENROLL_YEAR}."
        
        # VALIDATION -> Enroll ID
        if enroll_id <= 0:
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

#endregion

#region EXAMS VIEWS
def exams(request):
    exams = Exam.objects.all().order_by('-date')
    return JsonResponse({"exams" : [exam.serialize() for exam in exams]})

def create_exam_form_info(request):
    # Const for validation
    current_year = datetime.today().year

    MIN_EXAM_DATE : str = f"{current_year - 6}-01-01"
    MAX_EXAM_DATE : str = f"{current_year}-12-31"

    subjects = Subject.objects.all().order_by('course', 'name_short')

    exams_info = {
        "min_exam_date" : MIN_EXAM_DATE,
        "max_exam_date" : MAX_EXAM_DATE,
        "subjects" : [subject.serialize() for subject in subjects]
    }

    if (len(exams_info["subjects"]) == 0):
        return JsonResponse({"no_subjects" : "There are no subjects to examinate."})
    else:
        return JsonResponse(exams_info)

@csrf_exempt
def add_exam(request):
    current_year = datetime.today().year

    MIN_EXAM_DATE : str = f"{current_year - 6}-01-01"
    MAX_EXAM_DATE : str = f"{current_year}-12-31"

    if request.method != 'POST':
        return JsonResponse({"error" : "POST request required."})
    
    # Get exam data
    data = json.loads(request.body)

    subject_id = data.get("subjectId")
    exam_date = data.get("examDate")

    # Posible errors
    errors = {}

    #region EXAM DATA VALIDATION
    try:
        subject_id = int(subject_id)
        # exam_date = datetime.strptime(exam_date, "%Y-%m-%d").date()
        exam_date = date.fromisoformat(exam_date) # YYYY-MM-DD

    except ValueError:
        errors["errSubjectId"] = "Subject ID must be an integer."
        errors["errExamDate"] = "Invalid exam date."
    
    # Check the date
    if exam_date < date.fromisoformat(MIN_EXAM_DATE) or exam_date > date.fromisoformat(MAX_EXAM_DATE):
        errors["errExamDate"] = f"Exam date must be between {MIN_EXAM_DATE} and {MAX_EXAM_DATE}"
    
    # Check if exam already exists
    exam_already_exists : bool = Exam.objects.filter(subject__id=subject_id, date=exam_date).exists()
    if exam_already_exists:
        errors["errExamAlreadyExists"] = "This exam already exists."
    
    #endregion

    if len(errors) > 0:
        return JsonResponse({"errors" : errors}, status = 406) # Not Acceptable

    else:
        new_exam = Exam(
            subject = Subject.objects.get(id=subject_id),
            date = exam_date
        )

        new_exam.save()

        return JsonResponse({"success" : "Exam created succesfully"}, status=201) # Created

#endregion

#region GRADING VIEWS
def grading_info(request, exam_id):

    # Get exam and grading data
    gradings = Grade.objects.filter(exam=exam_id).order_by("student__last_name", "student__first_name")
    exam = Exam.objects.get(id=exam_id)

    return JsonResponse({"exam_data" : exam.serialize(), "grading_data" : [grade.serialize() for grade in gradings]})

def update_gradings(request):
    if request.method != 'POST':
        return JsonResponse({"error" : "POST request required."})

    # Get the data from POST

    # Validate the data

    # Create a LIST with the ID of objects to be deleted

    # Create a DICT with objects to be updated, 
    # and their updated values (grading, absent)

    # DELETE the registers in the DELETE list

    # UPDATE the objects in the UPDATE DICT

    # Send the response
    
    
    pass

#endregion