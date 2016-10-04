from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from hanabi import views


router = routers.DefaultRouter()
router.register(r'board', views.BoardViewSet, 'Board')
router.register(r'task', views.TaskViewSet, 'Task')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^', include('hanabi.urls'))
]
