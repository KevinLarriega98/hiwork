import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const CenterIconFocused = (props: SvgProps) => (
    <Svg width={25} height={25} fill="none" {...props}>
        <G clipPath="url(#a)">
            <G clipPath="url(#b)">
                <Path
                    fill="#004932"
                    d="m15.425 24.1-7.03-.045c-4.68-.03-8.495-3.88-8.51-8.578L-.14 8.523C-.155 3.825 3.639.025 8.314.055l7.03.045c4.68.03 8.495 3.88 8.51 8.578l.024 6.949c.016 4.703-3.778 8.498-8.454 8.467v.006Z"
                />
                <Path
                    fill="#D7FF3C"
                    d="M8.728 18.687c-1.27-.008-2.6-.433-3.465-1.208l1.018-1.15c.91.815 2.795 1.066 3.87.526.952-.484 1.681-1.386 2.074-2.546l-.43-.003c-1.488-.055-2.897-.754-3.683-1.814a3.699 3.699 0 0 1-.693-1.811c-.07-.822.165-1.561.69-2.145.532-.584 1.286-.898 2.12-.887.97.018 1.959.474 2.585 1.197.78.9 1.227 2.197 1.26 3.542 1.037-.386 1.926-1.053 2.433-1.888a3.088 3.088 0 0 0 .408-2.027 3.158 3.158 0 0 0-.982-1.836l1.023-1.15a4.665 4.665 0 0 1 1.484 2.768 4.594 4.594 0 0 1-.62 3.063c-.586.965-1.503 1.758-2.652 2.292a7.703 7.703 0 0 1-1.275.459c-.43 1.901-1.52 3.405-3.044 4.17-.618.31-1.36.459-2.126.454l.005-.006Zm1.477-9.493c-.278-.002-.658.064-.951.387-.306.34-.536 1.148.091 1.99.508.693 1.462 1.144 2.49 1.185.232.007.465.003.691-.019.048-1.1-.274-2.196-.872-2.884a2.037 2.037 0 0 0-1.437-.66H10.2h.005Z"
                />
            </G>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 .168 24 0l.168 24-24 .168z" />
            </ClipPath>
            <ClipPath id="b">
                <Path fill="#fff" d="m-.168 0 24 .155.08 24-24-.155z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default CenterIconFocused;
