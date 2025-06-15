from django.shortcuts import render, redirect
from django.http import Http404
from .forms import BookForm, AuthorForm, GenreForm
from . import repository
import time
import io
import base64
import matplotlib.pyplot as plt
from concurrent.futures import ThreadPoolExecutor
from django.shortcuts import render
from bokeh.plotting import figure
from bokeh.embed import components

# Книги
def index(request):
    books = repository.get_all_books()
    return render(request, 'bookstore/books.html', {'books': books})

def single_book(request, book_id):
    book = repository.get_book_by_id(book_id)
    if not book:
        raise Http404("Book does not exist")
    return render(request, 'bookstore/single_book.html', {'book': book})

def book_list(request):
    books = repository.get_all_books()
    return render(request, 'books/book_list.html', {'books': books})

def add_book(request):
    if request.method == "POST":
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            repository.create_book(form.cleaned_data, request.FILES)
            return redirect('bookstore:book_list')
    else:
        form = BookForm()
    return render(request, 'books/book_form.html', {'form': form})

def update_book(request, pk):
    book = repository.get_book_by_id(pk)
    form = BookForm(request.POST or None, request.FILES or None, instance=book)
    if form.is_valid():
        repository.update_book(book, form.cleaned_data, request.FILES)
        return redirect('bookstore:book_list')
    return render(request, 'books/book_form.html', {'form': form})

def delete_book(request, pk):
    book = repository.get_book_by_id(pk)
    if request.method == "POST":
        repository.delete_book(book)
        return redirect('bookstore:book_list')
    return render(request, 'books/book_confirm_delete.html', {'book': book})

# Автори
def author_list(request):
    authors = repository.get_all_authors()
    return render(request, 'authors/author_list.html', {'authors': authors})

def add_author(request):
    if request.method == "POST":
        form = AuthorForm(request.POST, request.FILES)
        if form.is_valid():
            repository.create_author(form.cleaned_data, request.FILES)
            return redirect('bookstore:author_list')
    else:
        form = AuthorForm()
    return render(request, 'authors/author_form.html', {'form': form})

def update_author(request, pk):
    author = repository.get_author_by_id(pk)
    form = AuthorForm(request.POST or None, request.FILES or None, instance=author)
    if form.is_valid():
        repository.update_author(author, form.cleaned_data, request.FILES)
        return redirect('bookstore:author_list')
    return render(request, 'authors/author_form.html', {'form': form})

def delete_author(request, pk):
    author = repository.get_author_by_id(pk)
    if request.method == "POST":
        repository.delete_author(author)
        return redirect('bookstore:author_list')
    return render(request, 'authors/author_confirm_delete.html', {'author': author})

# Жанри
def genre_list(request):
    genres = repository.get_all_genres()
    return render(request, 'genres/genre_list.html', {'genres': genres})

def add_genre(request):
    if request.method == "POST":
        form = GenreForm(request.POST)
        if form.is_valid():
            repository.create_genre(form.cleaned_data)
            return redirect('bookstore:genre_list')
    else:
        form = GenreForm()
    return render(request, 'genres/genre_form.html', {'form': form})

def update_genre(request, pk):
    genre = repository.get_genre_by_id(pk)
    form = GenreForm(request.POST or None, instance=genre)
    if form.is_valid():
        repository.update_genre(genre, form.cleaned_data)
        return redirect('bookstore:genre_list')
    return render(request, 'genres/genre_form.html', {'form': form})

def delete_genre(request, pk):
    genre = repository.get_genre_by_id(pk)
    if request.method == "POST":
        repository.delete_genre(genre)
        return redirect('bookstore:genre_list')
    return render(request, 'genres/genre_confirm_delete.html', {'genre': genre})


from django.shortcuts import render
from .plotly_charts import (
    plotly_books_count_by_genre,
    plotly_avg_price_by_genre,
    plotly_books_with_max_price,
    plotly_books_count_by_author,
    plotly_books_count_by_year,
    plotly_books_stock
)
from .bokeh_charts import (
    bokeh_books_count_by_genre,
    bokeh_avg_price_by_genre,
    bokeh_books_with_max_price,
    bokeh_books_count_by_author,
    bokeh_books_count_by_year,
    bokeh_books_stock
)

def plotly_statistics_view(request):
    graphs = [
        plotly_books_count_by_genre(),
        plotly_avg_price_by_genre(),
        plotly_books_with_max_price(),
        plotly_books_count_by_author(),
        plotly_books_count_by_year(),
        plotly_books_stock()
    ]
    return render(request, 'charts/statistics_plotly.html', {'plotly_graphs': graphs})

def bokeh_statistics_view(request):
    script1, div1 = bokeh_books_count_by_genre()
    script2, div2 = bokeh_avg_price_by_genre()
    script3, div3 = bokeh_books_with_max_price()
    script4, div4 = bokeh_books_count_by_author()
    script5, div5 = bokeh_books_count_by_year()
    script6, div6 = bokeh_books_stock()

    return render(request, 'charts/statistics_bokeh.html', {
        'script1': script1, 'div1': div1,
        'script2': script2, 'div2': div2,
        'script3': script3, 'div3': div3,
        'script4': script4, 'div4': div4,
        'script5': script5, 'div5': div5,
        'script6': script6, 'div6': div6,
    })


def execute_parallel_queries(num_requests, num_threads):
    def task():
        list(repository.get_all_books())

    start_time = time.perf_counter()
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [executor.submit(task) for _ in range(num_requests)]
        for future in futures:
            future.result()
    end_time = time.perf_counter()

    return end_time - start_time



def parallel_dashboard(request):
    num_requests_list = [50, 100, 150, 200, 500, 1000]
    num_threads_list = [1, 2, 4, 8, 16]
    results = []

    for num_requests in num_requests_list:
        for num_threads in num_threads_list:
            time_taken = execute_parallel_queries(num_requests, num_threads)
            results.append((num_requests, num_threads, time_taken))


    fig, ax = plt.subplots(figsize=(10, 6))
    for num_requests in num_requests_list:
        filtered = [r for r in results if r[0] == num_requests]
        threads = [r[1] for r in filtered]
        times = [r[2] for r in filtered]
        ax.plot(threads, times, label=f'{num_requests} запитів')

    ax.set_xlabel('Кількість потоків')
    ax.set_ylabel('Час виконання (секунди)')
    ax.set_title('Час виконання залежно від потоків і кількості запитів')
    ax.legend()
    ax.grid(True)

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')

    return render(request, 'parallel_dashboard.html', {'graph': img_base64})

