import Spinner from '../../ui/Spinner';
import { useGetApodToday } from './api/use-get-apod-today';

export default function ApodToday() {
  const { data, isLoading, isFetching, isError } = useGetApodToday();

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <p>An error occured</p>;
  }

  return (
    <div className="@[620px]/main:flex-row @[1224px]/grid:flex-row flex max-w-[800px] flex-col overflow-hidden rounded-lg border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <a href="#" className="">
        <img className="rounded-t-lg" src={data?.url} alt={data?.title} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data?.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data?.explanation}
        </p>
      </div>
    </div>
  );
}
