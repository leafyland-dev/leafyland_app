import Link from "next/link";

type PaginationProps = {
    currentPage: number;
    hasMore: boolean;
    searchQuery: string | null;
};

export default function Pagination({ currentPage, hasMore, searchQuery }: PaginationProps) {
    const queryString = (page: number) => {
        const params = new URLSearchParams();
        if (searchQuery) params.append("q", searchQuery);
        params.append("page", page.toString());
        return `?${params.toString()}`;
    };

    return (
        <div className="flex justify-between mt-8">
            {currentPage > 1 && (
                <Link href={queryString(currentPage - 1)} className="btn btn-primary">
                    Previous
                </Link>
            )}
            {hasMore && (
                <Link href={queryString(currentPage + 1)} className="btn btn-primary">
                    Next
                </Link>
            )}
        </div>
    );
}
