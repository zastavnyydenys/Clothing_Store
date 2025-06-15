# plotly_charts.py
import pandas as pd
import plotly.express as px
from .repository import (
    get_books_count_by_genre,
    get_avg_price_by_genre,
    get_books_with_max_price,
    get_books_count_by_author,
    get_books_count_by_year,
    get_books_stock
)

def plotly_books_count_by_genre():
    data = pd.DataFrame(get_books_count_by_genre())
    fig = px.bar(
        data,
        x='genres__name',
        y='book_count',
        title="Кількість книг за жанрами",
        labels={'genres__name': 'Жанр', 'book_count': 'Кількість книг'}
    )
    return fig.to_html(full_html=False)

def plotly_avg_price_by_genre():
    data = pd.DataFrame(get_avg_price_by_genre())
    fig = px.bar(
        data,
        x='genres__name',
        y='avg_price',
        title="Середня ціна книг за жанрами",
        labels={'genres__name': 'Жанр', 'avg_price': 'Середня ціна'}
    )
    return fig.to_html(full_html=False)

def plotly_books_with_max_price():
    data = pd.DataFrame(get_books_with_max_price())
    fig = px.scatter(
        data,
        x='title',
        y='price',
        title="Книги з максимальною ціною",
        labels={'title': 'Назва книги', 'price': 'Ціна'}
    )
    return fig.to_html(full_html=False)

def plotly_books_count_by_author():
    data = pd.DataFrame(get_books_count_by_author())
    fig = px.pie(
        data,
        names='author__name',
        values='book_count',
        title="Розподіл книг по авторам"
    )
    return fig.to_html(full_html=False)

def plotly_books_count_by_year():
    data = pd.DataFrame(get_books_count_by_year())
    fig = px.line(
        data,
        x='year',
        y='count',
        title="Кількість книг за роками",
        labels={'year': 'Рік', 'count': 'Кількість'}
    )
    return fig.to_html(full_html=False)

def plotly_books_stock():
    data = pd.DataFrame(get_books_stock())
    fig = px.bar(
        data,
        x='title',
        y='stock',
        title="Запаси книг (Stock)",
        labels={'title': 'Назва книги', 'stock': 'Запас'}
    )
    return fig.to_html(full_html=False)

