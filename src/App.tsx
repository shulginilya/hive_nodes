import {
	AppContainer,
	NotFoundContainer,
} from '@/containers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppContainer />}>
					<Route path="/:cluster_id" element={<AppContainer />} />
				</Route>
				<Route path="*" element={<NotFoundContainer />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
