# Generated by Django 5.0.3 on 2024-03-26 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_informe_codigo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='informe',
            name='codigo',
            field=models.CharField(editable=False, max_length=100, primary_key=True, serialize=False),
        ),
    ]
