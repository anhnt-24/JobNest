'use client';

import { useState } from 'react';
import { CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaEnvelope, FaFile, FaLocationDot, FaPhone, FaUser, FaPlus, FaTrash } from 'react-icons/fa6';
import { FaGlobeAmericas, FaSave } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import FormatToolbar from './_component/format-toolbar';
import { AutosizeTextarea } from '@/components/ui/custom/autosize-textarea';
import CVDialog from './_component/cv-dialog';
import { cvService } from '@/service/cvs.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
interface Certification {
	year: string;
	name: string;
}

interface EducationAward {
	school: string;
	duration: string;
	description: string;
}

interface Project {
	name: string;
	duration: string;
	description: string;
}

interface WorkExperience {
	company: string;
	position: string;
	duration: string;
	description: string;
}

interface CVData {
	header: {
		title: string;
	};
	personal_info: {
		avatar: string;
		name: string;
		job_title: string;
		gender: string;
		phone: string;
		email: string;
		website: string;
		address: string;
	};
	skills: string[];
	certifications: Certification[];
	career_objective: string;
	education_and_awards: EducationAward[];
	projects: Project[];
	work_experience: WorkExperience[];
}

const initialData: CVData = {
	header: {
		title: 'Fullstack Developer',
	},
	personal_info: {
		avatar: '/image.png',
		name: 'Nguyễn Tuấn Anh',
		job_title: 'Software Engineer',
		gender: 'Nam',
		phone: '0123454789',
		email: 'tech.growth@topcv.vn',
		website: 'facebook.com/',
		address: 'Ba Đình, Hà Nội',
	},
	skills: ['Kỹ năng Digital Marketing', 'Kỹ năng Digital Marketing'],
	certifications: [
		{
			year: '2025',
			name: 'Toeic 900',
		},
	],
	career_objective:
		'Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.',
	education_and_awards: [
		{
			school: 'Học viện Công nghệ Bưu chính Viễn Thông',
			duration: '2022 - Hiện tại',
			description:
				'Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.',
		},
	],
	projects: [
		{
			name: 'Học viện Công nghệ Bưu chính Viễn Thông',
			duration: '2022 - Hiện tại',
			description:
				'Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.',
		},
	],
	work_experience: [
		{
			company: 'Công ty BCD TopCV',
			position: 'Học viện Công nghệ Bưu chính Viễn Thông',
			duration: '2022 - Hiện tại',
			description:
				'Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.',
		},
		{
			company: 'Công ty ABC TopCV',
			position: 'Học viện Công nghệ Bưu chính Viễn Thông',
			duration: '2022 - Hiện tại',
			description:
				'Senior Digital Marketing với hơn 4 năm kinh nghiệm làm việc. Thành công xây dựng và quản lý các chiến dịch Digital Marketing đa kênh, bao gồm SEO, Ads, Social Media, Email Marketing, E-Commerce… giúp công ty tăng trưởng 25% doanh thu. Trong 2 năm tới, tôi đặt mục tiêu thăng tiến lên Marketing Manager.',
		},
	],
};

