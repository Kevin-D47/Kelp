"""empty message

Revision ID: bd5c8cf7a2bb
Revises: 
Create Date: 2022-10-24 23:20:54.531593

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd5c8cf7a2bb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('address', sa.VARCHAR(length=1000), nullable=False),
    sa.Column('city', sa.VARCHAR(length=100), nullable=False),
    sa.Column('state', sa.VARCHAR(length=100), nullable=False),
    sa.Column('country', sa.VARCHAR(length=100), nullable=False),
    sa.Column('zip', sa.INTEGER(), nullable=False),
    sa.Column('lat', sa.DECIMAL(), nullable=False),
    sa.Column('lng', sa.DECIMAL(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=1000), nullable=False),
    sa.Column('phone', sa.VARCHAR(length=20), nullable=False),
    sa.Column('description', sa.VARCHAR(length=2000), nullable=False),
    sa.Column('price', sa.VARCHAR(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('businesses')
    op.drop_table('users')
    # ### end Alembic commands ###
