from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Board(models.Model):
    name = models.CharField(max_length=50)
    users = models.ManyToManyField(User)


class Status(models.Model):
    name = models.CharField(max_length=20)
    order = models.IntegerField()


class Task(models.Model):
    user_story = models.TextField()
    weight = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(21)])
    board = models.ForeignKey(Board)
    status = models.ForeignKey(Status)
