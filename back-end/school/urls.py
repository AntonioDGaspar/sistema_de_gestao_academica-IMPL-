from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('students/', views.student_list, name='student_list'),
    path('students/add/', views.student_create, name='student_create'),
    path('students/<int:pk>/', views.student_detail, name='student_detail'),
    path('disciplines/', views.discipline_list, name='discipline_list'),
    path('disciplines/add/', views.discipline_create, name='discipline_create'),
    path('evaluations/add/', views.evaluation_create, name='evaluation_create'),
]
