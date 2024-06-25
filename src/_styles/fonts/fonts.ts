const fontFamilyInter: string = '"Inter", sans-serif';

const rem = (size: number, baseSize: number = 16): string =>
  `${size / baseSize}rem`;

export const fontStyles: Record<string, any> = {
  inter11Regular: {
    fontFamily: fontFamilyInter,
    fontSize: rem(11),
    fontWeight: 400,
    lineHeight: rem(13),
    letterSpacing: "0em",
    textAlign: "left",
    margin: 0,
    padding: 0,
  },
  inter11SemiBold: {
    fontFamily: fontFamilyInter,
    fontSize: rem(11),
    fontWeight: 600,
    lineHeight: rem(13),
    letterSpacing: "0em",
    textAlign: "left",
    margin: 0,
    padding: 0,
  },
  inter11Bold: {
    fontFamily: fontFamilyInter,
    fontSize: rem(11),
    fontWeight: 700,
    lineHeight: rem(13),
    letterSpacing: "0em",
    textAlign: "left",
    margin: 0,
    padding: 0,
  },
  // Continúa para los demás estilos...
  inter13Regular: {
    fontFamily: fontFamilyInter,
    fontSize: rem(13),
    fontWeight: 400,
    lineHeight: rem(16),
    letterSpacing: "0em",
    textAlign: "left",
    margin: 0,
    padding: 0,
  },
  // Añade todos los estilos según tus necesidades
};

// Uso
// <Box sx={{ ...typographyStyles.inter11Regular }}>Texto aquí</Box>
