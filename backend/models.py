import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False, unique=True)
    slug = Column(String(100), nullable=False, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    blogs = relationship('Blog', back_populates='category', cascade='all, delete-orphan')

class Blog(Base):
    __tablename__ = 'blogs'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    content = Column(Text, nullable=False)
    excerpt = Column(String(500))
    image_url = Column(String(500))
    category_id = Column(String(36), ForeignKey('categories.id', ondelete='CASCADE'), index=True)
    published = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    category = relationship('Category', back_populates='blogs')
