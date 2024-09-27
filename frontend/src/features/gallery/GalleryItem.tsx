import { ImageItem } from '../../@types';
import { useState } from 'react';
import GalleryDetail from './GalleryDetail';

export default function GalleryItem({ links, href, data }: ImageItem) {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const { title, media_type: type } = data[0];

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <div>
      {cartIsVisible && (
        <GalleryDetail
          item={{ href, links, data }}
          onClose={handleCloseCartClick}
        />
      )}
      <div
        onClick={handleOpenCartClick}
        className="max-w-sm cursor-pointer overflow-hidden rounded shadow-lg hover:shadow-gray-400"
      >
        {(type === 'image' || type === 'video') && (
          <img
            src={links[0].href}
            className="h-48 w-96 object-cover"
            alt={title}
          />
        )}
        <div className="px-6 py-4">
          <div className="text-l mb-2 line-clamp-1 font-bold">{title}</div>
        </div>
      </div>
    </div>
  );
}
