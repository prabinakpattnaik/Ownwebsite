import os
from pathlib import Path
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv
import asyncpg

# Load environment variables
load_dotenv(Path(__file__).parent / '.env')

DATABASE_URL = os.environ.get('DATABASE_URL')
ASYNC_DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')

# Custom connection factory to disable prepared statements
async def get_connection():
    return await asyncpg.connect(
        DATABASE_URL,
        statement_cache_size=0,
        server_settings={'jit': 'off'}
    )

# Create async engine with NullPool for transaction pooler
engine = create_async_engine(
    ASYNC_DATABASE_URL,
    poolclass=NullPool,
    echo=False,
    execution_options={
        "compiled_cache": None,
    }
)

# Create session maker
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# Base class for models
Base = declarative_base()

# Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
