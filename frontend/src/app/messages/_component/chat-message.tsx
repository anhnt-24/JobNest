import { useAuth } from '@/hook/useAuth';

const ChatMessages = ({ messages }: { messages: any }) => {
	const { user } = useAuth();

	return (
		<div className='flex-grow overflow-y-auto p-4 space-y-4'>
			{messages.map(message => (
				<div key={message.id} className={`flex ${message.senderId === Number(user.id) ? 'justify-end' : 'justify-start'}`}>
					<div className={`max-w-[70%] rounded-lg p-3 ${message.senderId === Number(user.id) ? 'bg-primary text-white' : 'bg-gray-100'}`}>
						<p>{message.content}</p>
						<span className={`text-xs mt-1 block ${message.senderId === Number(user.id) ? 'text-blue-100' : 'text-gray-500'}`}>{new Date(message.createdAt).toLocaleTimeString()}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
