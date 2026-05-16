from django.contrib import admin
from .models import Student, Subject, Exam, Grade

# Register your models here.
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Exam)
admin.site.register(Grade)