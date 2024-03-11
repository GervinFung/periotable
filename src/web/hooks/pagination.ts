import React from 'react';

// refer https://stackblitz.com/edit/react-1zaeqk?file=src%2FusePagination.js
const generateRange = (
	from: number,
	to: number
): ReadonlyArray<string | number> => {
	return Array.from({ length: to - from + 1 }, (_, index) => {
		return index + from;
	});
};

const usePagination = ({
	siblingCount,
	current,
	total,
}: Readonly<{
	current: number;
	total: number;
	siblingCount: number;
}>) => {
	const dots = '...';

	const range: ReadonlyArray<string | number> = React.useMemo(() => {
		const totalPageNumbers = siblingCount + 5;

		if (totalPageNumbers >= total) {
			return generateRange(1, total);
		}

		const leftSiblingIndex = Math.max(current - siblingCount, 1);
		const rightSiblingIndex = Math.min(current + siblingCount, total);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < total - 2;

		const firstPageIndex = 1;
		const lastPageIndex = total;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount;
			const leftRange = generateRange(1, leftItemCount);

			return leftRange.concat(dots, total);
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount;
			const rightRange = generateRange(total - rightItemCount + 1, total);

			return [firstPageIndex, dots].concat(rightRange);
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = generateRange(
				leftSiblingIndex,
				rightSiblingIndex
			);

			return [firstPageIndex, dots].concat(
				middleRange,
				dots,
				lastPageIndex
			);
		}

		return [];
	}, [total, siblingCount, current]);

	return range;
};

export default usePagination;
