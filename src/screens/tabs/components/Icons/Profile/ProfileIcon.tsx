import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const ProfileIcon = (props: SvgProps) => (
    <Svg width={24} height={20} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#004932"
                d="M15.45 11.332a6.188 6.188 0 0 0 2.707-5.457C17.994 2.721 15.374.13 12.215.005a6.215 6.215 0 0 0-6.458 6.202 6.211 6.211 0 0 0 2.75 5.153c-3.314 1.219-5.823 4.108-6.492 7.648a.84.84 0 0 0 .833.987c.4 0 .746-.28.819-.674.741-3.93 4.204-6.916 8.345-6.916 4.142 0 7.604 2.981 8.346 6.916a.827.827 0 0 0 .819.674c.525 0 .93-.477.833-.992-.674-3.564-3.217-6.468-6.56-7.676v.005ZM11.96 1.93a4.277 4.277 0 0 1 4.271 4.272 4.277 4.277 0 0 1-4.272 4.271 4.277 4.277 0 0 1-4.271-4.271 4.277 4.277 0 0 1 4.271-4.272Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M2 0h20.024v20H2z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default ProfileIcon;
