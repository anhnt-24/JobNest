import { CardTitle } from '@/components/ui/card';
import BlogList from './_component/blog-list';
import { BlogSearch } from './_component/blog-search';

function Page() {
	return (
		<div>
			<BlogList title='Mới nhất' />
			<BlogList title='Đọc nhiều nhất' />
			<BlogList title='Bài viết có chọn lọc' />
		</div>
	);
}

export default Page;
