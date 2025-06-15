from django.urls import path
from . import views

urlpatterns = [
     path('', views.index, name='index'),
     path('<int:book_id>', views.single_book, name = 'single_book'),
     # BOOKS
     path('books/', views.book_list, name='book_list'),
     path('books/add/', views.add_book, name='add_book'),
     path('books/<int:pk>/edit/', views.update_book, name='update_book'),
     path('books/<int:pk>/delete/', views.delete_book, name='delete_book'),

    # AUTHORS
     path('authors/', views.author_list, name='author_list'),
     path('authors/add/', views.add_author, name='add_author'),
     path('authors/<int:pk>/edit/', views.update_author, name='update_author'),
     path('authors/<int:pk>/delete/', views.delete_author, name='delete_author'),

     # GENRES
     path('genres/', views.genre_list, name='genre_list'),
     path('genres/add/', views.add_genre, name='add_genre'),
     path('genres/<int:pk>/edit/', views.update_genre, name='update_genre'),
     path('genres/<int:pk>/delete/', views.delete_genre, name='delete_genre'),

     

     path('plotly/', views.plotly_statistics_view, name='plotly_statistics'),
     path('bokeh/', views.bokeh_statistics_view, name='bokeh_statistics'),
     path('test-dashboard/', views.parallel_dashboard, name='parallel_dashboard'),
     ]