import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <div className="overflow-scr">
      <main className="mx-auto max-w-7xl p-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
