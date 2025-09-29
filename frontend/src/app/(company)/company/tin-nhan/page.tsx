'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ArrowLeft, Search, Phone, Mail, FileText, Download, MoreVertical, Calendar, MessageSquare } from 'lucide-react';

const mockCandidates = [
	{
		id: '1',
		name: 'Nguyễn Văn A',
		email: 'nguyenvana@email.com',
		phone: '012345678',
		position: 'Backend Developer',
		appliedDate: '2024-01-15',
		status: 'Đã liên hệ',
		avatar: '/avatars/1.jpg',
		cvUrl: '/cvs/1.pdf',
		lastMessage: 'Em cảm ơn anh/chị đã phản hồi ạ!',
		lastMessageTime: '2024-01-16T14:30:00',
	},
	{
		id: '2',
		name: 'Trần Thị B',
		email: 'tranthib@email.com',
		phone: '0987654321',
		position: 'Frontend Developer',
		appliedDate: '2024-01-14',
		status: 'Mới',
		avatar: '/avatars/2.jpg',
		cvUrl: '/cvs/2.pdf',
		lastMessage: 'Xin chào, tôi đã nộp CV cho vị trí...',
		lastMessageTime: '2024-01-14T10:15:00',
	},
	{
		id: '3',
		name: 'Lê Văn C',
		email: 'levanc@email.com',
		phone: '0369852147',
		position: 'Fullstack Developer',
		appliedDate: '2024-01-13',
		status: 'Đã xem',
		avatar: '/avatars/3.jpg',
		cvUrl: '/cvs/3.pdf',
		lastMessage: 'Khi nào tôi có thể phỏng vấn ạ?',
		lastMessageTime: '2024-01-13T16:45:00',
	},
];

const mockMessages = {
	'1': [
		{
			id: '1',
			content: 'Xin chào, tôi đã xem CV của bạn và thấy rất phù hợp với vị trí Backend Developer.',
			sender: 'recruiter',
			timestamp: '2024-01-15T10:00:00',
		},
		{
			id: '2',
			content: 'Dạ em cảm ơn ạ! Em rất mong được làm việc tại công ty.',
			sender: 'candidate',
			timestamp: '2024-01-15T10:05:00',
		},
		{
			id: '3',
			content: 'Bạn có thể tham gia phỏng vấn vào thứ 3 tuần sau được không?',
			sender: 'recruiter',
			timestamp: '2024-01-15T10:10:00',
		},
		{
			id: '4',
			content: 'Em cảm ơn anh/chị đã phản hồi ạ! Em sẽ sắp xếp thời gian ạ.',
			sender: 'candidate',
			timestamp: '2024-01-16T14:30:00',
		},
	],
	'2': [
		{
			id: '1',
			content: 'Xin chào, tôi đã nộp CV cho vị trí Frontend Developer.',
			sender: 'candidate',
			timestamp: '2024-01-14T10:15:00',
		},
	],
	'3': [
		{
			id: '1',
			content: 'CV của bạn đã được chúng tôi xem xét.',
			sender: 'recruiter',
			timestamp: '2024-01-13T16:30:00',
		},
		{
			id: '2',
			content: 'Khi nào tôi có thể phỏng vấn ạ?',
			sender: 'candidate',
			timestamp: '2024-01-13T16:45:00',
		},
	],
};

