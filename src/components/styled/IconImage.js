import styled from '@emotion/styled'

const IconImage = styled.div`
    position: relative;
    background-image: url('${p => p.url}');
    background-repeat: no-repeat;
    background-size: ${p => p.size};
    width: ${p => p.size};
    height: ${p => p.size};
    top: calc(${p => p.size} / 4);
    display: inline-block;
`

export default IconImage
