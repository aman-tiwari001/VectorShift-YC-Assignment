import Footer from './components/footer';
import { PipelineUI } from './components/ui';
import { PipelineToolbar } from './components/toolbar';

function App() {
	return (
		<div className='bg-gray-200 p-2'>
			<div className='border bg-white border-gray-400 rounded-xl'>
				<PipelineToolbar />
				<PipelineUI />
				<Footer />
			</div>
		</div>
	);
}

export default App;
	