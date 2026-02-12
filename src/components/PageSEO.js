import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageSEO = ({ title, description }) => (
    <Helmet>
        <title>{title ? `${title} | Netrivium Technologies` : 'Netrivium Technologies | Intelligent Connectivity Solutions'}</title>
        <meta name="description" content={description || "Netrivium Technologies - Empowering businesses with intelligent connectivity, scalable networking solutions, and innovative SaaS development"} />
        <meta property="og:title" content={title ? `${title} | Netrivium Technologies` : 'Netrivium Technologies'} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
);

export default PageSEO;
