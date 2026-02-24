import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [festivals, setFestivals] = useState([]);
  const [formData, setFormData] = useState({
    business_name: '',
    tagline: '',
    festival: '',
    style: 'professional',
    aspect_ratio: '1:1'
  });
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const [imageHistory, setImageHistory] = useState([]);

  useEffect(() => {
    fetchFestivals();
    fetchImageHistory();
  }, []);

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(`${API_URL}/festivals`);
      setFestivals(response.data.festivals);
      if (response.data.festivals.length > 0) {
        setFormData(prev => ({ ...prev, festival: response.data.festivals[0].id }));
      }
    } catch (err) {
      console.error('Error fetching festivals:', err);
    }
  };

  const fetchImageHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/images`);
      setImageHistory(response.data.images);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const response = await axios.post(`${API_URL}/generate`, formData);
      setGeneratedImage(response.data);
      fetchImageHistory(); // Refresh history
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${imageName || 'festpost-image'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎨 FestPost</h1>
        <p>AI-Powered Festival Images for Your Business</p>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>Generate Your Festival Image</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Business Name *</label>
              <input
                type="text"
                value={formData.business_name}
                onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                placeholder="Your Business Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Tagline (Optional)</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                placeholder="Your business tagline"
              />
            </div>

            <div className="form-group">
              <label>Select Festival *</label>
              <select
                value={formData.festival}
                onChange={(e) => setFormData({...formData, festival: e.target.value})}
                required
              >
                {festivals.map(fest => (
                  <option key={fest.id} value={fest.id}>
                    {fest.emoji} {fest.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Style</label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              >
                <option value="professional">Professional</option>
                <option value="vibrant">Vibrant</option>
                <option value="elegant">Elegant</option>
                <option value="minimal">Minimal</option>
                <option value="traditional">Traditional</option>
              </select>
            </div>

            <div className="form-group">
              <label>Aspect Ratio</label>
              <select
                value={formData.aspect_ratio}
                onChange={(e) => setFormData({...formData, aspect_ratio: e.target.value})}
              >
                <option value="1:1">Square (1:1) - Instagram Post</option>
                <option value="16:9">Landscape (16:9) - Facebook</option>
                <option value="9:16">Portrait (9:16) - Instagram Story</option>
                <option value="4:5">Portrait (4:5) - Instagram Feed</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="generate-btn">
              {loading ? '🎨 Generating...' : '✨ Generate Image'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}
        </div>

        <div className="result-section">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Creating your festival image...</p>
              <p className="loading-tip">This may take 10-30 seconds</p>
            </div>
          )}

          {generatedImage && !loading && (
            <div className="generated-result">
              <h3>✨ Your Festival Image</h3>
              <div className="image-container">
                <img 
                  src={generatedImage.image_url} 
                  alt="Festival poster"
                  className="generated-image"
                />
              </div>
              <button 
                onClick={() => handleDownload(generatedImage.image_url, `${formData.business_name}-${formData.festival}`)}
                className="download-btn"
              >
                📥 Download Image
              </button>
              <div className="prompt-used">
                <small><strong>Prompt used:</strong> {generatedImage.prompt_used}</small>
              </div>
            </div>
          )}

          {!loading && !generatedImage && imageHistory.length === 0 && (
            <div className="placeholder">
              <h3>👋 Welcome!</h3>
              <p>Fill in your business details and generate your first festival image!</p>
              <div className="features">
                <div className="feature">🎯 Professional Quality</div>
                <div className="feature">⚡ AI-Powered</div>
                <div className="feature">📱 Social Media Ready</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {imageHistory.length > 0 && (
        <div className="history-section">
          <h2>📚 Recent Generations</h2>
          <div className="history-grid">
            {imageHistory.slice(0, 6).map((img) => (
              <div key={img.id} className="history-item" onClick={() => setGeneratedImage(img)}>
                <img src={img.url} alt={img.business_name} />
                <div className="history-overlay">
                  <p>{img.business_name}</p>
                  <small>{img.festival}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Powered by AI • Built with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
