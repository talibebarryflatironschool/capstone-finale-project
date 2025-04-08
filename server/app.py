# app.py – Flask Backend API for Tactical Trainer

# ---
# 📦 Imports
# ---
import ipdb
from flask import request, session
from flask_restful import Resource
from config import app, db, api
from models import User, Workout, SkillSession, NutritionLog

# ---
# 🧩 RELATIONSHIPS (Defined in models.py, used here)
# ---
# User ↔ Workouts (One-to-Many)
# User ↔ SkillSessions (One-to-Many)
# User ↔ NutritionLogs (One-to-Many)
# All child models reference user_id as ForeignKey

# ---
# 🔐 AUTH ROUTES (Session-Based Authentication)
# ---
# Handles signup, login, logout, and session-check

class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(
                name=data['name'],
                email=data['email'],
                role=data['role']
            )
            user.set_password(data['password'])
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and user.password_digest == (data['password']):
            session['user_id'] = user.id
            return user.to_dict(only = ("id","name", "email", "role")), 200
        return {"error": "Invalid credentials"}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return user.to_dict(only = ("id","name", "email", "role")), 200
        return {"error": "Unauthorized"}, 401

# ---
# 🏋️‍♂️ WORKOUT ROUTES (User has-many Workouts)
# ---
# Supports full CRUD

class Workouts(Resource):
    def get(self):
        return [w.to_dict(rules = ("-user",)) for w in Workout.query.all()], 200

    def post(self):
        data = request.get_json()
        workout = Workout(
            user_id=data['user_id'],  # ← Relationship
            date=data['date'],
            workout_type=data['workout_type'],
            duration=data['duration'],
            notes=data.get('notes', '')
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict(rules = ("-user",)), 201

class WorkoutByID(Resource):
    def get(self, id):
        workout = Workout.query.get(id)
        return (workout.to_dict(), 200) if workout else ({"error": "Not found"}, 404)

    def patch(self, id):
        workout = Workout.query.get(id)
        if not workout:
            return {"error": "Not found"}, 404
        for key in request.get_json():
            setattr(workout, key, request.get_json()[key])
        db.session.commit()
        return workout.to_dict(rules = ("-user",)), 200
#  check if patch is woirking. 91 to 98
    def delete(self, id):
        workout = Workout.query.get(id)
        if not workout:
            return {"error": "Not found"}, 404
        db.session.delete(workout)
        db.session.commit()
        return {}, 204

# ---
# 🎯 SKILL ROUTES (User has-many SkillSessions)
# ---
# Create and list skill sessions

class SkillSessions(Resource):
    def get(self):
        return [s.to_dict(rules = ("-user",)) for s in SkillSession.query.all()], 200

    def post(self):
        data = request.get_json()
        session_item = SkillSession(
            user_id=data['user_id'],  # ← Relationship
            skill_type=data['skill_type'],
            date=data['date'],
            performance_score=data['performance_score'],
            notes=data.get('notes', '')
        )
        db.session.add(session_item)
        db.session.commit()
        return session_item.to_dict(rules = ("-user",)), 201

# ---
# 🥗 NUTRITION ROUTES (User has-many NutritionLogs)
# ---
# Create and list nutrition entries

class NutritionLogs(Resource):
    def get(self):
        return [n.to_dict(rules = ('-user',)) for n in NutritionLog.query.all()], 200

    def post(self):
        data = request.get_json()
        log = NutritionLog(
            user_id=data['user_id'],  # ← Relationship
            date=data['date'],
            meal_type=data['meal_type'],
            calories=data['calories'],
            protein=data['protein'],
            carbs=data['carbs'],
            fats=data['fats']
        )
        db.session.add(log)
        db.session.commit()
        return log.to_dict(rules = ('-user',)), 201

# ---
# 🛣️ ROUTE REGISTRATION
# ---
# Binds each resource to a URL endpoint

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Workouts, '/workouts')
api.add_resource(WorkoutByID, '/workouts/<int:id>')
api.add_resource(SkillSessions, '/skills')
api.add_resource(NutritionLogs, '/nutrition')

# ---
# 🏁 Root Route
# ---
@app.route('/')
def home():
    return "Project Server Running!"

# ---
# 🚀 Server Initialization
# ---
if __name__ == '__main__':
    app.run(port=5555, debug=True)