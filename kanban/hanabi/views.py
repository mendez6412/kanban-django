from django.shortcuts import render
from .models import Board, Status, Task, User
from .serializers import BoardSerializer
from rest_framework import viewsets


def index(request):
    return render(request, 'hanabi/index.html')


def boards(request):
    return render(request, 'hanabi/boards.html')


class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    queryset = Board.objects.all().order_by('name')
