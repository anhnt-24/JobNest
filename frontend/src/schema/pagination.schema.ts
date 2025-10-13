export type Meta = {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};

export type PaginationRes<T> = {
	items: T[];
	meta: Meta;
};
