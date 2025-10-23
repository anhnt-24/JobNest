'use client';
import CVForm from '../../_component/cv-form';
import useSWR from 'swr';
import { cvService } from '@/service/cvs.service';

function EditPage({ params }: { params: { id: number } }) {
	const { id } = params;
	const { data: cv } = useSWR(id ? `/cv/${id}` : null, () => cvService.getByID(id).then(res => res.data));
	if (!cv) return <p>Loading...</p>;
	return <CVForm initialData={cv.content} id={id} />;
}

export default EditPage;
