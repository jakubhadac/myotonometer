/* import libs */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, Image} from 'react-bootstrap';
/* import data */
import { languageData, language } from '../data/languageData';

class NavigationBar extends Component {
    render(){
        const data = languageData[language];
        const navBar = (
            <div>
                <Navbar inverse={true}>
                    <Nav>
                        <NavItem componentClass={Link} href="/" to="/">
                            <Image type="image/svg+xml" src="/logo.svg" style={{width: 50, height: 'auto'}}/>
                        </NavItem>
                        <NavItem componentClass={Link} href="/measurement" to="/measurement">{data.menuMeasurement}</NavItem>
                        <NavItem componentClass={Link} href="/unsaved" to="/unsaved">{data.menuMeasurementUnsaved}</NavItem>
                        <NavItem componentClass={Link} href="/evidence" to="/evidence">{data.menuEvidence}</NavItem>
                        <NavItem componentClass={Link} href="/sim" to="/sim">SIM</NavItem>
                        <NavItem componentClass={Link} href="/comparison" to="/comparison">{data.menuEvidenceComparison}</NavItem>
                        <NavItem componentClass={Link} href="/settings" to="/settings">{data.menuSettings}</NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
        return (navBar);
    }
} export default NavigationBar;