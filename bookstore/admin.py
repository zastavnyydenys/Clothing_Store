from django.contrib import admin
from . import models

admin.site.register(models.Book)
admin.site.register(models.Genre)
admin.site.register(models.Author)

# Register your models here.
