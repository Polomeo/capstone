from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Student(models.Model):
    
    first_name = models.CharField()
    last_name = models.CharField()
    personal_id_number = models.CharField() # CharField since it won't be used to math
    enroll_year = models.IntegerField()
    enroll_id = models.IntegerField()

    def serialize(self):
        return {
            'first_name' : self.first_name,
            'last_name' : self.last_name,
            'personal_id' : self.personal_id_number,
            'enroll_year' : self.enroll_year,
            'enroll_id' : self.enroll_id,
        }

    def __str__(self):
        return f'{self.enroll_year} | {self.last_name}, {self.first_name}'