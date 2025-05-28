import Navbar from "./navbar/Navbar.tsx";
import Footer from "./footer/Footer.tsx";

function Layout({ children }: { children: React.ReactNode }) {

  
    return (
      <div>
        <Navbar/>
        {/* Main content */}
        {/* <main className="flex-grow"> */}
          {children}
        {/* </main> */}
  
        <Footer />
      </div>
    );
  };
  
  export default Layout;