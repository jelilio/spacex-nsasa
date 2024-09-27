import { createPortal } from 'react-dom';
import { ImageItem } from '../../@types';
import { useGetAsset } from './api/use-get-asset';

type GalleryDetailProps = {
  item: ImageItem;
  onClose: () => void;
};

export default function GalleryDetail({ item, onClose }: GalleryDetailProps) {
  const { data, isLoading, isFetching } = useGetAsset({
    nasaId: item.data[0].nasa_id,
  });

  if (isLoading || isFetching) {
    return <></>;
  }

  return createPortal(
    <>
      <div
        className="modal relative z-10 h-full w-full"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {item.data[0].title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {item.data[0].description}
                      </p>
                    </div>
                    <div className="mt-2">
                      {item.data[0].media_type === 'image' && (
                        <img
                          src={item.links[0].href}
                          alt={item.data[0].title}
                          className="w-full rounded-sm object-cover"
                        />
                      )}
                      {item.data[0].media_type === 'audio' && (
                        <audio
                          src={data?.items[0].href}
                          className="w-full rounded-sm"
                          controls
                        />
                      )}
                      {item.data[0].media_type === 'video' && (
                        <video
                          src={
                            data?.items.filter((link) =>
                              link.href.includes('.mp4'),
                            )[1].href
                          }
                          className="w-full rounded-sm object-cover"
                          controls
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal')!,
  );
}
