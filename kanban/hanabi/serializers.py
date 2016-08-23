from rest_framework import serializers
from .models import Board, Status, Task


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('id', 'name', 'order')


class TaskSerializer(serializers.ModelSerializer):
    status = StatusSerializer()

    class Meta:
        model = Task
        fields = ('id', 'user_story', 'weight', 'board', 'status')


class BoardSerializer(serializers.ModelSerializer):
    task_set = TaskSerializer(many=True)

    class Meta:
        model = Board
        fields = ('id', 'name', 'users', 'task_set')