export default function CVA4() {
	const [cvData, setCvData] = useState<CVData>(initialData);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const fileUrl = URL.createObjectURL(e.target.files[0]);
			setCvData(prev => ({
				...prev,
				personal_info: {
					...prev.personal_info,
					avatar: fileUrl,
				},
			}));
		}
	};
	const addSkill = () => {
		setCvData(prev => ({
			...prev,
			skills: [...prev.skills, 'Kỹ năng mới'],
		}));
	};

	const removeSkill = (index: number) => {
		setCvData(prev => ({
			...prev,
			skills: prev.skills.filter((_, i) => i !== index),
		}));
	};

	const updateSkill = (index: number, value: string) => {
		setCvData(prev => ({
			...prev,
			skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
		}));
	};

	const addCertification = () => {
		setCvData(prev => ({
			...prev,
			certifications: [...prev.certifications, { year: '2024', name: 'Chứng chỉ mới' }],
		}));
	};

	const removeCertification = (index: number) => {
		setCvData(prev => ({
			...prev,
			certifications: prev.certifications.filter((_, i) => i !== index),
		}));
	};

	const updateCertification = (index: number, field: keyof Certification, value: string) => {
		setCvData(prev => ({
			...prev,
			certifications: prev.certifications.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert)),
		}));
	};

	const addEducation = () => {
		setCvData(prev => ({
			...prev,
			education_and_awards: [
				...prev.education_and_awards,
				{
					school: 'Trường học',
					duration: '2024 - Hiện tại',
					description: 'Mô tả',
				},
			],
		}));
	};

	const removeEducation = (index: number) => {
		setCvData(prev => ({
			...prev,
			education_and_awards: prev.education_and_awards.filter((_, i) => i !== index),
		}));
	};

	const addProject = () => {
		setCvData(prev => ({
			...prev,
			projects: [
				...prev.projects,
				{
					name: 'Dự án mới',
					duration: '2024 - Hiện tại',
					description: 'Mô tả dự án',
				},
			],
		}));
	};

	const removeProject = (index: number) => {
		setCvData(prev => ({
			...prev,
			projects: prev.projects.filter((_, i) => i !== index),
		}));
	};

	const addWorkExperience = () => {
		setCvData(prev => ({
			...prev,
			work_experience: [
				...prev.work_experience,
				{
					company: 'Công ty mới',
					position: 'Vị trí công việc',
					duration: '2024 - Hiện tại',
					description: 'Mô tả công việc',
				},
			],
		}));
	};

	const removeWorkExperience = (index: number) => {
		setCvData(prev => ({
			...prev,
			work_experience: prev.work_experience.filter((_, i) => i !== index),
		}));
	};

	const handleSave = () => {
		setIsLoading(true);
		const payload = { title: cvData.header.title, content: cvData, type: 'UPLOADED' };
		cvService
			.create(payload)
			.then(res => {
				toast.success('Tạo CV thành công.');
				router.replace('/candidate/cv');
			})
			.catch(e => {
				console.log(e);
				toast.error('Thất bại');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className='my-24 flex justify-center gap-6 relative'>
			<style jsx>{`
				.custom-input,
				input,
				textarea {
					resize: none !important;
					outline: none !important;
					border-radius: 0.25rem;
					border: 1px solid transparent;
					padding-left: 0.5rem;
					padding-right: 0.5rem;
					transition: border 0.2s ease;
				}

				.custom-input:hover,
				textarea:hover,
				input:hover {
					border-color: currentColor !important;
					border-style: dashed;
				}

				.custom-input:focus,
				textarea:focus,
				input:focus {
					border-style: solid;
				}
			`}</style>

			<FormatToolbar />

			<div className='bg-white max-w-5xl grid grid-cols-12 gap-2 border shadow-sm'>
				{/* Header */}
				<div className='fixed px-12 items-center justify-between flex h-20 top-17 shadow-sm bg-primary z-10 left-0 right-0'>
					<div className='text-yellow-400 flex gap-2 text-2xl items-center font-semibold'>
						<FaFile className='size-8' />
						<input
							type='text'
							value={cvData.header.title}
							onChange={e =>
								setCvData(prev => ({
									...prev,
									header: { title: e.target.value },
								}))
							}
							className='bg-transparent'
						/>
					</div>
					<div className='items-center flex gap-2'>
						<Button variant='secondary' className='font-semibold rounded-full'>
							<X />
							Hủy
						</Button>

						<CVDialog />
						<Button loading={isLoading} variant='secondary' className='bg-yellow-400 rounded-full !px-6 font-semibold' onClick={handleSave}>
							<FaSave />
							Lưu
						</Button>
					</div>
				</div>

				{/* Sidebar */}
				<aside className='col-span-4 text-white overflow-hidden'>
					<div className='flex flex-col bg-primary p-6 items-center space-y-4 w-full relative'>
						<Avatar className='size-full border-4 border-white'>
							<AvatarImage src={cvData.personal_info.avatar} alt='Avatar' />
							<AvatarFallback>NA</AvatarFallback>
						</Avatar>
						<input
							type='text'
							value={cvData.personal_info.name}
							onChange={e =>
								setCvData(prev => ({
									...prev,
									personal_info: { ...prev.personal_info, name: e.target.value },
								}))
							}
							className='text-2xl font-semibold text-center rounded-sm border border-transparent hover:border-current transition hover:border-dashed px-2 focus:border-solid bg-transparent'
						/>
						<input
							type='text'
							value={cvData.personal_info.job_title}
							onChange={e =>
								setCvData(prev => ({
									...prev,
									personal_info: { ...prev.personal_info, job_title: e.target.value },
								}))
							}
							className='text-lg text-center bg-transparent'
						/>
					</div>

					<div className='hidden size-0'>
						<input type='file' accept='image/*' onChange={handleUpload} className='text-sm absolute hidden' />
					</div>

					<div className='space-y-6 p-6 bg-[#004933] h-full'>
						{/* Thông tin cá nhân */}
						<div className='space-y-2'>
							<h2 className='font-semibold text-xl mb-3'>Thông tin cá nhân</h2>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaUser className='size-4' />
								</div>
								<input
									type='text'
									value={cvData.personal_info.gender}
									onChange={e =>
										setCvData(prev => ({
											...prev,
											personal_info: { ...prev.personal_info, gender: e.target.value },
										}))
									}
									className='flex-1 bg-transparent'
								/>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaPhone className='size-4' />
								</div>
								<input
									type='text'
									value={cvData.personal_info.phone}
									onChange={e =>
										setCvData(prev => ({
											...prev,
											personal_info: { ...prev.personal_info, phone: e.target.value },
										}))
									}
									className='flex-1 bg-transparent'
								/>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaEnvelope className='size-4' />
								</div>
								<input
									type='text'
									value={cvData.personal_info.email}
									onChange={e =>
										setCvData(prev => ({
											...prev,
											personal_info: { ...prev.personal_info, email: e.target.value },
										}))
									}
									className='flex-1 bg-transparent'
								/>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaGlobeAmericas className='size-4' />
								</div>
								<input
									type='text'
									value={cvData.personal_info.website}
									onChange={e =>
										setCvData(prev => ({
											...prev,
											personal_info: { ...prev.personal_info, website: e.target.value },
										}))
									}
									className='flex-1 bg-transparent'
								/>
							</p>
							<p className='flex gap-4 items-center'>
								<div className='p-1.5 bg-primary rounded-full'>
									<FaLocationDot className='size-4' />
								</div>
								<input
									type='text'
									value={cvData.personal_info.address}
									onChange={e =>
										setCvData(prev => ({
											...prev,
											personal_info: { ...prev.personal_info, address: e.target.value },
										}))
									}
									placeholder='Địa chỉ'
									className='flex-1 bg-transparent'
								/>
							</p>
						</div>

						{/* Kỹ năng */}
						<div>
							<div className='flex justify-between items-center mb-3'>
								<h2 className='font-semibold text-xl'>Kỹ năng</h2>
								<Button size='sm' className='h-8 w-8 p-0 rounded-full' onClick={addSkill}>
									<FaPlus className='size-3' />
								</Button>
							</div>
							<ul className='space-y-2'>
								{cvData.skills.map((skill, index) => (
									<li key={index} className='flex items-center gap-2'>
										<div className='size-2 bg-white rounded-full flex-shrink-0'></div>
										<AutosizeTextarea minHeight={6} placeholder='Kỹ năng' value={skill} onChange={e => updateSkill(index, e.target.value)} className='flex-1 custom-input bg-transparent' />
										<Button size='sm' variant='ghost' className='h-6 w-6 p-0 text-red-500 hover:text-red-100 hover:bg-red-500' onClick={() => removeSkill(index)}>
											<FaTrash className='size-3' />
										</Button>
									</li>
								))}
							</ul>
						</div>

						{/* Chứng chỉ */}
						<div>
							<div className='flex justify-between items-center mb-3'>
								<h2 className='font-semibold text-xl'>Chứng chỉ</h2>
								<Button size='sm' className='h-8 w-8 p-0 rounded-full' onClick={addCertification}>
									<FaPlus className='size-3' />
								</Button>
							</div>
							<ul className='space-y-2 pl-1'>
								{cvData.certifications.map((cert, index) => (
									<li key={index} className='flex gap-2 items-start'>
										<input type='text' value={cert.year} onChange={e => updateCertification(index, 'year', e.target.value)} className='font-semibold max-w-16 bg-transparent' />
										<div className='flex-1'>
											<input type='text' value={cert.name} onChange={e => updateCertification(index, 'name', e.target.value)} className='w-full bg-transparent' />
										</div>
										<Button size='sm' variant='ghost' className='h-6 w-6 p-0 text-red-500 hover:text-red-100 hover:bg-red-500 flex-shrink-0' onClick={() => removeCertification(index)}>
											<FaTrash className='size-3' />
										</Button>
									</li>
								))}
							</ul>
						</div>
					</div>
				</aside>

				{/* Nội dung chính */}
				<section className='col-span-8 space-y-6 p-4'>
					{/* Mục tiêu nghề nghiệp */}
					<div className='space-y-2'>
						<CardTitle className='text-primary font-semibold'>Mục tiêu nghề nghiệp</CardTitle>
						<AutosizeTextarea
							className='custom-input'
							value={cvData.career_objective}
							onChange={e =>
								setCvData(prev => ({
									...prev,
									career_objective: e.target.value,
								}))
							}
						/>
					</div>

					{/* Học vấn */}
					<div className='space-y-2'>
						<div className='flex justify-between items-center'>
							<CardTitle className='text-primary font-semibold'>Học vấn và Giải thưởng</CardTitle>
							<Button size='sm' className='rounded-full' onClick={addEducation}>
								<FaPlus className='size-3' />
								Thêm
							</Button>
						</div>
						<ul className='space-y-4'>
							{cvData.education_and_awards.map((edu, index) => (
								<li key={index}>
									<div className='flex items-center gap-4 font-semibold'>
										<div className='size-2 rounded-full bg-gray-700'></div>
										<input
											type='text'
											value={edu.school}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													education_and_awards: prev.education_and_awards.map((item, i) => (i === index ? { ...item, school: e.target.value } : item)),
												}))
											}
											className='flex-1'
										/>
										<input
											type='text'
											value={edu.duration}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													education_and_awards: prev.education_and_awards.map((item, i) => (i === index ? { ...item, duration: e.target.value } : item)),
												}))
											}
											className='ml-auto font-normal text-right max-w-40'
										/>
										<Button size='sm' variant='ghost' className='h-6 w-6 p-0 text-red-500 hover:text-red-100 hover:bg-red-500' onClick={() => removeEducation(index)}>
											<FaTrash className='size-3' />
										</Button>
									</div>
									<div className='pl-1'>
										<div className='border-l pl-4 border-gray-500'>
											<AutosizeTextarea
												className='custom-input w-full'
												value={edu.description}
												onChange={e =>
													setCvData(prev => ({
														...prev,
														education_and_awards: prev.education_and_awards.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
													}))
												}
											/>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* Dự án */}
					<div className='space-y-2'>
						<div className='flex justify-between items-center'>
							<CardTitle className='text-primary font-semibold'>Dự án</CardTitle>
							<Button size='sm' className='rounded-full' onClick={addProject}>
								<FaPlus className='size-3 mr-1' />
								Thêm
							</Button>
						</div>
						<ul className='space-y-4'>
							{cvData.projects.map((project, index) => (
								<li key={index} className='space-y-1'>
									<div className='flex items-center gap-4 font-semibold'>
										<input
											type='text'
											value={project.name}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													projects: prev.projects.map((item, i) => (i === index ? { ...item, name: e.target.value } : item)),
												}))
											}
											className='flex-1'
										/>
										<input
											type='text'
											value={project.duration}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													projects: prev.projects.map((item, i) => (i === index ? { ...item, duration: e.target.value } : item)),
												}))
											}
											className='ml-auto font-normal text-right max-w-40'
										/>
										<Button size='sm' variant='ghost' className='h-6 w-6 p-0 text-red-500 hover:text-red-100 hover:bg-red-500' onClick={() => removeProject(index)}>
											<FaTrash className='size-3' />
										</Button>
									</div>
									<div>
										<AutosizeTextarea
											className='custom-input w-full'
											value={project.description}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													projects: prev.projects.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
												}))
											}
										/>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* Kinh nghiệm làm việc */}
					<div className='space-y-2'>
						<div className='flex justify-between items-center'>
							<CardTitle className='text-primary font-semibold'>Kinh nghiệm làm việc</CardTitle>
							<Button size='sm' className='rounded-full' onClick={addWorkExperience}>
								<FaPlus className='size-3 mr-1' />
								Thêm
							</Button>
						</div>

						<div className='space-y-4'>
							{cvData.work_experience.map((work, index) => (
								<div key={index}>
									<div className='flex items-center gap-4 font-semibold'>
										<input
											type='text'
											value={work.position}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													work_experience: prev.work_experience.map((item, i) => (i === index ? { ...item, position: e.target.value } : item)),
												}))
											}
											className='flex-1'
										/>
										<input
											type='text'
											value={work.duration}
											onChange={e =>
												setCvData(prev => ({
													...prev,
													work_experience: prev.work_experience.map((item, i) => (i === index ? { ...item, duration: e.target.value } : item)),
												}))
											}
											className='ml-auto font-normal text-right max-w-40'
										/>
										<Button size='sm' variant='ghost' className='h-6 w-6 p-0 text-red-500 hover:text-red-100 hover:bg-red-500' onClick={() => removeWorkExperience(index)}>
											<FaTrash className='size-3' />
										</Button>
									</div>
									<input
										type='text'
										value={work.company}
										onChange={e =>
											setCvData(prev => ({
												...prev,
												work_experience: prev.work_experience.map((item, i) => (i === index ? { ...item, company: e.target.value } : item)),
											}))
										}
										className='italic w-full mb-2'
									/>
									<AutosizeTextarea
										className='custom-input w-full'
										value={work.description}
										onChange={e =>
											setCvData(prev => ({
												...prev,
												work_experience: prev.work_experience.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
											}))
										}
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
