# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-23 21:43
from __future__ import unicode_literals
from django.db import migrations
from django.contrib.auth import get_user_model


def create_sample_data(apps, schema_editor):
    Board = apps.get_model('hanabi', 'Board')
    Task = apps.get_model('hanabi', 'Task')
    Status = apps.get_model('hanabi', 'Status')
    User = get_user_model()

    sample_boards = ['Movielens', 'Kanban', 'Spaceship Plans', 'Thesis']
    sample_status = [('TODO', 1), ('Doing', 2), ('Blocked', 3), ('Done', 4)]
    sample_tasks = [('watch a movie', 5, 1, 1), ('rate a movie', 7, 1, 2),
                    ('create cards', 9, 2, 3), ('synergy stuff', 1, 2, 4),
                    ('flux_capicator.get()', 15, 3, 1), ('fly', 18, 3, 3),
                    ('write... a lot', 9, 4, 1), ('be smart', 20, 4, 2)]
    sample_users = [('T.Robert', 'trob@nasa.gov', 'password'),
                    ('Tommy', 'friendofbeyonce@netscape.com', 'password'),
                    ('Art', 'forward@Arsenal.com', 'password'),
                    ('Bryce', 'wizard@python.snake', 'password'),
                    ('Sam', 'q@outdoorschool.edu', 'password'),
                    ('Obama', 'pres@us.gov', 'password')]

    for person in sample_users:
        User.objects.create_user(username=person[0], email=person[1], password=person[2])

    for idx, board in enumerate(sample_boards):
        temp_board = Board(name=board)
        temp_board.save()
        if idx == 0:
            temp_board.users.add(1)
            temp_board.users.add(2)
            temp_board.users.add(3)
        if idx == 1:
            temp_board.users.add(4)
            temp_board.users.add(5)
            temp_board.users.add(6)
        if idx == 2:
            temp_board.users.add(6)
        if idx == 3:
            temp_board.users.add(1)
            temp_board.users.add(2)
            temp_board.users.add(3)
        temp_board.save()

    for status in sample_status:
        temp_status = Status(name=status[0], order=int(status[1]))
        temp_status.save()

    for task in sample_tasks:
        temp_task = Task(user_story=task[0], weight=int(task[1]),
                         board=Board.objects.get(id=int(task[2])),
                         status=Status.objects.get(id=int(task[3])))
        temp_task.save()



class Migration(migrations.Migration):

    dependencies = [
        ('hanabi', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_sample_data)
    ]