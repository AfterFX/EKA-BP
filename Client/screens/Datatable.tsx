import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

function Datatable({
                       columns,
                       data = [],
                       page: _page = 1,
                       perPage: _perPage = 5,
                       defaultSortField,
                       defaultSortAsc,
                       style,
                       paginationComponentOptions,
                   }) {
    const [state, setState] = useState({
        datatable: data,
        page: _page - 1,
        perPage: _perPage,
        numberOfPages: Math.ceil(data.length / _perPage),
        sortField: defaultSortField,
        sortAsc: defaultSortAsc,
    });

    const { datatable, page, perPage, numberOfPages, sortField, sortAsc } = state;

    const getValue = (object, { selector, cell }) => {
        if (cell) return cell(object);
        return selector
            .replace(/\[/g, '.')
            .replace(/\]/g, '')
            .split('.')
            .reduce((o, k) => (o || {})[k], object);
    };

    useEffect(() => {
        //console.log('useEffect:', state);
    });

    const sort = (sortField: string | number) => {
        const result = data.sort((a, b) => {
            let [x, z] = sortAsc ? [a, b] : [b, a];
            return x[sortField] - z[sortField];
        });

        console.log(result);
        setState((prev) => ({
            ...prev,
            sortField,
            sortAsc: prev.sortField === sortField ? !prev.sortAsc : true,
            //datatable: result,
        }));
    };

    return (
        <DataTable style={style}>
            <DataTable.Header>
                {columns.map((item, i) => {
                    const sortDirection =
                        sortField === item.selector
                            ? sortAsc
                                ? 'ascending'
                                : 'descending'
                            : null;

                    return (
                        <DataTable.Title
                            key={i}
                            onPress={() => sort(item.selector)}
                            sortDirection={sortDirection}>
                            {item.name} {sortDirection}
                        </DataTable.Title>
                    );
                })}
            </DataTable.Header>

            {datatable.slice(perPage * page, perPage * (page + 1)).map((item, i) => {
                return (
                    <DataTable.Row key={i}>
                        {columns.map((headerItem, j) => {
                            return (
                                <DataTable.Cell key={j}>
                                    {getValue(item, headerItem)}
                                </DataTable.Cell>
                            );
                        })}
                    </DataTable.Row>
                );
            })}

            <DataTable.Pagination
                page={page}
                numberOfPages={numberOfPages}
                onPageChange={(page) => {
                    console.log('change', page);
                    setState((prev) => ({ ...prev, page }));
                }}
                label={paginationComponentOptions(page + 1, numberOfPages)}
            />
        </DataTable>
    );
}

export default Datatable;
