import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import  AppTopbar  from './AppTopbar';
import { AppBreadcrumb } from './AppBreadcrumb';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';
import { withRouter } from 'react-router';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { Dashboard } from '../Pages/Dashboard';
import 'primereact/resources/primereact.min.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style.css';
import {createMenu} from '../service/MenuService'; 
import Menu from '../service/MenuService'; 
import PersonalData from '../Pages/PersonalData';
import SportsData from '../Pages/SportsData';
import Schedule from '../Pages/Schedule';
import Frequency from '../Pages/Frequency';
import Organization from '../Pages/Organization';
import Teams from '../Pages/Teams';
import Championship from '../Pages/Championship';
import Games from '../Pages/Games';
import Competitions from '../Pages/Competitions';
import { UserContext } from '../context/User';
import PermissionRoute from '../service/RouteService';
function App(props) {
    //static contextType = MenuContext
    const [layoutMode, setLayoutMode] = useState('static');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [themeColor, setThemeColor] = useState('blue');
    const [configDialogActive, setConfigDialogActive] = useState(false);
    const [menu, setMenu] =  useState(null);
    let menuClick = null;
    let topbarItemClick = null;
    let onConfigButtonClick = null;
    let configClick = null;
    
    useEffect(()=>{
        Menu({menu:menu,callback:getMenu, changeTheme:changeTheme, user:user});
    },[])
    const context = useContext(UserContext);
    let user = context.user;
    console.log(user);
    const getMenu = (data) =>{
        setMenu(data);
    }
    console.log(Menu);
    const onMenuClick = (event) => {
        menuClick = true;
    }
    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false)
        if (layoutMode === 'overlay' && !isMobile()) {
            setOverlayMenuActive(!overlayMenuActive)
        } else {
            if (isDesktop())
                setStaticMenuDesktopInactive(!staticMenuDesktopInactive);
            else
                setStaticMenuMobileActive(!staticMenuMobileActive)
        }
        event.preventDefault();
    }
    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive(!topbarMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    }
    const onTopbarItemClick = (event) => {
        topbarItemClick = true;
        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null);
        else
            setActiveTopbarItem(event.item);
        event.originalEvent.preventDefault();
    }
    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();
        }
        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    }
    const onRootMenuItemClick = (event) => {
        setMenuActive(!menuActive);
    }
    onConfigButtonClick = (event) => {
        configClick = true;
        setConfigDialogActive(!configDialogActive);
    }
    const onConfigCloseClick = () => {
        setConfigDialogActive(false);
    }
    const onConfigClick = () => {
        configClick = true;
    }
    const onDocumentClick = (event) => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }
        if (!configClick) {
            setConfigDialogActive(false);
        }
        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }

            hideOverlayMenu();
        }
        topbarItemClick = false;
        menuClick = false;
        configClick = false;
    }
    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    }
    const isTablet = () => {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }
    const isDesktop = () => {
        return window.innerWidth > 1024;
    }
    const isMobile = () => {
        return window.innerWidth <= 640;
    }
    const isOverlay = () => {
        return layoutMode === 'overlay';
    }

    const isHorizontal = () =>{
        return layoutMode === 'horizontal';
    }
    const isSlim = () => {
        return layoutMode === 'slim';
    }
    const changeMenuMode = (event) => {
        setLayoutMode(event.menuMode);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);
    }
    const changeMenuColor = (event) => {
        setDarkTheme(event.darkTheme)
        onThemeChange();
    }
    const onThemeChange = () => {
        const themeLink = document.getElementById('theme-css');
        const href = themeLink.href;
        const themeFile = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
        const themeTokens = themeFile.split('-');
        const themeName = themeTokens[1];
        const themeMode = themeTokens[2];
        const newThemeMode = (themeMode === 'dark') ? 'light' : 'dark';
        changeTheme({ originalEvent: null, theme: themeName + '-' + newThemeMode });
    }
    const changeTheme = (event) => {
        setThemeColor(event.theme.split('-')[0]);
        changeStyleSheetUrl('layout-css', event.theme, 'layout');
        changeStyleSheetUrl('theme-css', event.theme, 'theme');
    }
    const changeStyleSheetUrl = (id, value, prefix) => {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');

        replaceLink(element, newURL);

        if (value.indexOf('dark') !== -1) {
            setDarkTheme(true);
        } else {
            setDarkTheme(false);
        }
    }
    const isIE = () =>{
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
    }
    const replaceLink = (linkElement, href) => {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);
        if (isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }
    const layoutClassName = classNames('layout-wrapper', {
        'layout-horizontal': layoutMode === 'horizontal',
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-slim': layoutMode === 'slim',
        'layout-static-inactive': staticMenuDesktopInactive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-overlay-active': overlayMenuActive
    });
    const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);
    return (
        <div className={layoutClassName} onClick={onDocumentClick}>
            <PermissionRoute userRules={context.user.rules}/>
            <AppTopbar darkTheme={darkTheme} onThemeChange={onThemeChange}
                topbarMenuActive={topbarMenuActive} activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick} />

            <div className='layout-menu-container' onClick={onMenuClick}>
                <div className="layout-menu-content">
                    <div className="layout-menu-title">MENU</div>
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick}
                        onRootMenuItemClick={onRootMenuItemClick}
                        layoutMode={layoutMode} active={menuActive} />
                </div>
            </div>
            <div className="layout-content">
                <AppBreadCrumbWithRouter />

                <div className="layout-content-container">
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/personal-data" exact component={PersonalData} />
                    <Route path="/sports-data" exact component={SportsData} />
                    <Route path="/schedule" exact component={Schedule} />
                    <Route path="/frequency" exact component={Frequency} />
                    <Route path="/organization" exact component={Organization} />
                    <Route path="/teams" exact component={Teams} />
                    <Route path="/championship" exact component={Championship} />
                    <Route path="/games" exact component={Games} />
                    <Route path="/competitions" exact component={Competitions} />
                </div>
                <AppFooter />
                {staticMenuMobileActive && <div className="layout-mask"></div>}
            </div>
            <AppConfig layoutMode={layoutMode} darkTheme={darkTheme} themeColor={themeColor}
                changeMenuMode={changeMenuMode} changeMenuColor={changeMenuColor} changeTheme={changeTheme}
                onConfigButtonClick={onConfigButtonClick} onConfigCloseClick={onConfigCloseClick}
                onConfigClick={onConfigClick} configDialogActive={configDialogActive} />
        </div>
    );
}
export default App;