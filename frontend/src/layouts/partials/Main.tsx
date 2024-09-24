import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <div className="overflow-scr">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Outlet />
      </div>
    </div>
  );
}
