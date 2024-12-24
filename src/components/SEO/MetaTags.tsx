import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const MetaTags = ({
  title = "Watch Live TV on NeoTV+",
  description = "Watch 100+ live streaming of Fast channels on NeoTV+.",
  canonicalUrl = window.location.origin,
  ogImage = "https://neotvapp.com/wp-content/uploads/2024/09/neo-tv-banner.jpg"
}: MetaTagsProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NeoTV+ | Free AD Supported TV | FAST TV application offer live tv channels in India." />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1639" />
      <meta property="og:image:height" content="765" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="NeoTV+" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#e40876" />
    </Helmet>
  );
};