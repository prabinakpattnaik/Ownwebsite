-- 1. Insert Categories with explicit IDs
INSERT INTO categories (id, name, slug, created_at) VALUES 
(gen_random_uuid(), 'Artificial Intelligence', 'artificial-intelligence', NOW()),
(gen_random_uuid(), 'Connectivity', 'connectivity', NOW()),
(gen_random_uuid(), 'Company News', 'company-news', NOW()),
(gen_random_uuid(), 'SaaS Solutions', 'saas-solutions', NOW());

-- 2. Insert Blog Posts with explicit IDs and timestamps

-- Blog 1 (AI)
INSERT INTO blogs (id, title, slug, content, excerpt, image_url, published, created_at, category_id) 
VALUES (
  gen_random_uuid(),
  'The Future of AI in Enterprise Networking', 
  'future-of-ai-enterprise-networking', 
  'Artificial Intelligence is reshaping how we manage networks. From predictive maintenance to automated threat detection, AI is becoming the backbone of modern enterprise infrastructure...', 
  'AI is reshaping how we manage networks. From predictive maintenance to automated threat detection, learn how AI is becoming the backbone of modern enterprise infrastructure.', 
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000', 
  true, 
  NOW() - INTERVAL '2 days',
  (SELECT id FROM categories WHERE slug = 'artificial-intelligence' LIMIT 1)
);

-- Blog 2 (Connectivity)
INSERT INTO blogs (id, title, slug, content, excerpt, image_url, published, created_at, category_id) 
VALUES (
  gen_random_uuid(),
  'Why SD-WAN is Critical for the Modern Remote Workforce', 
  'why-sd-wan-is-critical', 
  'As remote work becomes the norm, traditional VPNs are struggling to keep up. SD-WAN offers a more robust solution...', 
  'As remote work becomes the norm, traditional VPNs are struggling. Discover why SD-WAN is the robust, secure solution for distributed teams.', 
  'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1000', 
  true, 
  NOW() - INTERVAL '5 days',
  (SELECT id FROM categories WHERE slug = 'connectivity' LIMIT 1)
);

-- Blog 3 (SaaS)
INSERT INTO blogs (id, title, slug, content, excerpt, image_url, published, created_at, category_id) 
VALUES (
  gen_random_uuid(),
  'Scaling Your SaaS Product: Lessons Learned', 
  'scaling-saas-lessons-learned', 
  'Scaling a SaaS product involves more than just adding servers. It requires a fundamental rethink of architecture...', 
  'Scaling a SaaS product involves more than just adding servers. Read our top 5 lessons on architecture, support, and deployment.', 
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000', 
  true, 
  NOW() - INTERVAL '1 week',
  (SELECT id FROM categories WHERE slug = 'saas-solutions' LIMIT 1)
);

-- Blog 4 (Company News)
INSERT INTO blogs (id, title, slug, content, excerpt, image_url, published, created_at, category_id) 
VALUES (
  gen_random_uuid(),
  'Netrivium Technologies Expands Global Footprint', 
  'netrivium-expands-global-footprint', 
  'We are excited to announce our expansion into new markets! This strategic move will allow us to better serve our international clients...', 
  'We are excited to announce our expansion into new markets! Read about our strategic move to serve international clients.', 
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000', 
  true, 
  NOW() - INTERVAL '2 weeks',
  (SELECT id FROM categories WHERE slug = 'company-news' LIMIT 1)
);

-- Blog 5 (AI)
INSERT INTO blogs (id, title, slug, content, excerpt, image_url, published, created_at, category_id) 
VALUES (
  gen_random_uuid(),
  'Generative AI: Beyond the Hype', 
  'generative-ai-beyond-hype', 
  'Generative AI is the buzzword of the year, but what are its practical applications for business? We dive past the hype...', 
  'Generative AI is the buzzword of the year, but what are its real-world business applications? We dive past the hype.', 
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000', 
  true, 
  NOW() - INTERVAL '3 weeks',
  (SELECT id FROM categories WHERE slug = 'artificial-intelligence' LIMIT 1)
);
