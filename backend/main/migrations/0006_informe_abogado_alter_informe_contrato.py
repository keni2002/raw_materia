# Generated by Django 5.0.3 on 2024-03-24 21:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_contrato_periodo_validez'),
    ]

    operations = [
        migrations.AddField(
            model_name='informe',
            name='abogado',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='informes', to='main.abogado'),
        ),
        migrations.AlterField(
            model_name='informe',
            name='contrato',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='informes', to='main.contrato'),
        ),
    ]