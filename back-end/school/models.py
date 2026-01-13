from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class AcademicYear(models.Model):
    year = models.IntegerField(unique=True, help_text="Ex: 2024")
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return str(self.year)

class Student(models.Model):
    name = models.CharField(max_length=200)
    enrollment_number = models.CharField(max_length=20, unique=True, verbose_name="Número de Matrícula")
    birth_date = models.DateField(null=True, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    # Current status
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.enrollment_number} - {self.name}"

class Discipline(models.Model):
    YEAR_CHOICES = [
        (1, '1º Ano'),
        (2, '2º Ano'),
        (3, '3º Ano'),
        (4, '4º Ano'),
    ]
    name = models.CharField(max_length=100)
    year_level = models.IntegerField(choices=YEAR_CHOICES, verbose_name="Ano Curricular")
    workload = models.IntegerField(help_text="Carga horária em horas")
    
    def __str__(self):
        return f"{self.name} ({self.get_year_level_display()})"

class Evaluation(models.Model):
    TYPE_CHOICES = [
        ('TEST', 'Teste'),
        ('EXAM', 'Exame'),
        ('WORK', 'Trabalho'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='evaluations')
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, related_name='evaluations')
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    
    evaluation_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    value = models.DecimalField(max_digits=4, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(20)])
    date = models.DateField(default=timezone.now)
    
    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.student} - {self.discipline} - {self.evaluation_type}: {self.value}"

class FinalGrade(models.Model):
    """
    Stores the final calculated grade for a student in a discipline for a specific year.
    Used for historical records.
    """
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='final_grades')
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    
    final_score = models.DecimalField(max_digits=4, decimal_places=2)
    is_approved = models.BooleanField()
    
    generated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['student', 'discipline', 'academic_year']

    def __str__(self):
        status = "Aprovado" if self.is_approved else "Reprovado"
        return f"{self.student} - {self.discipline}: {self.final_score} ({status})"
