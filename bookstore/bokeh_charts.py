# bokeh_charts.py
from bokeh.plotting import figure
from bokeh.embed import components
from bokeh.models import ColumnDataSource
from .repository import (
    get_books_count_by_genre,
    get_avg_price_by_genre,
    get_books_with_max_price,
    get_books_count_by_author,
    get_books_count_by_year,
    get_books_stock
)

def bokeh_books_count_by_genre():
    data = get_books_count_by_genre()
    source = ColumnDataSource(data={
        'genre': [d['genres__name'] for d in data],
        'count': [int(d['book_count']) for d in data],
    })
    p = figure(x_range=source.data['genre'], title="Кількість книг за жанрами")
    p.vbar(x='genre', top='count', width=0.5, source=source, color="navy")
    return components(p)

def bokeh_avg_price_by_genre():
    data = get_avg_price_by_genre()
    source = ColumnDataSource(data={
        'genre': [d['genres__name'] for d in data],
        'price': [float(d['avg_price']) for d in data],
    })
    p = figure(x_range=source.data['genre'], title="Середня ціна книг за жанрами")
    p.vbar(x='genre', top='price', width=0.5, source=source, color="green")
    return components(p)

def bokeh_books_with_max_price():
    data = get_books_with_max_price()
    if not data:
        return "", ""

    titles = [d['title'] or '—' for d in data]
    prices = [float(d['price']) for d in data]

    source = ColumnDataSource(data={'title': titles, 'price': prices})

    p = figure(x_range=titles, title="Книги з максимальною ціною", height=350)
    p.vbar(x='title', top='price', width=0.5, source=source, color="red")

    return components(p)

def bokeh_books_count_by_author():
    data = get_books_count_by_author()
    source = ColumnDataSource(data={
        'author': [d['author__name'] for d in data],
        'count': [int(d['book_count']) for d in data],
    })
    p = figure(x_range=source.data['author'], title="Кількість книг по авторам")
    p.vbar(x='author', top='count', width=0.5, source=source, color="orange")
    return components(p)

def bokeh_books_count_by_year():
    data = get_books_count_by_year()
    source = ColumnDataSource(data={
        'year': [str(d['year']) for d in data],
        'count': [int(d['count']) for d in data],
    })
    p = figure(x_range=source.data['year'], title="Кількість книг за роками")
    p.line(x='year', y='count', source=source, line_width=2)
    return components(p)

def bokeh_books_stock():
    data = get_books_stock()
    source = ColumnDataSource(data={
        'title': [d['title'] for d in data],
        'stock': [int(d['stock']) for d in data],
    })
    p = figure(x_range=source.data['title'], title="Запаси книг (Stock)")
    p.vbar(x='title', top='stock', width=0.5, source=source, color="purple")
    return components(p)
