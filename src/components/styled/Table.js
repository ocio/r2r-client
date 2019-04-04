import React from 'react'
import styled from '@emotion/styled'

export const Table = styled.div`
    display: table;
    border-collapse: collapse;
    width: 100%;
`
export const TableHead = styled.div`
    display: table-header-group;
`

export const TableRow = styled.div`
    display: table-row;
    background-image: url('assets/img/line-dot.png');
    background-repeat: repeat-x;
    background-size: 5px;
    &:last-of-type {
        background-image: url('assets/img/line-dot.png'),
            url('assets/img/line-dot.png');
        background-position: top, bottom;
    }
`
export const TableCol = styled.div`
    display: table-cell;
    vertical-align: middle;
    text-align: ${p => p.align || 'left'};
    width: ${p => p.width || 'auto'};
`

export function TableText({ children, color, ...props }) {
    return (
        <TableCol {...props}>
            <TableColText color={color}>{children}</TableColText>
        </TableCol>
    )
}

const TableColText = styled.div`
    font-size: 25px;
    height: 42px;
    line-height: 42px;
    color: ${p => p.color || 'inherit'};
    padding-top: 8px;
`

export function TableIcon({ children, ...props }) {
    return (
        <TableCol {...props}>
            <TableColIcon>{children}</TableColIcon>
        </TableCol>
    )
}

const TableColIcon = styled.div``
