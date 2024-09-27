import CheckBox from '../../ui/CheckBox';
import SearchInput from '../../ui/SearchInput';

export default function GallerySearch({
  query,
  mediaTypes,
  setQuery,
  setMediaType,
}: {
  query: string;
  mediaTypes: string[];
  setQuery: (value: string) => void;
  setMediaType: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaType(e.target.name);
  };

  const hasItem = (name: string): boolean => {
    return mediaTypes.filter((it) => it === name).length > 0;
  };

  return (
    <div className="m-2">
      <form>
        <div className="mx-auto max-w-2xl">
          <SearchInput query={query} setQuery={setQuery} />

          <div className="item-center grid grid-cols-3 divide-x">
            <CheckBox
              name="image"
              label="Image"
              isChecked={hasItem('image')}
              handleChange={handleChange}
            />
            <CheckBox
              name="audio"
              label="Audio"
              isChecked={hasItem('audio')}
              handleChange={handleChange}
            />
            <CheckBox
              name="video"
              label="Video"
              isChecked={hasItem('video')}
              handleChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
