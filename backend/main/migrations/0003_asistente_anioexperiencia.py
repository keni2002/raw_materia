# Generated by Django 5.0.3 on 2024-03-20 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_abogado_salario_asistente_salario_director_salario'),
    ]

    operations = [
        migrations.AddField(
            model_name='asistente',
            name='anioExperiencia',
            field=models.IntegerField(default=0),
        ),
    ]
