/* import libs */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, Image} from 'react-bootstrap';
import { connect } from 'react-redux';
/* import data */
import { languageData } from '../data/language';
/* map functions */
function mapStateToProps(store) { return { language: store.settings.language }; }

class NavigationBar extends Component {
    render(){
        const data = languageData[this.props.language];
        const navBar = (
            <Navbar inverse={true}>
                <Nav>
                    <NavItem componentClass={Link} href="/" to="/">
                        <Image type="image/svg+xml" src="/logo.svg" style={{width: 50, height: 'auto'}}/>
                    </NavItem>
                    <NavItem componentClass={Link} href="/measurement" to="/measurement">{data.menuMeasurement}</NavItem>
                    <NavItem componentClass={Link} href="/unsaved" to="/unsaved">{data.menuMeasurementUnsaved}</NavItem>
                    <NavItem componentClass={Link} href="/evidence" to="/evidence">{data.menuEvidence}</NavItem>
                    <NavItem componentClass={Link} href="/comparison" to="/comparison">{data.menuEvidenceComparison}</NavItem>
                    <NavItem componentClass={Link} href="/settings" to="/settings">{data.menuSettings}</NavItem>
                    <NavItem componentClass={Link} href="/sim" to="/sim">SIM</NavItem>
                </Nav>
            </Navbar>
        );
        return (navBar);
    }
} export default connect(mapStateToProps)(NavigationBar);