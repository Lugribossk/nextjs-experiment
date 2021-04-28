import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
    typography: {
        fontFamily:
            'system-ui, -apple-system, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        button: {
            textTransform: "unset"
        }
    },
    shape: {
        borderRadius: 0
    }
});
