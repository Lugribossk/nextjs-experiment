import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
    typography: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        button: {
            textTransform: "unset"
        }
    },
    shape: {
        borderRadius: 0
    }
});
