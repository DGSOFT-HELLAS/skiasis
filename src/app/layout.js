import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { toast, ToastContainer } from 'react-toastify';
import SessionWrapper from "./_components/SessionsWrapper";
import "react-toastify/dist/ReactToastify.css";



const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700"] });


import { ThemeProvider } from "./_components/ThemeProvider";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, session, ...pageProps }) {
  return (

    <html suppressHydrationWarning lang="en">
      <body className={roboto.className}>
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer />
            {children}
          </ThemeProvider>
        </SessionWrapper>


      </body>
    </html>

  );
}
