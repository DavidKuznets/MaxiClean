from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import Occupation, ServiceCategory, Review, StatusReview


class Command(BaseCommand):
    help = "Seed database with sample occupations, services and reviews"

    def handle(self, *args, **options):
        self.stdout.write("Seeding sample data...")

        occupations = ["Клієнт", "Підприємець", "Вчитель"]
        services = ["Хімчистка меблів", "Хімчистка килимів"]

        created_occupations = []
        for name in occupations:
            obj, created = Occupation.objects.get_or_create(name=name)
            if created:
                self.stdout.write(f"Created occupation: {name}")
            created_occupations.append(obj)

        created_services = []
        for name in services:
            obj, created = ServiceCategory.objects.get_or_create(name=name)
            if created:
                # service_image is optional during creation; skip image for seed
                obj.is_active = True
                obj.save()
                self.stdout.write(f"Created service: {name}")
            created_services.append(obj)

        sample_reviews = [
            {
                "service": created_services[0],
                "full_name": "Лівова Ольга",
                "gender": "FEMALE",
                "occupation": created_occupations[0],
                "rating": "5",
                "content": "Дуже задоволена якістю сервісу. Майстер приїхав вчасно, все зробив швидко та акуратно.",
                "status": StatusReview.APPROVED,
            },
            {
                "service": created_services[1],
                "full_name": "Іванов Костянтин",
                "gender": "MALE",
                "occupation": created_occupations[1],
                "rating": "5",
                "content": "Професійний підхід та чудовий результат. Однозначно рекомендую!",
                "status": StatusReview.APPROVED,
            },
            {
                "service": created_services[0],
                "full_name": "Кириленко Ілля",
                "gender": "MALE",
                "occupation": created_occupations[2],
                "rating": "4",
                "content": "Хороший сервіс, меблі стали значно чистіші. Буду звертатися ще.",
                "status": StatusReview.APPROVED,
            },
        ]

        created_count = 0
        for r in sample_reviews:
            # avoid duplicates: use get_or_create by unique fields
            obj, created = Review.objects.get_or_create(
                service=r["service"],
                full_name=r["full_name"],
                defaults={
                    "gender": r["gender"],
                    "occupation": r["occupation"],
                    "rating": r["rating"],
                    "content": r["content"],
                    "status": r["status"],
                    "created_at": timezone.now(),
                },
            )
            if created:
                created_count += 1
                self.stdout.write(f"Created review: {obj.full_name}")

        self.stdout.write(self.style.SUCCESS(f"Seeding finished — {created_count} reviews created."))
