import React, {Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, Axios) =>{
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }

            this.reqInterceptor = Axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = Axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal 
                        show={this.state.error !== null}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ?this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;