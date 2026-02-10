import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  MenuItem,
  FormControlLabel,
  Switch,
  useTheme
} from '@mui/material';
import { Edit, Delete, Add, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { usePageTitle } from '../hooks/usePageTitle';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

const AdminPanel = () => {
  usePageTitle('Admin Panel');
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Blog Dialog State
  const [blogDialog, setBlogDialog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    published: true,
    image_url: ''
  });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Category Dialog State
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ name: '', slug: '' });

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  }, []);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      showMessage('error', 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      showMessage('error', 'Failed to fetch categories');
    }
  }, [showMessage]);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [fetchBlogs, fetchCategories]);

  // Blog Handlers
  const handleOpenBlogDialog = (blog = null) => {
    if (blog) {
      setCurrentBlog({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt || '',
        category_id: blog.category_id,
        published: blog.published,
        image_url: blog.image_url || ''
      });
      setEditingBlogId(blog.id);
    } else {
      setCurrentBlog({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category_id: categories[0]?.id || '',
        published: true,
        image_url: ''
      });
      setEditingBlogId(null);
    }
    setBlogDialog(true);
  };

  const handleCloseBlogDialog = () => {
    setBlogDialog(false);
    setCurrentBlog({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category_id: '',
      published: true,
      image_url: ''
    });
    setEditingBlogId(null);
  };

  const handleBlogInputChange = (field, value) => {
    setCurrentBlog({ ...currentBlog, [field]: value });
    
    // Auto-generate slug from title
    if (field === 'title' && !editingBlogId) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setCurrentBlog(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCurrentBlog({ ...currentBlog, image_url: response.data.url });
      showMessage('success', 'Image uploaded successfully');
    } catch (error) {
      showMessage('error', 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveBlog = async () => {
    if (!currentBlog.title || !currentBlog.content || !currentBlog.category_id) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (editingBlogId) {
        await axios.put(`${API_URL}/blogs/${editingBlogId}`, currentBlog);
        showMessage('success', 'Blog updated successfully');
      } else {
        await axios.post(`${API_URL}/blogs`, currentBlog);
        showMessage('success', 'Blog created successfully');
      }
      handleCloseBlogDialog();
      fetchBlogs();
    } catch (error) {
      showMessage('error', error.response?.data?.detail || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      showMessage('success', 'Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      showMessage('error', 'Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  // Category Handlers
  const handleOpenCategoryDialog = () => {
    setCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setCategoryDialog(false);
    setCurrentCategory({ name: '', slug: '' });
  };

  const handleCategoryInputChange = (field, value) => {
    setCurrentCategory({ ...currentCategory, [field]: value });
    
    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setCurrentCategory(prev => ({ ...prev, slug }));
    }
  };

  const handleSaveCategory = async () => {
    if (!currentCategory.name || !currentCategory.slug) {
      showMessage('error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/categories`, currentCategory);
      showMessage('success', 'Category created successfully');
      handleCloseCategoryDialog();
      fetchCategories();
    } catch (error) {
      showMessage('error', error.response?.data?.detail || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure? This will delete all blogs in this category.')) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      showMessage('success', 'Category deleted successfully');
      fetchCategories();
      fetchBlogs();
    } catch (error) {
      showMessage('error', 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3" fontWeight={700}>
            Admin Panel
          </Typography>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            data-testid="back-to-home-button"
          >
            Back to Home
          </Button>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Blogs" data-testid="blogs-tab" />
            <Tab label="Categories" data-testid="categories-tab" />
          </Tabs>
        </Paper>

        {/* Blogs Tab */}
        {tabValue === 0 && (
          <Box>
            <Box display="flex" justifyContent="flex-end" mb={3}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenBlogDialog()}
                data-testid="add-blog-button"
              >
                Add Blog
              </Button>
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.category?.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={blog.published ? 'Published' : 'Draft'}
                            color={blog.published ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleOpenBlogDialog(blog)}
                            data-testid={`edit-blog-${blog.slug}`}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteBlog(blog.id)}
                            color="error"
                            data-testid={`delete-blog-${blog.slug}`}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* Categories Tab */}
        {tabValue === 1 && (
          <Box>
            <Box display="flex" justifyContent="flex-end" mb={3}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenCategoryDialog}
                data-testid="add-category-button"
              >
                Add Category
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Slug</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDeleteCategory(category.id)}
                          color="error"
                          data-testid={`delete-category-${category.slug}`}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Blog Dialog */}
        <Dialog
          open={blogDialog}
          onClose={handleCloseBlogDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingBlogId ? 'Edit Blog' : 'Create New Blog'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={currentBlog.title}
                onChange={(e) => handleBlogInputChange('title', e.target.value)}
                margin="normal"
                required
                data-testid="blog-title-input"
              />
              
              <TextField
                fullWidth
                label="Slug"
                value={currentBlog.slug}
                onChange={(e) => handleBlogInputChange('slug', e.target.value)}
                margin="normal"
                required
                helperText="URL-friendly version of the title"
                data-testid="blog-slug-input"
              />

              <TextField
                fullWidth
                select
                label="Category"
                value={currentBlog.category_id}
                onChange={(e) => handleBlogInputChange('category_id', e.target.value)}
                margin="normal"
                required
                data-testid="blog-category-select"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Excerpt"
                value={currentBlog.excerpt}
                onChange={(e) => handleBlogInputChange('excerpt', e.target.value)}
                margin="normal"
                multiline
                rows={2}
                helperText="Short description (optional)"
                data-testid="blog-excerpt-input"
              />

              <Box mt={2} mb={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Featured Image
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  disabled={uploadingImage}
                  data-testid="upload-image-button"
                >
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
                {currentBlog.image_url && (
                  <Box mt={2}>
                    <img
                      src={currentBlog.image_url}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                    />
                  </Box>
                )}
              </Box>

              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Content *
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={currentBlog.content}
                  onChange={(value) => handleBlogInputChange('content', value)}
                  modules={quillModules}
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={currentBlog.published}
                    onChange={(e) => handleBlogInputChange('published', e.target.checked)}
                    data-testid="blog-published-toggle"
                  />
                }
                label="Published"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBlogDialog}>Cancel</Button>
            <Button
              onClick={handleSaveBlog}
              variant="contained"
              disabled={loading}
              data-testid="save-blog-button"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Category Dialog */}
        <Dialog
          open={categoryDialog}
          onClose={handleCloseCategoryDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Category</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={currentCategory.name}
                onChange={(e) => handleCategoryInputChange('name', e.target.value)}
                margin="normal"
                required
                data-testid="category-name-input"
              />
              
              <TextField
                fullWidth
                label="Slug"
                value={currentCategory.slug}
                onChange={(e) => handleCategoryInputChange('slug', e.target.value)}
                margin="normal"
                required
                helperText="URL-friendly version"
                data-testid="category-slug-input"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCategoryDialog}>Cancel</Button>
            <Button
              onClick={handleSaveCategory}
              variant="contained"
              disabled={loading}
              data-testid="save-category-button"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminPanel;
