import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Check, RefreshCw, Eye } from 'lucide-react';
import { tariffApi } from '../../services/tariffApi';

/**
 * Reusable Image Upload Field for Siddhu Car Rentals Admin CMS
 * Supports:
 * 1. File Upload from local device (Camera, Gallery, Filesystem)
 * 2. Automatic client-side canvas optimization (fast base64 storage)
 * 3. Drag and Drop file selection
 * 4. Direct URL / Path fallback
 * 5. Instant preview & Remove
 */
export const compressImageToDataUrl = (file, maxWidth = 1280, maxHeight = 960, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Draw background and image
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern lightweight webp format, fallback to jpeg
        try {
          const webpData = canvas.toDataURL('image/webp', quality);
          if (webpData && webpData.startsWith('data:image/webp')) {
            resolve(webpData);
            return;
          }
        } catch (err) {}

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
};

export const ImageUploadField = ({
  label = 'Upload Image',
  value = '',
  onChange,
  placeholder = 'Select image file or paste URL (/images/... or https://...)',
  helpText = 'Upload JPG, PNG, WebP up to 10MB. Automatically optimized for web.',
  aspectRatio = '16/9',
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  // Compress image and upload to permanent server storage
  const processFile = async (file) => {
    setProcessing(true);
    try {
      // 1. Optimize on client canvas for fast upload
      const dataUrl = await compressImageToDataUrl(file);
      // 2. Upload to permanent backend storage
      const permanentUrl = await tariffApi.uploadImage(dataUrl);
      // 3. Store permanent clean HTTPS URL
      onChange(permanentUrl);
    } catch (err) {
      console.error('Image processing/upload error:', err);
      alert(err.message || 'Failed to upload image. Please try another file.');
    } finally {
      setProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isBase64 = typeof value === 'string' && value.startsWith('data:image/');

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Label & Toggle between Upload & URL */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-slate-700)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ImageIcon size={15} color="#0284C7" />
          <span>{label}</span>
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.74rem',
            color: '#0284C7',
            fontWeight: '600',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px',
            textDecoration: 'underline'
          }}
        >
          {showUrlInput ? 'Switch to File Upload' : 'Enter URL / Path instead'}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Preview Card if image is selected */}
      {value ? (
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          background: '#F8FAFC',
          marginBottom: '8px'
        }}>
          <div
            onClick={() => fileInputRef.current?.click()}
            title="Click to upload a new image from your device"
            style={{
              height: '180px',
              width: '100%',
              background: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <img
              src={value}
              alt="Uploaded preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />

            {/* Prominent Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(2, 132, 199, 0.92)',
                color: '#FFFFFF',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
              }}
            >
              <UploadCloud size={14} />
              <span>Click Photo to Upload</span>
            </div>
          </div>

          {/* Action Overlay Bar */}
          <div style={{
            padding: '10px 14px',
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: '1 1 auto' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px',
                background: isBase64 ? '#ECFDF5' : '#F1F5F9',
                color: isBase64 ? '#059669' : '#475569',
                whiteSpace: 'nowrap'
              }}>
                {isBase64 ? '✓ Local File (Ready)' : 'Current Image'}
              </span>
              <span style={{
                fontSize: '0.74rem',
                color: '#64748B',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '180px'
              }}>
                {isBase64 ? 'File compressed' : (value.split('/').pop() || value)}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={processing}
                style={{
                  padding: '7px 14px',
                  borderRadius: '7px',
                  border: '1px solid #0284C7',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  fontSize: '0.80rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)'
                }}
              >
                <UploadCloud size={15} />
                <span>{processing ? 'Processing...' : 'Upload Image'}</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                style={{
                  padding: '7px 10px',
                  borderRadius: '7px',
                  border: '1px solid #FCA5A5',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Remove current image"
              >
                <X size={14} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : showUrlInput ? (
        /* Direct URL Text Input */
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              outline: 'none',
              background: '#FFFFFF'
            }}
          />
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: isDragging ? '2px dashed #0284C7' : '2px dashed #CBD5E1',
            borderRadius: '12px',
            padding: '24px 16px',
            textAlign: 'center',
            background: isDragging ? '#F0F9FF' : '#F8FAFC',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284C7'
          }}>
            <UploadCloud size={24} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '700', color: '#1E293B' }}>
              {processing ? 'Optimizing image...' : 'Click to Upload Image'}
            </p>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.76rem', color: '#64748B' }}>
              or drag & drop your photo here from computer or phone
            </p>
          </div>
          <button
            type="button"
            style={{
              marginTop: '4px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: '#0284C7',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer',
              pointerEvents: 'none'
            }}
          >
            Browse Image
          </button>
        </div>
      )}

      {/* Help text */}
      <p style={{ margin: '4px 0 0 0', fontSize: '0.72rem', color: '#94A3B8' }}>
        {helpText}
      </p>
    </div>
  );
};
