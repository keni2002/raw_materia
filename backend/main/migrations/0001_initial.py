# Generated by Django 5.0.3 on 2024-03-31 20:53

import django.core.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Trabajador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('nombre', models.CharField(max_length=255, validators=[django.core.validators.RegexValidator('^[a-zA-Z\\s]+$', 'Solo se permiten letras y espacios')])),
                ('apellido', models.CharField(max_length=255, validators=[django.core.validators.RegexValidator('^[a-zA-Z\\s]+$', 'Solo se permiten letras y espacios')])),
                ('direccion', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Direccion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calle', models.CharField(max_length=255)),
                ('numero', models.IntegerField()),
                ('municipio', models.CharField(max_length=255)),
                ('provincia', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DpComercial',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('funciones', models.TextField()),
                ('direccion', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Departamento Comercial',
                'verbose_name_plural': 'Departamentos Comerciales',
                'db_table': 'dp_comercial',
            },
        ),
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
            name='Abogado',
            fields=[
                ('trabajador_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('salario', models.DecimalField(decimal_places=2, default=2000, max_digits=10)),
            ],
            options={
                'abstract': False,
            },
            bases=('main.trabajador',),
        ),
        migrations.CreateModel(
            name='Comercial',
            fields=[
                ('trabajador_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('anioExperiencia', models.IntegerField(default=0)),
                ('fechaNacimiento', models.DateField(default='2002-01-21')),
                ('salario', models.DecimalField(decimal_places=2, default=2000, max_digits=10)),
                ('departamento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comerciales', to='main.dpcomercial')),
            ],
            options={
                'abstract': False,
            },
            bases=('main.trabajador',),
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('trabajador_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('gradoAcademico', models.CharField(choices=[('TEC', 'Tecnico'), ('ING', 'Ingeniero'), ('LIC', 'Licenciado'), ('MAE', 'Maestria'), ('DOC', 'Doctorado')], max_length=50)),
                ('salario', models.DecimalField(decimal_places=2, default=2000, max_digits=10)),
                ('departamento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='directores', to='main.dpcomercial')),
            ],
            options={
                'abstract': False,
            },
            bases=('main.trabajador',),
        ),
        migrations.CreateModel(
            name='Division',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('clasificacion', models.CharField(choices=[('A', 'Vegetal (A)'), ('B', 'Animal (B)'), ('C', 'Mineral (C)'), ('D', 'Fosil (D)')], max_length=255)),
                ('dp_legal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='divisiones', to='main.dplegal')),
            ],
        ),
        migrations.CreateModel(
            name='Suministrador',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('clasificacion', models.CharField(choices=[('VEG', 'Vegetal'), ('ANIM', 'Animal'), ('MIN', 'Mineral'), ('FOS', 'Fosil')], max_length=255)),
                ('direccion', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='suministrador', to='main.direccion')),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('calidad', models.CharField(choices=[('ALTA', 'Alta'), ('MEDIA', 'Media'), ('BAJA', 'Baja')], default='ALTA', editable=False, max_length=255)),
                ('tipo', models.CharField(choices=[('VEG', 'Vegetal'), ('ANIM', 'Animal'), ('MIN', 'Mineral'), ('FOS', 'Fosil')], max_length=255)),
                ('fecha_produccion', models.DateField()),
                ('fecha_vencimiento', models.DateField()),
                ('suministrador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='main.suministrador')),
            ],
        ),
        migrations.CreateModel(
            name='Contrato',
            fields=[
                ('codigo', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_creacion', models.DateField(auto_now=True)),
                ('periodo_validez', models.DateField()),
                ('descripcion', models.TextField()),
                ('estado', models.CharField(choices=[('P', 'Pendiente'), ('A', 'Aprobado'), ('N', 'No Aprobado')], default='P', max_length=255)),
                ('suministrador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contratos', to='main.suministrador')),
                ('comercial', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contratos', to='main.comercial')),
            ],
        ),
        migrations.CreateModel(
            name='Informe',
            fields=[
                ('codigo', models.CharField(editable=False, max_length=100, primary_key=True, serialize=False)),
                ('fecha', models.DateField(auto_now_add=True)),
                ('descripcion', models.TextField()),
                ('contrato', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='informes', to='main.contrato')),
                ('abogado', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='informes', to='main.abogado')),
            ],
        ),
        migrations.AddField(
            model_name='abogado',
            name='division',
            field=models.ManyToManyField(related_name='abogados', to='main.division'),
        ),
        migrations.CreateModel(
            name='Asistente',
            fields=[
                ('trabajador_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('fechaNacimiento', models.DateField(default='2002-01-21')),
                ('anioExperiencia', models.IntegerField(default=0)),
                ('nivelEscolar', models.CharField(choices=[('PRIM', 'Primaria'), ('SEC', 'Secundaria'), ('BACH', 'Bachillerato'), ('UNIV', 'Universidad')], max_length=50)),
                ('salario', models.DecimalField(decimal_places=2, default=2000, max_digits=10)),
                ('departamento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asistentes', to='main.dpcomercial')),
            ],
            options={
                'abstract': False,
            },
            bases=('main.trabajador',),
        ),
        migrations.CreateModel(
            name='Factura',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fecha_compra', models.DateField()),
                ('importe', models.DecimalField(decimal_places=2, max_digits=10)),
                ('contrato', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='compras', to='main.contrato')),
                ('producto', models.ManyToManyField(related_name='compras', to='main.producto')),
                ('comercial', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='compras', to='main.comercial')),
            ],
        ),
        migrations.CreateModel(
            name='Evaluacion',
            fields=[
                ('codigo', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fecha', models.DateField(auto_now_add=True)),
                ('calificacion', models.CharField(choices=[('0', 'Indeterminado'), ('2', 'Mal'), ('3', 'Regular'), ('4', 'Bien'), ('5', 'Excelente')], default='0', max_length=255)),
                ('trabajador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluaciones', to=settings.AUTH_USER_MODEL)),
                ('director', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluados', to='main.director')),
            ],
        ),
    ]
