from django.db import models

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
class Author(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank = True) # null=True: database can be NULL, blank=True: form can be empty
    death_date = models.DateField(null=True, blank = True) 
    photo = models.ImageField(upload_to='authors_photos/',null = True, blank = True) # upload_to: where to save the file in the media folder, null=True: database can be NULL, blank=True: form can be empty
       
    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete = models.SET_NULL, null=True, blank=True, related_name='books')
    genres = models.ManyToManyField(Genre, related_name="books")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    published_date = models.DateField(null=True, blank=True) # blank=True: form can be empty
    description = models.TextField(blank = True)
    stock = models.PositiveIntegerField(default=0)
    isbn = models.CharField(max_length=13, unique=True)
    cover_image = models.ImageField(upload_to='books_covers/', null=True, blank=True)
    # on_delete: what to do when the author is deleted, SET_NULL: set the author to NULL, CASCADE: delete the book, PROTECT: prevent deletion of the author if there are books related to it
   
    def __str__(self):
        return self.title

