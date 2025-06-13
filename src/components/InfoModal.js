import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * InfoModal component for displaying information in a modal dialog
 */
export default function InfoModal({ 
  open, 
  onClose, 
  title, 
  maxWidth = 'sm',
  children,
  hideCloseButton = false 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(20,14,38,0.96)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(123,66,246,0.15)',
          color: '#fff',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        fontSize: '1.2rem',
        fontWeight: 600
      }}>
        {title}
        {!hideCloseButton && (
          <IconButton 
            onClick={onClose} 
            aria-label="close"
            sx={{ 
              color: 'white',
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255,255,255,0.1)'
              } 
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      
      <DialogContent sx={{ py: 3, px: 3 }}>
        {children}
      </DialogContent>
      
      <DialogActions sx={{
        p: 2.5,
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{ 
            px: 3,
            py: 0.8,
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #7B42F6 0%, #B01EFF 100%)',
            '&:hover': {
              boxShadow: '0 0 15px rgba(123, 66, 246, 0.5)'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
