import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Button,
  Paper,
  useTheme
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/slug/${slug}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Blog not found
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/blogs')}>
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
        pt: 12,
        pb: 8
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/blogs')}
          sx={{ mb: 4 }}
          data-testid="back-to-blogs-button"
        >
          Back to Blogs
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            background: theme.palette.background.paper
          }}
        >
          {/* Category */}
          {blog.category && (
            <Chip
              label={blog.category.name}
              color="primary"
              sx={{ mb: 2 }}
              data-testid="blog-category"
            />
          )}

          {/* Title */}
          <Typography
            variant="h3"
            gutterBottom
            fontWeight={700}
            sx={{ mb: 2 }}
            data-testid="blog-title"
          >
            {blog.title}
          </Typography>

          {/* Date */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>

          {/* Featured Image */}
          {blog.image_url && (
            <Box
              component="img"
              src={blog.image_url}
              alt={blog.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                mb: 4,
                maxHeight: '500px',
                objectFit: 'cover'
              }}
              data-testid="blog-image"
            />
          )}

          {/* Content */}
          <Box
            sx={{
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 2,
                my: 2
              },
              '& h1, & h2, & h3': {
                mt: 4,
                mb: 2,
                fontWeight: 600
              },
              '& p': {
                mb: 2,
                lineHeight: 1.8
              },
              '& ul, & ol': {
                mb: 2,
                pl: 4
              },
              '& li': {
                mb: 1
              },
              '& pre': {
                background: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
                p: 2,
                borderRadius: 1,
                overflow: 'auto'
              },
              '& code': {
                background: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
                px: 1,
                py: 0.5,
                borderRadius: 0.5,
                fontFamily: 'monospace'
              }
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
            data-testid="blog-content"
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default BlogDetail;
