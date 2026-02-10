import os
from pathlib import Path
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
import uuid
from supabase import create_client, Client
from dotenv import load_dotenv

from database import get_db
from models import Blog, Category

# Load environment variables
load_dotenv(Path(__file__).parent / '.env')

app = FastAPI(title="Netrivium Blog API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client for storage
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Pydantic models
class CategoryCreate(BaseModel):
    name: str
    slug: str

class CategoryResponse(BaseModel):
    id: str
    name: str
    slug: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class BlogCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    category_id: str
    published: bool = True

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category_id: Optional[str] = None
    published: Optional[bool] = None
    image_url: Optional[str] = None

class BlogResponse(BaseModel):
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str]
    image_url: Optional[str]
    category_id: str
    published: bool
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None
    
    class Config:
        from_attributes = True

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Netrivium Blog API"}

# Category endpoints
@app.post("/api/categories", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    new_category = Category(
        id=str(uuid.uuid4()),
        name=category.name,
        slug=category.slug
    )
    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)
    return new_category

@app.get("/api/categories", response_model=List[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).order_by(Category.name))
    categories = result.scalars().all()
    return categories

@app.delete("/api/categories/{category_id}")
async def delete_category(category_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    await db.delete(category)
    await db.commit()
    return {"message": "Category deleted successfully"}

# Blog endpoints
@app.post("/api/blogs", response_model=BlogResponse)
async def create_blog(blog: BlogCreate, db: AsyncSession = Depends(get_db)):
    new_blog = Blog(
        id=str(uuid.uuid4()),
        title=blog.title,
        slug=blog.slug,
        content=blog.content,
        excerpt=blog.excerpt,
        category_id=blog.category_id,
        published=blog.published
    )
    db.add(new_blog)
    await db.commit()
    await db.refresh(new_blog)
    
    # Load category
    result = await db.execute(
        select(Blog).options(selectinload(Blog.category)).where(Blog.id == new_blog.id)
    )
    blog_with_category = result.scalar_one()
    return blog_with_category

@app.get("/api/blogs", response_model=List[BlogResponse])
async def get_blogs(
    category: Optional[str] = None,
    published: Optional[bool] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Blog).options(selectinload(Blog.category))
    
    if category:
        query = query.join(Category).where(Category.slug == category)
    if published is not None:
        query = query.where(Blog.published == published)
    
    query = query.order_by(Blog.created_at.desc())
    result = await db.execute(query)
    blogs = result.scalars().all()
    return blogs

@app.get("/api/blogs/{blog_id}", response_model=BlogResponse)
async def get_blog(blog_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Blog).options(selectinload(Blog.category)).where(Blog.id == blog_id)
    )
    blog = result.scalar_one_or_none()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@app.get("/api/blogs/slug/{slug}", response_model=BlogResponse)
async def get_blog_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Blog).options(selectinload(Blog.category)).where(Blog.slug == slug)
    )
    blog = result.scalar_one_or_none()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@app.put("/api/blogs/{blog_id}", response_model=BlogResponse)
async def update_blog(blog_id: str, blog_update: BlogUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Blog).where(Blog.id == blog_id))
    blog = result.scalar_one_or_none()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    update_data = blog_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(blog, field, value)
    
    blog.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(blog)
    
    # Load category
    result = await db.execute(
        select(Blog).options(selectinload(Blog.category)).where(Blog.id == blog_id)
    )
    blog_with_category = result.scalar_one()
    return blog_with_category

@app.delete("/api/blogs/{blog_id}")
async def delete_blog(blog_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Blog).where(Blog.id == blog_id))
    blog = result.scalar_one_or_none()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    await db.delete(blog)
    await db.commit()
    return {"message": "Blog deleted successfully"}

# Image upload endpoint
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Generate unique filename
        file_ext = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = f"blog-images/{unique_filename}"
        
        # Read file content
        contents = await file.read()
        
        # Upload to Supabase Storage
        response = supabase.storage.from_("blog-images").upload(
            path=file_path,
            file=contents,
            file_options={
                "content-type": file.content_type,
                "cache-control": "3600",
                "upsert": False
            }
        )
        
        # Get public URL
        public_url = supabase.storage.from_("blog-images").get_public_url(file_path)
        
        return {"url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
