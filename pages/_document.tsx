import React from "react";
import Document, {Html, Head, Main, NextScript} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

export default class CustomDocument extends Document {
    override render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

CustomDocument.getInitialProps = async ctx => {
    // https://github.com/mui-org/material-ui/blob/58710978346e7bb558429673ee77da8e639988a8/examples/nextjs-with-typescript/pages/_document.tsx
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createCache({key: "css"});
    const server = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/naming-convention
            enhanceApp: (App: any) => props => <App emotionCache={cache} {...props} />
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = server.extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => (
        <style
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
    };
};
