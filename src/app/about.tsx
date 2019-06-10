import React from 'react';
import { AboutModal, TextContent, TextList, TextListItem } from '@patternfly/react-core';
import imgAboutBg from '@assets/images/pfbg_768@2x.jpg';

export interface IAppAboutProps {
    isAboutOpen: boolean,
    onToggleAbout: () => void,
    imageBrandSrc: string
}

export default function AppAbout(props: IAppAboutProps) {
    return (
        <AboutModal
            isOpen={props.isAboutOpen}
            onClose={props.onToggleAbout}
            trademark="Made by Red Hat GPTE for Tech Exchange 2019"
            brandImageSrc={props.imageBrandSrc}
            brandImageAlt="Internal Hiring Application"
            backgroundImageSrc={imgAboutBg}
        >
            <TextContent>
                <TextList component="dl">
                    <TextListItem component="dt">Hiring App Version</TextListItem>
                    <TextListItem component="dd">1.0.0</TextListItem>
                </TextList>
            </TextContent>
        </AboutModal>
    )
}