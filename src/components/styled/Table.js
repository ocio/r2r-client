import styled from '@emotion/styled'

export const Table = styled.div`
    display: table;
    border-collapse: collapse;
    width: 100%;
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
    &:last-of-type > div {
        padding: 12px 0 6px 0;
    }
`
export const TableCol = styled.div`
    display: table-cell;
    font-size: 25px;
    padding: 12px 0 0 0;
    text-align: ${p => p.align || 'left'};
`