const MessagesPage = () => {
	const [selectedCandidate, setSelectedCandidate] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState({});
	const messagesEndRef = useRef(null);

	useEffect(() => {
		setMessages(mockMessages);
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, selectedCandidate]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const filteredCandidates = mockCandidates.filter(candidate => candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || candidate.position.toLowerCase().includes(searchTerm.toLowerCase()));

	const handleSelectCandidate = candidate => {
		setSelectedCandidate(candidate);
	};

	const handleSendMessage = () => {
		if (!message.trim() || !selectedCandidate) return;

		const newMessage = {
			id: Date.now().toString(),
			content: message,
			sender: 'recruiter',
			timestamp: new Date().toISOString(),
		};

		setMessages(prev => ({
			...prev,
			[selectedCandidate.id]: [...(prev[selectedCandidate.id] || []), newMessage],
		}));

		setMessage('');

		// Auto reply after 2 seconds
		setTimeout(() => {
			const autoReply = {
				id: (Date.now() + 1).toString(),
				content: 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.',
				sender: 'candidate',
				timestamp: new Date().toISOString(),
			};

			setMessages(prev => ({
				...prev,
				[selectedCandidate.id]: [...(prev[selectedCandidate.id] || []), autoReply],
			}));
		}, 2000);
	};

	const handleDownloadCV = candidate => {
		alert(`Tải CV của ${candidate.name} từ ${candidate.cvUrl}`);
	};

	const formatTime = timestamp => {
		return new Date(timestamp).toLocaleTimeString('vi-VN', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const formatDate = timestamp => {
		return new Date(timestamp).toLocaleDateString('vi-VN');
	};

	const getStatusVariant = status => {
		switch (status) {
			case 'Mới':
				return 'default';
			case 'Đã xem':
				return 'secondary';
			case 'Đã liên hệ':
				return 'outline';
			default:
				return 'default';
		}
	};

	return (
		<div className='flex h-screen  py-6'>
			<div className='w-80 bg-white border-r border-gray-200 flex flex-col'>
				<div className='p-4 border-b border-gray-200'>
					<h2 className='text-xl font-semibold'>Tin nhắn</h2>
				</div>

				<div className='p-4 border-b border-gray-200'>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
						<Input placeholder='Tìm kiếm ứng viên...' className='pl-8' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
					</div>
				</div>

				<div className='flex-1 overflow-y-auto'>
					{filteredCandidates.map(candidate => (
						<div
							key={candidate.id}
							className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedCandidate?.id === candidate.id ? 'bg-blue-50' : ''}`}
							onClick={() => handleSelectCandidate(candidate)}>
							<div className='flex items-start gap-3'>
								<Avatar>
									<AvatarImage src={candidate.avatar} />
									<AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
								</Avatar>

								<div className='flex-1 min-w-0'>
									<div className='flex items-center justify-between'>
										<h3 className='font-semibold truncate'>{candidate.name}</h3>
										<span className='text-xs text-gray-500'>{formatTime(candidate.lastMessageTime)}</span>
									</div>

									<p className='text-sm text-gray-600 truncate'>{candidate.position}</p>

									<div className='flex items-center justify-between mt-1'>
										<p className='text-xs text-gray-500 truncate'>{candidate.lastMessage}</p>
										<Badge variant={getStatusVariant(candidate.status)} className='text-xs'>
											{candidate.status}
										</Badge>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='flex-1 flex flex-col'>
				{selectedCandidate ? (
					<>
						<div className='bg-white border-b border-gray-200 p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<Button variant='ghost' size='icon' onClick={() => setSelectedCandidate(null)} className='md:hidden'>
										<ArrowLeft className='h-5 w-5' />
									</Button>

									<Avatar>
										<AvatarImage src={selectedCandidate.avatar} />
										<AvatarFallback>{selectedCandidate.name.charAt(0)}</AvatarFallback>
									</Avatar>

									<div>
										<h3 className='font-semibold'>{selectedCandidate.name}</h3>
										<p className='text-sm text-gray-600'>{selectedCandidate.position}</p>
									</div>
								</div>

								<div className='flex items-center gap-2'>
									<Button variant='ghost' size='icon' title='Gọi điện'>
										<Phone className='h-4 w-4' />
									</Button>

									<Button variant='ghost' size='icon' title='Gửi email'>
										<Mail className='h-4 w-4' />
									</Button>

									<Button variant='ghost' size='icon' onClick={() => handleDownloadCV(selectedCandidate)} title='Tải CV'>
										<Download className='h-4 w-4' />
									</Button>

									<Button variant='ghost' size='icon'>
										<MoreVertical className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</div>

						{/* Messages area */}
						<div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
							<div className=' mx-auto space-y-4'>
								{(messages[selectedCandidate.id] || []).map((msg, index, array) => {
									const showDate = index === 0 || formatDate(msg.timestamp) !== formatDate(array[index - 1].timestamp);

									return (
										<div key={msg.id}>
											{showDate && (
												<div className='text-center my-4'>
													<Badge variant='secondary' className='text-xs'>
														{formatDate(msg.timestamp)}
													</Badge>
												</div>
											)}

											<div className={`flex ${msg.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}>
												<div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'recruiter' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
													<p>{msg.content}</p>
													<span className={`text-xs ${msg.sender === 'recruiter' ? 'text-blue-100' : 'text-gray-500'}`}>{formatTime(msg.timestamp)}</span>
												</div>
											</div>
										</div>
									);
								})}
								<div ref={messagesEndRef} />
							</div>
						</div>
						<div className='bg-white border-t border-gray-200 p-4'>
							<div className='max-w-3xl mx-auto flex gap-2'>
								<Textarea
									placeholder='Nhập tin nhắn...'
									value={message}
									onChange={e => setMessage(e.target.value)}
									onKeyPress={e => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault();
											handleSendMessage();
										}
									}}
									className='min-h-12 resize-none'
								/>
								<Button onClick={handleSendMessage} className='h-12' disabled={!message.trim()}>
									<Send className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</>
				) : (
					// Empty state when no candidate is selected
					<div className='flex flex-col justify-between h-full'>
						<div className='bg-white h-20 w-full border-b'> </div>

						<div className='flex-1 flex items-center justify-center'>
							<div className='text-center text-gray-500'>
								<MessageSquare className='h-12 w-12 mx-auto mb-4 text-gray-300' />
								<h3 className='text-lg font-medium mb-2'>Chọn một ứng viên để nhắn tin</h3>
								<p>Tìm kiếm và chọn ứng viên từ danh sách bên trái để bắt đầu trò chuyện</p>
							</div>
						</div>
						<div className='bg-white h-20 w-full border-t'> </div>
					</div>
				)}
			</div>
			<div className='w-20 bg-white border-l'></div>
		</div>
	);
};

export default MessagesPage;
