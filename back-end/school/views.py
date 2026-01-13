from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Student, Discipline, Evaluation, AcademicYear

def home(request):
    total_students = Student.objects.count()
    total_disciplines = Discipline.objects.count()
    return render(request, 'school/home.html', {
        'total_students': total_students,
        'total_disciplines': total_disciplines
    })

def student_list(request):
    students = Student.objects.all().order_by('name')
    return render(request, 'school/student_list.html', {'students': students})

def student_create(request):
    if request.method == 'POST':
        # Simple manual processing for MVP speed, or use Forms
        name = request.POST.get('name')
        enrollment = request.POST.get('enrollment')
        if name and enrollment:
            Student.objects.create(name=name, enrollment_number=enrollment)
            messages.success(request, 'Aluno registado com sucesso!')
            return redirect('student_list')
    return render(request, 'school/student_form.html')

def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    evaluations = student.evaluations.all().order_by('-date')
    return render(request, 'school/student_detail.html', {'student': student, 'evaluations': evaluations})

def discipline_list(request):
    disciplines = Discipline.objects.all().order_by('year_level', 'name')
    return render(request, 'school/discipline_list.html', {'disciplines': disciplines})

def discipline_create(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        year = request.POST.get('year')
        workload = request.POST.get('workload')
        if name and year and workload:
            Discipline.objects.create(name=name, year_level=year, workload=workload)
            messages.success(request, 'Disciplina criada com sucesso!')
            return redirect('discipline_list')
    return render(request, 'school/discipline_form.html')

def evaluation_create(request):
    students = Student.objects.all()
    disciplines = Discipline.objects.all()
    years = AcademicYear.objects.all()
    
    if request.method == 'POST':
        student_id = request.POST.get('student')
        discipline_id = request.POST.get('discipline')
        year_id = request.POST.get('year')
        etype = request.POST.get('type')
        value = request.POST.get('value')
        
        if student_id and discipline_id and value:
            Evaluation.objects.create(
                student_id=student_id,
                discipline_id=discipline_id,
                academic_year_id=year_id,
                evaluation_type=etype,
                value=value
            )
            messages.success(request, 'Nota lançada!')
            return redirect('student_detail', pk=student_id)

    return render(request, 'school/evaluation_form.html', {
        'students': students, 
        'disciplines': disciplines,
        'years': years
    })
