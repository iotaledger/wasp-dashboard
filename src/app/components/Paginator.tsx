import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import InfoBox from "./InfoBox";
import { LoadingTile } from "./loading";

interface PaginatorProps<T> {
    title: string;
    data: T[];
    children: (item: T, index: number) => React.ReactNode;
    size: number;
    navUrl: string;
    searchFilter?: (item: T, search: string) => RegExpMatchArray | null;
    searchPlaceholder?: string;
}

/**
 * A pages iterator
 *
 * @param param0 PaginatorProps
 * @param param0.title Paginator title
 * @param param0.data Data to iterate over
 * @param param0.children An item builder
 * @param param0.size Define the length of pages
 * @param param0.navUrl Specify the paginator navigation url
 * @param param0.searchFilter Match an item and the search input
 * @param param0.searchPlaceholder Define the search placeholder
 * @returns The node to render.
 */
export default function Paginator<T>({
    title,
    children,
    data,
    size,
    navUrl,
    searchFilter,
    searchPlaceholder,
}: PaginatorProps<T>) {
    const { page } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const results = search && searchFilter ? data.filter(item => searchFilter(item, search)) : data;
    const numericPage = Number(page);

    const pagesQuantity = Math.ceil(data.length / size);
    const endItem = size * numericPage;
    const startItem = endItem - size;
    const dataRange = results.slice(startItem, startItem + size);

    const first = numericPage > 1 ? 1 : undefined;
    const previous = numericPage > 1 ? numericPage - 1 : undefined;
    const next = endItem < results.length ? numericPage + 1 : undefined;
    const last = endItem < results.length ? pagesQuantity : undefined;

    const pagesOptions = Array.from({ length: pagesQuantity }).map((_, i) => (i + 1).toString());

    // eslint-disable-next-line jsdoc/require-jsdoc
    function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);

        // Go back to the first page after typing a search
        if (numericPage > 1) {
            navigate(`${navUrl}/1`);
        }
    }

    const action = searchFilter ? (
        <input onChange={onSearchChange} value={search} placeholder={searchPlaceholder} disabled={data.length === 0} />
    ) : undefined;

    return (
        <React.Fragment>
            <InfoBox title={title} action={action}>
                {search.length > 0 && <h4 className="margin-b-m">{results.length} results found.</h4>}
                {data.length > 0
                    ? dataRange.map((item, i) => children(item, i))
                    : Array.from({ length: 2 }).map((_, i) => <LoadingTile key={i} />)}
            </InfoBox>
            <BottomNavbar
                firstButton={{
                    enabled: first !== undefined,
                    value: first?.toString(),
                }}
                previousButton={{
                    enabled: previous !== undefined,
                    value: previous?.toString(),
                }}
                nextButton={{
                    enabled: next !== undefined,
                    value: next?.toString(),
                }}
                lastButton={{
                    enabled: last !== undefined,
                    value: last?.toString(),
                }}
                navUrl={navUrl}
                pagesOptions={pagesOptions}
            />
        </React.Fragment>
    );
}

Paginator.defaultProps = {
    searchFilter: undefined,
    searchPlaceholder: undefined,
};
