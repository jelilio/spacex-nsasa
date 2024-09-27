import { ImageItem } from '../../@types';

export default function GalleryItem({ links, data }: ImageItem) {
  const { title, media_type: type } = data[0];

  return (
    <div>
      <div className="max-w-sm overflow-hidden rounded shadow-lg hover:shadow-gray-400">
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
