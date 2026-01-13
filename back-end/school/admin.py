from django.contrib import admin
from .models import Student, Discipline, AcademicYear, Evaluation, FinalGrade

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('enrollment_number', 'name', 'email')
    search_fields = ('name', 'enrollment_number')

@admin.register(Discipline)
class DisciplineAdmin(admin.ModelAdmin):
    list_display = ('name', 'year_level', 'workload')
    list_filter = ('year_level',)

@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'is_active')

@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ('student', 'discipline', 'evaluation_type', 'value', 'academic_year')
    list_filter = ('discipline', 'academic_year', 'evaluation_type')

@admin.register(FinalGrade)
class FinalGradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'discipline', 'final_score', 'is_approved', 'academic_year')
    list_filter = ('academic_year', 'is_approved')
