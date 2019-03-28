// https://github.com/necolas/react-native-web/issues/1310

// import { createCss } from '@emotion/primitives-core'
import { createStyled } from '@emotion/primitives-core'
import { StyleSheet } from 'react-native'

const styled = createStyled(StyleSheet)

// const css = createCss(StyleSheet)

// export { css }

export default styled
