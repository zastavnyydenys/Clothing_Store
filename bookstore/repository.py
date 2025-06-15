# repository.py
from .models import Book, Author, Genre
from django.shortcuts import get_object_or_404
from django.db.models import Count, Avg, Max
from django.db.models.functions import ExtractYear

# Book

def get_all_books():
    return Book.objects.all()

def get_book_by_id(pk):
    return get_object_or_404(Book, pk=pk)

def create_book(data, files=None):
    genres = data.pop('genres', [])
    book = Book(**data)
    if files:
        book.cover_image = files.get('cover_image')
    book.save()
    book.genres.set(genres)
    return book

def update_book(book, data, files=None):
    genres = data.pop('genres', [])
    for key, value in data.items():
        setattr(book, key, value)
    if files:
        book.cover_image = files.get('cover_image', book.cover_image)
    book.save()
    if genres:
        book.genres.set(genres)
    return book

def delete_book(book):
    book.delete()


# Author

def get_all_authors():
    return Author.objects.all()

def get_author_by_id(pk):
    return get_object_or_404(Author, pk=pk)

def create_author(data, files=None):
    author = Author(**data)
    if files:
        author.photo = files.get('photo')
    author.save()
    return author

def update_author(author, data, files=None):
    for key, value in data.items():
        setattr(author, key, value)
    if files:
        author.photo = files.get('photo', author.photo)
    author.save()
    return author

def delete_author(author):
    author.delete()


# Genre

def get_all_genres():
    return Genre.objects.all()

def get_genre_by_id(pk):
    return get_object_or_404(Genre, pk=pk)

def create_genre(data):
    return Genre.objects.create(**data)

def update_genre(genre, data):
    for key, value in data.items():
        setattr(genre, key, value)
    genre.save()
    return genre

def delete_genre(genre):
    genre.delete()


# ==== DATA FOR CHARTS ====

def get_books_count_by_genre():
    return (Book.objects.values('genres__name')
            .annotate(book_count=Count('id'))
            .order_by('-book_count'))

def get_avg_price_by_genre():
    return (Book.objects.values('genres__name')
            .annotate(avg_price=Avg('price'))
            .order_by('-avg_price'))

def get_books_with_max_price():
    max_price = Book.objects.aggregate(Max('price'))['price__max']
    return Book.objects.filter(price=max_price).values('title', 'price')

def get_books_count_by_author():
    return (Book.objects.values('author__name')
            .annotate(book_count=Count('id'))
            .order_by('-book_count'))

def get_books_count_by_year():
    return (Book.objects.annotate(year=ExtractYear('published_date'))
            .values('year')
            .annotate(count=Count('id'))
            .order_by('year'))

def get_books_stock():
    return Book.objects.values('title', 'stock').order_by('-stock')
