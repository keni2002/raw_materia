# Generated by Django 5.0.3 on 2024-03-26 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_informe_codigo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contrato',
            name='codigo',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='informe',
            name='codigo',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]