import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  MenuItem,
  useTheme,
  Skeleton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const BlogList = () => {
  usePageTitle('Blog & Articles');
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Could not load categories');
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('blogs')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        // First get the category ID from the slug
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', selectedCategory)
          .single();

        if (catData) {
          query = query.eq('category_id', catData.id);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, [fetchCategories, fetchBlogs]);

  const handleBlogClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Grid container spacing={4}>
          {[1, 2, 3].map((n) => (
            <Grid item xs={12} md={6} lg={4} key={n}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
              <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="60%" />
            </Grid>
          ))}
        </Grid>
      </Box>
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
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Blog & Articles
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="600px" mx="auto">
            Explore insights, tutorials, and updates from Netrivium Technologies
          </Typography>
        </Box>

        {/* Category Filter */}
        <Box mb={4} display="flex" justifyContent="center">
          <TextField
            select
            label="Filter by Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ minWidth: 250 }}
            data-testid="category-filter"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.slug}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" color="text.secondary">
              No blogs found. Check back soon!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} md={6} lg={4} key={blog.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)'
                        : '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    }
                  }}
                  onClick={() => handleBlogClick(blog.slug)}
                  data-testid={`blog-card-${blog.slug}`}
                >
                  {blog.image_url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={blog.image_url}
                      alt={blog.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    {blog.category && (
                      <Chip
                        label={blog.category.name}
                        size="small"
                        color="primary"
                        sx={{ mb: 2 }}
                      />
                    )}
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {blog.excerpt || blog.content.substring(0, 150) + '...'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Admin Button */}
        <Box textAlign="center" mt={6}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin')}
            data-testid="admin-panel-button"
          >
            Admin Panel
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogList;
