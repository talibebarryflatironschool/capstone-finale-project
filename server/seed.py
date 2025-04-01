from faker import Faker
from config import app, db
from models import User, Workout, SkillSession, NutritionLog

faker = Faker()

with app.app_context():
    print("Clearing existing data...")
    User.query.delete()
    Workout.query.delete()
    SkillSession.query.delete()
    NutritionLog.query.delete()

    print("Seeding users...")
    users = []
    for _ in range(5):
        user = User(
            name=faker.name(),
            email=faker.email(),
            role=faker.job()
        )
        user.set_password("password123")
        users.append(user)
        db.session.add(user)

    db.session.commit()

    print("Seeding workouts...")
    for user in users:
        for _ in range(3):
            workout = Workout(
                user_id=user.id,
                date=str(faker.date_this_month()),
                workout_type=faker.random_element(["Cardio", "Strength", "Mobility"]),
                duration=faker.random_int(min=20, max=90),
                notes=faker.sentence()
            )
            db.session.add(workout)

    print("Seeding skill sessions...")
    for user in users:
        for _ in range(2):
            skill = SkillSession(
                user_id=user.id,
                skill_type=faker.random_element(["CPR", "Firearms", "Driving"]),
                date=str(faker.date_this_month()),
                performance_score=faker.random_int(min=60, max=100),
                notes=faker.text(max_nb_chars=50)
            )
            db.session.add(skill)

    print("Seeding nutrition logs...")
    for user in users:
        for _ in range(4):
            log = NutritionLog(
                user_id=user.id,
                date=str(faker.date_this_month()),
                meal_type=faker.random_element(["Breakfast", "Lunch", "Dinner", "Snack"]),
                calories=faker.random_int(min=300, max=800),
                protein=faker.random_int(min=10, max=60),
                carbs=faker.random_int(min=30, max=100),
                fats=faker.random_int(min=5, max=40)
            )
            db.session.add(log)

    db.session.commit()
    print("✅ Seeding complete!")