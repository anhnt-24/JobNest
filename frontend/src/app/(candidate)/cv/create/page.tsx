import CVForm from '../_component/cv-form';
import cvData from '../data/cv.json';

function Page() {
	return <CVForm initialData={cvData}></CVForm>;
}

export default Page;
