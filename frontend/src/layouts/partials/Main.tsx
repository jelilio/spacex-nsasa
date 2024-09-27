import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <div className="overflow-scr">
      <main className="mx-auto flex max-w-7xl flex-wrap items-center justify-center p-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
