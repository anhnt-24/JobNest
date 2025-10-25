'use client';
import UploadedFiles from './_component/uploaded-files';
import GeneratedCVS from './_component/generated-cvs';
export default function ResumeList() {
	return (
		<>
			<GeneratedCVS />
			<UploadedFiles></UploadedFiles>
		</>
	);
}
