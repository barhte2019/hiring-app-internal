import React from 'react';
import SVG from 'axios-react-inlinesvg';

import {
    Modal,
} from '@patternfly/react-core';
import api from 'src/store/api';
import { handleProcessModalToggle } from './actions';

interface IProcessImageModalProps {
    handleProcessModalToggle: typeof handleProcessModalToggle,
    modalVisible: boolean,
    processId: number,
}

export default function ProcessImageModal(props: IProcessImageModalProps) {
    return (<Modal
        isLarge={true}
        title={`Process status - ${props.processId}`}
        isOpen={props.modalVisible}
        onClose={props.handleProcessModalToggle}>
        <SVG
            src={'/no-svg.svg'}
            cacheRequests={false}
            // tslint:disable-next-line:jsx-no-lambda
            loader={() => <span>Loading ...</span>}
            axiosRequest={api.process.image(props.processId)}
            // tslint:disable-next-line:jsx-no-lambda
            onError={() => <span>Loading ...</span>} />
    </Modal>);
}