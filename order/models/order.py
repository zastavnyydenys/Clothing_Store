from django.db import models

from user.models.user import User


class Order(models.Model):
    STATUS_CHOICES = [
        ("pending","в обробці"),
        ("shipped","відправлений"),
        ("delivered","доставлений"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Замовлення {self.id} - {self.user.username}"