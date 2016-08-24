from django import forms
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    # password = forms.Charfield(widget=forms.PasswordInput())
    email = forms.EmailField(label="Email")

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
