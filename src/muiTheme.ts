import {createTheme} from "@mui/material/styles";

export default createTheme({
    typography: {
        fontFamily:
            'system-ui, -apple-system, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        button: {
            textTransform: "unset"
        }
    },
    shape: {
        borderRadius: 0
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: "100%"
                },
                body: {
                    height: "100%",
                    backgroundColor: "grey"
                },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "#__next": {
                    height: "100%"
                }
            }
        }
    }
});
