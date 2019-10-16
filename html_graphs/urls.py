from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from page import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    path('admin/', admin.site.urls),
]
