import React from 'react';
import { Stack, IconButton, Tooltip, useTheme } from '@mui/material';
import { Twitter, LinkedIn, Facebook, Link as LinkIcon } from '@mui/icons-material';

const ShareButtons = ({ title, url }) => {
  const theme = useTheme();
  const shareUrl = url || window.location.href;
  const shareTitle = encodeURIComponent(title || 'Check out this article from Netrivium Technologies');

  const handleShare = (platform) => {
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const buttons = [
    { platform: 'twitter', icon: <Twitter />, label: 'Share on Twitter', color: '#1DA1F2' },
    { platform: 'linkedin', icon: <LinkedIn />, label: 'Share on LinkedIn', color: '#0077B5' },
    { platform: 'facebook', icon: <Facebook />, label: 'Share on Facebook', color: '#1877F2' },
    { platform: 'copy', icon: <LinkIcon />, label: 'Copy Link', color: theme.palette.text.secondary },
  ];

  return (
    <Stack direction="row" spacing={1}>
      {buttons.map((btn) => (
        <Tooltip key={btn.platform} title={btn.label} arrow>
          <IconButton
            onClick={() => handleShare(btn.platform)}
            sx={{
              color: btn.color,
              '&:hover': {
                backgroundColor: `${btn.color}20`,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}
            data-testid={`share-${btn.platform}`}
          >
            {btn.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default ShareButtons;
