"""table creation

Revision ID: 5389c1f5ccd0
Revises: 
Create Date: 2025-04-02 11:20:28.912639

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5389c1f5ccd0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('squads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password_digest', sa.String(), nullable=True),
    sa.Column('role', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('nutrition_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('meal_type', sa.String(), nullable=True),
    sa.Column('calories', sa.Integer(), nullable=True),
    sa.Column('protein', sa.Integer(), nullable=True),
    sa.Column('carbs', sa.Integer(), nullable=True),
    sa.Column('fats', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_nutrition_logs_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('skill_sessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('skill_type', sa.String(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('performance_score', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_skill_sessions_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_squads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('squad_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['squad_id'], ['squads.id'], name=op.f('fk_user_squads_squad_id_squads')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_squads_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.String(), nullable=True),
    sa.Column('workout_type', sa.String(), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_workouts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workouts')
    op.drop_table('user_squads')
    op.drop_table('skill_sessions')
    op.drop_table('nutrition_logs')
    op.drop_table('users')
    op.drop_table('squads')
    # ### end Alembic commands ###
