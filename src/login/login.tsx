import React, { Fragment } from 'react';
import { Button, BackgroundImage, BackgroundImageSrc } from '@patternfly/react-core';
import { useKeycloak } from 'react-keycloak';

import './login.css';
import xs from '@assets/images/pfbg_576.jpg';
import xs2x from '@assets/images/pfbg_576@2x.jpg';
import sm from '@assets/images/pfbg_768.jpg';
import sm2x from '@assets/images/pfbg_768@2x.jpg';
import lg from '@assets/images/pfbg_1200.jpg';
import filter from '@assets/images/background-filter.svg';

export default function LoginPage() {
    const [keycloak] = useKeycloak();
    const loginClick = () => { keycloak.login(); }

    const images = {
        [BackgroundImageSrc.xs]: xs,
        [BackgroundImageSrc.xs2x]: xs2x,
        [BackgroundImageSrc.sm]: sm,
        [BackgroundImageSrc.sm2x]: sm2x,
        [BackgroundImageSrc.lg]: lg,
        [BackgroundImageSrc.filter]: `${filter}#image_overlay`
    };

    return (
    <Fragment>
        <BackgroundImage src={images} />
        <header className="masthead">
        <div className="container d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
                <h1 className="mx-auto my-0 text-auppercase">Hiring Admin</h1>
                <h2 className="text-white-50 mx-auto mt-2 mb-5">Hiring Management web application, uses React, Redux and Patternfly for Frontend and RHPAM for Backend. Enjoy the ride!</h2>
                <Button type="button" onClick={loginClick}>Login</Button>
            </div>
        </div>
        </header>
    </Fragment>)
}
