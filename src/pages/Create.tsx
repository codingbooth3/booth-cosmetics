import '../../src/css/Create.css'

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, auth } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

export default function Create() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [collectionTags, setCollectionTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth.currentUser;

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value;
    setCollectionTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !price || !image || collectionTags.length === 0) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!auth.currentUser) {
      toast.error('Please sign in to add a listing.');
      return;
    }

    setLoading(true);

    try {
      const storage = getStorage();
      const imageRef = ref(storage, `images/${uuidv4()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(database, 'products'), {
        title,
        description,
        price,
        imageUrl,
        collection: collectionTags,
        productId: uuidv4(),
        user: auth.currentUser.email,
      });

      toast.success('Listing added successfully!');
      setTitle('');
      setDescription('');
      setPrice(0);
      setImage(null);
      setCollectionTags([]);
    } catch (error) {
      console.error('Error adding listing:', error);
      toast.error('Failed to add listing.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/booth-cosmetics/account/signin/" />;
  }

  return (
    <div id="createListingContainer">
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />
        </div>

        <div className="form-group">
          <label>Collection Tags</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="new"
                checked={collectionTags.includes('new')}
                onChange={handleTagChange}
              />{' '}
              New
            </label>
            <label>
              <input
                type="checkbox"
                value="eyes"
                checked={collectionTags.includes('eyes')}
                onChange={handleTagChange}
              />{' '}
              Eyes
            </label>
            <label>
              <input
                type="checkbox"
                value="lips"
                checked={collectionTags.includes('lips')}
                onChange={handleTagChange}
              />{' '}
              Lips
            </label>
            <label>
              <input
                type="checkbox"
                value="face"
                checked={collectionTags.includes('face')}
                onChange={handleTagChange}
              />{' '}
              Face
            </label>
            <label>
              <input
                type="checkbox"
                value="best"
                checked={collectionTags.includes('best')}
                onChange={handleTagChange}
              />{' '}
              Best
            </label>
            <label>
              <input
                type="checkbox"
                value="sale"
                checked={collectionTags.includes('sale')}
                onChange={handleTagChange}
              />{' '}
              Sale
            </label>
            <label>
              <input
                type="checkbox"
                value="natural"
                checked={collectionTags.includes('natural')}
                onChange={handleTagChange}
              />{' '}
              Natural
            </label>
          </div>
        </div>

        <button id='createSubmit' type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Listing'}
        </button>
      </form>
    </div>
  );
}

