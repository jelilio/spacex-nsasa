export default function Footer() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-4">
      <footer>
        <p>&copy; {new Date().getFullYear()} SpaceX.</p>
      </footer>
    </div>
  );
}
