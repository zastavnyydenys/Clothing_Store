from rest_framework import routers
from django.urls import path, include
from product.views import ProductViewSet, CategoryViewSet, ReviewViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
