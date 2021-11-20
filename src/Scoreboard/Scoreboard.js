import { getDataFromDatabase } from "./serverapi";
import { useMemo, useTable } from "react";

function Scoreboard() {
    getDataFromDatabase();
    const data = useMemo(
        () => [
            {
                col1: "Hello",
                col2: "World",
            },
            {
                col1: "react-table",
                col2: "rocks",
            },
        ],
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: "Column 1",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Column 2",
                accessor: "col2",
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Scoreboard;
