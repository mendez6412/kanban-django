from django.shortcuts import render, redirect
from .models import Board, Status, Task, User
from .serializers import BoardSerializer
from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.forms import UserCreationForm


def index(request):
    return render(request, 'hanabi/index.html')


def boards(request):
    return render(request, 'hanabi/boards.html')


def signin(request):
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect('/')
    else:
        return render(request, 'hanabi/login.html')


def signout(request):
    logout(request)
    return render(request, 'hanabi/logout.html')


def register(request):
    if request.method == 'POST':
        user_form = UserCreationForm(request.POST, prefix='user')
        if user_form.is_valid():
            user = user_form.save(commit=False)
            user.save()
            new_user = authenticate(username=user_form.cleaned_data['username'],
                                    password=user_form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return HttpResponseRedirect('/')
    else:
        user_form = UserCreationForm(prefix='user')
    context = {
        'userform': user_form
    }
    return render(request, 'hanabi/register.html', context)


class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Board.objects.filter(users=user)

        return queryset
