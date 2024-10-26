#include <libwebsockets.h>
#include <string.h>

static int callback_echo(struct lws *wsi, enum lws_callback_reasons reason,
                         void *user, void *in, size_t len) {
    switch (reason) {
        case LWS_CALLBACK_RECEIVE:
            // Echo message back to the client
            lws_write(wsi, (unsigned char *)in, len, LWS_WRITE_TEXT);
            break;
        default:
            break;
    }
    return 0;
}

int main() {
    struct lws_context_creation_info info;
    memset(&info, 0, sizeof(info));
    info.port = 8080; // Port for the WebSocket server
    info.protocols = (const struct lws_protocols[]) {
        { "echo", callback_echo, 0, 0 },
        { NULL, NULL, 0, 0 } // End of list
    };

    struct lws_context *context = lws_create_context(&info);
    if (!context) {
        fprintf(stderr, "WebSocket context creation failed\n");
        return 1;
    }

    printf("WebSocket server started on ws://localhost:8080\n");
    while (1) {
        lws_service(context, 0);
    }

    lws_context_destroy(context);
    return 0;
}
