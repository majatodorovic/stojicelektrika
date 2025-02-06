/* eslint-disable no-return-await */
import dynamic from 'next/dynamic';
import App from 'next/app';
import '../styles/globals.scss';
import '../components/Filters.scss';
import '../components/Footer.scss';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { CartContextProvider } from '../helpers/cartContext';
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ApiHandler } from '../helpers/api';
import { QueryProvider } from "../components/QueryProvider";

const NavbarMenu = dynamic(() => import('../components/NavbarMenu'));
const Footer = dynamic(() => import('../components/Footer'));
const ScrollToTop = dynamic(() => import('../components/ScrollToTop/ScrollToTop'));

const SSRProvider = dynamic(async () => (await import('react-bootstrap')).SSRProvider);

const MyApp = ({ Component, pageProps, categories }) => {
	const router = useRouter();

	return (
		<div>
			<ToastContainer />
			<CartContextProvider>
				<QueryProvider>
					<SSRProvider>
						<NavbarMenu categoryData={categories} />
						<ScrollToTop />
						<Component {...pageProps} key={router.asPath} />
						<Footer />
					</SSRProvider>
				</QueryProvider>
			</CartContextProvider>
		</div>
	);
};

MyApp.getInitialProps = async (appContext) => {
	const api = ApiHandler();

	const categories = await api.get('/categories/product/tree').then((response) => response.payload);

	const appProps = await App.getInitialProps(appContext);

	return { ...appProps, categories };
};

export default MyApp;
