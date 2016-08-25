from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^board/([0-9]+)/$', views.board, name='board'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.signin, name='login'),
    url(r'^logout/$', views.signout, name='logout'),
    url(r'^learn/$', views.learn, name='learn'),

]
