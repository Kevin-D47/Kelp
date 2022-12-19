"""empty message

Revision ID: d03930abadd2
Revises:
Create Date: 2022-12-14 21:04:12.581315

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'd03930abadd2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('first_name', sa.String(
                        length=50), nullable=False),
                    sa.Column('last_name', sa.String(
                        length=50), nullable=False),
                    sa.Column('username', sa.String(
                        length=50), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('profileImageUrl', sa.String(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('businesses',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=False),
                    sa.Column('address', sa.String(
                        length=100), nullable=False),
                    sa.Column('city', sa.String(length=50), nullable=False),
                    sa.Column('state', sa.String(length=50), nullable=False),
                    sa.Column('country', sa.String(length=50), nullable=False),
                    sa.Column('zip', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=50), nullable=False),
                    sa.Column('phone', sa.BigInteger(), nullable=False),
                    sa.Column('description', sa.String(
                        length=800), nullable=False),
                    sa.Column('price', sa.String(), nullable=False),
                    sa.Column('previewImageUrl', sa.String(), nullable=False),
                    sa.Column('type', sa.String(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('updated_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('images',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=False),
                    sa.Column('businessId', sa.Integer(), nullable=False),
                    sa.Column('imgUrl', sa.String(), nullable=False),
                    sa.Column('description', sa.String(
                        length=800), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('updated_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['businessId'], ['businesses.id'], ),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=False),
                    sa.Column('businessId', sa.Integer(), nullable=False),
                    sa.Column('review', sa.String(length=1000), nullable=True),
                    sa.Column('stars', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('updated_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['businessId'], ['businesses.id'], ),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE businesses SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('images')
    op.drop_table('businesses')
    op.drop_table('users')
    # ### end Alembic commands ###
