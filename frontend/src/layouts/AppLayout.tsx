import Footer from './partials/Footer';
import Header from './partials/Header';
import Main from './partials/Main';

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
