import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../index";
import {fetchStorefronts} from "./actions";
import {ThunkDispatch} from "redux-thunk";
import {Storefront} from "./storefront";

export interface StorefrontState {
    storefronts: Storefront[] | undefined;
    storefrontsLoading: boolean;
    error?: Error;
}

interface StateProps {
    state: StorefrontState;
}
interface OwnProps {}
interface DispatchProps {
    getStorefronts() : void
}

class Storefronts extends React.Component<HeaderProps, StorefrontState> {

    state: StorefrontState;

    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            storefronts: [],
            storefrontsLoading: false,
        }
    }

    render() {
        return  (
            <div className="storefront">
                <p>Storefront</p>
                <button onClick={this.props.getStorefronts.bind(this)}>Load</button>
                {!!this.props.state.storefrontsLoading &&
                    <p><span>Loading</span></p>
                }
                {!this.props.state.storefrontsLoading &&
                    <p>Not loading.</p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state:RootState, ownProps:OwnProps): StateProps => {
    console.log(`Mapping to StateProps:`)
    console.log(state) // FIXME: Wrong state coming here. Looks like state.storefronts.* instead of state.storefrontState.*
    return {
        state: {
            storefronts: state.storefronts?.storefronts,
            storefrontsLoading: state.storefronts?.storefrontsLoading ?? false,
            error: state.storefronts?.error,
        }
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {
        getStorefronts: async () => {
            console.log('Fetching now.')
            await dispatch(fetchStorefronts())
            console.log('Fetching completed [UI]')
        }
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type HeaderProps = ConnectedProps<typeof connector>;

export default connector(Storefronts)
