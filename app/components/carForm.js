import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const CarForm = () => {
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [maxPictures, setMaxPictures] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files.length <= maxPictures) {
      setImages(Array.from(e.target.files));
    } else {
      setError(`You can only upload up to ${maxPictures} images`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('model', model);
    formData.append('price', price);
    formData.append('phone', phone);
    formData.append('city', city);
    images.forEach((image, i) => {
      formData.append('images', image);
    });

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post('/api/cars', formData, config);
      window.location.href = '/';
    } catch (error) {
      setError('Error submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Car Model"
        variant="outlined"
        fullWidth
        value={model}
        onChange={(e) => setModel(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
      />
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Max Number of Pictures"
        variant="outlined"
        fullWidth
        type="number"
        value={maxPictures}
        onChange={(e) => setMaxPictures(e.target.value)}
        margin="normal"
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      {images.length > 0 && (
        <div>
          {images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`img-${index}`} width={100} />
          ))}
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default CarForm;
