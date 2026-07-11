import json
from datetime import datetime, date
from django.contrib.auth import authenticate, login
from django.db.models import Count, Q
from django.http import JsonResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from functools import wraps

from .models import Student, Subject, Exam, Grade

#region AUTH VIEWS

# Login required custom decorator
### Used to send a custom JsonResponse instead of the
### redirect that @login_required uses
def api_login_required(view_function):
    @wraps(view_function)   # wraps the function we specify
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error' : 'User not logged in.'}, status= 401)
        return view_function(request, *args, **kwargs)
    return _wrapped_view # Returns the function wrapped, inserting this code above.

# Tries to authenticate user
@csrf_exempt
def api_login_view(request):
    if request.method == 'POST':

        # Get the data
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Try to authenticate
        user = authenticate(request, username=username, password=password)

        # Check if authenticated
        if user is not None:
            login(request, user)
            return JsonResponse({'success' : 'User logged in.'}, status= 201)
        else:
            return JsonResponse({'error' : 'Invalid username or password.'}, status = 401)
    
    # If not POST request
    return JsonResponse({'error' : 'POST request is required.'})

# Checks if the user is authenticated
def api_user_is_logged_in(request):
    if request.user.is_authenticated:
        return JsonResponse({'authenticated' : True}, status = 200)
    return JsonResponse({'authenticated' : False}, status = 401)

#endregion

#region STUDENT VIEWS
@api_login_required
def students(request):
    # Sends the student info and the total subjects approved per course
    APPROVING_MARK : int = 4

    # Gets the total courses per year
    subjects_per_course = {
        courses['course'] : courses['total'] for courses in Subject.objects.values('course').annotate(total=Count('id'))
    }

    # Gets all the students
    # and the subject each approved per year
    students = Student.objects.all().annotate(
        approved_1 = Count(
            'grades',
            filter=Q(
                grades__exam__subject__course = 1,          # First course subjects
                grades__grading__gte = APPROVING_MARK,      # Approved
                grades__absent = False                      # Not absent
            ), distinct= True                               # Counts only different subjects
        ),
        approved_2 = Count(
            'grades',
            filter=Q(
                grades__exam__subject__course = 2,
                grades__grading__gte = APPROVING_MARK,
                grades__absent = False
            ), distinct= True
        ),
        approved_3 = Count(
            'grades',
            filter=Q(
                grades__exam__subject__course = 3,
                grades__grading__gte = APPROVING_MARK,
                grades__absent = False
            ), distinct= True
        ),
    ).order_by('last_name', 'first_name')

    # Compile the information
    student_with_grades = []

    for student in students:
        data = student.serialize()

        # Add the approved per course
        data['approved_per_course'] = {
            "c1" : student.approved_1,
            "c2" : student.approved_2,
            "c3" : student.approved_3,
        }

        # Append to the list with the approved added
        student_with_grades.append(data)

    return JsonResponse({
        "subjects_per_course" : subjects_per_course,
        "students" : student_with_grades
        })

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

def students_to_add_to_exam(request, exam_id):

    APPROVING_MARK : int = 4 # Minimal mark to approve the exam (this could be in a config file)

    # Get the students and the grades
    students = Student.objects.all().order_by('last_name', 'first_name')
    
    current_exam = Exam.objects.get(id = exam_id)
    current_exam_grades = Grade.objects.filter(exam = current_exam)
    
    # Get the previous exams of the same subject
    past_exam_grades = Grade.objects.filter(exam__subject = current_exam.subject).exclude(exam=current_exam)

    student_data = []

    # Check if student is already in exam or aproved it
    for student in students:
        # Checks if the student is already in the exam
        already_in_exam : bool = current_exam_grades.filter(
            student = student
            ).exists()
        
        # Checks if approved the subject previously
        already_approved : bool = past_exam_grades.filter(
            student = student,
            grading__gte = APPROVING_MARK, # __gte => greater than or equal to
            absent = False
        ).exists()

        # Compile the info
        student_grading_info = {
            'id' : student.id,
            'student_full_name' : f"{student.last_name}, {student.first_name}",
            'already_in_exam' : already_in_exam,
            'already_approved' : already_approved,
        }

        # Add to list
        student_data.append(student_grading_info)

    return JsonResponse({'student_data' : student_data})

