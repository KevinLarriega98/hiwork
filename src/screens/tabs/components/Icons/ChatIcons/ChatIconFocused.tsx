import * as React from "react";
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from "react-native-svg";

const ChatIconFocused = (props: SvgProps) => (
    <Svg width={22} height={20} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Mask
                id="b"
                width={20}
                height={20}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
            >
                <Path fill="#fff" d="M20 0H0v20h20V0Z" />
            </Mask>
            <G mask="url(#b)">
                <Path
                    fill="#004932"
                    d="M0 15.833A4.169 4.169 0 0 0 4.167 20h5.82c1.954 0 3.864-.57 5.499-1.64a9.994 9.994 0 0 0 3.694-4.393 10.003 10.003 0 0 0-1.89-10.832 9.993 9.993 0 0 0-4.963-2.88 10.046 10.046 0 0 0-5.73.319 10.046 10.046 0 0 0-4.615 3.414A10.003 10.003 0 0 0 0 9.375v6.463-.005Z"
                />
            </G>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default ChatIconFocused;
