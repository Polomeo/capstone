from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Student(models.Model):
    
    first_name = models.CharField()
    last_name = models.CharField()
    personal_id_number = models.CharField() # CharField since it won't be used to math
    enroll_year = models.IntegerField()
    enroll_id = models.IntegerField() # Legajo (File number)

    def serialize(self):
        return {
            'id' : self.id,
            'first_name' : self.first_name,
            'last_name' : self.last_name,
            'personal_id' : self.personal_id_number,
            'enroll_year' : self.enroll_year,
            'enroll_id' : self.enroll_id,
        }

    def __str__(self):
        return f'{self.enroll_year} | {self.last_name}, {self.first_name}'

class Subject(models.Model):
    name_full = models.CharField()
    name_short = models.CharField()
    course = models.IntegerField() # 1, 2, 3

    def serialize(self):
        return {
            'id' : self.id,
            'name_full' : self.name_full,
            'name_short' : self.name_short,
            'course' : self.course
        }
    
    def __str__(self):
        return f'{self.course}° | {self.name_short}'
    
class Exam(models.Model):
    subject = models.ForeignKey(Subject,
                                on_delete=models.CASCADE,
                                related_name='subject_exams')
    date = models.DateField()
    filled = models.BooleanField(default=False)

    def serialize(self):
        return {
            'id' : self.id,
            'subject_id' : self.subject.id,
            'subject_full' : self.subject.name_short,
            'subject_short' : self.subject.name_short,
            'subject_course' : self.subject.course,
            'date' : self.date.strftime("%Y-%m-%d"),
            'filled' : self.filled
        }
    
    def __str__(self):
        return f"{self.date.strftime("%Y-%m-%d")} - {self.subject.name_short}"
    
class Grade(models.Model):
    exam = models.ForeignKey(Exam,
                             on_delete=models.CASCADE,
                             related_name='grades')
    student = models.ForeignKey(Student,
                                on_delete=models.CASCADE,
                                related_name='grades')
    grading = models.IntegerField(blank=True, null=True)
    absent = models.BooleanField(default=False)

    def serialize(self):
        return {
            'id': self.id,
            'subject_id' : self.exam.subject.id,
            'subject_short' : self.exam.subject.name_short,
            'student_id' : self.student.id,
            'student_full_name' : f'{self.student.last_name}, {self.student.first_name}',
            'student_personal_id' : f'{self.student.personal_id_number}',
            'exam_id' : self.exam.id,
            'exam_date' : self.exam.date.strftime("%Y-%m-%d"),
            'exam_grading' : self.grading,
            'absent' : self.absent,
        }
    
    def __str__(self):
        final_grade  = "Absent" if self.absent else self.grading
        return f"{self.exam.subject.name_short} | {self.student.last_name}, {self.student.first_name} | {final_grade}"