@csrf_exempt
def add_students_to_exam(request):

    if request.method != 'POST':
        return JsonResponse({"error" : "POST request required."})
    
    data = json.loads(request.body)
    exam_id = int(data.get("examId"))

    errors = {}

    for student_id in data.get("studentsToAdd"):
        student_already_in_exam : bool = Grade.objects.filter(
            exam__id=exam_id,
            student__id=student_id).exists()
        if student_already_in_exam:
            errors[f'errAlreadyInExam_{student_id}'] = f"Student ID N° {student_id} is already in the exam."

    if len(errors) > 0:
        return JsonResponse({'errors' : errors})
    else:
        # Create iterable
        exam = Exam.objects.get(id=exam_id)
        students_to_add = []
        for student in data.get("studentsToAdd"):
            new_student = Grade(exam=exam, student=Student.objects.get(id=int(student)))
            students_to_add.append(new_student)

        # Add to database in bulk
        Grade.objects.bulk_create(students_to_add)
        
        # Return response
        return JsonResponse({'success' : 'Students added to exam.'}, status=201)

@csrf_exempt
def update_gradings(request):
    '''
    Checks if Gradings data is valid and updates de Database
    '''

    if request.method != 'POST':
        return JsonResponse({"error" : "POST request required."})
    
    MIN_GRADE : int = 1
    MAX_GRADE : int = 10
    SHOW_DEBUG_INFO : bool = False # Shows grading info in console

    # Get the data from POST
    data = json.loads(request.body)

    # Posible errors
    errors = {}
    
    # Bulk update data
    update_deleted = []
    update_bulk_absents = []
    update_bulk_gradings = []
    
    #region GRADING DATA VALIDATION  
    
    for grading in data:
        if SHOW_DEBUG_INFO:
            print("--------------------")
            print(f"Grading ID: {grading["id"]}")
            print(f"Name: {grading["student_full_name"]}")
            print(f"Subject: {grading["subject_short"]}")
            print(f"Last Grading: {grading["exam_grading"]}")
            print(f"New Grading: {grading["new_exam_grading"]}")
            print(f"Absent: {grading["absent"]}")
            print(f"New Absent: {grading["new_absent"]}")
            print(f"Deleted: {grading["deleted"]}")

        # Add to delete list
        if grading['deleted'].lower() == 'true':
            update_deleted.append(int(grading['id']))
            continue
        
        # Cast Absent to True or False
        new_absent : bool
        if grading['new_absent'].lower() == 'true':
            new_absent = True
        else:
            new_absent = False
        
        # Add to absent list if changed
        if grading['absent'] != new_absent:
            # Get the grading object from DB and update its grading
            grade_obj = Grade.objects.get(id=int(grading['id']))
            grade_obj.absent = new_absent
            update_bulk_absents.append(grade_obj)
            
        if new_absent == True:
            continue

        # Check if grading == null, and not absent or deleted
        if (grading['new_exam_grading'] == None):
            errors[f"errNoGradingNoAbsent_{grading['id']}"] = f"{grading['student_full_name']} has no grading and is not absent."
            continue
        
        # Grading is out of range
        if int(grading['new_exam_grading']) < MIN_GRADE or int(grading['new_exam_grading']) > MAX_GRADE:
            errors[f"errGradingOutOfRange_{grading['id']}"] = f"{grading['student_full_name']} grade must be between {MIN_GRADE} and {MAX_GRADE}."
            continue

        # Add to update grading list
        if grading['new_exam_grading'] != grading['exam_grading']:
            # update_bulk_gradings.append(int(grading['id']))
            grade_obj = Grade.objects.get(id=int(grading['id']))
            grade_obj.grading = int(grading['new_exam_grading'])
            update_bulk_gradings.append(grade_obj)

    #endregion

    if SHOW_DEBUG_INFO:
        print("Grades to delete: ", update_deleted)
        print("Grades to set absent: ", update_bulk_absents)
        print("Grades to update gradings: ", update_bulk_gradings)

    # Send the response
    if len(errors) > 0:
        if SHOW_DEBUG_INFO: print(errors)
        return JsonResponse({"errors" : errors}, status = 406) # Not acceptable
    else:
        # Delete
        Grade.objects.filter(id__in = update_deleted).delete()
        # Update absents
        Grade.objects.bulk_update(update_bulk_absents, ['absent'])
        # Update grades
        Grade.objects.bulk_update(update_bulk_gradings, ['grading'])

        return JsonResponse({"success" : "Grades updated successfully"})

#endregion

#region PROFILE VIEWS
def profile_info(request, student_id):
    # Returns the student personal data
    student = Student.objects.get(id=student_id)

    # Returns the exams the student attended
    grades = Grade.objects.filter(student=student).order_by('-exam__subject__course','-exam__date','exam__subject__name_short')

    return JsonResponse({'student_personal_info' : student.serialize(), 'student_academic_history': [grade.serialize() for grade in grades]})

#endregion