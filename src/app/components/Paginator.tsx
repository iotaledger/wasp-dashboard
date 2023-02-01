import React from "react";
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
 * @returns The node to render.
 */
export default function Paginator<T>({ title, children, data, size, navUrl }: PaginatorProps<T>) {
    const { page } = useParams();
    const navigate = useNavigate();

    const numericPage = Number(page);

    const pagesQuantity = Math.ceil(data.length / size);
    const endItem = size * numericPage;
    const startItem = endItem - size;
    const dataRange = data.slice(startItem, startItem + size);

    const first = numericPage > 1 ? 1 : undefined;
    const previous = numericPage > 1 ? numericPage - 1 : undefined;
    const next = endItem < data.length ? numericPage + 1 : undefined;
    const last = endItem < data.length ? pagesQuantity : undefined;

    const pagesOptions = Array.from({ length: pagesQuantity }).map((_, i) => (i + 1).toString());

    return (
        <React.Fragment>
            <InfoBox title={title}>
                {dataRange.length > 0
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
                location={numericPage.toString()}
                selectorOptions={pagesOptions}
                selectorChanged={navigate}
            />
        </React.Fragment>
    );
}
