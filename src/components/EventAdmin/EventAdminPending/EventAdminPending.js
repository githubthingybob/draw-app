import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventAdminPending extends Component {
    state = {
        heading: 'Pending',
    };

    componentDidMount() {
        const action = { type: 'GET_PENDING_DRAWINGS' };
        this.props.dispatch(action);
    };

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                {JSON.stringify(this.props.store.drawing)}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(EventAdminPending);