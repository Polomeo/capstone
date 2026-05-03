import json
from django.http import JsonResponse
from django.shortcuts import render

from .models import Student

# Create your views here.
def students(request):
    students = Student.objects.all().order_by('-last_name')

    if len(students) == 0:
        return JsonResponse({"no_students" : "There are no students registered."})
    else:
        return JsonResponse({"students" : [student.serialize() for student in students],})
    
