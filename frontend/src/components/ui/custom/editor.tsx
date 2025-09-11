'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Strikethrough,
	Heading1,
	Heading2,
	Heading3,
	List,
	ListOrdered,
	Link as LinkIcon,
	Unlink,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	Quote,
	Code,
	Minus,
	Undo,
	Redo,
	Eye,
	Edit3,
	Maximize2,
	Minimize2,
	Type,
	Palette,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarButtonProps {
	onClick: () => void;
	isActive?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	title?: string;
}

const ToolbarButton = ({ onClick, isActive, disabled, children, title }: ToolbarButtonProps) => (
	<Button
		size='sm'
		variant='ghost'
		onClick={onClick}
		disabled={disabled}
		title={title}
		className={cn(
			'h-8 w-8 p-0 transition-all duration-200',
			'hover:bg-editor-toolbar-hover hover:scale-105',
			'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			isActive && 'bg-editor-active text-editor-active-foreground shadow-sm'
		)}>
		{children}
	</Button>
);

// const ColorButton = ({ color, onClick, isActive }: { color: string; onClick: () => void; isActive: boolean }) => (
// 	<button
// 		className={cn('h-6 w-6 rounded border-2 transition-all duration-200 hover:scale-110', isActive ? 'border-ring shadow-md' : 'border-border')}
// 		style={{ backgroundColor: color }}
// 		onClick={onClick}
// 		title={`Set color to ${color}`}
// 	/>
// );

export default function RichTextEditor({ title, value, onChange }: { title: string; value: string; onChange: (val: string) => void }) {
	const [preview, setPreview] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextStyle,
			Color,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'text-primary underline hover:text-primary-glow transition-colors cursor-pointer',
				},
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[300px] p-4',
			},
		},
		immediatelyRender: false,
	});
	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [value, editor]);
	if (!editor) return <></>;

	const wordCount = 0;
	const charCount = 0;

	const toggleLink = () => {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('Nhập URL:', previousUrl);

		if (url === null) return;

		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	};

	return (
		<div className={cn('mx-auto transition-all duration-300', isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : '')}>
			<div className='rounded-lg border border-editor-border bg-card '>
				{/* Header */}
				<div className='border-b border-editor-border bg-editor-toolbar-bg px-4 py-3 rounded-t-lg'>
					<div className='flex items-center justify-between'>
						<h5 className='font-medium text-foreground'>{title}</h5>
						<div className='flex items-center gap-2'>
							<span className='text-xs text-muted-foreground'>
								{wordCount} words, {charCount} characters
							</span>
							<Separator orientation='vertical' className='h-4' />
							<ToolbarButton onClick={() => setPreview(!preview)} isActive={preview} title={preview ? 'Edit Mode' : 'Preview Mode'}>
								{preview ? <Edit3 size={16} /> : <Eye size={16} />}
							</ToolbarButton>
							<ToolbarButton onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
								{isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
							</ToolbarButton>
						</div>
					</div>
				</div>

				{/* Toolbar */}
				{!preview && (
					<div className='border-b border-editor-border bg-editor-toolbar-bg px-4 py-3'>
						<div className='flex flex-wrap items-center gap-1'>
							{/* Text Formatting */}
							<div className='flex items-center gap-1'>
								<ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title='Bold (Ctrl+B)'>
									<Bold size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title='Italic (Ctrl+I)'>
									<Italic size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title='Underline (Ctrl+U)'>
									<UnderlineIcon size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title='Strikethrough'>
									<Strikethrough size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title='Code'>
									<Code size={16} />
								</ToolbarButton>
							</div>

							<Separator orientation='vertical' className='h-6 mx-1' />

							{/* Headings */}
							<div className='flex items-center gap-1'>
								<ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title='Heading 1'>
									<Heading1 size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title='Heading 2'>
									<Heading2 size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title='Heading 3'>
									<Heading3 size={16} />
								</ToolbarButton>
							</div>

							<Separator orientation='vertical' className='h-6 mx-1' />

							{/* Lists */}
							<div className='flex items-center gap-1'>
								<ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title='Bullet List'>
									<List size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title='Numbered List'>
									<ListOrdered size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title='Quote'>
									<Quote size={16} />
								</ToolbarButton>
							</div>

							<Separator orientation='vertical' className='h-6 mx-1' />

							{/* Alignment */}
							<div className='flex items-center gap-1'>
								<ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title='Align Left'>
									<AlignLeft size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title='Align Center'>
									<AlignCenter size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title='Align Right'>
									<AlignRight size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title='Justify'>
									<AlignJustify size={16} />
								</ToolbarButton>
							</div>

							<Separator orientation='vertical' className='h-6 mx-1' />

							{/* Links */}
							<div className='flex items-center gap-1'>
								<ToolbarButton onClick={toggleLink} isActive={editor.isActive('link')} title='Add Link'>
									<LinkIcon size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} title='Remove Link'>
									<Unlink size={16} />
								</ToolbarButton>
							</div>

							{/* <Separator orientation='vertical' className='h-6 mx-1' /> */}

							{/* Colors
							<div className='flex items-center gap-2'>
								<div className='flex items-center gap-1'>
									<Palette size={16} className='text-muted-foreground' />
									{colors.map(color => (
										<ColorButton key={color} color={color} onClick={() => editor.chain().focus().setColor(color).run()} isActive={editor.getAttributes('textStyle').color === color} />
									))}
								</div>
							</div> */}

							<Separator orientation='vertical' className='h-6 mx-1' />

							{/* Other Actions */}
							<div className='flex items-center gap-1'>
								<ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title='Horizontal Rule'>
									<Minus size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} title='Undo (Ctrl+Z)'>
									<Undo size={16} />
								</ToolbarButton>
								<ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} title='Redo (Ctrl+Y)'>
									<Redo size={16} />
								</ToolbarButton>
							</div>
						</div>
					</div>
				)}

				{/* Editor Content */}
				<CardContent className='p-0'>
					<div className={cn('bg-editor-bg rounded-b-lg transition-all duration-200')}>
						{preview ? (
							<div className='p-6'>
								<div className='prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto max-w-none' dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
							</div>
						) : (
							<div className='relative'>
								<EditorContent editor={editor} className='focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-b-lg' />
							</div>
						)}
					</div>
				</CardContent>
			</div>
		</div>
	);
}
