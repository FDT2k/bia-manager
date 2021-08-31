import { bem, compose, withBaseClass } from '@karsegard/react-compose';
import { Person } from '@/bia-layout/components/Icons';
import Navbar from '@/bia-layout/components/Navbar';



import {Grid,LayoutFlex,Container,withGridArea} from '@karsegard/react-core-layout'
import React from 'react';
import { useLocation } from "wouter";
import './main-view.scss';










const MainLayout = withBaseClass('bia-main-layout')(Grid);


const Nav = withGridArea(Navbar);
const Footer = withGridArea(Navbar);


const [__base_class, element, modifier] = bem('bia-main');
const Content = compose(
    withBaseClass(element('content')),
                            withGridArea

                        )(Container)

const MainView = props => {

    const { className, renderFooter,renderLeftNav,t, ...rest } = props;
    const [location, setLocation] = useLocation();



    return (
        <MainLayout  className={className} contained cover>
            <Nav area="header" className="nav-main">
                {renderLeftNav && renderLeftNav()}
                {!renderLeftNav &&<h3>BIA Manager</h3>}
                <LayoutFlex onClick={_=>setLocation("/import")} alignCenter><Person />{t(`Utilisateur`)}</LayoutFlex>
            </Nav>
            <Content area="maincontent">

                {props.children}

            </Content>
            <Footer area="footer">

                {renderFooter && renderFooter()}

            </Footer>

        </MainLayout>
   )
}

MainView.defaultProps = {
  t: x=>x
}

export default withBaseClass(__base_class)(MainView);