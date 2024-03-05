# Generated by Django 5.0.3 on 2024-03-05 06:05

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DpLegal',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('funciones', models.TextField()),
                ('direccion', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Departamento Legal',
                'verbose_name_plural': 'Departamentos Legales',
                'db_table': 'dp_legal',
            },
        ),
        migrations.CreateModel(
            name='DpComercial',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('funciones', models.TextField()),
                ('direccion', models.CharField(max_length=255)),
                ('dp_legal', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='dp_comercial', to='main.dplegal')),
            ],
            options={
                'verbose_name': 'Departamento Comercial',
                'verbose_name_plural': 'Departamentos Comerciales',
                'db_table': 'dp_comercial',
            },
        ),
    ]
