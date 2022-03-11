import Meta from "../site/Meta";
import AppHeader from "../site/header/AppHeader";
import { Footer } from "../site/footer/footer";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, desc, children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-600 bg-gray-100">
      <Meta pageTitle={title} description={desc} />
      <AppHeader />
      <main className="w-full min-h-screen mx-auto my-4 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
