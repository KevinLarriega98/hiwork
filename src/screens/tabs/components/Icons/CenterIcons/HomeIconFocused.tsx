import * as React from "react";
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from "react-native-svg";
const HomeIconFocused = (props: SvgProps) => (
    <Svg width={20} height={20} fill="none" {...props}>
        <G clipPath="url(#a)">
            <G clipPath="url(#b)">
                <Mask
                    id="c"
                    width={20}
                    height={20}
                    x={0}
                    y={0}
                    maskUnits="userSpaceOnUse"
                >
                    <Path fill="#fff" d="M20 0H0v20h20V0Z" />
                </Mask>
                <G mask="url(#c)">
                    <Path
                        fill="#004932"
                        d="M19.813 8.349a2.562 2.562 0 0 0-.544-.812l-6.32-6.32a4.186 4.186 0 0 0-2.947-1.217c-1.1 0-2.163.437-2.946 1.216L.731 7.541A2.47 2.47 0 0 0 0 9.305v8.123c-.001.347.052.697.186 1.02A2.51 2.51 0 0 0 2.5 19.986H6.33a1.17 1.17 0 0 0 1.168-1.168v-3.716c0-.35.053-.697.192-1.019a2.502 2.502 0 0 1 2.312-1.538c.98 0 1.899.577 2.312 1.538.135.322.193.673.193 1.02v3.22h-.005v.495a1.17 1.17 0 0 0 1.168 1.168h3.778c.346 0 .697-.053 1.019-.188a2.502 2.502 0 0 0 1.538-2.312v-8.18c0-.327-.063-.654-.188-.957h-.005Z"
                    />
                </G>
            </G>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
            <ClipPath id="b">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default HomeIconFocused;
