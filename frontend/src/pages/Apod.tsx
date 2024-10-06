import ApodToday from '../features/apod/ApodToday';

export default function Apod() {
  return (
    <div>
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        Picture of the Day
      </h1>
      <ApodToday />
    </div>
  );
}
