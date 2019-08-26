import React from 'react';
import SVG from 'axios-react-inlinesvg';

import {
    Modal,
} from '@patternfly/react-core';
import api from 'src/store/api';
import { handleProcessModalToggle } from './actions';
import {IProcessModalState} from './types';

interface IProcessImageModalProps {
    handleProcessModalToggle: typeof handleProcessModalToggle,
    state: IProcessModalState,
}

export default function ProcessImageModal(props: IProcessImageModalProps) {
    const loadingComponent = () => {
        return (<span>Loading ...</span>)
    }
    return (<Modal
        isLarge={true}
        title={`Process status - ${props.state.processId}`}
        isOpen={props.state.modalVisible}
        onClose={props.handleProcessModalToggle}>
        <SVG
            src={'/no-svg.svg'}
            cacheRequests={false}
            loader={loadingComponent}
            axiosRequest={api.process.image(props.state.processId)}
            onError={loadingComponent} />
    </Modal>);
}