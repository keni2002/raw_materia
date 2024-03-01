from django.db import models

class Address(models.Model):
    street = models.CharField(max_length=255)
    number = models.IntegerField()
    province = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.street} {self.number}, {self.province}'

 CLASSIFICATIONS = [
        ('VEG', 'Vegetal'),
        ('ANI', 'Animal'),
        ('MIN', 'Mineral'),
        ('FOS', 'Fossil'),
]
class Supplier(models.Model):
   

    name = models.CharField(max_length=255)
    classification = models.CharField(max_length=3, choices=CLASSIFICATIONS)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)

    def __str__(self):
        return self.name