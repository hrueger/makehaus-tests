import { hub, diagnostics, autoAnimate } from "@makeproaudio/makehaus-js";

hub.init("192.168.178.85", 8192);

diagnostics.start(hub);
autoAnimate.start(hub);