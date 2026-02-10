"""Add blogs and categories tables

Revision ID: cf4ad4fc9828
Revises: 
Create Date: 2026-02-10 11:03:31.511235

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cf4ad4fc9828'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create categories table
    op.create_table('categories',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('slug', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_categories_slug'), 'categories', ['slug'], unique=True)
    
    # Create blogs table
    op.create_table('blogs',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('slug', sa.String(length=255), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('excerpt', sa.String(length=500), nullable=True),
    sa.Column('image_url', sa.String(length=500), nullable=True),
    sa.Column('category_id', sa.String(length=36), nullable=True),
    sa.Column('published', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_blogs_category_id'), 'blogs', ['category_id'], unique=False)
    op.create_index(op.f('ix_blogs_created_at'), 'blogs', ['created_at'], unique=False)
    op.create_index(op.f('ix_blogs_published'), 'blogs', ['published'], unique=False)
    op.create_index(op.f('ix_blogs_slug'), 'blogs', ['slug'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_blogs_slug'), table_name='blogs')
    op.drop_index(op.f('ix_blogs_published'), table_name='blogs')
    op.drop_index(op.f('ix_blogs_created_at'), table_name='blogs')
    op.drop_index(op.f('ix_blogs_category_id'), table_name='blogs')
    op.drop_table('blogs')
    op.drop_index(op.f('ix_categories_slug'), table_name='categories')
    op.drop_table('categories')
