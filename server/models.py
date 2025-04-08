from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password_digest = db.Column(db.String)
    role = db.Column(db.String)

    workouts = db.relationship('Workout', back_populates='user', lazy=True)
    skill_sessions = db.relationship('SkillSession', back_populates='user', lazy=True)
    nutrition_logs = db.relationship('NutritionLog', back_populates='user', lazy=True)
    squads_association = db.relationship('UserSquad', backref='user')
    squads = association_proxy('squads_association', 'squad')
    
class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.String)
    workout_type = db.Column(db.String)
    duration = db.Column(db.Integer)
    notes = db.Column(db.Text)

    user = db.relationship('User', back_populates='workouts')

class SkillSession(db.Model, SerializerMixin):
    __tablename__ = 'skill_sessions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    skill_type = db.Column(db.String)
    date = db.Column(db.String)
    performance_score = db.Column(db.Integer)
    notes = db.Column(db.Text)

    user = db.relationship('User', back_populates = 'skill_sessions')

class NutritionLog(db.Model, SerializerMixin):
    __tablename__ = 'nutrition_logs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.String)
    meal_type = db.Column(db.String)
    calories = db.Column(db.Integer)
    protein = db.Column(db.Integer)
    carbs = db.Column(db.Integer)
    fats = db.Column(db.Integer,)

    user = db.relationship('User', back_populates = "nutrition_logs")

class Squad(db.Model, SerializerMixin):
    __tablename__ = 'squads'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    users = db.relationship('UserSquad', backref='squad', lazy=True)

class UserSquad(db.Model, SerializerMixin):
    __tablename__ = 'user_squads'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    squad_id = db.Column(db.Integer, db.ForeignKey('squads.id'))