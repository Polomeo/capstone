import json
from django.http import JsonResponse
from django.shortcuts import render

from .models import Student

# Create your views here.
def students(request):
    students = Student.objects.all().order_by('-last_name')

    return JsonResponse({"students" : [student.serialize() for student in students]})
    
