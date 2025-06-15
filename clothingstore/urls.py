from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from order.views import OrderViewSet, CartViewSet, OrderItemViewSet
from product.views import ProductViewSet, CategoryViewSet, ReviewViewSet
from user.views import UserViewSet
from users.views import RegisterView, LoginView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order_items', OrderItemViewSet)
router.register(r'carts', CartViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/register/', RegisterView.as_view()),
    path('api/login/', LoginView.as_view()),

    path('api/', include(router.urls)),

    # Если у тебя больше нет классических HTML views,
    # то строку ниже можно убрать:
    # path('', include('product.urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('bookstore/', include(('bookstore.urls', 'bookstore'), namespace='bookstore'))
]
