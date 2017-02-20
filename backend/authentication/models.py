from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    has_viewed_tutorial = models.BooleanField()
    paid_user = models.BooleanField()
    has_taken_test = models.BooleanField()

    location = models.TextField(max_length=9)
    first_name = models.TextField(max_length=20)
    last_name = models.TextField(max_length=20)

    age = models.IntegerField()

    def __unicode__(self):
        return self.user.username + ": " + self.first_name + " " + self.last_name